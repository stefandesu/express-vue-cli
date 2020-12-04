import { createApp, reactive } from 'vue'

import App from './App1.vue'
import Component from './components/Component.vue'

const store = reactive({
  count: 0
})

const app = createApp(App)
app.provide('store', store)
app.mount('#app')
const component = createApp(Component)
component.provide('store', store)
component.mount('#component')
