import type { ThemeKey } from '@/types/character'
import { artur } from './artur'
import { aza } from './aza'
import { el } from './el'
import { ziraela } from './ziraela'
import { barandur } from './barandur'
import { malbrin } from './malbrin'

export type BackgroundKind = 'parchment' | 'gothic' | 'book' | 'forest' | 'minimal'

export interface Theme {
  palette: Record<string, string>
  fontFamily: string
  background: BackgroundKind
  ornamentTop: string
  ornamentBottom: string
  dropCapColor: string
}

const themes: Record<ThemeKey, Theme> = {
  artur,
  aza,
  el,
  ziraela,
  barandur,
  malbrin,
}

export function getTheme(slug: ThemeKey): Theme {
  return themes[slug]
}

export { artur, aza, el, ziraela, barandur, malbrin }