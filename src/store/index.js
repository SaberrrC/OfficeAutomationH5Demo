import Vue from 'vue'
import Vuex from 'vuex'

import qs from 'qs'
import axios from 'axios'

axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = 'http://10.255.232.234/oa-api' //  TODO 测试时跨域设置，后期可以删除
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
              {name: '待评分', id: 'no_rate'},
              {name: '历史记录', id: 'history'},
              {name: '模板管理', id: 'template'}
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
      if (id === 'attend_admin') {
        const list = [
          {
            iconType: 'ios-timer-outline',
            name: '考勤管理',
            id: 'attend_admin',
            children: [
              {name: '我的考勤', id: 'work_attend'},
              {name: '假期查询', id: 'leave_query'}
            ]
          }
        ]
        context.commit('updateSidebarList', list)
      }
      //    会议管理
      if (id === 'meeting_admin') {
        const MeetList = [
          {
            iconType: 'easel',
            name: '会议管理',
            id: 'meeting_admin',
            children: [
              {name: '会议室预定', id: 'add'},
              {name: '我的会议', id: 'myMeeting'},
              {name: '会议纪要', id: 'meetSummary'},
              {name: '会议室设置', id: 'meetRoomEdit'}
            ]
          }
        ]
        context.commit('updateSidebarList', MeetList)
      }
//    审批流程
      if (id === 'process') {
        const ProcessList = [
          {
            iconType: 'compose',
            name: '审批流程',
            id: 'process',
            children: [
              {name: '发起申请', id: 'launchIndex'},
              {name: '我的申请', id: 'myLaunch'},
              {name: '待办事宜', id: 'todo'},
              {name: '已办事宜', id: 'haveTodo'}
            ]
          }
        ]
        context.commit('updateSidebarList', ProcessList)
      }
//     日志管理
      if (id === 'log_admin') {
        const LogList = [
          {
            iconType: 'ios-paper-outline',
            name: '日志管理',
            id: 'log_admin',
            children: [
              {name: 'WEB日志导出', id: 'webLogList'},
              {name: 'API日志导出', id: 'apiLogList'}
            ]
          }
        ]
        context.commit('updateSidebarList', LogList)
      }
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
