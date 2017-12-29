import Vue from 'vue'
import Vuex from 'vuex'

import qs from 'qs'
import axios from 'axios'

axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = '//10.255.232.234/oa-api ' //  TODO 测试时跨域设置，后期可以删除
axios.defaults.headers.common['token'] = window.localStorage.getItem('token') || ''
axios.defaults.headers.common['uid'] = window.localStorage.getItem('uid') || ''
axios.defaults.transformRequest = [(data) => {
  return qs.stringify(data || {})
}]

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    sidebar: [],
    organization: []
  },
  mutations: {
    queryUserInfo (state, newValue) {
      state.userInfo = newValue
    },
    updateSidebarList (state, newValue) {
      state.sidebar = newValue
    },
    updateOrganization (state, newValue) {
      state.organization = newValue
    }
  },
  actions: {
    //  获取当前用户信息
    queryUserInfo (context) {
      return axios.get('/user/getUserInfoById').then((response) => {
        if (response.data && response.data.code === '000000') {
          const result = response.data.data
          context.commit('queryUserInfo', result)
          return result
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //  获取二级菜单列表，参数为模块 id
    querySidebarList (context, id) {
      //  TODO mock data
      if (id === 'home') {
        context.commit('updateSidebarList', [
          {
            iconType: 'home',
            name: '善林OA',
            id: 'home'
          }
        ])
      }
      return axios.get('/auth/queryRightByPid', {
        params: {
          rightId: id
        }
      }).then((response) => {
        if (response.data && response.data.code === '000000') {
          const result = response.data.data
          context.commit('updateSidebarList', result)
          return result
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    queryOrganization (context, departmentId = '1') {
      return axios.get('/organization/queryOrgAndUser', {
        params: {
          orgId: departmentId
        }
      }).then((response) => {
        if (response.data && response.data.code === '000000') {
          const result = response.data.data
          context.commit('updateOrganization', result)
          return result
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})

export default store
