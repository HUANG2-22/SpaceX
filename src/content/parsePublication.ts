import { SCHOLAR_URL } from './copy'

export type ParsedPublication = {
  authors: string
  title: string
  venue: string
  year: number
  href: string
}

function stripUrl(citation: string): { text: string; url: string | null } {
  const m = citation.match(/https?:\/\/[^\s]+/)
  if (!m) return { text: citation.trim(), url: null }
  const url = m[0].replace(/[).,]+$/, '')
  const text = citation.replace(m[0], '').replace(/\s+/g, ' ').trim()
  return { text, url }
}

function splitAuthorsRest(s: string): { authors: string; rest: string } {
  const i = s.lastIndexOf('*. ')
  if (i > 20) {
    return { authors: s.slice(0, i + 1).trim(), rest: s.slice(i + 3).trim() }
  }
  const j = s.lastIndexOf('*, ')
  if (j > 20) {
    return { authors: s.slice(0, j + 1).trim(), rest: s.slice(j + 3).trim() }
  }
  return { authors: '', rest: s }
}

function splitTitleVenue(rest: string): { title: string; venue: string } {
  const re =
    /\.\s+(?=The Innovation|Angewandte Chemie|Journal of the American|Accounts of Materials|Physical Review Materials|Advanced Materials|Advanced Energy Materials|Advanced Functional Materials|Nature Communications|Applied Catalysis|Chemical Engineering Journal|Journal of Energy Chemistry|ACS Sensors|Journal of Colloid|ACS Sustainable Chemistry|Nano Research Energy|Nano Research,|Energy Storage Materials|Carbon\b|Nano Energy|Journal of Materials Chemistry A|National Science Review|PRX Energy|Nature Catalysis|Journal of Alloys and Compounds|Science \(|\(|The Innovation\b)/i
  const idx = rest.search(re)
  if (idx > 0) {
    return {
      title: rest.slice(0, idx + 1).trim(),
      venue: rest.slice(idx + 2).trim(),
    }
  }
  const paren = rest.search(/\.\s+\(/)
  if (paren > 0) {
    return {
      title: rest.slice(0, paren + 1).trim(),
      venue: rest.slice(paren + 2).trim(),
    }
  }
  return { title: rest.trim(), venue: '' }
}

export function parsePublication(citation: string): ParsedPublication {
  const { text, url } = stripUrl(citation)
  const { authors, rest } = splitAuthorsRest(text)
  const { title, venue } = splitTitleVenue(rest)
  const years = [...text.matchAll(/\((\d{4})\)/g)].map((x) => parseInt(x[1]!, 10))
  const year = years.length ? Math.max(...years) : 0
  return {
    authors,
    title: title.replace(/^["“”]|[""]$/g, '').trim(),
    venue,
    year,
    href: url ?? SCHOLAR_URL,
  }
}
