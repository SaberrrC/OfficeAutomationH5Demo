import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

//  TODO 临时测试环境变量
const TEST_CONFIG = 'http://118.31.18.67:8084'

export default new Vuex.Store({
  state: {
    sidebar: {
      activeName: '',
      openName: '',
      list: []
    },
    contacts: {
      departments: []
    }
  },
  mutations: {
    updateSidebarActiveName (state, newValue) {
      state.sidebar.activeName = newValue
    },
    updateSidebarOpenName (state, newValue) {
      state.sidebar.openName = newValue
    },
    updateSidebarList (state, newValue) {
      state.sidebar.list = newValue
    },
    updateContacts (state, newValue) {
      state.contacts.departments = newValue
    }
  },
  actions: {
    updateSidebarActiveName (context, activeName) {
      context.commit('updateSidebarActiveName', activeName)
    },
    updateSidebarOpenName (context, openName) {
      context.commit('updateSidebarOpenName', openName)
    },
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
    queryContacts (context, departmentId = '1') {
      return axios.get(`${TEST_CONFIG}/organization/queryOrgAndUser`, {
        params: {
          token: '67713c352c5d4ae99e8fd7d498d092a51512442839196', //  TODO 临时测试
          uid: '1', //  TODO 临时测试
          orgId: departmentId
        }
      }).then(function (response) {
        if (response.data && response.data.length) {
          const data = response.data
          console.log(data)
          context.commit('updateContacts', data)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
})
