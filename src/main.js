import Vue from 'vue'
import App from './App.vue'
import router from './router'
import showdown from 'showdown'
import hljs from 'highlight.js';
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import VRuntimeTemplate from "v-runtime-template";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'highlight.js/styles/github.css'

Vue.use(showdown)
Vue.use(hljs)
Vue.use(VueResource)
Vue.use(VueMoment)
Vue.use(VRuntimeTemplate)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.directive('highlightjs', {
	deep: true,
	bind: function (el) {
		let targets = el.querySelectorAll('code')
		targets.forEach((target) => {
			hljs.highlightBlock(target)
		})
	},
	componentUpdated: function (el) {
		let targets = el.querySelectorAll('code')
		targets.forEach((target) => {
			hljs.highlightBlock(target)
		})
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
