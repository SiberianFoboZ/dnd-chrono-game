export type Status = 'active' | 'wip'

export type ThemeKey =
  | 'artur'
  | 'aza'
  | 'el'
  | 'ziraela'
  | 'barandur'
  | 'malbrin'

export interface Character {
  id: string
  name: string
  slug: string
  title: string
  role: string
  status: Status
  themeKey: ThemeKey
}