import type { Theme } from "./index";

// Заглушка темы Эл — старая тема удалена при подготовке к редизайну.
// /el страница (ElMainPage.vue) сейчас НЕ использует DiaryLayout/useTheme,
// поэтому фактические значения не применяются, но Theme требует полный
// объект. Заменить содержимое при добавлении нового стиля дневника Эл.
export const el: Theme = {
  palette: {},
  fontFamily: "sans-serif",
  background: "minimal",
  ornamentTop: "",
  ornamentBottom: "",
  dropCapColor: "#000",
};
