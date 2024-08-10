import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from '@renderer/router/index'

const app = createApp(App)

app.use(router)

app.mount('#app')
