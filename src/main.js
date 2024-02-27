import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import './assets/style.scss'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Vuelidate)

const app = new Vue({
  render: function (h) { return h(App) },
})

app.$mount('#app')
