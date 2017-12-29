<template>
<div class="chatting-container" :class="{'min': !showMesV}">
  <div class="chatting" :class="{'min': !showMesV}">
    <div class="sidebar">
      <div class="name">
        <div class="circle"><img :src="reImgUrl(userinfo.img)" @click='personnalMes'></div>
        <div>{{userinfo.name}}</div>
      </div>
      <div class="Personalmes" v-show='PersonalmesValue'>
        <div class="title">{{userinfo.name}} 的个人信息</div>
        <div class="personnalbaseImg">
          <div class="close" @click='closepersonnalbase'>X</div>
          <div class="avatar"><img :src="reImgUrl(userinfo.img)" height="37" width="37" alt=""></div>
          <div class="baseMes">
            <p>{{userinfo.name}}</p>
            <span>{{userinfo.postname}}&nbsp;&nbsp;&nbsp;{{userinfo.sex}}</span>
          </div>
          <div class="personnalfoot">
            <div class="email"><span>邮箱: {{userinfo.email}}</span></div>
            <div class="phone"><span>电话: {{userinfo.phone}}</span></div>
            <div class="department"><span>部门: {{userinfo.departmentName}}</span></div>
          </div>
        </div>
      </div>
      <div class="webim webim-E" v-on:click="changeSection(1)" :class="sectionType === 1 ? 'classBlue' : ''">
        <span class="num" v-if="grossNumber">{{grossNumber}}</span>
      </div>
      <div class="webim webim-L1" v-on:click="changeSection(2)" :class="sectionType === 2 ? 'classBlue' : ''"></div>
      <div class="webim webim-F" v-on:click="changeSection(3)" :class="sectionType === 3 ? 'classBlue' : ''"></div>
      <div class="webim webim-M" @click="szClcik"></div>
    </div>
    <div class="popup" v-if="isPopup">
      <div class="popup_select"><el-checkbox v-model="checked1">新消息自动弹出</el-checkbox></div>
      <div class="popup_select"><el-checkbox v-model="checked2">图标提示</el-checkbox></div>
      <div class="popup_select">
        <i class="el-icon-delete" style="width:18px;height:18px;text-align: center"></i>
        <span @click="clearMessg" style="cursor:pointer;padding-left: 5px">清除聊天缓存信息</span>
      </div>
    </div>
    <template>
      <chat-list v-if="sectionType === 1"></chat-list>
      <address-book v-show="sectionType === 2"></address-book>
      <group-book v-if="sectionType === 3"></group-book>
    </template>
    <div class="dialogBox" v-show="writeStructIsShow">
      <single-chat-box></single-chat-box>
      <message-input></message-input>
    </div>
     <div class="adddialog" v-show='adddialog'>
          <div class="title">选择人员</div>
          <div class="addressTreeleft" id='addressTreeleft'>
            <!--<el-autocomplete size='small'  :fetch-suggestions="querySearchAsyncRebate" placeholder="搜索" @select="handleSelectRebate()" ></el-autocomplete>-->
            <el-input size="small" class="searchTree" style='text-align:center' v-model="search" placeholder="联系人搜索" />
            <div class="elTree" v-show="leftTreeShow">
              <el-tree v-show="showTree"
                :props="props"
                :load="loadNode"
                lazy
                @check-change="handleCheckChange"
                @node-click="nodeClick"
                >
              </el-tree>
            </div>
            <div class="listSearch" v-show="listSearchShow">
            <div class="list_name" v-for="(item, index) in listSearch" v-on:click="addgroupmember(item)">
                <div class="text">
                  <div class="child_name">{{item.username2}}</div>
                </div>
              </div>
          </div>

          </div>
          <div class="addressTreeRight">
            <div class="choice"><span>已选择</span></div>
            <ul>
              <li v-for='(item,index) in candidateOptions'>
                <span>{{item.label}}</span>
                <i class="closeSpan el-icon-close" @click='closeSpan(item,index)'></i>
              </li>
            </ul>
            <div class="btn">
              <el-button class='first'  @click='addCancel'>取消</el-button>
              <el-button class='second' type="primary" @click='addSure'>确定</el-button>
            </div>
          </div>
        </div>
  </div>
  <div class="chatting-icon" ref="ChatIcon" v-bind:style="{left:l + 'px', top:t + 'px'}"
    @click="showMes" @mousedown="mesonmousedown" @mouseup="mesonmouseup">
    <span class="num" v-show="grossNumber">{{grossNumber}}</span>
  </div>
  <div class='chatting-mask' v-show='isShowImMask' @click='hidebox'></div>
</div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

require('../config/webim.config.js')
require('strophe')
require('../assets/js/websdk-1.4.12.js')
require('../assets/js/adapter.js')
require('../assets/js/webrtc-1.4.13.js')

import { mapState } from 'vuex'
import config from '../config/index'
import qs from 'qs'
import localforage from 'localforage'
import chat from '../module/chatting'

Vue.use(ElementUI)
let conn = new WebIM.connection(window.WebIM.config)
Vue.prototype.$WebIM = window.WebIM
Vue.prototype.$conn = conn
Vue.prototype.$localforage = localforage
window.localforage = localforage

export default {
  name: 'chatting',
  data() {
    return {
      search:'',
      props: {
        label: 'username',
        children: 'children',
        isLeaf: 'leaf'
      },
      leftTreeShow: true,
      listSearchShow: false,
      listSearch: [],
      candidateOptions: [],
      showTree: true,
      adddialog: false,
      dialogVisibleAdd: false,
      isShowImMask: false,
      showMesV: true,
      number: 99,
      checked1: false,
      checked2: true,
      checked3:false,
      isPopup: false, // 设置的弹出框是否显示   默认为不显示
      gapX: '',
      gapy: '',
      oEvent: '',
      sectionType: 1, // 1, 当前聊天列表;2, 组织结构;3,群组列表
      hideGruop: false, // 调试用，是否显示群聊按钮
      l: '',
      t: '',
      PersonalmesValue: false,
      htmlHeight: '',
      htmlWidth: '',
      settingValue: '',
      desktop: '',
      title: '',
      groupValue: {},
      n: 0,
      titleInit:'善林OA - 改变 , 不只是你的工作方式',
      senderId:'',
      keys:'sl_ease_oa_#$%^&*(',
      key:'',
      tmpFn: null,
      newAddMembers:[]
    }
  },
  components: {
    'address-book': () => import('@/chatting/addressBook.vue'),
    'chat-list': () => import('@/chatting/chatList.vue'),
    'group-book': () => import('@/chatting/groupBook.vue'),
    'single-chat-box': () => import('@/chatting/singleChatbox.vue'),
    'message-input': () => import('@/chatting/messageInput.vue')
  },
  computed: {
    ...mapState({
      imUser: state => state.imUser,
      otherInfo: state => state.otherInfo, // 对方账号|群组|聊天室
      singChatbox: state => state.singChatbox,
      grossNumber: state => state.grossNumber, // 全部未读消息
      writeStructIsShow: state => state.writeStructIsShow, // 右侧栏写入框是否显示 默认为false 每次用户选择当前群组或聊天对象时才显示
      userinfo: state => state.userinfo,
      TXGroup: state => state.TXGroup,
      TXRoom: state => state.TXRoom,
      list: state => state.list,
      userInfoDb: state => state.userInfoDb,
      currentChatlist: state => state.currentChatObj,
      groupIdShow: state => state.groupIdShow,
      showSid: state => state.showSid
    }),
    isGroupChat () {
      if (this.otherInfo.groupId && this.otherInfo.groupId != '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.htmlHeight = document.documentElement.clientHeight + ''
    this.htmlWidth = document.documentElement.clientWidth + ''
    if (typeof window.addEventListener !='undefined') {
      document.addEventListener('click', this.loadClickEvent,false)
    } else {
      window.attachEvent('onclick', this.loadClickEvent)
    }
  },
  beforeCreate () {
    // let uid = window.localStorage.getItem('uid')
    // let token = window.localStorage.getItem('token')
    // chat.initUserInfo(uid, token)
  },
  created () {
    chat.initCurrentUserInfo().then(this.initChatting)
  },
  methods: {
    initChatting () {
      let that = this
      this.$conn.listen({
        onOpened: function(message) {
          // 连接成功回调，连接成功后才可以发送消息
          // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
          // 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
          // 所以无需调用conn.setPresence();
          console.log('%c [opened] 即时通讯连接已成功建立', 'color: green')
          // that.TXList()
          that.getSet()
          that.getRooms()
          chat.getGroups()
          that.getCacleMessageList()
          if (that.tmpFn && that.tmpFn.close) { // 移除掉线的提示
            that.tmpFn.close()
            that.tmpFn = null
          }
          that.$message({message: '即时通讯登录成功', type: 'success'});
        },
        onTextMessage: function(message) {
          console.log(['接收到文本消息', message])
          if(message.from === 'sl_admin' || message.from === 'sl_notice'){
            return 
          }
          if(message.errorCode === '404'){
            return
          }
          //message.data = chat.decrpty(message.data,message.from)
          that.fatchTextMessage(message)
        }, //  收到文本消息
        onEmojiMessage: function(message) {
          // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
          // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
          // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
          console.log('Emoji')
          var data = message.data
          for (var i = 0, l = data.length; i < l; i++) {
            // console.log(data[i])
          }
        }, // 收到表情消息
        onPictureMessage: function(message) {
          console.log('Picture Message', message)
          that.fatchPictureMessage(message)
        },
        onCmdMessage: function(message) {
          console.log('CMD')
          that.fatchCmdMessage(message)
        }, // 收到命令消息
        onAudioMessage: function(message) {
          console.log('Audio')
        }, // 收到音频消息
        onLocationMessage: function(message) {
          console.log('Location')
        }, // 收到位置消息
        onFileMessage: function(message) {
          console.log('File Message', message)
          that.fatchFileMessage(message)
        }, // 收到文件消息
        onVideoMessage: function(message) {
          var node = document.getElementById('privateVideo')
          var option = {
            url: message.url,
            headers: {
              Accept: 'audio/mp4'
            },
            onFileDownloadComplete: function(response) {
              var objectURL = this.$WebIM.utils.parseDownloadResponse.call(
                this.$conn,
                response
              )
              node.src = objectURL
            },
            onFileDownloadError: function() {
              console.log('File down load error.')
            }
          }
          this.$WebIM.utils.download.call(this.$conn, option)
        }, // 收到视频消息
        onPresence: function(message) {
          console.log('接收到群组通知', message)
          that.handlePresence(message)
          that.groupValue = {}
          that.groupValue = {
            roomId: message.from,
            groupName: this.groupOption.subject
          }
        }, // 收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
        onRoster: function(message) {
          console.log('Roster')
        }, // 处理好友申请
        onInviteMessage: function(message) {
          console.log('Invite', message)
          that.handleInvite(message)
        }, // 处理群组邀请
        onOnline: function() {
          console.log('onLine')
          that.tmpFn && that.tmpFn.close() // 关闭掉线的提示
          that.$message({
            message: '即时通讯连接成功',
            type: 'success',
            onClose: function () {
              if (that.tmpFn && that.tmpFn.close) { // 移除掉线的提示
                that.tmpFn.close()
                that.tmpFn = null
              }
            }
          })
        }, // 本机网络连接成功
        onOffline: function() {
          console.log('offline')
          if (that.tmpFn && that.tmpFn.close) {
            that.tmpFn.close()
            that.tmpFn = null
          }
          that.tmpFn = that.$message({
            showClose: true,
            message: '即时通讯已掉线，请刷新页面或检查网络！',
            type: 'warning',
            duration: 0
          })
        }, // 本机网络掉线
        onError: function(message) {
          console.log('Error', message)
          that.fatchErrorMessage(message)
        }, // 失败回调
        onBlacklistUpdate: function(list) {
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list)
        } // 黑名单变动
      })
      let options = {
        apiUrl: window.WebIM.config.apiUrl,
        appKey: window.WebIM.config.appkey,
        user: this.imUser.userName,
        pwd: this.imUser.password
      }
      console.log(options)
      this.$conn.open(options)
    },
    loadClickEvent (e) {
      if (!this.$el.contains(e.target)) {
        this.showMesV = false
        this.adddialog = false
        this.PersonalmesValue = false
      }
    },
    clearMessg () {
      this.isPopup = false
      this.$confirm('此操作将清除所有聊天信息(包括聊天列表、消息记录、群组), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localforage.removeItem('cacheChatList') // 清除聊天人列表.
        localforage.removeItem('cacheMessageHistory') // 清除聊天记录缓存
        localforage.removeItem('cacheGroup') // 清除群组列表
        this.$store.state.userInfoDb = {} // 聊天用户
        this.$store.state.singChatbox = {} // 聊天信息
        this.$store.state.list = [] // 聊天列表
        this.$store.state.TXGroup = [] // 群组
        // 重新加载并缓存数据
        chat.getGroups()
        this.changeSection(1)
        this.$store.dispatch('clearState')
        this.$message({
          type: 'success',
          message: '聊天信息已清除!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清除'
        })
      })
    },
    // 修改群信息
    changeGroupInfo (id, name) {
      var that = this
      var option = {
        roomId: id,
        subject: name,
        description: '群组',
        success: function(response) {
          that.listGroups()
        }
      }
      this.$conn.changeGroupSubject(option)
    },
     //获取群列表
    listGroups () {
      var that = this
      this.$conn.listRooms({
        success: function(rooms) {
          window.store.dispatch('destroyRoom')
          for(var i =0; i< rooms.length; i++) {
            that.getRoomInfo(rooms[i])
          }
        },
        error: function() {
          console.log('List chat rooms error')
        }
      })
    },
    async handleInvite (e) {
      if (e.type === 'invite') {
        let roomid = e.roomid
        let from = e.from.substring(3)
        let tmpUserInfo = await chat.getUserInfo(from)
        // console.log('公开群聊成员加入成功', e, tmpUserInfo)
        let tmpGroup = await chat.fatchGroupInfo(roomid)
        let tmpGName = tmpGroup.name ? tmpGroup.name : tmpGroup.groupname ? tmpGroup.groupname : ''
        this.$message({
          message: '用户' + tmpUserInfo.username + '邀请加入群组' + tmpGName,
          type: 'success'
        })
        chat.updateGroup(roomid, 'add') // 更新群信息，添加一条群，对象添加||更新
      }
    },
    async handlePresence (e) {
      let from = e.from
      let to = e.to.substring(3)
      let myCode = this.userinfo.code
      switch (e.type) {
        case 'memberJoinPublicGroupSuccess':
        console.log('memberJoinPublicGroupSuccess')
          let mid = e.mid.substring(3)
          console.log('aaa',to)
          if (to === this.userinfo.code) {
            console.log('通知群组邀请人')
            let tmpUserInfo = await chat.getUserInfo(mid)
            console.log('公开群聊成员加入成功', e, tmpUserInfo)
            // let tmpGroup = await chat.fatchGroupInfo(from)
            // let tmpGName = tmpGroup.name ? tmpGroup.name : tmpGroup.groupname ? tmpGroup.groupname : ''
            // let tmpGId= tmpGroup.id ? tmpGroup.id : tmpGroup.groupId ? tmpGroup.groupId : ''
            // this.$message({
            //   message: '用户' + tmpUserInfo.username + '已加入群组' + tmpGName,
            //   type: 'success'
            // })
            // this.sendGroupText(tmpUserInfo,tmpGName,tmpGId)
            // chat.updateGroup(from, 'adduser', tmpUserInfo)
            chat.updateGroup(from, 'GROUP_MEMBER_ADD', tmpUserInfo.code)
          } else if (mid === this.userinfo.code) {
            console.log('通知群组被邀请人')
            console.log('您已被加入群组', e, tmpUserInfo)
            let tmpGroup = await chat.fatchGroupInfo(from)
            let tmpGName = tmpGroup.name ? tmpGroup.name : tmpGroup.groupname ? tmpGroup.groupname : ''
            this.$message({
              message: '已加入群' + tmpGName,
              type: 'success'
            })
            chat.updateGroup(from, 'add') // 更新群信息，添加一条群，对象添加||更新
          }
          break
        case 'unavailable':
        // console.log(1111111)
          if (to === myCode && e.original_type === 'unavailable' && e.fromJid) {
            console.log('用户' + e.fromJid.slice(-9) + '离开群', from)
            let o = this.$store.state.TXGroup.filter((item) => {return item.groupid === from && item.owner === 'sl_' + myCode})
            if (e.fromJid.slice(-9) === myCode && o && o.length > 0) {
              console.log('移动端的操作，我是群主，禁止被移除')
              return
            } else {
              chat.updateGroup(from, 'GROUP_MEMBER_DELETE', e.fromJid.slice(-9)) // 更新群信息，删除一个用户
              // chat.updateGroup(from, 'delete')
            }
            // let tmpUserInfo = await chat.queryUserInfo(to)
            // let tmpGroup = await chat.fatchGroupInfo(from)
            // let tmpGName = tmpGroup.name ? tmpGroup.name : tmpGroup.groupname ? tmpGroup.groupname : ''
            // this.$message({
            //   message: '用户' + tmpUserInfo.username + '退出群' + tmpGName,
            //   type: 'success'
            // })
          }
          break
        case 'joinChatRoomSuccess':
          console.log('加入成功', e)
          break
        case 'deleteGroupChat':
          console.log('群组被删除', e)
          if (to === this.userinfo.code && e.original_type === 'notify' && e.destroy) {
            console.log('群组被删除from', from)
            let tmpGroup = await chat.fatchGroupInfo(from)
            let tmpGName = tmpGroup.name ? tmpGroup.name : tmpGroup.groupname ? tmpGroup.groupname : ''
            this.$message({
              message: '群' + tmpGName + '已解散',
              type: 'success'
            })
            console.log('不是群主1')
            chat.updateGroup(from, 'delete') // 更新群信息，删除一条群，列表删除，对象删除
          }
          break
        case 'joinChatRoomFailed':
          console.log('加入失败', e)
          break
        case 'leaveGroup':
          if (to === myCode && e.original_type === 'notify') {
            console.log('被踢出群', from)
            let o = this.$store.state.TXGroup.filter((item) => {return item.groupid === from && item.owner === 'sl_' + myCode})
            if (o && o.length > 0) {
              console.log('移动端的操作，我是群主，禁止被移除')
              return
            } else {
              // chat.updateGroup(from, 'GROUP_MEMBER_DELETE', e.fromJid.slice(-9)) // 更新群信息，删除一个用户
              console.log('不是群主2')
              chat.updateGroup(from, 'delete') // 更新群信息，删除一条群，列表删除，对象删除
            }
            // let tmpGroup = await chat.fatchGroupInfo(from)
            // let tmpGName = tmpGroup.name ? tmpGroup.name : tmpGroup.groupname ? tmpGroup.groupname : ''
            // chat.updateGroup(from, 'delete') // 更新群信息，删除一条群，列表删除，对象删除
            // this.$message({
            //   message: '您被踢出群组' + tmpGName,
            //   type: 'success'
            // })
          }
          break
        default:
          if (from) { // 检查群是否存在
            try {
              await chat.queryGroupInfo(from)
            } catch (error) {
              console.log(error)
              if (error && error.type === 17 && JSON.parse(error.data).error === 'service_resource_not_found') {
                let o = this.$store.state.TXGroup.filter((item) => {return item.groupid === from})
                let groupName = ''
                if (o && o.length > 0 && (o[0].groupname || o[0].name)) {
                  groupName = '"' + (o[0].groupname || o[0].name) + '"'
                }
                chat.updateGroup(from, 'delete') // 移除本地群组
                this.$message({type: 'success', message: '群组' + groupName + '已解散!'})
                return
              }
            }
          }
          break
      }
    },
    async sendGroupText (users, groupId) {
      console.log(users)
      //console.log(messageText)
      let to = groupId
      let sId =  'G_' + to
      let from = this.userinfo.code
      let msgId = this.$conn.getUniqueId() // 生成本地消息id
      let msg = new this.$WebIM.message('txt', msgId) // 创建文本消息
      let timestamp = Date.parse(new Date()) / 1000
      let that = this
      let messageText = '邀请' + users + '加入群组' 
      let option = {
        msg: chat.encrypt(messageText),
        //msg: messageText,
        to: to,
        roomType: false,
        chatType: 'chatGroup',
        success: function (id, serverMsgId) {
          let obj = {
            id: serverMsgId,
            nameType: 1, // nameType 1 = 发送消息 2 = 接收消息
            formType: 1, // formType 1 = 文本 2 = 文件 3 = 图片
            value: chat.encrypt(messageText),
            //value: messageText,
            from: from,
            to: to,
            sId: sId,
            type: 'chatRoom',
            time: timestamp
          }
          that.$store.dispatch('sendText', obj)
        },
        fail: function () {
          console.log(['群组：发送文本失败', msg])
        }
      }
      msg.set(option)
      msg.setGroup('groupchat')
      this.$conn.send(msg.body)
    },
    handleMessage (code, obj) {
      console.log(['预处理消息', obj])
      let that = this
      let msg = obj
      let sentFromMe = code === this.userinfo.code // 消息是自己发的
      this.handleMsgOptionsInfo(msg)
      if (msg.type === 'groupchat') {
        // this.handleMsgOptionsInfo(msg)
        // 没有当前群，则不处理消息
        let o = this.$store.state.TXGroup.filter(item => item.id === msg.to)
        if (!o || o.length === 0) {
          return
        }
      }
      console.log('abc', code, this.userinfo.code, obj.from, obj.to)
      if (sentFromMe && obj.from === obj.to) {
        console.log('自己发自己的信息')
        return
      }
      if (sentFromMe && obj.from !== obj.to) {
        msg.sId = msg.to
        if (msg.type === 'groupchat') {
          msg.sId = 'G_' + msg.to
        }
        msg.nameType = 1
      }
      if (!this.userInfoDb || !this.userInfoDb[code] || !this.userInfoDb[code].img) {
        chat && chat.queryUserInfo(code).then(function () {
          that.$nextTick(function () { // 收到数据推送再来执行
            that.$store.dispatch('receiveText', msg)
            chat && !!sentFromMe && chat.showNewMsgNotice(msg)
          })
        }),function(reason, data) {
          window.axios.get(config.OA_URL + 'user/getinfo',
          {
            params: { code: code },
            headers: { token: that.userinfo.token, uid: that.userinfo.uid }
          }
          ).then(response => {
            that.$nextTick(function () { // 收到数据推送再来执行
              that.$store.dispatch('receiveText', msg)
              chat&& !!sentFromMe && chat.showNewMsgNotice(msg)
            })
          })
        }
      } else {
        this.$store.dispatch('receiveText', msg)
        chat&& !!sentFromMe && chat.showNewMsgNotice(msg)
      }
    },
    fatchTextMessage (message) {
      let timestamp = Date.parse(new Date()) / 1000
      let code = message.from.substring(3)
      let type = message.type
      let from = message.from.toUpperCase()
      let to = message.to.toUpperCase()
      let sId = type === 'chat' ? from : type === 'chatroom' ? 'R_' +  to : 'G_' +  to
      let obj = {
        id: message.id,
        sId: sId, // 用于标识
        nameType: 2, // nameType 1 = 发送消息 2 = 接收消息
        formType: 1, // formType 1 = 文本 2 = 文件 3 = 图片
        value: message.data,
        from: from,
        to: to,
        type: message.type, // 消息类型chatroom=聊天室，chat单聊
        time: timestamp
      }
      this.handleMessage(code, obj)
    },
    fatchFileMessage (message) {
      let timestamp = Date.parse(new Date()) / 1000
      let code = message.from.substring(3)
      let from = message.from.toUpperCase()
      let to = message.to.toUpperCase()
      let fileName = message.filename
      let type = message.type
      let sId = type === 'chat' ? from : type === 'chatroom' ? 'R_' +  to : 'G_' +  to
      let obj = {
        id: message.id,
        nameType: 2, // nameType 1 = 发送消息 2 = 接收消息
        formType: 2, // formType 1 = 文本 2 = 文件 3 = 图片
        name: fileName,
        from: from,
        sId: sId,
        to: to,
        type: type, // 消息类型chatroom=聊天室，chat单聊
        time: timestamp,
        size: message.file_length ? message.file_length : 0,
        url: message.url
      }
      this.handleMessage(code, obj)
      // 下面是原来的代码
      let options = { url: message.url }
      options.onFileDownloadComplete = function() {
        // 图片下载成功
        //console.log('Image download complete!')
      }
      options.onFileDownloadError = function() {
        // 图片下载失败
        //console.log('Image download failed!')
      }
      this.$WebIM.utils.download.call(this.$conn, options) // 意义待查
    },
    fatchPictureMessage (message) {
      let timestamp = Date.parse(new Date()) / 1000
      let code = message.from.substring(3)
      let from = message.from.toUpperCase()
      let to = message.to.toUpperCase()
      let fileName = message.filename
      let type = message.type
      let sId = type === 'chat' ? from : type === 'chatroom' ? 'R_' +  to : 'G_' +  to
      let obj = {
        id: message.id,
        nameType: 2, // nameType 1 = 发送消息 2 = 接收消息
        formType: 3, // formType 1 = 文本 2 = 文件 3 = 图片
        name: fileName,
        from: from,
        sId: sId,
        to: to,
        type: type, // 消息类型chatroom=聊天室，chat单聊
        time: timestamp,
        size: message.file_length ? message.file_length : 0,
        url: message.url
      }
      this.handleMessage(code, obj)
      // 下面是原来的代码
      let options = { url: message.url }
      options.onFileDownloadComplete = function() {
        // 图片下载成功
        //console.log('Image download complete!')
      }
      options.onFileDownloadError = function() {
        // 图片下载失败
        //console.log('Image download failed!')
      }
      this.$WebIM.utils.download.call(this.$conn, options) // 意义待查
    },
    fatchErrorMessage (message) {
      console.log('Error', message)
      let type = message.type
      if (this.tmpFn && this.tmpFn.destroy) {
        this.tmpFn.destroy()
        this.tmpFn = null
      }
      switch (type) {
        case 1:
          console.log('WEBIM_CONNCTION_OPEN_ERROR')
          this.tmpFn = this.$message({
            showClose: true,
            message: '请刷新页面或重新登陆即时通讯!',
            type: 'warning',
            duration: 0
          })
          break
        case 6:
          console.log('WEBIM_CONNCTION_REOPEN_ERROR')
          this.tmpFn = this.$message({
            showClose: true,
            message: '即时通讯重新登录出错！请刷新页面',
            type: 'warning',
            duration: 0
          })
          break
        case 7:
          console.log('WEBIM_CONNCTION_SERVER_CLOSE_ERROR')
          this.tmpFn = this.$message({
            showClose: true,
            message: '即时通讯网络中断',
            type: 'warning',
            duration: 0
          })
          break
        case 8:
          console.log('WEBIM_CONNCTION_SERVER_ERROR')
          this.tmpFn = this.$message({
            showClose: true,
            message: '即时通讯在其它端登录，被踢下线',
            type: 'warning',
            duration: 0
          })
          break
        case 16:
          console.log('WEBIM_CONNCTION_DISCONNECTED')
          this.tmpFn = this.$message({
            showClose: true,
            message: '即时通讯服务端关闭了连接，请刷新页面、重新登录或稍候再试！',
            type: 'warning',
            duration: 0
          })
          break
        default:
          console.log('WEBIM_CONNCTION_DISCONNECTED')
          this.tmpFn = this.$message({
            showClose: true,
            message: '请刷新页面或重新登陆即时通讯',
            type: 'warning',
            duration: 0
          })
          break
      }
    },
    async handleMsgOptionsInfo (message) {
      let type = message.type
      let to = message.to
      if (type === 'groupchat') {
        // chat && chat.queryGroupInfo(to)
        let a = await chat.queryGroupInfo(to)
        console.log('groupchat', a.data)
      }
    },
    fatchCmdMessage (message) {
      console.log('received cmd message', message)
      if (message.action === 'UPDATE_GROUP_INFO' && message.to && message.ext) {
        chat && chat.updateGroup(message.to, 'updatename', message.ext)
      }
    },
    addCancel () {
      this.adddialog = false
      this.search = ''
      this.isShowImMask = false
    },
    async openNewGroup (id) {
      //console.log('打开新的群', chat.fatchGroupInfo(id))
      let tmp = await chat.queryGroupInfo(id)
      console.log('打开新群',tmp)
      
      let tmpd = tmp.data[0]
      
      this.$store.state.showSid = 'G_' + tmpd.id
      console.log('//////',this.$store.state.showSid)
      let that = this
      tmpd.groupid = tmp.data[0].id
      tmpd.groupId = tmp.data[0].id
      tmpd.groupname = tmp.data[0].name
      tmpd.sId = 'G_' + tmp.data[0].id
      // 初始化管理员
      tmpd.affiliations = [{owner: 'sl_' + this.userinfo.code}]
      tmpd.members = [{affiliation: 'owner',id: this.userinfo.code}]
      // tmpd.affiliations_count = 1
       //console.log('打开新1', tmpd)
      // let count = tmpd.affiliations_count
      //  console.log('打开新2', tmpd)
      // chat.getGroupMember(tmpd, 1, count, function () {
        that.$store.dispatch('openChatBox', {item: tmpd}) // 通讯录点击添加对话列表
        that.$store.state.otherInfo = tmpd
        that.sectionType = 1 // 切换到聊天列表
        // if (tmp.members && tmp.members.length > 0) {}
        // else {
        //   setTimeout(() => {
        //     if (that.$store.state.list[0].id = tmpd.id) {
        //       that.$store.dispatch('openChatBox', {item: that.$store.state.list[0], index: 0})
        //     }
        //   }, 400)
        // }
      // })
      // 聊天列表回顶部
      document.querySelector('.chatting .communication .p_list').scrollTop = 0
    },
    // 添加人员确定按钮
    addSure () {
      let that = this
      let members = [] // ['sl_011000252', 'sl_011000068', 'sl_011000060']\
      let groupName = []
      if(that.candidateOptions.length > 0) {
        that.candidateOptions.map(function (item) {
          members.push('sl_' + item.CODE)
        })
        that.candidateOptions.map(function (item) {
          groupName.push(item.label)
        })
      }
      // 新建群组
      this.adddialog = false
      if(this.isGroupChat === false) {
        chat.createGroup({name: groupName.join('、')}).then(function (x) {
          console.log('------------群组创建成功', x)
          that.addCancel()
          that.$store.dispatch('writeStructIsShow', false)
          that.openNewGroup(x) // 立即打开新建的群
          store.state.groupIdShow = x
          if (members && members.length > 1) {
            // that.newAddMembers.push({
            //   label: that.userinfo.username,
            //   CODE: that.userinfo.code
            // })
            if (that.userinfo.username) {
              that.newAddMembers.push({
                label: that.otherInfo.username,
                CODE: that.otherInfo.code
              })
            }
            // console.log('-------------开始邀请人', x, members, that.newAddMembers)
            that.inviteMemberToGroup(x, members, that.newAddMembers)
          }
        // setTimeout(function() {
          //   that.$message({
          //     message: '如果界面更新不及时，请主动刷新网页',
          //     duration: 5000
          //     })
          //     that.inviteMemberToGroup(x, members)
          // }, 1000)
        }, function () {
          that.addCancel()
          that.$message({message: '群组创建失败', type: 'error'})
        })
      } else {
        let groupId = that.otherInfo.groupId
        // that.newAddMembers = []
        // if (that.userinfo.username) {
        //   that.newAddMembers.push({
        //     label: that.otherInfo.username,
        //     CODE: that.otherInfo.code
        //   })
        // }
        // console.log('-------------邀请人1', members, that.newAddMembers)
        this.inviteMemberToGroup(groupId, members, that.newAddMembers)
      }
      for (var i = 0; i < this.$children.length; i++) {
        if (this.$children[i].addmembershow) this.$children[i].addmembershow = false
      }
    },
    // 添加人员确定按钮
    async inviteMemberToGroup (groupId, members, newMembers) {
      let that = this
      // 发送邀请，需要用户确认才能加入
        // chat.inviteToGroup(that.otherInfo.groupId, inviteMembers).then(function (x) {
        //   console.log('邀请已发送', x)
        //   that.adddialog = false
        //   that.candidateOptions = []
        //   console.log(x.data)
        // })
      // 不需要用户确认直接加入
      if(newMembers.length <= 0) {
        return
      }
      chat.addGroupMembers(groupId, members, 'groupAddMembers').then(async function (x) {
        // console.log('--------------邀请已发送1', x)
        let str = ''
        for(var i = 0; i < newMembers.length; i++) {
          str += newMembers[i].label + '、'
          // chat.updateGroup(groupId, 'GROUP_MEMBER_ADD', newMembers[i].CODE)
        }
        that.candidateOptions = []
        console.log('-------------',newMembers)

        that.sendGroupText(str.substring(0,str.length-1), groupId)
        that.newAddMembers = []
        that.addCancel()
      }, function () {
        that.$message({message: '邀请失败', type: 'error'})
        that.newAddMembers = []
        that.addCancel()
      })
    },
    async openChatBox (item) {
      console.log('打开群组聊天', item)
      this.$store.dispatch('openChatBox', {item: item}) // 通讯录点击添加对话列表
      this.searchMessg = ''
      this.sectionType = 1 // 切换到聊天列表
      this.$store.state.groupIdShow = ''//取消群高亮
    },
    closeSpan (item, index) {
      this.candidateOptions.splice(index, 1)
      // this.newAddMembers.splice(index,1)
      for(var i = 0; i < this.newAddMembers.length; i++){
        if(item.CODE === this.newAddMembers[i].CODE){
          this.newAddMembers.splice(i,1)
        }
      }
      console.log(item)
      console.log(this.newAddMembers)
    },
    handleCheckChange(Nodedata, checked, indeterminate) {

    },
    addgroupmember (data){
      this.addmemberpackage(data)
    },
    addmemberpackage (data){
      console.log(data)
      console.log(this.candidateOptions)
      console.log(this.newAddMembers)
      if (data.CODE) {
        for(var i = 0; i < this.candidateOptions.length; i++){
          if(this.candidateOptions[i].CODE === data.CODE) return
        }
        this.candidateOptions.push({label:data.username,CODE:data.CODE})
        this.newAddMembers.push({label:data.username,CODE:data.CODE})  
      }
    },
    nodeClick (data) {
      this.addmemberpackage(data)
    },
    loadNode (node, resolve) {
      return []
      let pid = 1
      if (node && node.level > 0) {
        pid = node.data.oid
        if (typeof node.data.oid != undefined && node.data.oid === '') {
          return resolve([])
        }
      }
      var hasChild
      node.level > 0 && (hasChild = true)
      let uid = this.$store.state.userinfo.uid
      let token = this.$store.state.userinfo.token
      let headers = {
        uid: this.$store.state.userinfo.uid,
        token: this.$store.state.userinfo.token
      }
      let data = {
        department_id: pid,
        ssid: chat.getSsid()
      }
      let that = this
      axios.post(config.OA_URL+'index/framework', qs.stringify(data), {headers: headers}).then(response => {
        this.isShow = 1
        if (typeof response.data.code !== undefined && response.data.code === '200') {
          var list = []
          if (response.data.data.department !== undefined) {
            for (var k in response.data.data.department) {
              let tmpObj = {}
              let tmpData = response.data.data.department[k]
              if (
                tmpData.department_name === undefined
              )
              continue
              tmpObj.username = tmpData.department_name + ' (' + tmpData.department_persons + ')'
              tmpObj.oid = tmpData.department_id
              // tmpObj.CODE = tmpData.CODE
              tmpObj.type = 'depart'
              //tmpObj.num = tmpData.department_persons
              tmpObj.leaf = false
              list.push(tmpObj)
            }
          }
          if (response.data.data.employee !== undefined) {
            for (var k in response.data.data.employee) {
              if (response.data.data.employee[k].username === undefined)
                continue
              let tmpObj = {}
              tmpObj = response.data.data.employee[k]
              tmpObj.leaf = true
              list.push(tmpObj)
            }
          }
          // console.log('list is ', JSON.stringify(list))
          return resolve(list)
          // console.log('orgList is ',this.orgList)
        } else {
          if (_g.checkApiCode(response.data.code)) {
            let msg = '获取组织架构错误'
            typeof response.data.info != undefined && response.data.info != '' && (msg = response.data.info)
            that.$message({message: '组织架构 ' + msg, type: 'error'})
          }
        }
      }).catch(response => {
        //_g.toastMsg('error','获取组织架构异常')
      })
    },
    TXList () {
      let pid = 1
      let data1 = {
        department_id: pid,
        ssid: chat.getSsid()
      }
      // 通讯列表
      window.axios.post(config.OA_URL + 'index/framework', qs.stringify(data1), {
        headers: {
          token: window.store.state.userinfo.token,
          uid: window.store.state.userinfo.uid
        }
      }).then(response => {
        let res = response
        let TXListState = []
        let obj = { label: '善林金融', children: [] }
        for (let key in response.data.data.department) {
          let childobj = {
            label: response.data.data.department[key].department_name,
            children: [{}]
          }
          obj.children.push(
            Object.assign(response.data.data.department[key], childobj)
          )
        }
        TXListState = []
        TXListState.push(obj)
        // console.log(TXListState)
        window.store.dispatch('TXList', TXListState)
      })
    },
    getSet () {
      let that = this
      this.$http.get(config.OA_JAVA_URL + 'user/getMessageSetting', {
          params: {
            token: that.$store.state.userinfo.token,
            uid: that.$store.state.userinfo.uid
          }
        }).then(function(response) {
          var data = JSON.parse(response.body.data.value)
          if (data.desktop === 1) {
            this.checked1 = true
          } else {
            this.checked1 = false
          }
          if (data.title === 1) {
            this.checked2 = true
          } else {
            this.checked2 = false
          }
        },
        function(response) {
          // console.log(response)
        }
      )
    },
    hidebox () {
      //console.log(this)
      this.PersonalmesValue = false
      this.isPopup = false
      this.adddialog = false
      this.isShowImMask = false
      this.search = ''
      for (var i = 0; i < this.$children.length; i++) {
        if (this.$children[i].PersonalmesValue) this.$children[i].PersonalmesValue = false
        if (this.$children[i].chatUserInfo) this.$children[i].chatUserInfo = false
        // this.$children[i].addmembershow = false
        if (this.$children[i].showFlag) this.$children[i].showFlag = false
        if (this.$children[i].addmembershow) this.$children[i].addmembershow = false
      }
    },
    closepersonnalbase () {
      this.PersonalmesValue = !this.PersonalmesValue
    },
    personnalMes (e) {
      this.PersonalmesValue = !this.PersonalmesValue
      this.isShowImMask = true
    },
    reImgUrl (url) {
      let oimg = url
      if (url === '' || url === 'http://') {
        oimg = 'data:image/jpeg;base64,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'
      }
      return oimg
    },
    fatchUserInfo () {
      // 补全当前用户信息
      let that = this
      let code = this.userinfo.code
      chat && chat.queryUserInfo(code).then(function (rData) {
        // console.log('获取到', rData)
        Object.assign(that.$store.state.userinfo, rData)
        that.$nextTick(function () {
          that.$forceUpdate()
        })
      }), function () {
        window.axios.get(
          config.OA_URL + 'user/getinfo',
          {
            params: { code: code },
            headers: { token: that.userinfo.token, uid: that.userinfo.uid }
          }).then(response => {
            Object.assign(that.$store.state.userinfo, response.data.data[0])
            that.$nextTick(function () {
              that.$forceUpdate()
          })
        })
      }
    },
    mesonmouseup () {
      document.onmousemove = null
      document.onmouseup = null
    },
    mesonmousedown (ev) {
      // console.log(this.odiv)
      let odiv = this.$refs.ChatIcon
      var oEvent = ev || event
      this.gapX = oEvent.clientX - odiv.offsetLeft
      this.gapY = oEvent.clientY - odiv.offsetTop
      var that = this
      document.onmousemove = function(ev) {
        var oEvent = ev || event
        //限制在可视区域内运动
        that.l = oEvent.clientX - that.gapX
        that.t = oEvent.clientY - that.gapY
        // console.log(that.odiv)
        var r = document.documentElement.clientWidth - odiv.offsetWidth
        var b = document.documentElement.clientHeight - odiv.offsetHeight
        if (that.l < 0) {
          odiv.style.left = 0 + 'px'
        } else if (that.l > r) {
          odiv.style.left = r + 'px'
        } else {
          odiv.style.left = that.l + 'px'
        }
        if (that.t < 0) {
          odiv.style.top = 0 + 'px'
        } else if (that.t > b) {
          odiv.style.top = b + 'px'
        } else {
          odiv.style.top = that.t + 'px'
        }
        // that.odiv.onmouseup = that.onmouseup
      }
    },
    showMes () {
      if (!this.showMesV) {
        this.showMesV = true
        this.changeSection(1)
        this.$store.state.personnelistIndex = 100
        // this.$store.state.otherInfo = this.$store.state.list[0]
        // this.$store.dispatch('updateListChatStatus', [
        //   this.$store.state.list[0].from,
        //   0
        // ])
        //this.$store.dispatch('defaultCount', [this.$store.state.list[0], 0])  //解决已点击图标清除所有未读信息提醒

        this.$store.dispatch('writeStructIsShow', false) // 右侧栏写入框是否显示  默认为false    每次用户选择当前群组或聊天对象时才显示
      } else {
        //console.log('最小化')
        this.$store.dispatch('writeStructIsShow', false) // 右侧栏写入框是否显示  默认为false    每次用户选择当前群组或聊天对象时才显示
        this.$store.dispatch('clearOther') //清除当前聊天监控
        this.showMesV = false
      }
    },
    szClcik () {
      this.isShowImMask = true
      this.isPopup = !this.isPopup
    },
    changeSection (x) {
      this.$store.state.groupIdShow = ''//取消群高亮
      if(x === 2|| x === 3){
         document.getElementById('textarea').innerHTML = ''
         this.$store.dispatch('clearOther') //清除当前聊天监控
      }
     
      if (this.sectionType !== x || !this.list || this.list.length < 1) {
        this.$store.dispatch('writeStructIsShow', false)
      }
      this.sectionType = x
      if (this.n === 0) {
        this.n++
        // this.$store.dispatch('writeStructIsShow', false) // 右侧栏写入框是否显示  默认为false    每次用户选择当前群组或聊天对象时才显示
      }
    },
    getRooms () {
      let that = this
      this.$conn.listRooms({
        success: function(rooms) {
          //console.log('取到所有聊天室信息:', rooms)
          window.store.dispatch('destroyRoom')
          for (var i = 0; i < rooms.length; i++) {
            //console.log('获取聊天室信息,id:' + rooms[i].roomId)
            that.getRoomInfo(rooms[i])
          }
        },
        error: function() {
        }
      })
    },
    getRoomInfo (item) {
      // 聊天室
      if (
        item.roomId === undefined ||
        item.roomId === null ||
        item.roomId === ''
      ) {
        return
      }
      let that = this
      //console.log('获取单个聊天室的信息', item)
      this.$conn.queryRoomInfo({
        roomId: item.roomId,
        success: function(settings, members, fields) {
          let tmpRoom = item
          tmpRoom = Object.assign({}, item, {
            settings: settings,
            members: members,
            fields: fields
          })
          //console.log(tmpRoom)
          window.store.dispatch('buildRoom', tmpRoom)
          return tmpRoom
        },
        error: function(e) {
          //console.log('Error!', e)
        }
      })
    },
    getCacleMessageList () {
      // 取缓存
      let state = window.store.state
      localforage.getItem('currentUserCode', function (err, value) {
        // 不是当前用户
        if (state.userinfo.code !== value || value === undefined || value === '' || value === null || !value) {
          localforage.setItem('currentUserCode', state.userinfo.code)
          localforage.setItem('cacheUser', {})
          localforage.setItem('cacheGroup', [])
          localforage.setItem('cacheMessageHistory', {})
          localforage.setItem('cacheChatList', [])
          localforage.setItem('cachegrossNumber', 0)
          return
        } else {
          localforage.setItem('currentUserCode', state.userinfo.code)
        }
      })
      localforage.getItem('cacheUser', function (err, value) {
        if (value) {
          state.userInfoDb = value
        }
      })
      localforage.getItem('cacheGroup', function (err, value) {
        if (value) {
          state.TXGroup = []
          state.TXGroup = value
        }
      })
      localforage.getItem('cacheMessageHistory', function (err, value) {
        if (value) {
          state.singChatbox = value
        }
      })
      localforage.getItem('cacheChatList', function (err, value) {
        if (value) {
          state.list = []
          state.list = value
        }
      })
      localforage.getItem('cachegrossNumber', function (err, value) {
        if (value) {
          state.grossNumber = value
        }
      })
      this.$forceUpdate()
    }
  },
  watch: {
    adddialog () {
      this.candidateOptions = []
      if (this.adddialog === true) {
        if (!this.otherInfo.groupId) {
        this.candidateOptions.push({
            label: this.userinfo.username,
            CODE: this.userinfo.code
          }, {
            label: this.otherInfo.username,
            CODE: this.otherInfo.code
          })
        } else {
          var that = this
          for (var i = 0; i < that.otherInfo.members.length; i++) {
            that.candidateOptions.push({label:that.userInfoDb[that.otherInfo.members[i].id].username,CODE:that.userInfoDb[that.otherInfo.members[i].id].code})
          }
        }
      }
    },
    singChatbox () {
      // 缓存聊天记录
      localforage.setItem('cacheMessageHistory', this.singChatbox)
    },
    TXGroup () {
      // 缓存群组
      localforage.setItem('cacheGroup', this.TXGroup)
    },
    list () {
      // 缓存聊天列表
      localforage.setItem('cacheChatList', this.list)
      let countTotal = 0
      let oData = this.$store.state.list
      for(var i = 0; i < oData.length; i++) {
        countTotal += Number(oData[i].count)
      }
      this.$store.state.grossNumber = countTotal
    },
    search () {
      if(this.search.trim() === ''){
        this.leftTreeShow = true
        this.listSearchShow = false
        return
      }
      this.leftTreeShow = false
      this.listSearchShow = true
      if(this.search){
          let data = {
            oid:window.store.state.userinfo.oid,
            isleader:store.state.userinfo.isleader,
            name:this.search,
            ssid: chat.getSsid()
          }
          //console.log(data)
            axios.post(config.OA_URL+'index/searchphonebook',
              qs.stringify(data),{
                headers: {
                  token: window.store.state.userinfo.token,
                  uid: window.store.state.userinfo.uid
                }
              }).then((response) => {
                for(var i=0;i<response.data.data.length;i++){
                  response.data.data[i].username2 = response.data.data[i].username + '--'+ response.data.data[i].department_name
                }
                this.listSearch = response.data.data
                //console.log(this.listSearch)
            })
      }
    },
    grossNumber () {
      // 缓存未读信息个数
      localforage.setItem('cachegrossNumber', this.grossNumber)
      let that = this
      if(this.grossNumber > 0) {
        // window.timeone = setInterval(function() {
        //   var title = document.title
        //   if (/新/.test(title) === false) {
        //       document.title = '【你有新消息】'
        //   } else {
        //       document.title = '【　　　　　】'
        //   }
        // }, 1000)
      } else {
        // document.title = that.titleInit
        // clearInterval(window.timeone)
      }
      if (this.checked1 === 1) {
        this.showMesV = true
      }
    },
    checked1 () {
      // console.log(userinfo)
      if (this.checked1 === true) {
        this.checked2 = false
        this.desktop = 1
        this.title = 0
      } else {
        this.checked2 = true
        this.desktop = 0
        this.title = 1
      }
      var that = this
      this.settingValue = JSON.stringify({
        desktop: this.desktop,
        title: this.title
      })
      console.log(this.settingValue)
      this.$http.get(config.OA_JAVA_URL + 'user/setMessageSetting', {
        params: {
          token: that.$store.state.userinfo.token,
          uid: that.$store.state.userinfo.uid,
          value: this.settingValue
        }
      }).then(function(response) {
        console.log(response)
      })
    },
    checked2 () {
      if (this.checked2 === true) {
        this.checked1 = false
        this.desktop = 0
        this.title = 1
      } else {
        this.checked1 = true
        this.desktop = 1
        this.title = 0
      }
      this.settingValue = JSON.stringify({
        desktop: this.desktop,
        title: this.title
      })
      let that = this
      console.log(this.settingValue)
      this.$http.get(config.OA_JAVA_URL + 'user/setMessageSetting', {
        params: {
          token: that.$store.state.userinfo.token,
          uid: that.$store.state.userinfo.uid,
          value: this.settingValue
        }
      }).then(function(response) {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="css">
  @import "../assets/fonts/iconfont.css";
  @import "../assets/css/chatting.css";
  @import "../assets/css/chatting-box.css";
  @import "../assets/css/chatting-address-book.css";
  @import "../assets/css/chatting-personnel-list.css";
  @import "../assets/css/chatting-singlechat-box.css";
</style>
