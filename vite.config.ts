import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: '/dnd-chrono-game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    watch: {
      // Черновики и неотслеживаемые материалы — не для dev-наблюдения,
      // иначе залоченные .mp3/.docx в новой рукописи роняют watcher (EBUSY).
      // Аудиофайлы тоже игнорируем: они могут быть открыты в плеере,
      // а HMR на <audio src> всё равно не нужен.
      ignored: ['**/new_add_text/**', '**/*.mp3'],
    },
  },
})