import { createApp, reactive } from 'vue'

import Component from './components/Component.vue'

const store = reactive({
  count: 0
})

const component = createApp(Component)
component.provide('store', store)
component.mount('#component')
