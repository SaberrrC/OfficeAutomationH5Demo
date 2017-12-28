/* eslint-disable */
const actions = {
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
  },
  clearOther (context) {
    context.commit('clearOther')
  },
  thisNotDelete (context) {
    context.commit('thisNotDelete')
  },
  setthisNotDelete (context) {
    context.commit('setthisNotDelete')
  },
  userlist (context) {
    context.commit('userlist') // 获取所有用户
  },
  clearState (context) {
    context.commit('clearState')
  },
  clearToken (context) {
    context.commit('clearToken')
  },
  writeStructIsShow (context, is) { // 右侧栏写入框是否显示  默认为false    每次用户选择当前群组或聊天对象时才显示
    context.commit('writeStructIsShow', is)
  },
  updateListChatStatus (context, obj) { // 更新列表状态
    context.commit('updateListChatStatus', obj)
  },
  updateOtherInfo (context, obj) {
    context.commit('updateOtherInfo', obj)
  },
  defaultCount (context, array) {
    context.commit('defaultCount', array)
  },
  openChatBox (context, obj) { // 打开对话窗口 对方的账号或群ID
    context.commit('openChatBox', obj)
  },
  sendText (context, obj) { // 点击发送后 添加showTime字段 并在singChatbox列表展示
    context.commit('sendText', obj)
  },
  receiveText (context, obj) {
    context.commit('receiveText', obj)
  },
  TXList (context, array) { // 通讯列表数据
    context.commit('TXList', array)
  },
  TXGroup (context, array) { // 通讯列表数据
    context.commit('TXGroup', array)
  },
  TXRoom (context, array) { // 聊天室
    context.commit('TXRoom', array)
  },
  buildRoom (context, obj) { // 聊天室
    context.commit('buildRoom', obj)
  },
  async updateRoom (context, obj) { // 聊天室
    context.commit('updateRoom', obj)
  },
  destroyRoom ({commit}) { // 聊天室
    commit('destroyRoom')
  },
  showLeftMenu ({commit}, status) {
    commit('showLeftMenu', status)
  },
  showLoading ({commit}, status) {
    commit('showLoading', status)
  },
  setMenus ({commit}, menus) {
    commit('setMenus', menus)
  },
  setRules ({commit}, rules) {
    commit('setRules', rules)
  },
  setUsers ({commit}, users) {
    commit('setUsers', users)
  },
  setImg ({commit}, src) {
	 commit('setImg', src)
  },
  setUserGroups ({commit}, userGroups) {
    commit('setUserGroups', userGroups)
  },
  setOrganizes ({commit}, organizes) {
    commit('setOrganizes', organizes)
  },
  logOut ({commit}) {
    commit('logOut')
  },
  setSsid ({commit}, ssid) {
	 commit('setSsid', ssid)
  },
  currentChatObj ({commit}, data) {
    commit('currentChatObj', data)
  }
}

export default actions
