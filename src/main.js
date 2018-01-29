// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/font-icons/iconfont.css'
//  import Lockr from 'lockr'
import config from './config/index.js'

//  import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = config.OA_API
axios.defaults.headers.common['token'] = window.localStorage.getItem('token') || ''
axios.defaults.headers.common['uid'] = window.localStorage.getItem('uid') || ''
axios.defaults.headers.common['X-Source'] = 'pc'
window.axios = axios
/*
axios.defaults.transformRequest = [(data) => {
  return qs.stringify(data || {})
}]
*/

//  添加请求拦截器
axios.interceptors.request.use(function (config) {
  //  在发送请求之前做些什么
  //  console.log(config.headers.token)
  if (~location.hash.indexOf('login?redirect')) {
    //  登陆页,直接通过
    return config
  } else {
    //  其他页面，判断token存不存在
    //  alert('前: ' + JSON.stringify(localStorage))
    if (!localStorage.token) {
      location.hash = '/login?redirect=/home'
      localStorage.clear()
    } else {
      return config
    }
  }
}, function (error) {
  //  对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  if (error.toString() === 'Error: Request failed with status code 401') {
    //  token失效
    //  window.localStorage.removeItem('token')
    //  window.localStorage.removeItem('uid')
    if (localStorage.cango) {
      //  存在，则说明不是登录，那就跳出
      //  localStorage.removeItem('cango')
      location.hash = '/login?redirect=/home'
      localStorage.clear()
      window.location.reload()
    } else {
      //  登录状态下 不进行拦截
    }
  }
  return Promise.reject(error)
})

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
