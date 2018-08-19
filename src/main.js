import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'

Vue.use(moment)
Vue.use(VueResource)
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Vue.filter('formatDate', function(value) {
//   if (value) {
//   	console.log(value)
//   	// TODO: dates are not working properly
//     return moment(value).format('MMMM d, Y')
//   }
// })
