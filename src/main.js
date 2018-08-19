import Vue from 'vue'
import App from './App.vue'
import router from './router'
import showdown from 'showdown'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(showdown)
Vue.use(VueResource)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Vue.filter('formatDate', function(value) {
//   if (value) {
//     return
//   }
// })
