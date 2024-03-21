import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue';

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);
app.use(vuetify)
app.use(pinia)
app.mount('#app');
