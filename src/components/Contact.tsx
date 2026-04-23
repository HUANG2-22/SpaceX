import type { SiteCopy } from '../content/copy'
import { EMAIL, SCHOLAR_URL } from '../content/copy'

type Props = { copy: SiteCopy }

export function Contact({ copy }: Props) {
  return (
    <section id="contact" className="section section--after-research contact">
      <div className="section__head">
        <h2>{copy.contact.title}</h2>
      </div>
      <div className="contact-card contact-card--wide">
        <div className="contact-schedule">
          <a className="btn btn--primary contact-schedule__btn" href="/book">
            {copy.contact.bookMeetingLabel}
          </a>
        </div>
        <dl className="contact-dl">
          <dt>{copy.contact.emailLabel}</dt>
          <dd>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </dd>
          <dt>{copy.contact.scholarLabel}</dt>
          <dd>
            <a href={SCHOLAR_URL} target="_blank" rel="noreferrer">
              {SCHOLAR_URL}
            </a>
          </dd>
          <dt>{copy.contact.locationLabel}</dt>
          <dd>
            {copy.contact.location}
            <br />
            {copy.contact.locationAddress}
          </dd>
        </dl>
      </div>
    </section>
  )
}
