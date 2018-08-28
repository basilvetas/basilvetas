import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import postJson from '@/json/posts.json'

Vue.use(Router)

function getPostContent (route) {
  return {
    post: postJson.posts.filter(post => {
      return post.path === route.params.postPath
    })[0]
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/post/:postPath',
      name: ':postPath',
      component: () => import('./components/Post.vue'),
      props: getPostContent
    }
  ]
})
