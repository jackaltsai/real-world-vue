import { createApp } from 'vue'
import { createPinia } from 'pinia'
import GStore from './stores'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('GStore', GStore)
app.mount('#app')
