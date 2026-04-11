import { useEffect } from 'react'
import type { SiteCopy } from '../content/copy'
import { EMAIL, SCHOLAR_URL } from '../content/copy'
import { ensureCalElementClickEmbed } from '../cal/ensureCalEmbed'

type Props = { copy: SiteCopy }

const CAL_LINK = '徐亮亮-yyrcnu/30min'
const CAL_NAMESPACE = '30min'
const CAL_CONFIG = JSON.stringify({
  layout: 'month_view',
  useSlotsViewOnSmallScreen: 'true',
})

export function Contact({ copy }: Props) {
  useEffect(() => {
    ensureCalElementClickEmbed()
  }, [])

  return (
    <section id="contact" className="section section--after-research contact">
      <div className="section__head">
        <h2>{copy.contact.title}</h2>
      </div>
      <div className="contact-card contact-card--wide">
        <div className="contact-schedule">
          <button
            type="button"
            className="btn btn--primary contact-schedule__btn"
            data-cal-link={CAL_LINK}
            data-cal-namespace={CAL_NAMESPACE}
            data-cal-config={CAL_CONFIG}
          >
            {copy.contact.bookMeetingLabel}
          </button>
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
