import rawCitations from './publications_raw.json'
import { parsePublication, type ParsedPublication } from './parsePublication'

export type { ParsedPublication }

/** 35 entries from CV “Selected Publications”; complete record on Google Scholar. */
export const PUBLICATIONS: ParsedPublication[] = (rawCitations as string[]).map((c) =>
  parsePublication(c),
)
