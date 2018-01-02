/* eslint-disable */
import Vue from 'vue'
import localforage from 'localforage'
import store from '../vuex/store'
// import {Base64} from 'js-base64'
// import {debug} from 'util'
// let aes256 = require('aes256')
// let CryptoJS = require('../assets/js/aes_1')
import config from '../config/index'

const chat = {
  queryRoomMember (roomId) { // 取聊天室成员
    // console.log('查找Room' + roomId)
    return new Promise(function (resolve, reject) {
      Vue.prototype.$conn.queryRoomMember({
        roomId: roomId,
        success: function (e) {
          // console.log(['找到Room' + roomId + '成员', e])
          setTimeout(function () {
            resolve(e)
          }, 0)
        }
      })
    })
  },
  queryUserInfo (id) { // 直接实时查询用户信息
    if (!id) {
      return
    }
    id = id.replace('sl_', '').replace('SL_', '')
    return new Promise(function (resolve, reject) {
      // console.log('查找用户信息' + id)
      try {
        window.axios.get(
          config.OA_URL + 'user/getinfo', {
            params: {
              code: id
            },
            headers: {
              token: store.state.userinfo.token,
              uid: store.state.userinfo.uid
            }
          }
        ).then(response => {
          // 需要一个0错误的处理
          let tmp = response.data.data[0]
          let imgUri = tmp.img
          let defaultImgUri = 'data:image/jpeg;base64,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'
          if (tmp.img === '' || tmp.img === 'http://' || !tmp.img) {
            imgUri = defaultImgUri
          } else {
            imgUri = 'http://' + tmp.img
          }
          // console.log(['取到地址', imgUri])
          let rData = {
            code: tmp.code,
            email: tmp.email,
            img: imgUri,
            isleader: tmp.isleader,
            oid: tmp.oid,
            departmentName: tmp.organ,
            phone: tmp.phone,
            postname: tmp.postname,
            sex: tmp.sex,
            token: tmp.token,
            uid: tmp.uid,
            username: tmp.username
          }
          // console.log(['信息汇总', tmp, rData])
          if (store.state.userInfoDb[id]) {
            store.state.userInfoDb[id] = Object.assign({}, rData)
          } else {
            store.state.userInfoDb[id] = rData
          }
          setTimeout(function () {
            resolve(rData)
          }, 0)
        })
      } catch (error) {
        console.log('error', error)
        reject(error)
      }
    })
  },
  setUserInfo (code, fn) { // 取聊天室成员
    if (!code) {
      return
    }
    let storage = window.localStorage
    if (!store.state.userInfoDb || !store.state.userInfoDb[code] || !store.state.userInfoDb[code].img) {
      // console.log(['预处理发信人信息'])
      chat.queryUserInfo(code).then(function () {
        console.log(['发信人信息1', store.state.userInfoDb[code]])
        localforage.setItem('cacheUser', store.state.userInfoDb)
        fn && fn()
      }),
      function (reason, data) {
        console.log(['获取用户信息出错，重新获取', reason, data])
        window.axios.get(config.OA_URL + 'user/getinfo', {
          params: {
            code: code
          },
          headers: {
            token: store.state.userinfo.token,
            uid: store.state.userinfo.uid
          }
        }).then(response => {
          console.log(['发信人信息2', store.state.userInfoDb[code]])
          fn && fn()
        })
      }
    } else {
      // console.log(['预处理发信人信息', store.state.userInfoDb])
      localforage.setItem('cacheUser', store.state.userInfoDb)
      fn && fn()
    }
  },
  initCurrentUserInfo (uid) { // 初始化当前登录用户
    return new Promise(function (resolve, reject) {
      try {
        axios.get(config.OA_API + '/user/getUserInfoById').then((response) => {
          if (response.data && response.data.code === '000000') {
            const result = response.data.data
            let tmp = Object.assign({}, result, {
              departmentName: result.organ,
              name: result.username,
              img: result.portrait ? result.portrait : store.state.image
            })
            console.log(tmp)
            store.dispatch('setUsers', tmp)
            let id = result.code
            if (store.state.userInfoDb && store.state.userInfoDb[id]) {
              store.state.userInfoDb[id] = Object.assign({}, store.state.userInfoDb[id], tmp)
            } else {
              store.state.userInfoDb[id] = tmp
            }
            setTimeout(function () {
              resolve(tmp)
            }, 0)
          }
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  queryOrganization (id) { // 组织架构
    return new Promise(function (resolve, reject) {
      try {
        let departmentId = id || 1
        window.axios.get(config.OA_API + '/organization/queryOrgAndUser', {
          params: {
            orgId: departmentId
          }
        }).then((response) => {
          if (response.data && response.data.code === '000000') {
            const result = response.data.data
            console.log('queryOrganization', result, result.children, result.users)
            resolve(result)
          }
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  userSearch (name) { // 搜索用户
    return new Promise(function (resolve, reject) {
      try {
        axios.post(config.OA_API + '/phoneBook/searchPhoneBook', {name: name}).then((response) => {
          if (response.data && response.data.code === '000000') {
            const result = response.data.data
            setTimeout(function () {
              resolve(result)
            }, 0)
          }
          if (response.data && response.data.code === '020000') {
            setTimeout(function () {
              resolve([])
            }, 0)
          }
          console.log('searchPhoneBook', response)
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  getUserInfo (code) { // 取用户信息并缓存，返回用户对象
    if (!code) {
      return
    }
    return new Promise(function (resolve, reject) {
      try {
        if (!store.state.userInfoDb || !store.state.userInfoDb[code] || !store.state.userInfoDb[code].img) {
          // console.log(['预处理发信人信息'])
          chat.queryUserInfo(code).then(function () {
            console.log(['发信人信息1', store.state.userInfoDb[code]])
            localforage.setItem('cacheUser', store.state.userInfoDb)
            setTimeout(function () {
              resolve(store.state.userInfoDb[code])
            }, 0)
          }), function (reason, data) {
            console.log(['获取用户信息出错，重新获取', reason, data])
            window.axios.get(config.OA_API + 'user/getinfo', {
              params: {
                code: code
              },
              headers: {
                token: store.state.userinfo.token,
                uid: store.state.userinfo.uid
              }
            }).then(response => {
              console.log(['发信人信息2', store.state.userInfoDb[code]])
              setTimeout(function () {
                resolve(store.state.userInfoDb[code])
              }, 0)
            })
          }
        } else {
          // console.log(['预处理发信人信息', store.state.userInfoDb])
          localforage.setItem('cacheUser', store.state.userInfoDb)
          setTimeout(function () {
            resolve(store.state.userInfoDb[code])
          }, 0)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  createGroup (obj, fn) { // 创建群组
    let conn = Vue.prototype.$conn
    let showMsg = Vue.prototype.$message
    let name = obj.name.replace(/&nbsp;/g, ' ')
    if (name === '' || !name || name.trim() === '') {
      showMsg({
        message: '群组名不能为空！',
        type: 'warning'
      })
      return
    }
    return new Promise(function (resolve, reject) {
      try {
        let options = {
          data: {
            groupname: name,
            desc: '群组',
            members: [],
            public: false, // 允许任何人加入
            approval: false, // 加入需审批
            allowinvites: true
          },
          success: function (respData) {
            console.log(respData, respData.data.groupid)
            let groupid = respData.data.groupid
            showMsg({
              message: '群组' + name + '创建成功',
              type: 'success'
            })
            chat.updateGroup(respData.data.groupid, 'add')
            console.log('11111')
            
            if (obj.members && obj.members.length >= 1) {
              let id = respData.data.groupid
              let mbs = obj.members
              console.log('群组成员' + mbs)
              chat.addGroupMembers(id, mbs).then(function () {
                fn && fn(groupid)
              })
            } else {
              setTimeout(() => {
                fn && fn(groupid)
              }, 0)
            }
            resolve(groupid)
            //debugger
            // fn && fn(groupid)
            // 需要一个刷新列表机制
          },
          error: function (e) {
            console.log('Error', e)
            reject(error)
          }
        }
        conn.createGroupNew(options)
      } catch (error) {
        reject(error)
      }
    })
  },
  addGroupMembers (id, members, types) { // 不需要用户确认直接加入
    if (!id || id === '' || !members || members === [] || members.length <= 0) {
      return
    }
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let option = {
          list: members,
          roomId: id,
          types:types,
          success: function (x) {
            console.log('Add succeed!', x)
            resolve(x)
          },
          error: function (error) {
            console.log(error)
            reject(error)
          }
        }
        conn.addGroupMembers(option)
      } catch (error) {
        reject(error)
      }
    })
  },
  queryGroupInfo (id) { // 直接实时查询群组信息
    if (!id) {
      return
    }
    return new Promise(function (resolve, reject) {
      let conn = Vue.prototype.$conn
      let options = {
        groupId: id,
        success: function (resp) {
          console.log('queryGroupInfo: ', resp)
          resolve(resp)
        },
        error: function (E) {
          reject(E)
        }
      }
      conn.getGroupInfo(options)
    })
  },
  fatchGroupInfo (id) { // 取群组信息并缓存，更新
    if (!id) {
      return
    }
    return new Promise(function (resolve, reject) {
      try {
        let o = store.state.TXGroup.filter((item) => {return item.groupid === id})[0]
        if (o) {
          resolve(o)
        } else {
          let conn = Vue.prototype.$conn
          console.log('获取单个群的信息', id)
          conn.getGroupInfo({
            groupId: id,
            success: function (x) {
              console.log('获取单个群的信息1', x)
              let tmp = Object.assign({}, x.data[0], {
                groupId: id,
                groupid: id,
                groupname: x.data[0].name
              })
              console.log('获取单个群的信息2', tmp)
              store.state.TXGroup.push(tmp)
              let groupLength = store.state.TXGroup.length
              chat.getGroupInfo(store.state.TXGroup[groupLength - 1], true) // 同时补全用户信息
              resolve(store.state.TXGroup[groupLength - 1])
            },
            error: function (e) {
              reject('Error, getGroupInfo', e)
            }
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  quitGroup (id) { // 退出群组
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let options = {
          groupId: id,
          success: function (x) {
            console.log('You leave group succeed!', x)
            resolve(x)
          },
          error: function (code, msg) {
            console.log('leaveGroup:' + code + ' ' + msg)
            reject(error)
          }
        }
        conn.quitGroup(options)
      } catch (error) {
        reject(error)
      }
    })
  },
  inviteToGroup (id, userArr) { // 发送邀请，需要用户确认才能加入
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let options = {
          groupId: id,
          users: userArr,
          success: function (x) {
            console.log('Invite succeed!', x)
            resolve(x)
          },
          error: function (error) {
            console.log(error)
            reject(error)
          }
        }
        conn.inviteToGroup(options)
      } catch (error) {
        reject(error)
      }
    })
  },
  removeSingleGroupMember (id, username) { // 移除单个群成员
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let options = {
          groupId: id,
          username: username,
          success: function (x) {
            console.log(`Remove ${username} succeed!`)
            resolve(x)
            // var members = this.state.members
            // delete members[i]
            // this.setState({
            //   members: members
            // })
          },
          error: function (error) {
            console.log('error', error.data)
            reject(error)
          }
        }
        conn.removeSingleGroupMember(options)
      } catch (error) {
        reject(error)
      }
    })
  },
  removeMultiGroupMember (id, users) { // 删除多个群成员
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let options = {
          groupId: id,
          users: users,
          success: function (x) {
            console.log(`Remove ${users} succeed!`)
            resolve(x)
            // var members = this.state.members
            // delete members[i]
            // this.setState({
            //   members: members
            // })
          },
          error: function (error) {
            console.log('error', error.data)
            reject(error)
          }
        }
        conn.removeSingleGroupMember(options)
      } catch (error) {
        reject(error)
      }
    })
   },
  ReCont (strCont) {
    let emotion = [
      { name: 'ee_1.png', text: '[):]' },
      { name: 'ee_2.png', text: '[:D]' },
      { name: 'ee_3.png', text: '[;)]' },
      { name: 'ee_4.png', text: '[:-o]' },
      { name: 'ee_5.png', text: '[:p]' },
      { name: 'ee_6.png', text: '[(H)]' },
      { name: 'ee_7.png', text: '[:@]' },
      { name: 'ee_8.png', text: '[:s]' },
      { name: 'ee_9.png', text: '[<o)]' },
      { name: 'ee_10.png', text: '[:(]' },
      { name: 'ee_11.png', text: "[:'(]" },
      { name: 'ee_12.png', text: '[:$]' },
      { name: 'ee_13.png', text: '[(a)]' },
      { name: 'ee_14.png', text: '[8o|]' },
      { name: 'ee_15.png', text: '[8-|]' },
      { name: 'ee_16.png', text: '[+o(]' },
      { name: 'ee_17.png', text: '[|-)]' },
      { name: 'ee_18.png', text: '[:|]' },
      { name: 'ee_19.png', text: '[*-)]' },
      { name: 'ee_20.png', text: '[:-#]' },
      { name: 'ee_21.png', text: '[:-*]' },
      { name: 'ee_22.png', text: '[^o)]' },
      { name: 'ee_23.png', text: '[8-)]' },
      { name: 'ee_24.png', text: '[(|)]' },
      { name: 'ee_25.png', text: '[(u)]' },
      { name: 'ee_26.png', text: '[(S)]' },
      { name: 'ee_27.png', text: '[(*)]' },
      { name: 'ee_28.png', text: '[(#)]' },
      { name: 'ee_29.png', text: '[(R)]' },
      { name: 'ee_30.png', text: '[({)]' },
      { name: 'ee_31.png', text: '[(})]' },
      { name: 'ee_32.png', text: '[(k)]' },
      { name: 'ee_33.png', text: '[(F)]' },
      { name: 'ee_34.png', text: '[(W)]' },
      { name: 'ee_35.png', text: '[(D)]' }
    ]
    for (var i in emotion) {
      var item = emotion[i]
      var strimg = '<img style="width: 32px;height: 32px;vertical-align: middle" src="http://oa.shanlinjinrong.com/static/faces/' + item.name + '" />'
      //strCont=strCont.replace(new RegExp(item.text,'g'),strimg)
      // strCont=strCont.replace(item.text,strimg)
      while (strCont.indexOf(item.text) > -1) {
        strCont = strCont.replace(item.text, strimg)
      }
    }
    console.log(strCont)
    return strCont
  },
  updateGroup (id, type, obj) {
    if (!id) {
      return
    }
    let nextTick = Vue.prototype.$nextTick
    console.log(id, type,obj)
    if (type === 'delete') {
      console.log('删除当前群组')
      store.state.writeStructIsShow = false
      let o = store.state.TXGroup
      for (let i = 0; i < o.length; i++) {
        if (o[i].groupid === id) {
          store.state.TXGroup.splice(i, 1)
          let tmp = store.state.TXGroup
          store.state.TXGroup = []
          store.state.TXGroup = tmp
        }
      }
      let p = store.state.list
      for (let i = 0; i < p.length; i++) {
        console.log('删除聊天列表')
        if (p[i].to === id) {
          store.state.list.splice(i, 1)
          let tmp = store.state.list
          store.state.list = []
          store.state.list = tmp
        }
      }
      let q = 'G_' + id
      if (store.state.singChatbox[q]) {
        delete store.state.singChatbox[q]
      }
      if (store.state.other === q) {
        store.state.other = ''
      }
      if (store.state.otherInfo && store.state.otherInfo.id === id) {
        store.state.otherInfo = {}
      }
    }
    if (type === 'updatename') {
      console.log('更新群信息', id, obj)
      let name = obj.groupName
      if (!name) {return}
      let cmd = function (og) {
        for (let i = 0; i < og.length; i++) {
          if (og[i].groupid === id) {
            console.log('---', og[i])
            og[i].name = name
            og[i].groupname = name
          }
        }
      }
      cmd(store.state.TXGroup)
      cmd(store.state.list)
      if (store.state.otherInfo && store.state.otherInfo.members && store.state.otherInfo.members.length) {
        store.state.otherInfo.name = name
        store.state.otherInfo.groupname = name
      }
    }
    // 踢出群成员
    if (type === 'deleteuser') {
      let o = store.state.otherInfo
      console.log('id--type',id,type)
      console.log('o.members',o.members.length)
      for (let i = 0; i < o.members.length; i++) {
        if (o.members[i].id === id) {
          store.state.otherInfo.members.splice(i, 1)
          let tmp = store.state.otherInfo
          console.log('tmp',tmp)
          store.state.otherInfo = []
          store.state.otherInfo = tmp
        }
      }
      console.log('store.state.otherInfo', store.state.otherInfo)
      console.log('删除成员')
    }
    if (type === 'add') {
      // console.log('新增群信息')
      chat.fatchGroupInfo(id)
    }
    if (type === 'adduser') {
      console.log('新增群成员信息', id, obj)
      // nextTick(function () {
      //   let o = store.state.TXGroup.filter((item) => {return item.id === id})[0]
      //   console.log('新增群成员信息111', store.state.TXGroup)
      // })
      // let tmp = store.state.TXGroup
      // store.state.TXGroup = []
      // store.state.TXGroup = tmp
      let members = {
        affiliation: 'member', id: obj.code
      }
      let affiliations = {
        member: 'sl_' + obj.code
      }
      console.log('aaaaa',store.state.TXGroup)
      let tmp = store.state.TXGroup
      // for (let i = 0; i < tmp.length; i++) {
      //   if (tmp[i].groupid === id) {
      //     store.state.TXGroup[i].members.push(members)
      //     store.state.TXGroup[i].affiliations.push(affiliations)
      //   }
      // }
      if (store.state.otherInfo && store.state.otherInfo.affiliations) {
        store.state.otherInfo.members.push(members)
        store.state.otherInfo.affiliations.push(affiliations)
        store.state.otherInfo.affiliations_count = store.state.otherInfo.affiliations.length
      }
    }
    if (type === 'GROUP_MEMBER_ADD') {
      let members = {
        affiliation: 'member',
        id: obj
      }
      let affiliations = {
        member: 'sl_' + obj
      }
      let cmd = function (og) {
        for (let i = 0; i < og.length; i++) {
          if (og[i].groupid === id) {
            if (og[i].affiliations) {
              for (let j = 0; j < og[i].affiliations.length; j++) {
                if (og[i].affiliations[j]['member'] && og[i].affiliations[j]['member'] === 'sl_' + obj) {
                  og[i].affiliations.splice(j, 1)
                }
                // else {
                //   og[i]['affiliations'].push(affiliations)
                // }
              }
            }
            if (og[i].members) {
              for (let j = 0; j < og[i]['members'].length; j++) {
                if (og[i]['members'][j] && og[i]['members'][j]['id'] === obj) {
                  og[i].members.splice(j, 1)
                }
                // else {
                //   og[i]['members'].push(members)
                // }
              }
            }
            og[i]['affiliations'].push(affiliations)
            og[i]['members'] && og[i]['members'].push(members)
            og[i]['affiliations_count'] = og[i]['affiliations'].length
          }
        }
      }
      cmd(store.state.TXGroup)
      cmd(store.state.list)
      
      let o = store.state.otherInfo
      if (o && o.groupid && o.groupid === id) {
        for (let i = 0; i < o.affiliations.length; i++) {
          if (o.affiliations) {
            if (o.affiliations[i]['member'] && o.affiliations[i]['member'] === 'sl_' + obj) {
              store.state.otherInfo.affiliations.splice(i, 1)
              // store.state.otherInfo.affiliations[i] = affiliations
            }
            // else {
            //   store.state.otherInfo.affiliations.push(affiliations)
            // }
          }
        }
        if (o.members) {
          for (let i = 0; i < o.members.length; i++) {
            if (o.members[i]['id'] && o.members[i]['id'] === obj) {
              store.state.otherInfo.members.splice(i, 1)
            }
          }
        }
        store.state.otherInfo.affiliations.push(affiliations)
        store.state.otherInfo.members.push(members)
        let tmp = store.state.otherInfo
        store.state.otherInfo = []
        store.state.otherInfo = tmp
        store.state.otherInfo.affiliations_count = store.state.otherInfo.affiliations.length
      }
    }
    if (type === 'GROUP_MEMBER_DELETE') {
      // 对话框信息更新
      let o = store.state.otherInfo
      // console.log('id--type',id,type)
      // console.log('o.members',o.members.length)
      if (o.groupid && o.groupid === id) {
        for (let i = 0; i < o.affiliations.length; i++) {
          if (o.affiliations[i]['member'] && o.affiliations[i]['member'] === 'sl_' + obj) {
            store.state.otherInfo.affiliations.splice(i, 1)
          }
        }
        for (let i = 0; i < o.members.length; i++) {
          if (o.members[i]['id'] && o.members[i]['id'] === obj) {
            store.state.otherInfo.members.splice(i, 1)
          }
        }
        let tmp = store.state.otherInfo
        // console.log('tmp',tmp)
        store.state.otherInfo = []
        store.state.otherInfo = tmp
        store.state.otherInfo.affiliations_count = store.state.otherInfo.affiliations.length
      }
      // 列表
      let cmd = function (og) {
        for (let i = 0; i < og.length; i++) {
          if (og[i].groupid === id) {
            // console.log('---', og[i])
            for (let j = 0; j < og[i].members.length; j++) {
              if (og[i]['members'][j] && og[i]['members'][j]['id'] === obj) {
                og[i]['members'].splice(j, 1)
              }
            }
            for (let j = 0; j < og[i].affiliations.length; j++) {
              if (og[i]['affiliations'][j]['member'] && og[i]['affiliations'][j]['member'] === 'sl_' + obj) {
                og[i]['affiliations'].splice(j, 1)
              }
            }
            og[i]['affiliations_count'] = og[i]['affiliations'].length
          }
        }
      }
      cmd(store.state.TXGroup)
      cmd(store.state.list)
    }
  },
  showNewMsgNotice (obj) {
    if (!obj) {
      return
    }
    let code = obj.from.substring(3)
    let tmp = store.state.userInfoDb[code]
    if (!tmp) {
      return
    }
    if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(function (status) {
        if (status === 'granted') {
          let n = new Notification('提示', {
            tag: 'SLJR',
            body: tmp.username + '新信息',
            icon: tmp.img
          })
          n.onshow = function () {
            setTimeout(function () {
              n.close()
            }, 5000)
          }
        }
      })
    }
  },
  getGroups () {
    let conn = Vue.prototype.$conn
    // let showMsg = Vue.prototype.$message
    conn.getGroup({
      success: function (x) {
        let rData = x.data
        // console.log('getGroups:', rData)
        // store.state.TXGroup = [] // store.dispatch('destroyRoom')
        store.state.TXGroup = rData
        for (var i = 0; i < rData.length; i++) {
          chat.getGroupInfo(store.state.TXGroup[i], true)
        }
        // chat.getGroupInfo(store.state.TXGroup)
      },
      error: function () {
        console.log('List chat group error')
      }
    })
  },
  getGroupInfo (item, getMember) {
    // getMember 取成员信息
    let groupId = ''
    if (item.id) {
      groupId = item.id
    } else if (item.groupid) {
      groupId = item.groupid
    } else {
      return
    }
    let conn = Vue.prototype.$conn
    let nextTick = Vue.prototype.$nextTick
    // console.log('获取单个群的信息0', item)
    conn.getGroupInfo({
      groupId: groupId,
      success: function (x) {
        Object.assign(item, x.data[0], {
          groupId: groupId
        })
        // console.log('获取单个群的信息0', item)
        if (getMember === true) {
          let count = x.data[0].affiliations_count
          nextTick(function () {
            chat.getGroupMember(item, 1, count)
          })
        }
      },
      error: function (e) {
        console.log('Error,getGroupInfo', e)
      }
    })
  },
  getGroupMember (item, page, size, fn) {
    if (
      item.groupid === undefined ||
      item.groupid === null ||
      item.groupid === ''
    ) {
      return
    }
    let conn = Vue.prototype.$conn
    let groupId = item.groupid
    // console.log('获取群用户,id:' + groupId)
    let pageNum = page ? page : 1
    let pageSize = size ? size : 1000
    let members = []
    let options = {
      pageNum: pageNum,
      pageSize: pageSize,
      groupId: groupId,
      success: function (x) {
        let rData = x.data
        // console.log('群用户: ' + groupId, x)
        for (var i = 0; i < rData.length; i++) {
          // console.log('群用户111: ', rData[i])
          if (rData[i].member) {
            let id = rData[i].member.substring(3)
            members.push({
              affiliation: 'member',
              id: id
            })
            chat.queryUserInfo(id)
          } else {
            let id = rData[i].owner.substring(3)
            members.push({
              affiliation: 'owner',
              id: id
            })
            chat.queryUserInfo(id)
          }
        }
        item.members = members
        fn && fn()
      },
      error: function (e){
        console.log('Error: ', e)
      }
    }
    conn.listGroupMember(options)
  },
  deleteGroup (id) { // 解散群组
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let option = {
          groupId: id,
          success: function (x) {
            console.log('delete group success !')
            resolve(x)
          },
          error: function (error) {
            console.log('error', error)
            reject(error)
          }
        }
        conn.dissolveGroup(option)
      } catch (error) {
        reject(error)
      }
    })

  },
  sendCmdMessage (type, to, obj) {
    console.log('send cmd message')
    return new Promise(function (resolve, reject) {
      try {
        let conn = Vue.prototype.$conn
        let id = conn.getUniqueId()
        let msg = new Vue.prototype.$WebIM.message('cmd', id) //创建命令消息
        if (type && type === 'updateGroupName' && to && obj) {
          msg.set({
            msg: 'msg',
            to: to, // 接收消息对象
            action : 'UPDATE_GROUP_INFO', //用户自定义，cmd消息必填
            ext : {
              'groupId': to,
              'groupName': obj.groupName
            },
            success: function (id, serverMsgId) {
              console.log(id, serverMsgId)
              resolve({
                id: id,
                serverMsgId: serverMsgId
              })
            } //消息发送成功回调
          })
          msg.setGroup('groupchat')
          conn.send(msg.body)
        }
      } catch (error) {
        reject(error)
      }
    })
    
    // if ( /*如果是发送到群组*/ ) { 
    //   msg.setGroup('groupchat')
    // } else if ( /*如果是发送到聊天室*/ ) {
    //   msg.body.roomType = true
    //   msg.setGroup('groupchat')
    // }
  },
  sendGroupMessage (from, to, message) {
    if (!from || !to || message.trim() === '') {return}
    console.log('Group messageText', from, to, message)
    let sId =  'G_' + to
    let conn = Vue.prototype.$conn
    let msgId = conn.getUniqueId()
    let msg = new Vue.prototype.$WebIM.message('txt', msgId) // 创建文本消息
    let timestamp = Date.parse(new Date()) / 1000
    let option = {
      // msg: chat.encrypt(messageText),
      msg: message,
      to: to,
      roomType: false,
      chatType: 'chatGroup',
      success: function () {
        let obj = {
          nameType: 1, // nameType 1 = 发送消息 2 = 接收消息
          formType: 1, // formType 1 = 文本 2 = 文件 3 = 图片
          // value: chat.encrypt(messageText),
          value: message,
          from: from,
          to: to,
          sId: sId,
          type: 'chatRoom',
          time: timestamp
        }
        store.dispatch('sendText', obj)
      },
      fail: function () {
        console.log(['群组：发送文本失败', msg])
      }
    }
    msg.set(option)
    msg.setGroup('groupchat')
    conn.send(msg.body)
  },
  // 信息加密 256
  // encrypt (text) {
  //   let senderId
  //   let key
  //   var that = this
  //   senderId = chat.formate16BytesKey(store.state.user.userName)
  //   console.log(senderId)
  //   key = chat.formate16BytesKey('sl_ease_oa_#$%^&*(')
  //   var oneencrypt =  aes256.encrypt(senderId, Base64.encode(text))
  //   //console.log(Base64.encode(text))
  //   var oneencryptBase64 = Base64.encode(oneencrypt)
  //   //console.log(oneencryptBase64)
  //   var twoencrypt = aes256.encrypt(key, oneencryptBase64)
  //   //console.log(twoencrypt)
  //   var twoencryptBase64 = Base64.encode(twoencrypt)
  //   //console.log(twoencryptBase64)
  //   //console.log(twoencryptBase64)
  //   return twoencryptBase64

  // },
  // 信息加密   aes128
  // encrypt (word) {
  //   let senderId
  //   let key
  //   let iv
  //   var that = this
  //   senderId = chat.formate16BytesKey(store.state.user.userName)
  //   key = chat.formate16BytesKey('sl_ease_oa_#$%^&*(')
  //   key = CryptoJS.enc.Utf8.parse(key) 
  //   senderId = CryptoJS.enc.Utf8.parse(senderId) 
  //   iv = CryptoJS.enc.Utf8.parse('_sl_init_vector_') 
  //   let wordBase64  = Base64.encode(word)
  //   let srcs = CryptoJS.enc.Utf8.parse(wordBase64)
  //   var encryptedOne = CryptoJS.AES.encrypt(srcs, senderId, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
  //   var oneencrypt = encryptedOne.ciphertext.toString().toUpperCase()
  //   var oneencryptBase64 = Base64.encode(oneencrypt)
  //   let srcsTwo = CryptoJS.enc.Utf8.parse(oneencryptBase64)
  //   var encryptedTwo = CryptoJS.AES.encrypt(srcsTwo, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
  //   var twoencrypt = encryptedTwo.ciphertext.toString().toUpperCase()
  //   var twoencryptBase64 = Base64.encode(twoencrypt)
  //   return twoencryptBase64
  // },
  // 信息加密   unicode 10进制
  encrypt (word) {
    let wordAry = word.split('')
    let encryptStr = ''
    for (var i = 0; i < wordAry.length; i++) {
      let strNew = 0
      let matchAry = []
      let reserveAry = []
      var charTen = wordAry[i].charCodeAt(0).toString()
      var unicodeAry = charTen.split('')
      if (unicodeAry.length > 3) {
        for (var j = 0; j < unicodeAry.length; j++) {
          strNew += Number(unicodeAry[j])
        }
        let a = parseInt(strNew / 10) + ''
        let b = strNew % 10 + ''
        reserveAry = this.reverseNewAry(unicodeAry, a, b)
        for (var k = 0; k < reserveAry.length; k++) {
          this.match(reserveAry[k], matchAry)
        }
        encryptStr += matchAry.join('') + '4'
      } else {
        for (var j = 0; j < unicodeAry.length; j++) {
          strNew += Number(unicodeAry[j])
        }
        let a = parseInt(strNew / 10) + ''
        let b = strNew % 10 + ''
        //unicodeAry = unicodeAry.reverse()
        unicodeAry.push(b)
        unicodeAry.unshift(a)
        unicodeAry = unicodeAry.reverse()
        for (var k = 0; k < unicodeAry.length; k++) {
          this.match(unicodeAry[k], matchAry)
        }
        encryptStr += matchAry.join('') + '4'
      }
      //console.log(encryptStr)
    }
    encryptStr = encryptStr.substring(0, encryptStr.length - 1)
    encryptStr =  '<0-' + encryptStr
    encryptStr = encryptStr + '->'
    return encryptStr
  },
  // 解密匹配 
  decrptyMathch (str, matchAry) {
    switch (str) {
      case 'l':
        matchAry.push('0')
        break
      case '3':
        matchAry.push('1')
        break
      case '%':
        matchAry.push('2')
        break
      case '9':
        matchAry.push('3')
        break
      case 's':
        matchAry.push('4')
        break
      case '$':
        matchAry.push('5')
        break
      case '@':
        matchAry.push('6')
        break
      case '8':
        matchAry.push('7')
        break
      case '^':
        matchAry.push('8')
        break
      case '5':
        matchAry.push('9')
        break
    }
  },
  // 加密匹配原则
  match (str, matchAry) {
    switch (str) {
      case '0':
        matchAry.push('l')
        break
      case '1':
        matchAry.push('3')
        break
      case '2':
        matchAry.push('%')
        break
      case '3':
        matchAry.push('9')
        break
      case '4':
        matchAry.push('s')
        break
      case '5':
        matchAry.push('$')
        break
      case '6':
        matchAry.push('@')
        break
      case '7':
        matchAry.push('8')
        break
      case '8':
        matchAry.push('^')
        break
      case '9':
        matchAry.push('5')
        break
    }
  },
  escape2Html (str) {
    let arrEntities = {
      'lt': '<',
      'gt': '>',
      'nbsp': ' ',
      'amp': '&',
      'quot': '"'
    }
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
      return arrEntities[t]
    })
  },
  html2Escape (sHtml) {
    return sHtml.replace(/[<>&"]/g, function (c) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;'
      }[c]
    })
  },
  reverseNewAry (unicodeAry, a, b) {
    var one1 = unicodeAry.splice(0, 1)[0]
    var two1 = unicodeAry.splice(0, 1)[0]
    var three1 = unicodeAry.splice(0, 1)[0]
    unicodeAry.push(two1)
    unicodeAry.push(three1)
    unicodeAry.push(one1)
    unicodeAry.push(b)
    unicodeAry.unshift(a)
    return unicodeAry.reverse()
  },
  decrptReserseAry (matchAry) {
    matchAry = matchAry.reverse()
    matchAry = matchAry.splice(1, matchAry.length - 2)
    let one = matchAry.splice(matchAry.length - 1, 1)[0]
    let three = matchAry.splice(matchAry.length - 1, 1)[0]
    let two = matchAry.splice(matchAry.length - 1, 1)[0]
    matchAry.unshift(three)
    matchAry.unshift(two)
    matchAry.unshift(one)
    return matchAry
  },
  //信息解密 unicode
  decrpty (data, from) {
    // data = data.substring(3)
    // data = data.substring(0,data.length-2)
    let topThree = data.substring(0, 3)
    let behindTwo = data.substring(data.length-2, data.length)
    console.log(data)
    if(topThree === '<0-' && behindTwo === '->') {
      data = data.substring(3)
      data = data.substring(0, data.length-2)
    } else {
      return data
    }
    if (data.indexOf('4') < 0) {
      let dataAry = data.split('')
      if (dataAry.length > 5) {
        let matchAry = []
        for (var i = 0; i < dataAry.length; i++) {
          this.decrptyMathch(dataAry[i], matchAry)
        }
        matchAry = this.decrptReserseAry(matchAry)
        let text = Number(matchAry.join(''))
        return String.fromCharCode(text)
      } else {
        let matchAry = []
        for (var i = 0; i < dataAry.length; i++) {
          this.decrptyMathch(dataAry[i], matchAry)
        }
        matchAry.splice(0, 1)
        matchAry.splice(matchAry.length - 1, 1)
        matchAry = matchAry.reverse()
        let text = Number(matchAry.join(''))
        return String.fromCharCode(text)
      }
    } else {
      let dataAry = data.split('4')
      let decriptStr = ''
      for (var i = 0; i < dataAry.length; i++) {
        let dataNewAry = dataAry[i].split('')
        if (dataNewAry.length > 5) {
          let matchAry = []
          for (var j = 0; j < dataNewAry.length; j++) {
            this.decrptyMathch(dataNewAry[j], matchAry)
          }

          matchAry = this.decrptReserseAry(matchAry)
          let text = Number(matchAry.join(''))
          text = String.fromCharCode(text)
          decriptStr += text
        } else {
          let matchAry = []
          for (var j = 0; j < dataNewAry.length; j++) {
            this.decrptyMathch(dataNewAry[j], matchAry)
          }
          matchAry.splice(0, 1)
          matchAry.splice(matchAry.length - 1, 1)
          matchAry = matchAry.reverse()
          let text = Number(matchAry.join(''))
          text = String.fromCharCode(text)
          decriptStr += text
        }
      }
      return decriptStr
    }
  },
  // decrpty (data,from) {
  //   let senderId
  //   let key
  //   let iv
  //   let that = this
  //   senderId = chat.formate16BytesKey(from.toUpperCase())
  //   key = chat.formate16BytesKey('sl_ease_oa_#$%^&*(')
  //   key = CryptoJS.enc.Utf8.parse(key) 
  //   senderId = CryptoJS.enc.Utf8.parse(senderId)
  //   iv = CryptoJS.enc.Utf8.parse('_sl_init_vector_')
  //   let twoencrypt = Base64.decode(data)
  //   let encryptedHexStrTwo = CryptoJS.enc.Hex.parse(twoencrypt)
  //   let srcsTwo = CryptoJS.enc.Base64.stringify(encryptedHexStrTwo)
  //   let decryptTwo = CryptoJS.AES.decrypt(srcsTwo, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
  //   let decryptedStrTwo = decryptTwo.toString(CryptoJS.enc.Utf8) 
  //   let oneencryptBase64 = decryptedStrTwo.toString()
  //   let oneencrypt = Base64.decode(oneencryptBase64)
  //   let encryptedHexStrOne = CryptoJS.enc.Hex.parse(oneencrypt)
  //   let srcsOne = CryptoJS.enc.Base64.stringify(encryptedHexStrOne)
  //   let decryptOne = CryptoJS.AES.decrypt(srcsOne, senderId, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
  //   let decryptedStrOne = decryptOne.toString(CryptoJS.enc.Utf8) 
  //   let wordBase64 = decryptedStrOne.toString()
  //   let text =  Base64.decode(wordBase64)
  //   return text
  // },
  // 信息解密  aes256
  // decrpty (data, from) {
  //   console.log(store.state.user.userName)
  //   let senderId
  //   let key
  //   let that = this
  //   senderId = chat.formate16BytesKey(from.toUpperCase())
  //   console.log(senderId)
  //   key = chat.formate16BytesKey('sl_ease_oa_#$%^&*(')
  //   console.log(data)
  //   let twoencrypt = Base64.decode(data)
  //   //console.log(twoencrypt)
  //   let oneencryptBase64 = aes256.decrypt(key, twoencrypt)
  //   //console.log(oneencryptBase64)
  //   let oneencrypt = Base64.decode(oneencryptBase64)
  //   //console.log(oneencrypt)
  //   let oneencryptBase64 = aes256.decrypt(senderId, oneencrypt)
  //   //console.log(oneencryptBase64)
  //   let text =  Base64.decode(oneencryptBase64)
  //   return text
  // },
  // 16字节
  formate16BytesKey (key) {
    if (key.length > 16) {
      return key.substring(key.length - 16, key.length)
    } else {
      var len = key.toString().length
      while (len < 16) {
        key = '0' + key
        len++
      }
      return key
    }
  },
  simle (str) {
    switch (str) {
      case 'ee_1.png':
        return '[):]'
        break
      case 'ee_2.png':
        return '[:D]'
        break
      case 'ee_3.png':
        return '[;)]'
        break
      case 'ee_4.png':
        return '[:-o]'
        break
      case 'ee_5.png':
        return '[:p]'
        break
      case 'ee_6.png':
        return '[(H)]'
        break
      case 'ee_7.png':
        return '[:@]'
        break
      case 'ee_8.png':
        return '[:s]'
        break
      case 'ee_9.png':
        return '[:$]'
        break
      case 'ee_10.png':
        return '[:(]'
        break
      case 'ee_11.png':
        return "[:'(]"
        break
      case 'ee_12.png':
        return '[:|]'
        break
      case 'ee_13.png':
        return '[(a)]'
        break
      case 'ee_14.png':
        return '[8o|]'
        break
      case 'ee_15.png':
        return '[8-|]'
        break
      case 'ee_16.png':
        return '[+o(]'
        break
      case 'ee_17.png':
        return '[<o)]'
        break
      case 'ee_18.png':
        return '[|-)]'
        break
      case 'ee_19.png':
        return '[*-)]'
        break
      case 'ee_20.png':
        return '[:-#]'
        break
      case 'ee_21.png':
        return '[:-*]'
        break
      case 'ee_22.png':
        return '[^o)]'
        break
      case 'ee_23.png':
        return '[8-)]'
        break
      case 'ee_24.png':
        return '[(|)]'
        break
      case 'ee_25.png':
        return '[(u)]'
        break
      case 'ee_26.png':
        return '[(S)]'
        break
      case 'ee_27.png':
        return '[(*)]'
        break
      case 'ee_28.png':
        return '[(#)]'
        break
      case 'ee_29.png':
        return '[(R)]'
        break
      case 'ee_30.png':
        return '[({)]'
        break
      case 'ee_31.png':
        return '[(})]'
        break
      case 'ee_32.png':
        return '[(k)]'
        break
      case 'ee_33.png':
        return '[(F)]'
        break
      case 'ee_34.png':
        return '[(W)]'
        break
      case 'ee_35.png':
        return '[(D)]'
        break
    }
  },
  decriptSimle (str) {
    switch (str) {
      case '[):]':
        return 'ee_1.png'
      break
      case '[:D]':
        return 'ee_2.png'
      break
      case '[;)]':
        return 'ee_3.png'
      break
      case '[:-o]':
        return 'ee_4.png'
        break
      case '[:p]':
        return 'ee_5.png'
        break
      case '[(H)]':
        return 'ee_6.png'
        break
      case '[:@]':
        return 'ee_7.png'
        break
      case '[:s]':
        return 'ee_8.png'
        break
      case '[:$]':
        return 'ee_9.png'
        break
      case '[:(]':
        return 'ee_10.png'
        break
      case "[:'(]":
        return 'ee_11.png'
        break
      case '[:|]':
        return 'ee_12.png'
        break
      case '[(a)]':
        return 'ee_13.png'
        break
      case '[8o|]':
        return 'ee_14.png'
        break
      case '[8-|]':
        return 'ee_15.png'
        break
      case '[+o(]':
        return 'ee_16.png'
        break
      case '[<o)]':
        return 'ee_17.png'
        break
      case '[|-)]':
        return 'ee_18.png'
        break
      case '[*-)]':
        return 'ee_19.png'
        break
      case '[:-#]':
        return 'ee_20.png'
        break
      case '[:-*]':
        return 'ee_21.png'
        break
      case '[^o)]':
        return 'ee_22.png'
        break
      case '[8-)]':
        return 'ee_23.png'
        break
      case '[(|)]':
        return 'ee_24.png'
        break
      case '[(u)]':
        return 'ee_25.png'
        break
      case '[(S)]':
        return 'ee_26.png'
        break
      case '[(*)]':
        return 'ee_27.png'
        break
      case '[(#)]':
        return 'ee_28.png'
        break
      case 'e[(R)]':
        return 'e_29.png'
        break
      case '[({)]':
        return 'ee_30.png'
        break
      case '[(})]':
        return 'ee_31.png'
        break
      case '[(k)]':
        return 'ee_32.png'
        break
      case '[(F)]':
        return 'ee_33.png'
        break
      case '[(W)]':
        return 'ee_34.png'
        break
      case '[(D)]':
        return 'ee_35.png'
        break
    }
  },
  bytesToSize (bytes) {
    if (bytes === 0 || bytes === '') {
      return '0 B'
    }
    if (typeof bytes === undefined || typeof bytes === null) {
      return 0
    }
    let k = 1024 //  Mac系统，1000
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
  },
  getSsid () {
    if (Lockr.get('oa_ssid') !== undefined) {
      return Lockr.get('oa_ssid')
    } else {
      return ''
    }
  }
}

export default chat
