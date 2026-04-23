import { useEffect } from 'react'
import type { Locale } from '../content/copy'
import { ensureCalInlineEmbeds } from '../cal/ensureCalInlineEmbeds'

type Props = { locale: Locale }

const CAL_ZOOM_URL = 'https://cal.com/%E5%BE%90%E4%BA%AE%E4%BA%AE-yyrcnu/30min'
const CAL_TENCENT_URL =
  'https://cal.com/%E5%BE%90%E4%BA%AE%E4%BA%AE-yyrcnu/tencent?duration=60&overlayCalendar=true'

export function Book({ locale }: Props) {
  const isZh = locale === 'zh'
  useEffect(() => {
    ensureCalInlineEmbeds()
  }, [])

  return (
    <section className="section section--after-research book-page">
      <div className="section__head section__head--wide">
        <h2>{isZh ? '预约个人会议' : 'Book Personal Meeting'}</h2>
        <p className="section__lead">
          {isZh
            ? '请选择会议平台，然后进入对应预约页面。'
            : 'Choose a meeting platform, then continue to the corresponding booking page.'}
        </p>
      </div>
      <div className="book-grid">
        <article className="book-card">
          <h3>{isZh ? 'Zoom会议' : 'Zoom Meeting'}</h3>
          <p>
            {isZh
              ? '自动在 Zoom 中生成预约与入会链接。'
              : 'Automatically creates the meeting and join link in Zoom.'}
          </p>
          <div className="book-embed-wrap">
            <div className="book-embed" id="my-cal-inline-30min" />
          </div>
          <a className="book-alt-link" href={CAL_ZOOM_URL} target="_blank" rel="noreferrer">
            {isZh ? '若未加载，请点击打开 Zoom 预约页' : 'If embed does not load, open Zoom booking page'}
          </a>
        </article>
        <article className="book-card">
          <h3>{isZh ? '腾讯会议' : 'Tencent Meeting'}</h3>
          <p>
            {isZh
              ? '进入腾讯会议预约页面进行时间选择。'
              : 'Continue to Tencent Meeting booking for time selection.'}
          </p>
          <div className="book-embed-wrap">
            <div className="book-embed" id="my-cal-inline-tencent" />
          </div>
          <a className="book-alt-link" href={CAL_TENCENT_URL} target="_blank" rel="noreferrer">
            {isZh
              ? '若未加载，请点击打开腾讯会议预约页'
              : 'If embed does not load, open Tencent booking page'}
          </a>
        </article>
      </div>
      <div className="book-back">
        <a className="btn btn--ghost" href="/">
          {isZh ? '返回主页' : 'Back to Home'}
        </a>
      </div>
    </section>
  )
}
