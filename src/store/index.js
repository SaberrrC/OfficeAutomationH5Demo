import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
axios.defaults.withCredentials = true //  TODO 测试时跨域设置，后期可以删除
axios.defaults.baseURL = 'http://10.255.232.234/oa-api' //  TODO 测试时跨域设置，后期可以删除

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: [],
    organization: [],
    showMemberSelector: false
  },
  mutations: {
    updateSidebarList (state, newValue) {
      state.sidebar = newValue
    },
    updateOrganization (state, newValue) {
      state.organization = newValue
    },
    changeMemberSelector (state, newValue) {
      state.showMemberSelector = newValue
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
              {name: '待办事宜', id: 'toDo'},
              {name: '已办事宜', id: 'haveToDo'}
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
          token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
          uid: '84', //  TODO 临时测试
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
    },
    changeMemberSelector (context, isShow) {
      context.commit('changeMemberSelector', isShow)
    }
  }
})
