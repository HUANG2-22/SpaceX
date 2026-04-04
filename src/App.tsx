import { useEffect, useState } from 'react'
import './App.css'
import { COPY, type Locale } from './content/copy'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Research } from './components/Research'
import { Publications } from './components/Publications'
import { Collaboration } from './components/Collaboration'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const copy = COPY[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : 'en'
  }, [locale])

  return (
    <div className="site">
      <Header
        locale={locale}
        onLocale={setLocale}
        copy={copy}
        menuOpen={menuOpen}
        onMenuOpen={setMenuOpen}
      />
      <main>
        <Hero copy={copy} />
        <Research copy={copy} />
        <Publications copy={copy} />
        <Collaboration copy={copy} />
        <Contact copy={copy} />
      </main>
      <Footer text={copy.footer} />
    </div>
  )
}
