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
import { Book } from './components/Book'

export default function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const copy = COPY[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : 'en'
  }, [locale])

  const isBookPage = typeof window !== 'undefined' && window.location.pathname === '/book'

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
        {isBookPage ? (
          <Book locale={locale} />
        ) : (
          <>
            <Hero copy={copy} />
            <Research copy={copy} />
            <Publications copy={copy} />
            <Collaboration copy={copy} />
            <Contact copy={copy} />
          </>
        )}
      </main>
      <Footer text={copy.footer} />
    </div>
  )
}
