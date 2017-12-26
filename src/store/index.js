import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);


//  TODO 临时测试环境变量
const TEST_CONFIG = 'http://118.31.18.67:8084';

export default new Vuex.Store({
  state: {
    sidebar: [],
    organization: [],
  },
  mutations: {
    updateSidebarList (state, newValue) {
      state.sidebar = newValue
    },
    updateOrganization (state, newValue) {
      state.organization = newValue
    }
  },
  actions: {
    //  获取二级菜单列表，参数为模块 id
    querySidebarList (context, id) {
      //  TODO mock data
      if (id === 'home') {
        context.commit('updateSidebarList', [
          {
            iconType: 'android-clipboard',
            name: '善林OA',
            id: 'home'
          }
        ])
      }
      if (id === 'work_report') {
        const list = [
          {
            iconType: 'android-clipboard',
            name: '工作汇报',
            id: 'work_report',
            children: [
              {name: '发起日报', id: 'daily'},
              {name: '发起周报', id: 'weekly'},
              {name: '我发起的', id: 'my_report'},
              {name: '待评分', id: 'waiting'}
            ]
          },
          {
            iconType: 'android-clipboard',
            name: '汇报管理',
            id: 'report_admin',
            children: [
              {name: '查看全员汇报', id: 'whole'},
              {name: '查看部门汇报', id: 'department'}
            ]
          }
        ]
        context.commit('updateSidebarList', list)
      }
      if (id === 'user_center') {
        context.commit('updateSidebarList', [
          {
            iconType: 'person',
            name: '个人中心',
            id: 'user_center',
            children: [
              {name: '个人中心', id: 'basic'},
              {name: '修改密码', id: 'password'},
              {name: '修改邮箱', id: 'email'}
            ]
          }
        ])
      }
      if (id === 'notice') {
        context.commit('updateSidebarList', [
          {
            iconType: 'ios-chatboxes-outline',
            name: '公告管理',
            id: 'notice',
            children: [
              {name: '接收列表', id: 'from'},
              {name: '发起列表', id: 'to'},
              {name: '部门公告', id: 'department'},
              {name: '公司公告', id: 'company'}
            ]
          }
        ])
      }
      if (id === 'news') {
        context.commit('updateSidebarList', [
          {
            iconType: 'ios-world-outline',
            name: '新闻管理',
            id: 'news_admin',
            children: [
              {name: '发布新闻', id: 'add'},
              {name: '新闻列表', id: 'all'}
            ]
          }
        ])
      }
    },
    queryOrganization (context, departmentId = '1') {
      return axios.get(`${TEST_CONFIG}/organization/queryOrgAndUser`, {
        params: {
          token: '67713c352c5d4ae99e8fd7d498d092a51512442839196', //  TODO 临时测试
          uid: '1', //  TODO 临时测试
          orgId: departmentId
        }
      }).then(function (response) {
        if (response.data) {
          const result = response.data.data
          context.commit('updateOrganization', result)
          return result
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
})
