import { watchEffect, toValue, type MaybeRefOrGetter } from 'vue'
import type { ThemeKey } from '@/types/character'
import { getTheme } from '@/themes'

export function useTheme(slugRef: MaybeRefOrGetter<ThemeKey>) {
  watchEffect(() => {
    const slug = toValue(slugRef)
    const theme = getTheme(slug)
    const root = document.documentElement

    root.style.setProperty('--font-display', theme.fontFamily)
    root.style.setProperty('--drop-cap', theme.dropCapColor)
    root.style.setProperty('--ornament-top', theme.ornamentTop)
    root.style.setProperty('--ornament-bottom', theme.ornamentBottom)

    for (const [k, v] of Object.entries(theme.palette)) {
      root.style.setProperty(`--color-${k}`, v)
    }
  })
}