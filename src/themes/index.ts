import type { ThemeKey } from "@/types/character";
import { artur } from "./artur";
import { aza } from "./aza";
import { barandur } from "./barandur";
import { el } from "./el";
import { irena } from "./irena";
import { malbrin } from "./malbrin";
import { ziraela } from "./ziraela";

export type BackgroundKind =
  | "parchment"
  | "gothic"
  | "book"
  | "forest"
  | "minimal";

export interface Theme {
  palette: Record<string, string>;
  fontFamily: string;
  background: BackgroundKind;
  ornamentTop: string;
  ornamentBottom: string;
  dropCapColor: string;
}

const themes: Record<ThemeKey, Theme> = {
  artur,
  aza,
  el,
  ziraela,
  barandur,
  malbrin,
  irena,
};

export function getTheme(slug: ThemeKey): Theme {
  return themes[slug];
}

export { artur, aza, barandur, el, irena, malbrin, ziraela };
