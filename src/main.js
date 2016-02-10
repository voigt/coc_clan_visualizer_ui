import Vue from 'vue'
import App from './App'
import VueAsyncData from '../node_modules/vue-async-data/vue-async-data.js'
import Router from '../node_modules/vue-router/dist/vue-router.js'
import ClanView from './components/ClanView.vue'
import Member from './components/Member.vue'

Vue.use(VueAsyncData)
Vue.use(Router)

var router = new Router()

router.map({
  '/members': {
    component: ClanView
  },
  '/member/:name/trophies': {
    component: Member
  }
})

router.start(App, '#app')

// new Vue({
//   el: 'body',
//   components: {
//     app: App
//   }
// })
