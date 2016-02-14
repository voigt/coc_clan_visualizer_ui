import Vue from 'vue'
import App from './App'
import Router from '../node_modules/vue-router/dist/vue-router.js'
import Chartist from '../node_modules/chartist/dist/chartist.min.js'
import ChartistVue from '../node_modules/chartist-vuejs/index.js'
import ClanView from './components/ClanView.vue'
import Member from './components/Member.vue'

Vue.use(Router)
Vue.use(ChartistVue)

var router = new Router()

var Bar = Vue.extend({
  template: '<p>This is bar!</p>'
})

router.map({
  '/clan': {
    component: ClanView
  },
  '/member/:name/trophies': {
    component: Member
  },
  '/bar': {
    component: Bar
  }
})

router.redirect({
  '*': '/clan'
})

router.start(App, '#app')
