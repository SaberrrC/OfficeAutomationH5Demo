// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

//  import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = 'http://10.255.232.234/oa-api' //  TODO 测试时跨域设置，后期可以删除
axios.defaults.headers.common['token'] = window.localStorage.getItem('token') || ''
axios.defaults.headers.common['uid'] = window.localStorage.getItem('uid') || ''
/*
axios.defaults.transformRequest = [(data) => {
  return qs.stringify(data || {})
}]
*/
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('lanjie', response)
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error)
})
Vue.prototype.$ajax = axios
Vue.prototype.GLOBAL_ = {
  IMG_URL: 'http://118.31.18.67:96',
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
  wholeDaily: [{}],
  wholeWeekly: [{}],
}

Vue.use(iView)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://10.255.232.234/oa-api'

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
