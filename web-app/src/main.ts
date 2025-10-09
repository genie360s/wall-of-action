import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCameraLib from 'vue-camera-lib'

import App from './App.vue'
import router from './router'
import SpeedInsightsPlugin from './plugins/speedInsights'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCameraLib)
app.use(SpeedInsightsPlugin)

app.mount('#app')
