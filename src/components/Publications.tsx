import { SCHOLAR_URL } from '../content/copy'
import type { SiteCopy } from '../content/copy'
import { PUBLICATIONS } from '../content/publications'

type Props = { copy: SiteCopy }

function byYearDesc(a: { year: number }, b: { year: number }) {
  return b.year - a.year
}

export function Publications({ copy }: Props) {
  const sorted = [...PUBLICATIONS].sort(byYearDesc)
  const years = [...new Set(sorted.map((p) => p.year).filter((y) => y > 0))].sort((a, b) => b - a)
  const noYear = sorted.filter((p) => p.year <= 0)

  return (
    <section id="publications" className="section section--after-research publications">
      <div className="section__head section__head--wide">
        <h2>{copy.publications.title}</h2>
        <p className="section__lead section__lead--stats">{copy.publications.subtitle}</p>
        <a className="inline-link" href={SCHOLAR_URL} target="_blank" rel="noreferrer">
          Google Scholar →
        </a>
      </div>
      <div className="timeline timeline--compact">
        {years.map((year) => (
          <div key={year} className="timeline__year-block">
            <div className="timeline__left">
              <span className="timeline__year">{year}</span>
              <div className="timeline__rail" aria-hidden />
            </div>
            <ul className="timeline__list">
              {sorted
                .filter((p) => p.year === year)
                .map((pub, i) => (
                  <li key={`${year}-${i}-${pub.title.slice(0, 24)}`} className="pub-row">
                    <a
                      className="pub-row__title"
                      href={pub.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {pub.title}
                    </a>
                    <p className="pub-row__meta">{pub.authors}</p>
                    {pub.venue ? <p className="pub-row__venue">{pub.venue}</p> : null}
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {noYear.length > 0 ? (
          <div className="timeline__year-block">
            <div className="timeline__left">
              <span className="timeline__year timeline__year--muted">—</span>
              <div className="timeline__rail" aria-hidden />
            </div>
            <ul className="timeline__list">
              {noYear.map((pub, i) => (
                <li key={`ny-${i}-${pub.title.slice(0, 24)}`} className="pub-row">
                  <a className="pub-row__title" href={pub.href} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a>
                  <p className="pub-row__meta">{pub.authors}</p>
                  {pub.venue ? <p className="pub-row__venue">{pub.venue}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
