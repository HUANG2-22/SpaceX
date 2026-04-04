import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Replicates "Infinity Manifold | Seamless Transition" (Three r160-style):
 * lemniscate centerline + tube offsets, cloud → shape lerp (quartic out),
 * then breath + rotation.x, HSL colors driven by u + time.
 */
type Props = {
  className?: string
}

/** By shortest canvas side; counts are 2× reference HTML (200k) at large sizes. */
function pickParticleCount(shortSide: number): number {
  if (shortSide >= 1100) return 400_000
  if (shortSide >= 720) return 240_000
  if (shortSide >= 520) return 200_000
  if (shortSide >= 400) return 170_000
  if (shortSide >= 320) return 130_000
  return 100_000
}

export function InfinityPointCloud({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = wrapRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(0, 0, 24)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0xffffff, 0)
    container.appendChild(renderer.domElement)

    const cw = container.clientWidth || 800
    const ch = container.clientHeight || cw
    const particleCount = pickParticleCount(Math.min(cw, ch))

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const targetPositions = new Float32Array(particleCount * 3)
    const startPositions = new Float32Array(particleCount * 3)
    const tubeOffsets = new Float32Array(particleCount * 3)
    const uValues = new Float32Array(particleCount)

    const a = 13.5
    const tubeRadius = 2.6

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3
      const t = Math.random() * Math.PI * 2
      uValues[i] = t

      startPositions[idx] = (Math.random() - 0.5) * 100
      startPositions[idx + 1] = (Math.random() - 0.5) * 100
      startPositions[idx + 2] = (Math.random() - 0.5) * 100

      const sinT = Math.sin(t)
      const den = 1 + sinT ** 2
      const baseX = (a * Math.cos(t)) / den
      const baseY = (a * Math.sin(t) * Math.cos(t)) / den
      const baseZ = Math.sin(t * 2) * 1.5

      targetPositions[idx] = baseX
      targetPositions[idx + 1] = baseY
      targetPositions[idx + 2] = baseZ

      const angle = Math.random() * Math.PI * 2
      const r = Math.pow(Math.random(), 0.85) * tubeRadius
      tubeOffsets[idx] = r * Math.cos(angle)
      tubeOffsets[idx + 1] = r * Math.sin(angle)
      tubeOffsets[idx + 2] = r * Math.sin(angle * 0.5)

      positions[idx] = reduceMotion
        ? targetPositions[idx] + tubeOffsets[idx]
        : startPositions[idx]
      positions[idx + 1] = reduceMotion
        ? targetPositions[idx + 1] + tubeOffsets[idx + 1]
        : startPositions[idx + 1]
      positions[idx + 2] = reduceMotion
        ? targetPositions[idx + 2] + tubeOffsets[idx + 2]
        : startPositions[idx + 2]
    }

    /** Max radius from origin at peak breath (1.25); rotation preserves ||p|| so one sphere fits all poses. */
    const maxBreath = 1.25
    let shapeRadius = 0
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3
      const px =
        targetPositions[idx] + tubeOffsets[idx] * maxBreath
      const py =
        targetPositions[idx + 1] + tubeOffsets[idx + 1] * maxBreath
      const pz =
        targetPositions[idx + 2] + tubeOffsets[idx + 2] * maxBreath
      const r = Math.sqrt(px * px + py * py + pz * pz)
      if (r > shapeRadius) shapeRadius = r
    }
    shapeRadius += 0.08

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.77,
      blending: THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const mainGroup = new THREE.Group()
    const points = new THREE.Points(geometry, material)
    mainGroup.add(points)
    /** Slightly smaller on screen; camera fit uses scaled bounds. */
    const MODEL_VISUAL_SCALE = 0.92
    mainGroup.scale.setScalar(MODEL_VISUAL_SCALE)
    scene.add(mainGroup)

    const colorObj = new THREE.Color()
    const colAttr = geometry.attributes.color as THREE.BufferAttribute
    const cArr = colAttr.array as Float32Array

    function updateColors(time: number) {
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        const t = uValues[i] as number
        const hue = 0.55 + 0.15 * Math.sin(t + time * 0.5)
        colorObj.setHSL(hue, 0.82, 0.36)
        cArr[idx] = colorObj.r
        cArr[idx + 1] = colorObj.g
        cArr[idx + 2] = colorObj.b
      }
      colAttr.needsUpdate = true
    }

    let introProgress = reduceMotion ? 1 : 0
    let rotationStartTime: number | null = reduceMotion ? performance.now() : null

    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    /** Deterministic micro-jitter (avoids 200k×Math.random per frame). */
    function jitter(i: number, axis: number, cycleTime: number): number {
      const k = i * 0.618 + axis * 19.1 + cycleTime * 17.3
      return Math.sin(k * 12.9898) * 0.015
    }

    /** Reference demo ~900px short side; back camera needs larger world `size` to keep point coverage. */
    const REF_VIEW_SHORT = 900
    const REF_CAM_Z = 24

    /**
     * Camera distance ∝ scale, so world scale alone barely changes screen size; lowering
     * FIT_PADDING zooms in (may clip slightly at breath peak — kept safe for 0.92 scale).
     */
    const FIT_PADDING = 0.84
    /** 0 = 模型几何中心与画布/背后径向渐变中心对齐 */
    const Y_LIFT_HALF_FRUSTUM = 0

    const fitCameraZ = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w < 2 || h < 2) return
      const aspect = w / h
      const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360)
      const R = shapeRadius * MODEL_VISUAL_SCALE
      const vertFit = R / tanHalfFov
      const horizFit = R / (tanHalfFov * aspect)
      const d = Math.max(vertFit, horizFit) * FIT_PADDING
      camera.position.z = Math.max(d, 0.1)
      mainGroup.position.y = camera.position.z * tanHalfFov * Y_LIFT_HALF_FRUSTUM
    }

    const syncPointSizeForCanvas = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      const short = Math.max(Math.min(w, h), 240)
      const canvasScale = REF_VIEW_SHORT / short
      const distScale = camera.position.z / REF_CAM_Z
      material.size = THREE.MathUtils.clamp(
        0.032 * canvasScale * distScale,
        0.04,
        0.15,
      )
    }

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w < 2 || h < 2) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      fitCameraZ()
      syncPointSizeForCanvas()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    if (reduceMotion) {
      updateColors(0)
      mainGroup.rotation.x = 0.5
      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }

    let raf = 0

    function animate(now: number) {
      if (introProgress < 1) {
        introProgress += 0.012
        if (introProgress > 1) introProgress = 1
        const ease = 1 - (1 - introProgress) ** 4

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3
          arr[idx] = THREE.MathUtils.lerp(
            startPositions[idx],
            targetPositions[idx] + tubeOffsets[idx],
            ease,
          )
          arr[idx + 1] = THREE.MathUtils.lerp(
            startPositions[idx + 1],
            targetPositions[idx + 1] + tubeOffsets[idx + 1],
            ease,
          )
          arr[idx + 2] = THREE.MathUtils.lerp(
            startPositions[idx + 2],
            targetPositions[idx + 2] + tubeOffsets[idx + 2],
            ease,
          )
        }
        updateColors(0)
      } else {
        if (rotationStartTime === null) rotationStartTime = now
        const cycleTime = (now - rotationStartTime) * 0.001
        const breath = 1 + Math.sin(cycleTime * 1.2) * 0.25

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3
          arr[idx] =
            targetPositions[idx] +
            tubeOffsets[idx] * breath +
            jitter(i, 0, cycleTime)
          arr[idx + 1] =
            targetPositions[idx + 1] +
            tubeOffsets[idx + 1] * breath +
            jitter(i, 1, cycleTime)
          arr[idx + 2] =
            targetPositions[idx + 2] +
            tubeOffsets[idx + 2] * breath +
            jitter(i, 2, cycleTime)
        }
        mainGroup.rotation.x = cycleTime * 0.6
        updateColors(cycleTime)
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      if (!reduceMotion) raf = requestAnimationFrame(animate)
    }

    if (!reduceMotion) raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={className}
      role="img"
      aria-label="Infinity manifold point cloud animation"
    />
  )
}
