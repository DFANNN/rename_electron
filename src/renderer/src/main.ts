import './assets/main.css'
import 'element-plus/es/components/message/style/css'
import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from '@renderer/router/index'
// pinia
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
