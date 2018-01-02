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
Vue.prototype.GLOBAL_ = {
  IMG_URL: 'http://118.31.18.67:96',
  USER_NAME: '',
  FORMAT_TIME: function (val) {
    let date = val ? new Date(val) : new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  },
  USER_INFO: function () {
    axios({
      method: 'get',
      url: '/oa-web/user/getUserInfoById',
      headers: {
        token: '73bd4ae0e7f54219aea15e6183d3ed1a',
        uid: '960'
      },
      params: {
        uid: '960'
      }
    }).then((res) => {
      if (res.data.code === '000000') {
        this.USER_NAME = res.data.data.username
      } else {
        this.$Message.error(res.data.message)
      }
    }, (res) => {})
  }
}

Vue.use(iView)
Vue.config.productionTip = false

axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
//  axios.defaults.baseURL = 'http://118.31.18.67:8084' //  TODO 测试时跨域设置，后期可以删除
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
