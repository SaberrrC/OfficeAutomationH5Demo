const actions = {
  // 获取当前用户信息
  queryUserInfo (context) {
    return window.axios.get('/user/getUserInfoById').then((response) => {
      if (response.data && response.data.code === '000000') {
        const result = response.data.data
        context.commit('queryUserInfo', result)
        return result
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  // 获取二级菜单列表，参数为模块 id
  querySidebarList (context, id) {
    //  TODO mock data
    if (id === '0') {
      context.commit('updateSidebarList', [
        {
          iconType: 'home',
          name: '善林OA',
          id: '0',
          url: 'home'
        }
      ])
    }
    /*if (id === '2') {
      const list = [
        {
          iconType: 'android-clipboard',
          name: '工作汇报',
          id: '2',
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
    }*/
    /*
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
    */
    //  根据一级菜单id获取二级菜单
    return window.axios.get('/auth/queryRightByPid', {
      params: {
        rightId: id
      }
    }).then((response) => {
      if (response.data && response.data.code === '000000') {
        console.log(response.data)
        const result = response.data.data
        context.commit('updateSidebarList', result)
        return result
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  queryOrganization (context, departmentId = '1') {
    return window.axios.get('/organization/queryOrgAndUser', {
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
  clearState (context) {
    context.commit('clearState')
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
  // 群组列表数据
  TXGroup (context, array) {
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
  destroyRoom (context) { // 聊天室
    context.commit('destroyRoom')
  },
  setUsers (context, users) {
    context.commit('setUsers', users)
  },
  currentChatObj (context, data) {
    context.commit('currentChatObj', data)
  }
}

export default actions
