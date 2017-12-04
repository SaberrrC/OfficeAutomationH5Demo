import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: {
      activeName: '',
      openName: '',
      list: []
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
    }
  }
})
