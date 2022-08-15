import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import('./assets/js/ZegoExpressWebRTC-2.18.0')

var app = createApp(App)

app.use(store).use(router).mount('#app')
app.use(axios)