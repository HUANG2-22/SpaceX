import type { Locale, SiteCopy } from '../content/copy'

type Props = {
  locale: Locale
  onLocale: (l: Locale) => void
  copy: SiteCopy
  menuOpen: boolean
  onMenuOpen: (v: boolean) => void
}

const ids = ['home', 'research', 'publications', 'collaboration', 'contact'] as const

export function Header({ locale, onLocale, copy, menuOpen, onMenuOpen }: Props) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#home" className="site-logo" onClick={() => scrollTo('home')}>
          <span className="site-logo__ai">AI</span>
          <span className="site-logo__for">For</span>
          <span className="site-logo__x">X</span>
          <span className="site-logo__sep">·</span>
          <span className="site-logo__space">SPACE</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-label="Menu"
          onClick={() => onMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Primary">
          <div className="site-nav__tabs-capsule">
            {ids.map((id) => (
              <button key={id} type="button" className="site-nav__link" onClick={() => scrollTo(id)}>
                {copy.nav[id]}
              </button>
            ))}
          </div>
          <div className="site-nav__lang-capsule">
            <div className="lang-switch" role="group" aria-label="Language">
              <button
                type="button"
                className={locale === 'en' ? 'is-active' : ''}
                onClick={() => onLocale('en')}
              >
                EN
              </button>
              <span className="lang-switch__sep">/</span>
              <button
                type="button"
                className={locale === 'zh' ? 'is-active' : ''}
                onClick={() => onLocale('zh')}
              >
                中
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
