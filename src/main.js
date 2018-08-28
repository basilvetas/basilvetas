import Vue from 'vue'
import App from './App.vue'
import router from './router'
import showdown from 'showdown'
import hljs from 'highlight.js'
import firebase from 'firebase'
import VueAnalytics from 'vue-analytics'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import VRuntimeTemplate from "v-runtime-template"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'highlight.js/styles/github.css'
import fbConfig from '@/json/fb-config.json'
import gaConfig from '@/json/ga-config.json'

firebase.initializeApp(fbConfig);

Vue.use(showdown)
Vue.use(hljs)
Vue.use(VueResource)
Vue.use(VueMoment)
Vue.use(VRuntimeTemplate)
Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
  id: gaConfig.key,
  checkDuplicatedScript: true,
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: document.title,
        location: window.location.href
      }
    }
  }
})

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
