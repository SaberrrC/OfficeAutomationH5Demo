import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarList: []
  },
  mutations: {
    updateSidebarList (state, newValue) {
      state.sidebarList = newValue
    }
  },
  actions: {
    //  获取二级菜单列表，参数为模块 id
    querySidebarList (context, id) {
      /*
      $ajax.get('/sidebar', {
        params: {
          id
        }
      }).then(function (response) {
        if (response.data && response.data.length) {
          context.commit('updateSidebarList', response.data)
        }
      }).catch(function (err) {
        console.log(err)
      })
      */
      //  TODO mock data
      if (id === 'home') {
        context.commit('updateSidebarList', [])
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
    }
  }
})
