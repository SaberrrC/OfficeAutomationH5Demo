import state from './state'
import store from './store'
import chat from '../module/chatting'

const mutations = {
  queryUserInfo (state, newValue) {
    state.userInfo = newValue
  },
  updateSidebarList (state, newValue) {
    if (newValue[0].id === 11) {
      newValue[0].children = newValue[0].children.slice(0, 2)
    }
    state.sidebar = newValue
  },
  updateOrganization (state, newValue) {
    state.organization = newValue
  },
  clearOther (state) {
    state.other = ''
  },
  clearState (state) {
    state.userInfoDb = {}
    state.TXGroup = []
    state.userinfo = {}
    state.list = []
    state.grossNumber = 0
    state.singChatbox = {}
    state.singChatlist = []
    state.imUser.userName = ''
    state.other = ''
    state.otherInfo = {}
    state.has = 0
    state.writeStructIsShow = false
  },
  writeStructIsShow (state, is) {
    // console.log(state)
    // console.log(is)
    state.writeStructIsShow = is
  },
  updateListChatStatus (state, obj) { // 更新列表对象状态
    let index = obj.index
    state.personnelistIndex = index
    let tmp = state.list
    state.list = []
    state.list = tmp
  },
  updateMessageNumber (state, sId) {
    // console.log('1111111111', sId)
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].sId === sId) {
        if (typeof state.list[i].count === 'number') {
          // console.log(list[i].count)
          state.grossNumber = state.grossNumber - state.list[i].count
          state.list[i].count = 0
        } else {}
      }
    }
  },
  updateOtherInfo (state, obj) {
    state.otherInfo = Object.assign({}, obj)
  },
  unshiftList (state, obj) {
    let str = false
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].sId && state.other && (state.list[i].sId === state.other)) {
        state.list.splice(i, 1)
        str = false
        break
      } else {
        str = false
      }
    }
    if (str) {} else {
      state.list.unshift(Object.assign({}, obj))
      //   state.list.unshift(Object.assign(obj, {
      //   to: state.other,
      //   picUrl: state.image
      // }))
    }
  },
  openChatBox (state, obj) { // 打开聊天对话框
    let hasObject = obj.index >= 0 ? obj.index >= 0 : false // 是否列表对象
    let item = obj.item

    // console.log(['打开聊天对话框', item])
    // 更新聊天对象的信息
    let sId = item.sId ? item.sId : item.roomId ? 'R_' + item.roomId : item.groupId ? 'G_' + item.groupId : item.code ? 'SL_' + item.code : 'SL_' + item.CODE
    let type = typeof (item.type) === 'string' ? item.type : item.roomId ? 'chatroom' : item.groupId ? 'chatgroup' : 'chat'
    if (item.sId) {
      if (item.sId.substr(0, 2) === 'R_') {
        type = 'chatroom'
      }
      if (item.sId.substr(0, 2) === 'G_') {
        type = 'chatgroup'
      }
    }

    if (!sId && item.affiliation) {
      sId = 'SL_' + item.code
    }
    // console.log(['打开聊天对话框', sId, type, hasObject])
    state.other = sId
    if (!state.singChatbox[sId]) {
      state.singChatbox[sId] = {
        value: []
      }
    }
    // console.log('222', item.code)
    mutations.updateMessageNumber(state, sId)
    if (type === 'chat') {
      let code = item.CODE || item.code
      if (code || (item.sId && item.sId.substr(0, 3) === 'SL_')) {
        let id = code || sId.substring(3)
        chat.setUserInfo(id, function () {
          // console.log('设置用户信息', id, state.userInfoDb[id])
          let o = state.userInfoDb[id]
          mutations.updateOtherInfo(state, o)
          if (hasObject) { // 选中列表对象
            mutations.updateListChatStatus(state, obj)
          } else {
            mutations.unshiftList(state, {
              count: o.count ? o.count : 0,
              from: 'SL_' + o.code,
              img: o.img,
              sId: 'SL_' + o.code,
              to: 'SL_' + state.userinfo.code,
              name: o.username,
              time: o.time ? o.time : null,
              type: 'chat',
              value: typeof (o.value) === 'string' ? o.value : ''
            })
          }
        })
      }
    }
    // console.log('ddddddddd', type)
    if (type === 'chatroom') {
      // console.log('111111111111111')
      let roomId = sId.substring(2)
      let o = state.TXRoom.filter((item) => {
        return item.roomId === roomId
      })[0]
      // console.log('22222', o)
      mutations.updateOtherInfo(state, o)
      if (hasObject) { // 选中列表对象
        mutations.updateListChatStatus(state, obj)
      } else {
        mutations.unshiftList(state, Object.assign(item, {
          count: o.count ? o.count : 0,
          to: roomId,
          sId: sId,
          type: 'chatroom',
          time: o.time ? o.time : null,
          value: typeof (o.value) === 'string' ? o.value : ''
        }))
      }
    }
    if (type === 'chatgroup') {
      let groupId = sId.substring(2)
      let o = state.TXGroup.filter((item) => {
        return item.groupId === groupId
      })[0]
      mutations.updateOtherInfo(state, o)
      if (hasObject) { // 选中列表对象
        mutations.updateListChatStatus(state, obj)
      } else {
        mutations.unshiftList(state, Object.assign(item, {
          count: o.count ? o.count : 0,
          to: groupId,
          sId: sId,
          type: 'chatgroup',
          time: o.time ? o.time : null,
          value: typeof (o.value) === 'string' ? o.value : ''
        }))
      }
    }
    store.state.showSid = sId
    state.writeStructIsShow = true
    state.singChatlist = state.singChatbox[sId].value !== undefined ? state.singChatbox[sId].value : []
  },
  sendText (state, obj) {
    if (state.singChatbox[state.other]) {} else {
      state.singChatbox[state.other] = {
        value: []
      }
    }
    state.singChatbox[state.other]['value'].push(obj)
    if (state.singChatbox[state.other]['value'].length <= 1) {
      // console.log(0)
      obj['showTime'] = mutations.timeFormat(obj.time)
    } else {
      let time = state.singChatbox[state.other]['value'][state.singChatbox[state.other]['value'].length - 1].time - state.singChatbox[state.other]['value'][state.singChatbox[state.other]['value'].length - 2].time
      if ((time / 60).toFixed(0) >= 2) {
        obj['showTime'] = mutations.timeFormat(obj.time)
      } else {
        obj['showTime'] = ''
      }
    }
    var b = state.singChatbox
    state.singChatbox = {}
    state.singChatbox = b
    state.singChatlist = (state.singChatbox[state.other].value ? state.singChatbox[state.other].value : []) // ���� other�����ֲ��Ҷ�Ӧ��ֵ ��ֵ��singChatlist  Ϊ�˽������ͬһ�ڴ��ַ��ˢ������
  },
  receiveText (state, obj) {
    // console.log(['收到消息结构', obj])
    let sId = obj.sId
    if (state.singChatbox && state.singChatbox[sId]) {} else {
      state.singChatbox[sId] = {value: []}
    }
    // console.log([sId, obj])
    state.singChatbox[sId]['value'].push(obj)
    // console.log(state.singChatbox, sId)
    let tmp = state.singChatbox[sId]['value']
    if (tmp.length <= 1) {
      obj['showTime'] = mutations.timeFormat(obj.time)
    } else {
      // let time = tmp[0].time - tmp[1].time
      let time = tmp[tmp.length - 1].time - tmp[tmp.length - 2].time
      if ((time / 60).toFixed(0) >= 2) {
        obj['showTime'] = mutations.timeFormat(obj.time)
      } else {
        obj['showTime'] = ''
      }
    }
    // console.log('收到消息结构123')
    let b = state.singChatbox
    state.singChatbox = {}
    state.singChatbox = b
    if (state.other !== sId) {
      mutations.unshiftList2(state, obj) // 置顶新消息
      state.grossNumber += 1
    }
  },
  TXList (state, array) { // 用户列表
    state.TXListState = array
  },
  TXGroup (state, array) { // 组
    state.TXGroup = array
  },
  TXRoom (state, array) { // 聊天室
    state.TXRoom = array
  },
  buildRoom (state, obj) {
    state.TXRoom.push(obj)
    setTimeout(() => {
      store.dispatch('updateRoom', obj)
    }, 0)
  },
  async updateRoom (state, obj) {
    for (let i = 0; i < state.TXRoom.length; i++) {
      let members = state.TXRoom[i].members
      let awaitData = await chat.queryRoomMember(state.TXRoom[i].roomId)
      let rData = members.concat(awaitData)
      let tmp = rData.map(function (obj) {
        let rObj = obj
        if (obj.affiliation === 'member') {
          rObj.id = obj.jid.split('_')[2].split('@')[0]
        } else {
          rObj.id = obj.jid.replace('sl_', '').replace('@easemob.com', '')
        }
        return rObj
      })
      state.TXRoom[i].members = tmp
    }
  },
  destroyRoom () {
    state.TXRoom = []
  },
  unshiftList2 (state, obj) { // 新消息对象置顶
    // console.log(['处理提示', obj])
    let str = false
    // let sId = obj.sId
    let aa = {}
    // for (var i = 0; i < state.list.length; i++) {
    //   // console.log([state.list[i].from,state.list[i].to, state.list[i].roomId, obj.from, obj.to])
    // }
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].sId === obj.sId) {
        aa = state.list[i]
        state.list.splice(i, 1)
        str = false
        break
      } else {
        str = false
      }
    }
    // console.log(['消息类型', aa, obj])
    if (str) {} else {
      state.list.unshift(Object.assign(aa, obj, {
        to: obj.to,
        picUrl: state.image
      }))
    }
    mutations.computedNumber(state, obj)
  },
  computedNumber (state, obj) {
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].sId === obj.sId) {
        if (typeof state.list[i].count === 'number') {
          state.list[i].count += 1
        } else {
          state.list[i].count = 1
        }
      }
    }
  },
  defaultCount (state, array) {
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i].sId === array[0].sId) {
        if (typeof state.list[i].count === 'number') {
          // console.log(list[i].count)
          state.grossNumber = state.grossNumber - state.list[i].count
          state.list[i].count = 0
        } else {}
      }
    }
  },
  timeFormat (time) {
    var newDate = new Date()
    newDate.setTime(time * 1000)
    return newDate.toLocaleTimeString('chinese', {
      hour12: false
    })
  },
  setUsers (state, users) {
    state.imUser.userName = 'SL_' + users.code
    state.userinfo = users
  },
  currentChatObj (state, data) {
    state.currentChatObj = data
  }
}

export default mutations
