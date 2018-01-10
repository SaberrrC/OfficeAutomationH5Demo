<template>
  <div class="communication">
     <div class="groupHead">
       <input class="search search-group" style='text-align:center' v-model="searchMessg" placeholder="群组搜索"></input>
       <i class="el-icon-plus" @click="addGroup"></i>
     </div>
     <div class="group_list"><!-- <div v-for='(item,index) in TXGroup' class="group_listLi"> -->
      <div v-if="isRoomType" v-for='(item, index) in rooms' class="group-item"><!-- <div class="groupImg"><img :src='item.src' alt=""></div> -->
        <div class="group-name" @click="openChatBox(item)">{{strSubString(item.name)}}</div>
        <el-dropdown class="group-item-menu" trigger="click" @command="handleCommand" placement="bottom-start">
          <span class="el-dropdown-link" @click='clickValue(item)'><i class="el-icon-more"></i></span>
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item command="0" >发送信息</el-dropdown-item>-->
              <el-dropdown-item command="1" >修改聊天室名字</el-dropdown-item>
              <!--<el-dropdown-item command="2">添加删除成员</el-dropdown-item>-->
              <el-dropdown-item command="3">退出聊天室</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-if="!isRoomType" v-for='(item, index) in groups' class="group-item" :class="groupIdShow === item.id ? 'selectBackground' : '' "><!-- <div class="groupImg"><img :src='item.src' alt=""></div> -->
        <div class="group-name" @click="openChatBox(item)">{{strSubString(item.groupname)}}</div>
        <el-dropdown class="group-item-menu" trigger="click" placement="bottom-start">
          <span class="el-dropdown-link" @click='clickValue(item)'><i class="el-icon-more"></i></span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="isThisOwner(item)" @click.native="modifyGroup(item)">修改群组名字</el-dropdown-item>
              <el-dropdown-item @click.native="gourpExit(item)">
                <template v-if="isThisOwner(item)">解散群组</template><template v-else>退出群组</template>
              </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
     </div>
     <div class="group_list listSearch" v-show="g_listSearchShow">
      <div v-for='(item, index) in searchTXRG' class="group-item">
        <div class="group-name" @click="openChatBox(item)">{{strSubString(item.name)}}</div>
        <el-dropdown class="group-item-menu" trigger="click" @command="handleCommand" placement="bottom-start">
          <span class="el-dropdown-link" @click='clickValue(item)'><i class="el-icon-more"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="isThisOwner(item)" @click.native="modifyGroup(item)">修改群组名字</el-dropdown-item>
            <el-dropdown-item @click.native="gourpExit(item)">
              <template v-if="isThisOwner(item)">解散群组</template><template v-else>退出群组</template>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
     </div>
     <div class="modifyGroupName">
       <div class="modifyGroupDialog" v-show='modifyGroupDialogValue'>
          <span>修改群名称：</span>
          <el-input size='small' v-model="modifyGroupValue" placeholder="请输入群名称"></el-input>
          <el-button size='small' @click="modifyCancle"> 取消</el-button>
          <el-button size='small' @click="modifySure" type="primary">确定</el-button>
        </div>
     </div>
    <div class="addGroupDialog" v-if='isShowGroupAdd'>
      <span>新建群名称：</span>
      <el-input size='small' v-model="groupAddName" placeholder="群名称"></el-input>
      <el-button size='small' @click="groupAddCancel">取消</el-button>
      <el-button size='small' @click="groupAddSure" type="primary">确定</el-button>
    </div>
    <div class="addGroupDialog" v-show='addGroupDialogValue'>
      <span>新建群名称：</span>
      <el-input size='small' v-model="addGroupValue" placeholder="请输入群名称"></el-input>
      <el-button size='small' @click="addCancle">  取消</el-button>
      <el-button size='small' @click="addSure" type="primary">确定</el-button>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import chat from '../module/chatting'
export default {
  name: "listGroupBook",
  data() {
    return {
      // groups: [],
      g_listSearchShow:false,
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      modifyGroupDialogValue:false,
      addGroupValue: "",
      addGroupDialogValue: false,
      modifyGroupValue:'',
      searchMessg: "",
      groupUsers:false,
      oldGroupValue:[],
      listShow: true,
      groupMexu: false,
      index: "",
      groupName: "",
      isRoomType: false, // 聊天室模式
      isShowGroupAdd: false,
      groupAddName: '',
      searchTXRG:[]
    };
  },
  mounted() {
    chat.checkGroups()
  },
  created() {
  },
  computed: {
    ...mapState({
      singChatbox: state => state.singChatbox,
      grossNumber: state => state.grossNumber, //全部未读消息
      userinfo: state => state.userinfo,
      TXGroup: state => state.TXGroup,
      TXRoom: state => state.TXRoom,
      list: state => state.list,
      userInfoDb: state => state.userInfoDb,
      groupIdShow: state => state.groupIdShow,
      showSid: state => state.showSid
    }),
    groups () {
      let tmp = []
      let arr = this.TXGroup
      for(let i =0; i < arr.length; i++) {
        tmp.push(arr[i])
      }
      return tmp
    },
    rooms: function () {
      let tmp = []
      let arr = this.TXRoom
      for(let i =0; i < arr.length; i++) {
        tmp.push(arr[i])
      }
      return tmp
    }
  },
  methods: {
    strSubString (str) {
      let tmp = ''
      if(str && str.length > 10) {
        tmp = str.substring(0, 10) + '...';
      } else {
        tmp = str
      }
      return tmp
    },
    modifyCancle(){
      this.modifyGroupDialogValue = false
    },
    modifyGroup (group) {
      console.log(group)
      this.modifyGroupDialogValue = true
      this.oldGroupValue = group;
      this.modifyGroupValue = group.groupname
    },
    isThisOwner (group) {
      if (group && group.owner && group.owner === 'sl_' + this.userinfo.code) {
        return true
      } else {
        return false
      }
    },
    //聊天室修改名称确定
    modifySure() {
      let tmpGroupName = this.modifyGroupValue.replace(/&nbsp;/g," ")
      if (tmpGroupName == '' || !tmpGroupName || tmpGroupName.trim() == '') {
        this.$message({message: "群组名不能为空！", type: "warning"});
        return false;
      } else {
        this.changeRoomInfo(this.oldGroupValue.groupId, tmpGroupName);
        this.modifyGroupDialogValue = false;
        this.modifyGroupValue = '';
      }
    },
    addCancle() {
      this.addGroupValue = "";
      this.addGroupDialogValue = false;
    },
    handleClose(){
    },
    addSure() {
      if (this.addGroupValue) {
        // 确认新建群组
        this.createRoom(this.addGroupValue);
        this.addGroupValue = "";
      } else {
        this.$message({
          message: "请先输入群组名再建立群组！",
          type: "warning"
        });
        return;
      }
      this.addGroupDialogValue = false;
    },
    getItem(item) {
      // console.log(document.getElementById('groupName'))
    },
    // modifyItem(item) {
    //   this.changeGroupInfo(item.roomId, item.name);
    // },
    createRoom(name) {
      // 创建了聊天室
      var option = {
        subject: name, // 聊天室名称
        description: "", // 聊天室简介
        members: [],//["SL_011000068", "SL_011000070"], // 以数组的形式存储需要加聊天室的好友ID
        optionsPublic: true, // 允许任何人加入
        optionsModerate: false, // 加入需审批
        optionsMembersOnly: false, // 不允许任何人主动加入
        optionsAllowInvites: false // 允许群人员邀请
      };
      this.$conn.createGroup(option);
      setTimeout(() => {
        console.log(this.$parent.groupValue);
        this.changeRoomInfo(
          this.$parent.groupValue.roomId,
          this.$parent.groupValue.groupName
        );
      }, 500);
    },
    // 修改群信息
    changeRoomInfo(id, name) {
      console.log('来了来了！！changgeroominfo',id,name)
      var that = this;
      var option = {
        roomId: id,
        subject: name,
        description: "Change group information test",
        success: function() {
          chat.updateGroup(id, 'updatename', {
            groupId: id,
            groupName: name
          }) // 修改本地群名称
          chat.sendCmdMessage('updateGroupName', id, {
            groupId: id,
            groupName: name
          }) // 广播更改群名称通知
          that.$message({
            type: 'success',
            message: '成功修改群名为'+name+'！'
          });
        }
      };
      this.$conn.changeGroupSubject(option);
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
    //获取聊天室列表
    listRooms() {
      var that = this
      this.$conn.listRooms({
        success: function(rooms) {
          console.log('取到所有聊天室信息:', rooms)
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
    // 创建群组弹框框显示隐藏
    addGroup() {
      if (this.isRoomType) {
        this.addGroupDialogValue = !this.addGroupDialogValue;
        //this.$parent.adddialog = true;
      } else {
        this.isShowGroupAdd = true;
        //this.$parent.adddialog = true;
      }
    },
    groupAddCancel() {
      this.isShowGroupAdd = false
      this.groupAddName = ''
    },
    groupAddSure() {
      // this.isShowGroupAdd = false
      console.log('groupAddName=',this.groupAddName)
      if (this.groupAddName == '' || !this.groupAddName) {
        this.$message({
          message: "群组名不能为空！",
          type: "warning"
        });
      } else {
        let mbs = [] // test ['sl_011000252', 'sl_011000060']
        chat && chat.createGroup({
          name: this.groupAddName,
          members: mbs
        },
        this.groupAddCancel())
      }
    },
    // 解散聊天室(群主退出群)
    deleteRoom(roomId) {
      console.log('pdddd2',roomId)
      var that = this;
      var option = {
        reason: '解散聊天室',
        roomId: roomId,
        success: function () {
          that.listRooms();
          console.log('解散成功!');
        }
      };
      this.$conn.destroyGroup(option);
    },
    // span点击事件
    clickValue(item){
      this.oldGroupValue = item;
      this.modifyGroupValue = item.name
    },
    // 聊天室事件
    handleCommand(command) {
      console.log(command)
      if (command == 1) {
        this.modifyGroupDialogValue = true;
      }
      if (command == 0) {
        console.log('群信息发送功能')
      }
      if(command==2){
          this.$parent.adddialog = true;
      }
      if(command == 3)
        this.roomExit()
      // this.$message("click on item " + command);
    },
    //退出聊天室
    roomExit() {
      let code = '';
      let identity = '';
      console.log(this.oldGroupValue)
      for(var i = 0;i< this.oldGroupValue.members.length; i++){
        if(this.oldGroupValue.members[i].affiliation == "owner"){
          code = this.oldGroupValue.members[i].jid.replace("sl_", "").replace("@easemob.com", "")
        }else{
          code = this.oldGroupValue.members[i].jid.split('_')[2].split('@')[0]
        }
        if(this.userinfo.code == code){
          identity = this.oldGroupValue.members[i].affiliation;
        }
      }
      if(identity == 'owner'){
        this.$confirm('此操作将解散此群, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '群已解散!'
          });
          this.deleteRoom(this.oldGroupValue.roomId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解散'
          });
        });
      }
      else{
        this.$confirm( '将不在接收13333' + '群聊消息!' , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.leaveGroup(this.oldGroupValue.roomId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退群'
          });
        });
      }
    },
    //退出群组
    gourpExit(item) {
      console.log(item)
      console.log(this.otherInfo)
      
      let o = this.$store.state.TXGroup.filter((x) => {return x.id === item.id})
      if (!o || o.length < 1) {
        return
      }
      let group = o[0]
      let code = '';
      let identity = '';
      let that = this
      console.log(group.members)
      for(var i = 0;i< group.members.length; i++){
        if(this.userinfo.code == group.members[i].id){
          identity = group.members[i].affiliation;
        }
      }
      console.log('identity=',identity)
      if(identity == 'owner') {
        this.$confirm('此操作将解散此群, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chat.deleteGroup(group.groupId).then(function () {
            chat.updateGroup(group.groupId, 'delete')
            that.$message({type: 'success', message: '解散成功!'});
          }, function () {
            that.$message({type: 'error', message:'解散失败!您的群不存在或者重新刷新页面'})
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消解散'});
        });
      } else if(identity == 'member') {
        this.$confirm( '确定退出此群？' , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chat.quitGroup(group.groupid).then(function () {
            chat.updateGroup(group.groupid, 'delete')
            that.$message({type: 'success', message: '退群成功!'});
          }, function () {
            that.$message({type: 'error', message: '退群失败!'});
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退群'
          });
        });
      }else{
         that.$message({type: 'warning', message: '请刷新页面重新操作!'});
      }
    },
    // 群员自主退聊天室
    leaveGroup(id) {
      console.log('退出时的Id=',id)
      console.log('to=',this.userinfo.code)
      var that = this;
      var option = {
        to: "sl_" + this.userinfo.code,
        roomId: id,
        success: function () {
          if (that.isRoomType) {
            that.listRooms()
          } else {
            chat.updateGroup(id, 'delete')
            //that.listGroups()
          }
          that.$message({
            type: 'success',
            message: '退群成功!'
          });
            console.log('You leave room succeed!');
        },
        error: function () {
            that.$message({
            type: 'success',
            message: '退群失败，请刷新页面或清除缓存!'
          });
            console.log('Leave room faild');
        }
      };
      console.log(option)
      this.$conn.leaveGroupBySelf(option);
    },
    async openChatBox (item) {
      console.log(item)
      this.$store.state.showSid = 'G_' + item.id
      console.log('this.$store.state.showSid',this.$store.state.showSid)
      if (item.groupid) { // 检查群是否存在(龚海平要求)
        try {
          await chat.queryGroupInfo(item.groupid)
        } catch (error) {
          if (error && error.type === 17 && JSON.parse(error.data).error === 'service_resource_not_found') {
            chat.updateGroup(item.groupid, 'delete')
            console.log('服务器找不到此群')
            return
          }
        }
      }
      console.log('打开群组聊天', item)
      this.$store.dispatch('openChatBox', {item: item}) // 通讯录点击添加对话列表
      this.searchMessg = '';
      this.$parent.sectionType = 1 // 切换到聊天列表
      this.$store.state.groupIdShow = '';//取消群高亮
    },
    loadGroupAddEvent: function (e) {
      if (!this.$el.contains(e.target)) {
        this.groupAddCancel()
      }
    }
  },
  watch:{
    'isShowGroupAdd': {
      handler:function(val, oldval) {
        if (val && !oldval) {
          document.addEventListener('click', this.loadGroupAddEvent, true)
        } else {
          document.removeEventListener('click', this.loadGroupAddEvent, true)
        }
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
    'list': {
      handler:function(val, oldval) {
        this.$nextTick(function () {
          this.$forceUpdate()
        })
      },
      deep:true
    },
    searchMessg() {
      this.searchTXRG = []
      if (this.searchMessg.trim() == '') {
        console.log(2)
        this.g_listSearchShow = false
        return
      } else {
        this.g_listSearchShow = true
        // console.log(this.searchMessg)
        if (this.isRoomType) {
          // console.log(this.TXRoom)
          for(var i =0; i<this.TXRoom.length; i++){
            if(this.TXRoom[i].name.indexOf(this.searchMessg) >= 0)
            this.searchTXRG.push(this.TXRoom[i])
          }
        } else {
          console.log(this.TXGroup)
          for(var i = 0; i < this.TXGroup.length; i++) {
            if (this.TXGroup[i].groupname.indexOf(this.searchMessg) >= 0) {
              this.TXGroup[i].name = this.TXGroup[i].groupname
              this.searchTXRG.push(this.TXGroup[i])
            }
          }
        }
        console.log(this.searchTXRG)
       }
    }
  }
};
</script>
