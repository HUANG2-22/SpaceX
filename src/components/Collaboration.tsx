import { useState } from 'react'
import type { SiteCopy } from '../content/copy'

type Props = { copy: SiteCopy }

export function Collaboration({ copy }: Props) {
  const c = copy.collaboration
  const [usePlaceholder, setUsePlaceholder] = useState(false)

  return (
    <section id="collaboration" className="section section--after-research collaboration">
      <div className="section__head">
        <h2>{c.title}</h2>
        <p className="collaboration__intro">{c.introOneLine}</p>
      </div>
      <div className="collaboration__column">
        <div className="panel panel--refined">
          <h3>{c.grantsTitle}</h3>
          <ul>
            {c.grants.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="panel panel--refined">
          <h3>{c.talksTitle}</h3>
          <ul>
            {c.talks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="collaboration__partners">
          {!usePlaceholder ? (
            <img
              src="/partners-logos.png"
              alt={c.partnersAlt}
              className="collaboration__partners-img"
              onError={() => setUsePlaceholder(true)}
            />
          ) : (
            <img
              src="/partners-placeholder.svg"
              alt={c.partnersAlt}
              className="collaboration__partners-img collaboration__partners-img--ph"
            />
          )}
        </div>
      </div>
    </section>
  )
}
