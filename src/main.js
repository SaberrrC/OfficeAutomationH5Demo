// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Lockr from 'lockr'

import qs from 'qs'
import axios from 'axios'

axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = 'http://118.31.18.67:8084' //  TODO 测试时跨域设置，后期可以删除
axios.defaults.headers.common['token'] = window.localStorage.getItem('token') || ''
axios.defaults.headers.common['uid'] = window.localStorage.getItem('uid') || ''
axios.defaults.transformRequest = [(data) => {
  return qs.stringify(data || {})
}]
Vue.prototype.$ajax = axios

window.axios = axios
window.Lockr = Lockr

Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
