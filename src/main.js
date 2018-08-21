import Vue from 'vue'
import App from './App.vue'
import router from './router'
import showdown from 'showdown'
import hljs from 'highlight.js'
import VueResource from 'vue-resource'
import VRuntimeTemplate from "v-runtime-template";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(showdown)
Vue.use(hljs)
Vue.use(VRuntimeTemplate)
Vue.use(VueResource)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.directive('highlightjs', {
	deep: true,
	bind: function (el) {
		el.style.color = '#fff'
		el.style.backgroundColor = 'LightSlateGray'
		let targets = el.querySelectorAll('code')
		targets.forEach((target) => {
			console.log(target)
			hljs.highlightBlock(target)
		})
	},
	componentUpdated: function (el) {
		el.style.color = '#fff'
		el.style.backgroundColor = 'LightSlateGray'
		let targets = el.querySelectorAll('code')
		targets.forEach((target) => {
			console.log(target)
			hljs.highlightBlock(target)
		})
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

// Vue.filter('formatDate', function(value) {
//   if (value) {
//     return
//   }
// })
