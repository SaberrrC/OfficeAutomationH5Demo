// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import Lockr from 'lockr'
import config from './config/index.js'

//  import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = config.OA_API
axios.defaults.headers.common['token'] = window.localStorage.getItem('token') || ''
axios.defaults.headers.common['uid'] = window.localStorage.getItem('uid') || ''
/*
axios.defaults.transformRequest = [(data) => {
  return qs.stringify(data || {})
}]
*/
Vue.prototype.$ajax = axios
Vue.prototype.GLOBAL_ = {
  IMG_URL: 'http://10.255.232.234:96',
  FORMAT_TIME: function (val) {
    let date = val ? new Date(val) : new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  },
  //  全员和部门都使用同一份数据
  wholeList: [{}],
  currentIndex: 0
}

Vue.use(iView)
Vue.config.productionTip = false

window.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
