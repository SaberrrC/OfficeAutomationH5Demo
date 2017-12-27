// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import axios from 'axios'

Vue.prototype.$ajax = axios

Vue.use(iView)
Vue.config.productionTip = false

axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
//  axios.defaults.baseURL = 'http://118.31.18.67:8084' //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = 'http://10.255.232.234/oa-api'

//  TODO 临时全局变量
window.token = 'b5174bbd0e3140729084914bb2212bc8'
window.uid = '54368'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
