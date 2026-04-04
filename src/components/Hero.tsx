import type { SiteCopy } from '../content/copy'
import { EMAIL, SCHOLAR_URL } from '../content/copy'
import { InfinityPointCloud } from './InfinityPointCloud'

type Props = { copy: SiteCopy }

export function Hero({ copy }: Props) {
  const h = copy.hero

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden />
      <div className="hero__stack">
        <div className="hero__visual-wrap">
          <div className="hero__glow" aria-hidden />
          <div className="hero__visual">
            <div className="hero__frame hero__frame--canvas">
              <InfinityPointCloud className="hero__mobius" />
            </div>
          </div>
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">{h.eyebrow}</p>
          <h1 className="hero__name">{h.name}</h1>
          <p className="hero__affil">{h.affiliation}</p>
          <p className="hero__editorial">{h.editorial}</p>
          <p className="hero__role">{h.role}</p>
          <p className="hero__slogan">“{h.slogan}”</p>
          <p className="hero__metrics">{h.metrics}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={SCHOLAR_URL} target="_blank" rel="noreferrer">
              {h.scholarLabel}
            </a>
            <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>
              {h.emailLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
