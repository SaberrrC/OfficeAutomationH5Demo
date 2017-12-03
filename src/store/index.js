import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigationList: [],
    shortcutList: [],
    sidebarList: []
  },
  mutations: {
    updateNavigationList (state, newValue) {
      state.navigationList = newValue
    },
    updateShortcutList (state, newValue) {
      state.shortcutList = newValue
    },
    updateSidebarList (state, newValue) {
      state.sidebarList = newValue
    }
  },
  actions: {
    queryNavigationList (context, userId) {
      /*
      axios.get('/nav', {
        params: {
          id
        }
      }).then(function (response) {
        if (response.data && response.data.length) {
          context.commit('updateNavigationList', response.data)
        }
      }).catch(function (err) {
        console.log(err)
      })
      */
      //  TODO mock data
      console.log('From "/store/index.js": ', 'Current user is ', userId)
      context.commit('updateNavigationList', [
        {iconType: 'android-clipboard', name: '工作汇报', id: 'work_report', isShow: 1},
        {iconType: 'compose', name: '审批流程', id: 'process', isShow: 1},
        {iconType: 'easel', name: '会议管理', id: 'meeting_admin', isShow: 1},
        {iconType: 'ios-chatboxes-outline', name: '公告管理', id: 'notice', isShow: 0},
        {iconType: 'ios-world-outline', name: '新闻管理', id: 'news_admin', isShow: 0},
        {iconType: 'ios-timer-outline', name: '考勤管理', id: 'attend_admin', isShow: 0},
        {iconType: 'ios-paper-outline', name: '日志管理', id: 'log_admin', isShow: 0}
      ])
    },
    queryShortcutList (context) {
      //  TODO mock data
      context.commit('updateShortcutList', [
        {
          iconType: 'ios-plus',
          name: '发起',
          id: 'launch',
          children: [
            {name: '写日报', id: 'work_report/daily'},
            {name: '写周报', id: 'work_report/weekly'},
            {name: '会议室预定', id: 'meeting_admin/book'},
            {name: '填申请单', id: 'process/apply'}
          ]
        },
        {
          iconType: 'ios-help',
          name: '帮助',
          id: 'help',
          children: [
            {name: '帮助中心', id: 'https://www.baidu.com/'},
            {name: '官方qq群', id: 'https://www.iviewui.com/'},
            {name: '反馈', id: 'feedback'}
          ]
        },
        {
          iconType: 'person',
          name: '我的',
          id: 'personal',
          children: [
            {name: '个人中心', id: 'user_center'},
            {name: '退出', id: 'logout'}
          ]
        }
      ])
    },
    querySidebarList (context, id) {
      //  TODO mock data
      if (id === 'home') {
        context.commit('updateSidebarList', [])
      }
      if (id === 'work_report') {
        context.commit('updateSidebarList', [])
      }
    }
  }
})
