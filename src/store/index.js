import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

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
    querySidebarList (context, id) {
      /*
      axios.get('/sidebar', {
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
    }
  }
})
