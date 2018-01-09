<template>
  <div id="singleChatbox" class="singleChatbox">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <span class="name" v-if="otherInfo.roomId && otherInfo.roomId != ''" @click='showOtherList()'>{{otherInfo.name}}</span>
          <span class="name" v-else-if="otherInfo.groupId && otherInfo.groupId != ''" @click='showOtherList()'>{{otherInfo.name}}</span>
          <span class="name" v-else @click='showPersonalmes()'>{{otherInfo.username}}</span>
          <i class="el-icon-menu chat-box-menu" @click='showOtherList'></i>
        </div>
        <transition name="slide-fade">
          <div v-if="addmembershow" id='addmember' class="addmember">
            <div class='addIcon'>
              <img src="../assets/img-chat/add.png" alt="" @click='clickAdd'></div>
            <span>增加成员</span>
            <div class="personnelList">
              <div class="member-list-item" v-for="(item, index) in ChatBoxUsers" v-on:click="groupUsersInfo(item,index)" :class="">
                <img :src="item.img" alt="" @error="headImgError">
                <template v-if="chatType === 'singleChat'">
                  <div class="title">{{item.name || item.username}}</div>
                </template>
                <template v-if="chatType === 'chatGroup'">
                  <div class="title"><template v-if="item.affiliation === 'owner'">(群主)</template>{{item.name || item.username}}</div>
                </template>
                <template v-if="chatType === 'chatRoom'">
                  <div class="title"><template v-if="item.affiliation === 'owner'">(管理员)</template>{{item.name || item.username}}</div>
                </template>
                <el-dropdown class="menu" trigger="click" @command="kickGourpUser" placement="bottom-start">
                  <span class="el-dropdown-link" @click='kickGourpUserValue(item)'><i class="el-icon-more"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="openchat" v-if="item.code !== userinfo.code">发送信息</el-dropdown-item>
                    <el-dropdown-item command="3">查看成员信息</el-dropdown-item>
                    <el-dropdown-item command="2" v-if="item.affiliation != 'owner' && isGroupOwner">将成员踢出群组</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <h5 v-show="chatType=='chatRoom'" @click="backRoom">退出聊天室</h5>
            <h5 v-show="chatType=='chatGroup'" @click="backGroup">退出群组</h5>
          </div>
        </transition>
        </el-col>
    </el-row>
    <div class="box_list" id="box_list">
      <div v-for="(obj,index) in MessageHistory">
        <div>
          <div class="listTime">{{obj.showTime}}</div>
          <div class="listContent" v-if="obj.nameType==2">
            <div v-if="obj.formType==1">
              <div class="img" ondragstart="return false;">
                <template v-if="chatType === 'singleChat'">
                  <img :src="addHttp(otherInfo.img)" :title="otherInfo.username" @error="headImgError"></template>
                <template v-if="chatType === 'chatGroup'">
                  <img :src="obj.img" :title="obj.username" @error="headImgError">
                </template>
                <template v-if="chatType === 'chatRoom'">
                  <img :src="obj.img" :title="obj.username" @error="headImgError">
                </template>
              </div>
              <template v-if="chatType === 'chatGroup'">
              <div class="listLeftName" ondragstart="return false;">{{obj.username}}</div>
              </template>
              <div class="text" v-html="obj.value"></div>
            </div>
            <div v-if="obj.formType==2" ondragstart="return false;">
              <div class="img">
                <template v-if="!isGroupChat">
                  <img :src="addHttp(otherInfo.img)" :title="otherInfo.username" @error="headImgError">
                </template>
                <template v-else>
                  <img :src="obj.img" :title="obj.username" @error="headImgError">
                </template>
              </div>
              <template v-if="chatType === 'chatGroup'">
              <div class="listLeftName">{{obj.username}}</div>
              </template>
              <div class="text" v-on:click="openFile(obj)">
                <div class="el-icon-document TXTleft"></div>
                <div class="TXTright">
                  <div class="TXTright_name">{{obj.name}}</div>
                  <div class="TXTright_n" v-text="bytesToSize(obj.size)"></div>
                </div>
              </div>
            </div>
            <div v-if="obj.formType==3" ondragstart="return false;">
              <div class="img">
                <template v-if="!isGroupChat">
                  <img :src="addHttp(otherInfo.img)" :title="otherInfo.username" @error="headImgError">
                </template>
                <template v-else>
                  <img :src="obj.img" :title="obj.username" @error="headImgError">
                </template>
              </div>
              <template v-if="chatType === 'chatGroup'">
              <div class="listLeftName" v-html="obj.username"></div>
              </template>
              <div class="text" v-on:click="openImage(obj)">
                <!-- <div class="el-icon-document TXTleft"></div> -->
                <div class="TXTright">
                  <img :src="obj.url" :title="obj.name" style="max-width:100%;">
                  <!-- <div class="TXTright_name">{{obj.name}}</div> -->
                  <!-- <div class="TXTright_n" v-text="bytesToSize(obj.size)"></div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="listContentRight" v-else>
            <div v-if="obj.formType==1">
              <div class="img" ondragstart="return false;">
                <img :src="reImgUrl(userinfo.img)" :title="userinfo.name" @error="headImgError">
              </div>
              <div class="text" v-html="obj.value"></div>
            </div>
            <div v-if="obj.formType==2" ondragstart="return false;">
              <div class="img">
                <img :src="reImgUrl(userinfo.img)" :title="userinfo.name" @error="headImgError">
              </div>
              <div class="text" v-on:click="openFile(obj)">
                <div class="el-icon-document TXTleft"></div>
                <div class="TXTright">
                  <div class="TXTright_name">{{obj.name}}</div>
                  <div class="TXTright_n" v-text="bytesToSize(obj.size)"></div>
                </div>
              </div>
            </div>
            <div v-if="obj.formType==3">
              <div class="img" ondragstart="return false;">
                <img :src="reImgUrl(userinfo.img)" :title="userinfo.name" @error="headImgError">
              </div>
              <div class="text" v-on:click="openImage(obj)">
                <div class="TXTright" ondragstart="return false;">
                  <img :src="obj.url" :title="obj.name" style="max-width:100%;">
                  <!-- <div class="TXTright_name">{{obj.name}}</div> -->
                  <!-- <div class="TXTright_n" v-text="bytesToSize(obj.size)"></div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Personalmes" v-show='PersonalmesValue'>
      <div class="title">{{otherInfo.username}}的个人信息</div>
      <div class="personnalbaseImg">
        <div class="close" @click='closepersonnalbase'>X</div>
        <div class="avatar">
          <img :src="addHttp(otherInfo.img)" height="37" width="37" alt="">
        </div>
        <div class="baseMes">
          <p>{{otherInfo.username}}</p>
          <span>{{otherInfo.postname}}&nbsp;&nbsp;&nbsp;{{otherInfo.sex}}</span>
        </div>
        <div class="personnalfoot" >
          <div class="email"><span>邮箱: {{otherInfo.email}}</span></div>
          <div class="phone" v-if="userinfo.departmentName === otherInfo.departmentName" ><span>电话: {{otherInfo.phone}}</span></div>
          <div class="phone" v-else ><span>电话: </span></div>
          <div class="department"><span>部门: {{otherInfo.departmentName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="Personalmes" v-show='chatUserInfo'>
      <div class="title">{{kickGourpUsersInfo.username || kickGourpUsersInfo.name}}的个人信息</div>
      <div class="personnalbaseImg">
        <div class="close" @click='chatUserInfo=false'>X</div>
        <div class="avatar">
          <img :src="addHttp(kickGourpUsersInfo.img)" height="37" width="37" alt="">
        </div>
        <div class="baseMes">
          <p>{{kickGourpUsersInfo.username || kickGourpUsersInfo.name}}</p>
          <span>{{kickGourpUsersInfo.postname}}&nbsp;&nbsp;&nbsp;{{kickGourpUsersInfo.sex}}</span>
        </div>
        <div class="personnalfoot" >
          <div class="email"><span>邮箱: {{kickGourpUsersInfo.email}}</span></div>
          <div class="phone" v-if="userinfo.departmentName == kickGourpUsersInfo.departmentName" ><span>电话: {{kickGourpUsersInfo.phone}}</span></div>
          <div class="phone" v-else><span>电话:</span></div>
          <div class="department"><span >部门: {{kickGourpUsersInfo.departmentName}}</span>
          </div>
        </div>
      </div>
    </div>
     <div class="hidden" v-show="singChatboxShow" @click="singChatboxShowHidden"></div>
  </div>
 
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex"
import qs from 'qs'
import chat from '../module/chatting'
export default {
  name: "singleChatbox",
  data() {
    return {
      kickGourpUsersInfo: {},
      singChatboxShow:false,
      addmembershow: false, // 调试用，是否显示群聊添加成员按钮
      loadingValue: true,
      chatUserInfo: false, //聊天时用户信息
      groupCheckedUserInfo: {},
      defaultProps: {
        children: "children",
        label: "label"
      },

      PersonalmesValue: false,
      singleChatBoxName: "吴方华",
      imgUrl: ""
    };
  },
  created(){

  },
  computed: {
    ...mapState({
      singChatlist: state => state.singChatlist,
      singChatbox: state => state.singChatbox,
      image: state => state.image,
      list: state => state.list,
      userinfo: state => state.userinfo,
      other: state => state.other,
      otherInfo: state => state.otherInfo || {},
      currentChatObj: state => state.currentChatObj,
      userInfoDb: state => state.userInfoDb,

    }),
    isGroupChat: function() {
      if (this.otherInfo.roomId && this.otherInfo.roomId != "") {
        return true;
      } else if (this.otherInfo.groupId && this.otherInfo.groupId != "") {
        return true;
      } else {
        return false;
      }
    },
    chatType: function() {
      if (this.otherInfo.roomId && this.otherInfo.roomId != "") {
        return 'chatRoom';
      } else if (this.otherInfo.groupId && this.otherInfo.groupId != "") {
        return 'chatGroup';
      } else {
        return 'singleChat';
      }
    },
    isRoomOwner: function() {
      if (this.otherInfo.roomId && this.otherInfo.roomId != "") {
        for (var i = 0; i < this.otherInfo.members.length; i++) {
          if (
            this.userinfo.code ===
            this.otherInfo.members[i].jid
              .replace("sl_", "")
              .replace("@easemob.com", "")
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    },
    isGroupOwner: function() {
      if (this.otherInfo.groupId && this.otherInfo.groupId != "") {
        if(this.otherInfo.owner === 'sl_'+this.userinfo.code) {
          return true
        } else {
          return false
        }
      } else {
        return false;
      }
    },
    MessageHistory () {
      let tmp = []
      let that = this
      if(this.singChatlist.length == 0 ) return
      for(var i = 0; i < this.singChatlist.length; i++) {
        //console.log('aaaa',this.singChatlist[i].from)
        // console.log('12',this.singChatlist[i].from.indexOf('SL'))
        if( this.singChatlist[i].from.indexOf('SL') === -1 ) {
          this.singChatlist[i].from = 'SL_' + this.singChatlist[i].from
        }
        // console.log(this.singChatlist[i].from)
        //this.singChatlist[i].value = chat.html2Escape(this.singChatlist[i].value)
        if (this.singChatlist[i].formType === 1) {
          let valueNew = chat.decrpty(this.singChatlist[i].value, this.singChatlist[i].from)
          if (valueNew && valueNew.indexOf("[") >= 0 && valueNew.indexOf("]") > 0 ) {
            console.log(1)
            valueNew = chat.ReCont(valueNew)
          }
          let aaa = this.singChatlist[i]
          tmp[i] = Object.assign({}, aaa, {
            value : valueNew
          })
        } else {
          let aaa = this.singChatlist[i]
          tmp[i] = Object.assign({}, aaa)
        }
        let id = ''
        if (this.singChatlist[i].code) {
          id = this.singChatlist[i].code
        } else if (this.singChatlist[i].from) {
          id = this.singChatlist[i].from.replace('SL_', '')
        } else {
          return
        }
        if(this.userInfoDb[id] && this.userInfoDb[id].username){
          tmp[i].username = this.userInfoDb[id].username
        } else {
          tmp[i].username = this.username
          chat && chat.queryUserInfo(id).then(function () {
            that.$forceUpdate()
          })
        }
        if (this.userInfoDb[id] && this.userInfoDb[id].img) {
          tmp[i].img = this.userInfoDb[id].img
        } else {
          tmp[i].img = this.image
          chat && chat.queryUserInfo(id).then(function () {
            that.$forceUpdate()
          })
        }
      }
      return tmp
    },
    ChatBoxUsers() {
      // console.log('对话窗口，右侧菜单对象')
      // 对话窗口，右侧菜单对象
      console.log('111111', this.otherInfo)
      let that = this
      if (this.otherInfo.roomId && this.otherInfo.roomId !== '') {
        let tmp = []
        let om = this.otherInfo.members
        for (let i = 0; i < om.length; i++) {
          let img = ''
          let code = ''
          if(om[i].affiliation === 'owner') {
            code = om[i].jid.replace('sl_', '').replace('@easemob.com', '')
          } else {
            code = om[i].jid.split('_')[2].split('@')[0]
          }
          chat.queryUserInfo(that.userinfo.uid).then((x) => {
            let re = x
            re.affiliation = that.otherInfo.members[i].affiliation
            tmp.push(re)
          })
        }
        return tmp
      } else if (this.otherInfo.groupId && this.otherInfo.groupId !== '') {
        let tmp = []
        let om = this.otherInfo.affiliations
        for (let i = 0; i < om.length; i++) {
          if (om[i]['owner']) {
            let code = om[i]['owner'].substring(3)
            chat && chat.queryUserInfo(code).then(function(x) {
              let o = Object.assign(x, {
                code: code,
                name: x.username,
                affiliation: 'owner'
              })
              tmp.push(o)
              that.$forceUpdate()
            })
          } else {
            let code = om[i]['member'].substring(3)
            chat && chat.queryUserInfo(code).then(function(x) {
              let o = Object.assign(x, {
                code: code,
                name: x.username,
                affiliation: 'member'
              })
              tmp.push(o)
              that.$forceUpdate()
            })
          }
        }
        return tmp
      } else {
        if (this.otherInfo.code === this.userinfo.code) {
          return [this.otherInfo]
        } else {
          return [{
            code: this.userinfo.code,
            name: this.userinfo.name,
            email: this.userinfo.email,
            phone: this.userinfo.phone,
            departmentName: this.otherInfo.departmentName,
            postname: this.userinfo.postname,
            sex: this.userinfo.sex,
            img: this.userinfo.img,
            affiliation: 'member'
          }, {
            code: this.otherInfo.code,
            name: this.otherInfo.username,
            email: this.otherInfo.email,
            departmentName: this.otherInfo.departmentName,
            phone: this.otherInfo.phone,
            sex: this.otherInfo.sex,
            postname: this.otherInfo.postname,
            img: this.otherInfo.img,
            affiliation: 'member'
          }]
        }
      }
    }
  },
  watch: {
    'list': {
      handler:function(val, oldval) {
        this.$nextTick(function () {
          this.$forceUpdate()
        })
      },
      deep:true
    },
    'TXGroup': {
      handler:function(val, oldval) {
        this.$nextTick(function () {
          this.$forceUpdate()
        })
      },
      deep:true
    },
    'otherInfo': {
      handler:function(val, oldval) {
        if(val.name && val.name.length > 10) val.name = val.name.substring(0,10) + '...'
        if(oldval.name && oldval.name.length > 10) oldval.name = oldval.name.substring(0,10) + '...'
        this.$nextTick(function() {
          this.$forceUpdate()
        })
      },
      deep:true
    },
    singChatlist: {
      handler: function(val, oldval) {
        setTimeout(function() {
          document.getElementById('box_list').scrollTop = document.getElementById('box_list').scrollHeight
        }, 200)
        let that = this
        for(var i = 0; i < val.length; i++) {
          let id = ''
          if (val[i].code) {
            id = val[i].code
          } else if (val[i].from) {
            id = val[i].from.replace('SL_', '')
          } else {
            return
          }
          if (this.userInfoDb[id] && this.userInfoDb[id].img) {
            this.$forceUpdate()
          } else {
            // console.log('找不到用户' + id + '信息, 通过接口获取')
            chat && chat.queryUserInfo(id).then(function () {
              that.$forceUpdate()
            })
          }
        }
      },
      deep: true
    },
    addmembershow: {
      handler: function(val, oldval) {
        // console.log(val);
        if (
          val === true &&
          this.otherInfo &&
          this.otherInfo.roomId &&
          this.otherInfo.roomId != ""
        ) {
          this.initRoomMember(this.otherInfo)
        }
      },
      deep: true
    }
  },
  methods: {
    singChatboxShowHidden () {
       this.addmembershow = false;
       this.singChatboxShow = false;
    },
    getChatMessageList () {
      console.log('pddddd',this.singChatbox)
    },
    //获取踢出用户信息
    kickGourpUserValue (item) {
      this.kickGourpUsersInfo = item
      console.log(this.kickGourpUsersInfo)
    },
    //踢出群成员
    kickGourpUser(x){
      if(x === '2'){
        let that = this
        console.log('this.otherInfo',this.otherInfo)
        chat.removeSingleGroupMember(that.otherInfo.groupid, 'sl_' + this.kickGourpUsersInfo.code).then(function (x) {
          console.log('delete,', x)
          chat.updateGroup(that.otherInfo.groupid, 'GROUP_MEMBER_DELETE', x.data.user.replace('sl_', '')) // 更新群信息，删除一个用户
          that.$message({type: 'success', message: '踢出成功!'});
        }, function (e) {
          that.$message({type: 'error', message: '踢出失败!'
          });
          console.log('踢出失败', e)
        })
        // this.addToGroupBlackList(this.otherInfo.groupid,this.kickGourpUsersInfo.code); //code码就是id
      }
      if(x === '3'){
        this.chatUserInfo = !this.chatUserInfo;
      }
      if (x === 'openchat') {
        // console.log(this.kickGourpUsersInfo)
        let tmp = this.kickGourpUsersInfo
        document.getElementById('textarea').innerHTML = ''
        // this.$store.dispatch('openChatBox', {item: tmp, index: 0})
        // this.$parent.sectionType = 1 // 切换到聊天列表
        this.$store.dispatch('openChatBox', {item: tmp})
        // this.$nextTick(function () {
        //   this.$store.state.personnelistIndex = 0
        // })
      }
    },
    // 将成员踢出群(同将群成员拉入群黑名单)
    addToGroupBlackList(groupid,userId) {
      console.log('roomId,userId',groupid,userId)
      var that = this;
      var option = {
        to: 'sl_'+userId, // 需要删除的成员ID
        roomId: groupid, // 群组ID
        success: function () {
          console.log('踢人')
          chat.updateGroup(groupid, 'GROUP_MEMBER_DELETE', userId) // 更新群信息，删除一个用户
          that.$message({
            type: 'success',
            message: '群成员踢出成功!'
          });
        },

      };
      this.$conn.leaveGroupBySelf(option);
    },
    //退出聊天室
    backRoom(){
      if(this.isRoomOwner == true) {
        console.log('我是聊天室主')
        this.$confirm('此操作将解散此聊天室, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '聊天室已解散!'
          });
          this.destroyGroup(this.otherInfo.roomId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解散'
          });
        });
      } else {
        this.$confirm( '将不在接收' + this.otherInfo.name + '聊天室聊消息!' , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退聊天室成功!'
          });
          this.leaveGroup(this.otherInfo.roomId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出聊天室'
          });
        });
      }
    },
    //退出群聊
    backGroup(){
      console.log('isGroupOwner=',this.isGroupOwner)
      let that = this
      if(this.isGroupOwner == true){
        console.log('我是群主')
        this.$confirm('此操作将解散此群, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addmembershow = false;
          chat.deleteGroup(that.otherInfo.groupId).then(function () {
            chat.updateGroup(that.otherInfo.groupId, 'delete')
            that.$message({type: 'success', message: '解散成功!'});
          }, function () {
            that.$message({type: 'error', message: '解散失败!您的群不存在或者重新刷新页面'})
          })
        }).catch(() => {
          this.addmembershow = false;
          this.$message({
            type: 'info',
            message: '已取消解散'
          });
        });
      } else {
        this.$confirm( '将不在接收' + this.otherInfo.name + '群聊消息!' , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addmembershow = false;
          console.log('this.otherInfo',this.otherInfo)
          // this.leaveGroup(this.otherInfo.groupId)
          chat.quitGroup(that.otherInfo.groupId).then(function () {
            chat.updateGroup(that.otherInfo.groupId, 'delete')
            that.$message({type: 'success', message: '退群成功!'});
          }, function () {
            that.$message({type: 'error', message: '退群失败!'});
          })
        }).catch(() => {
          this.addmembershow = false;
          this.$message({
            type: 'info',
            message: '取消退群'
          });
        });
      }
    },
    // 解散一个聊天室(聊天室主人退出)
    destroyGroup(roomId){
      var that = this;
      var option = {
            reason: 'Test Destroy Group',
            roomId: roomId,
            success: function () {
                that.listGroups();
                console.log('Destroy group success!');
            }
        };
        this.$conn.destroyGroup(option);
    },
    //群员退群或聊天室
    leaveGroup(groupId){
      console.log('roomid=',groupId)
      console.log('this.userinfo.code=',this.userinfo.code)
      var that = this;
      var option = {
        to: "sl_" + this.userinfo.code,
        roomId: groupId,
        success: function () {
          //that.listGroups();
          chat.updateGroup(groupId, 'delete')
            console.log('You leave room succeed!');
        },
        error: function () {
            console.log('Leave room faild');
        }
      };
      console.log(option)
      this.$conn.leaveGroupBySelf(option);
    },
    //获取群列表
    listGroups() {
      var that = this
      this.$conn.listRooms({
        success: function(rooms) {
          console.log('取到所有聊天室信息:', rooms)
          that.$store.dispatch("writeStructIsShow", false); // 右侧栏写入框是否显示  默认为false    每次用户选择当前群组或聊天对象时才显示
          window.store.dispatch('destroyRoom')
          for(var i =0; i< rooms.length; i++) {
            console.log('获取聊天室信息,id:' + rooms[i].roomId)
            that.getRoomInfo(rooms[i])
          }
        },
        error: function() {
          console.log("List chat rooms error");
        }
      })
    },
    getRoomInfo(item) { // 聊天室
      if (item.roomId == undefined || item.roomId == null || item.roomId == '') {
        return
      }
      let that = this
      console.log('获取单个聊天室的信息', item)
      this.$conn.queryRoomInfo({
        roomId: item.roomId,
        success: function(settings, members, fields) {
          let tmpRoom = item
          if (settings) { tmpRoom.settings = settings }
          if (members) { tmpRoom.members = members }
          if (fields) { tmpRoom.fields = fields }
          console.log(tmpRoom)
          window.store.dispatch('buildRoom', tmpRoom)
          return tmpRoom
        },
        error: function(e) {
          console.log("Error!", e);
        }
      });
    },
    groupUsersInfo:function(list,index){
      //点击头像获取用户信息
      this.groupCheckedUserInfo.username = list.jid
      this.groupCheckedUserInfo.email = list.email
      this.groupCheckedUserInfo.img = list.img
      this.groupCheckedUserInfo.departmentName = list.departmentName
      this.groupCheckedUserInfo.phone = list.phone
      this.groupCheckedUserInfo.postname = list.postname
      this.groupCheckedUserInfo.sex = list.sex
      this.$parent.isShowImMask = true;
    },
    initRoomMember() {
      console.log("聊天室相关信息");
    },
    otherImg(img) {
      let oimg = img;
      if (oimg == "public.testoa.shanlinjinrong.com") {
        oimg = "http://" + oimg;
      }
      if (oimg && oimg.length > 0 && oimg.indexOf("http://") != 0) {
        oimg = "http://" + oimg;
      }
      if (
        oimg == "http://public.testoa.shanlinjinrong.com" ||
        oimg == "public.testoa.shanlinjinrong.com"
      ) {
      }
    },
    reImgUrl(url) {
      let oimg = url
      if (url == "" || url == "http://") {
        oimg =
          "data:image/jpeg;base64,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";
      }
      return oimg
    },
    headImgError (img) {
      img.target.src = this.$store.state.image
      img.onerror = null // onerror不再触发
    },
    // fetchUserHead(x) {
    //   console.log(x);
    //   let that = this;
    //   let code = x.CODE || x.code;
    //   window.axios.get(
    //   config.OA_URL + 'user/getinfo',
    //   {
    //     params: { code: code },
    //     headers: { token: that.userinfo.token, uid: that.userinfo.uid }
    //   }).then(response => {
    //     // that.$store.state.userInfoDb[code] = response.data.data[0]
    //     that.otherUserImg = response.data.data[0].img;
    //   });
    // },
    addHttp(url) {
      let oimg = url;
      if (
        url &&
        url != "" &&
        url.length > 0 &&
        url.indexOf("http://") != 0 &&
        url.indexOf("data") != 0
      ) {
        oimg = "http://" + url;
      }
      if (url == "") {
        // console.log('2', oimg)
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBcRXhpZgAATU0AKgAAAAgABAMCAAIAAAAWAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAAOxFESAAQAAAABAAAOxAAAAABQaG90b3Nob3AgSUNDIHByb2ZpbGUA/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAUABQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/aSjOKKjY5NfZNnyCVxxemlqaz4rwn9r7/goH4N/ZElXSruG48TeMp4Vnj0KxlVGto2+7JdSnIhVuoXBdhyFxzXPWrwpx5ps2pUZVJcsFdnvG7Pejf71+ZGvf8Fo/ipqF47ab4f8B6Pb5+SI2k94yj3d5Bk/gPpV3wH/AMFqviFo+px/8JN4V8I+ItP3fvVslk0y6A/2G3OhP+8uPeuH+1qN+p3/ANlV7XsvvP0rDkU4PmvNv2av2pvB/wC1d4Hk1rwjezNJYssWpaXdqI77SZG+6sqAkFWwdsiEo2Dg5BA9FDZr0KdWM480XoefUpuL5ZKzJaD0pqNTj0ra+hl1GueKjc4FSOeagkaoky4nD/tKfGuH9nX4B+LPG8sMd1J4fsWktLd/u3N05EcEZ9jIy5HoDX5AfDb4V/ED9rL4oahBoen6j4x8WapK2paves4SNHkb5p7iZiEiUnhQT0AVQQMV+i3/AAWIv20/9g/WJFyw/t7Styg/fAldsfmBXqn7F/7Pmn/sz/s5eHfD9nDGNSvLWLU9buguJL++mQO7Me4QERoOiqgx1NfG8RZg6Mkl8j67h/B+1i7d9fQ+GbH/AIIr/Fi5tI5J/Efw8s5mGWhN1dTGM+m5YsH8Kr+If+CMfxe0jTJJ7HVfAeuXCDItYL+a2kk9laWMJn2JH1r9QKK+S/tfEX6fcfWf2XSt1Pxf+DPxJ8WfsG/tRafqmraXqmg6nocy2niHSLxDE93p0pHmow6Ou395G6kruRSp61+zgkjk2vDIJoJFEkUg6SIwDK34qQfxr5T/AOCxvwF0/wCJf7Ius+Mhbxr4i+HdubuC6C/vJbF2CXFux7p8wkUH7rISPvHP0N8HJmm+DPgqR2LSP4d01mJ6k/ZIq+24dx3t4P8ArU+J4gwnspq+/wCh1QOaeeV/CoozUgPyV9VFnzTEf71QSVM7c1Vnm21MhxZ43/wUG+Dd98ff2NfHnhzSYWuNcWzXVdLhUfNPc2reckY92VXUepIHevSfgr42h+JfwV8G+Irdt0Ou6DY3qn/ft0JHsQ2QR2Iq7PqJgdXVirKQykHBBHQipvCNnZ6Z4fgtbG3t7O1gLhIIE2RxksWbCjgZZicDua+G4sw/uRrLvb71/wAA+y4UxH72VHyv+RpUUUV8MfdHi/8AwUJ0m/8AGH7I3ibwnpEbTax4/nsvClkgGcveXMaO30SISuT2CE16xpWlW/h/SrPTbM7rTTLaKygP96OJFjU/iFB/GjXZo4xb7ljZ1ctGWAJQ4IJHocEjI7E+tMtbpWHWv0ThPD8uG9q/tN/ctPzPzvijEc2K9kvspfe/6RoRf0qVfuGoIXzU4PyGvr47HyxXuZ9grG1PURHnmreqXWxTXG+JNa8lW+alI5KtblJNU8QBC3zVT0b4mf8ACO3bbl863kP7yMH5h7qfX2715f8AFb4wWfgLTftF40kkkxKW9vFjzbhh1AzwAO7HgfpXies/tK+JdQmZrWHSrGP+FGiac+2WJH6Cvlc8zjLqCeHxbu3vFK78r7W7rW/U/QOBvDviviGP9oZNSUacW0qk5csW1o0tG5W2bUXFO6burH3bpXxM0LV48x6hFEyjLJMCjL+lRa58VNF0Zdq3QvJmGVjhBP5k8CvAfhD8U/CfizS1mh1KHS9UeNRdWOoXIR4mHUozYV0J5BHOOCBWH8efjdofhyyaHRL+31bxEwEaGB/MtbJc5LSkcM2MgID3ycAV+awzHA/X7NS9h8ua9uutrXvtrY/TIcF8UVcOsFCkljb2ad+RK9ubms9OWzvrF9L6I9wbxy+tXzTSMo3cKoPCD0H+NbWlayJQPmr418NftUa9pV0v9o2VjqNvn5xbg28wH+zyVJ+uPrX0J8M/iVY+NtFt9Q0+4861mJX5hteJh95HX+Fh3H9K/UslzjA4uPssI7cq+Fqzt+vyv57n5TxpwDxLw1KNfOqXuVHZVIy5oOW9m9Gna9lJRvZ8t0nb2axvN61oRvla5XQdS81V5rpLWXen4V9JE+Np1OYwdfudiNXmvjTVCgbmu+8TOVjavKPHdxgSVMjx8dUaR80fGPXZPEPxM1JpGZksCLOFT0VVALY+rEk/QVzJStTxu27x3rh9b1/5Cs2v59zabnja0pavml+bP9SOAcPTw/DOXUaKtFUKWnrCLb9W2231bbI3gWVcMqsPQjNKsWxdowqjoAKfRXncp9dzCBcV6X+yx4jk0nx9eadub7PqdsZymeBJFjDfUqxH0ArzWuy/Z+fZ8WLU/wDTncfyWvb4dnKGZ0HHT3kvk9H+DPzfxgw9OvwXmUayulSlJf4oe/F/KUU/kfZPhS/3otdxpUu5BXmngyUsqV6JorbkH0r96if5uYOTaP/Z";
      }
      return oimg;
    },
    openFile (file) {
      window.location.href = file.url
    },
    openImage (img) {
      let h = this.$createElement
      this.$msgbox({
        title: '查看图片',
        customClass: 'chatting-message-history',
        message: h('img', {
          class: 'message-history-img-view',
          attrs: {
            src: img.url,
            title: img.name,
            alt: img.name,
          }
          // style: 'width: 100%;height: 100%;max-width: 600px;max-height: 500px;max-height: calc(100vh - 163px);'
        }),
        showCancelButton: true,
        confirmButtonText: '下载',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            window.location.href = img.url
            done()
          } else {
            done()
          }
        }
      }).then(action => {
        done()
      })
    },
    // 模糊查询
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 添加人员取消按钮
    addCancel() {
      this.adddialog = false
    },
    getNodeStyle() {
      // debugger
      var parentNode = document.getElementById("addressTreeleft");
      var a = parentNode.getElementsByClassName("el-tree-node__label");
      for (var i = 0; i < a.length; i++) {
        if (a[i].parentNode.childNodes[0].classList === "el-tree-node__expand-icon el-icon-caret-right is-leaf") {
          if (a[i].parentNode.childNodes.length === 5) {
            return;
          } else {
            var img = document.createElement("img");
            img.classList.add("spanImg");
            a[i].before(img);
          }
        }
      }
    },
    handleNodeAdd(Nodedata) {
      var parentNode = document.getElementById("addressTreeleft");
      var a = parentNode.getElementsByClassName("el-tree-node__label");
      for (var i = 0; i < a.length; i++) {
        if (
          a[i].parentNode.childNodes[0].classList ==
          "el-tree-node__expand-icon el-icon-caret-right is-leaf"
        ) {
          if (a[i].innerHTML == Nodedata.label) {
            for (var i = 0; i < this.candidateOptions.length; i++) {
              if (
                this.candidateOptions[i].label.indexOf(Nodedata.label) != -1
              ) {
                return;
              } else {
              }
            }
            this.candidateOptions.push({
              label: Nodedata.label,
              id: Nodedata.id
            });
          }
        }
      }
    },
    // 模糊查询选择
    // handleSelectRebate (scope) {},
    // 模糊查询调取
    // querySearchAsyncRebate (queryString, cb) {},
    // 点击姓名出现个人信息弹框
    showPersonalmes() {
      this.PersonalmesValue = true
      this.$parent.isShowImMask = true
    },
    // 关闭个人信息弹框
    closepersonnalbase() {
      this.PersonalmesValue = false
      this.$parent.isShowImMask = false
    },
    showOtherList () {
      this.addmembershow = !this.addmembershow
      this.singChatboxShow = true
      //this.$parent.isShowImMask = true;
    },
    // 点击+ 添加人员
    clickAdd() {
      //this.addmembershow = false
      // this.dialogVisibleAdd = true
      this.$parent.adddialog = true
      this.$parent.isShowImMask = true
      this.candidateOptions = []
      this.getNodeStyle()
    },
    bytesToSize (bytes) {
      return chat.bytesToSize(bytes)
    }
  }
}
</script>
