import type { SiteCopy } from '../content/copy'

type Props = { copy: SiteCopy }

/** 24×24 viewBox, stroke icons aligned in fixed 48×48 box */
function IconAgents() {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 10h2M19 9v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="17" r="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconHT() {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 10h16M10 4v16M16 4v16" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="13" cy="13" r="1" fill="currentColor" />
      <circle cx="19" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}

function IconLab() {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 3v8L6 21h12l-4-10V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 3h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="12" cy="17" rx="3" ry="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

function IconCatalyst() {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l6.5 3.75v7.5L12 17l-6.5-3.75v-7.5L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconElectro() {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="7" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11h8M8 14h5" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path
        d="M13 17l3-5h-2.5l1.5-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconBridge() {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 18h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M5 18V11c2.5-2.5 5.5-4 9-4s6.5 1.5 9 4v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

const icons = [IconAgents, IconHT, IconLab, IconCatalyst, IconElectro, IconBridge]

export function Research({ copy }: Props) {
  return (
    <section id="research" className="section research">
      <div className="section__head">
        <h2>{copy.research.title}</h2>
        <p className="section__lead">{copy.research.subtitle}</p>
      </div>
      <div className="card-grid card-grid--two-col">
        {copy.research.cards.map((c, i) => {
          const Ico = icons[i] ?? IconAgents
          const n = String(i + 1).padStart(2, '0')
          return (
            <article key={c.title} className="glass-card glass-card--tier">
              <div className="glass-card__top">
                <span className="glass-card__idx">{n}</span>
                <span className="glass-card__icon-wrap">
                  <Ico />
                </span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
