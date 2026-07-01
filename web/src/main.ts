import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import './assets/styles/fonts.css'
import './assets/styles/tailwind.css'
import './assets/styles/diary-effects.css'

createApp(App).use(router).mount('#app')