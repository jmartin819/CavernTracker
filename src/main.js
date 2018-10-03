import '@babel/polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'
import store from './store'

Vue.config.productionTip = false

export const fb = require('./plugins/firebaseConfig')

// Includes
Vue.use(VueFire)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
