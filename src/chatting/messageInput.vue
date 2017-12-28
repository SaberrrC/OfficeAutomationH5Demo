<template>
  <div id="singleChatboxWrite">
    <div class="singleChatboxWrite">
      <div class="icon">
        <i class="smile" v-on:click="writeTB"></i>
        <i class="document" @click="sendPrivateDocument" title="发送文件">
          <input ref="sendPrivateDocument" hidden id="sendTXT" type="file" v-on:change="DocumentChange" />
        </i>
        <i class="picture" @click="sendPrivateImg" title="发送图片">
          <input ref="sendPrivateImg" hidden type="file" v-on:change="imgChange" />
        </i>
      </div>
      <div class="textarea" id="textarea" tabindex="0"
      ref="message" 
        contenteditable="true"
        @keydown.enter="keyboardEvent"
        @paste="messageInputChange($event)"
        @drop="messageInputChange($event)"
        @focus="showListHidden">
      </div>
      <el-button class="button-send" v-on:click="sendPrivateText" type="primary">发送</el-button>
    </div>
    <div class="font_img" v-show="showFlag">
      <div class="imglist"  v-for="item in img">
        <img :src="emoji(item)" :data-key='item' v-on:click="selectEmoji(item)"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import chat from '../module/chatting'
export default {
  name: "MessageInput",
  data() {
    return {
      text: "", // 文本值  双向绑定
      img: [
        "ee_1.png",
        "ee_2.png",
        "ee_3.png",
        "ee_4.png",
        "ee_5.png",
        "ee_6.png",
        "ee_7.png",
        "ee_8.png",
        "ee_9.png",
        "ee_10.png",
        "ee_11.png",
        "ee_12.png",
        "ee_13.png",
        "ee_14.png",
        "ee_15.png",
        "ee_16.png",
        "ee_17.png",
        "ee_18.png",
        "ee_19.png",
        "ee_20.png",
        "ee_21.png",
        "ee_22.png",
        "ee_23.png",
        "ee_24.png",
        "ee_25.png",
        "ee_26.png",
        "ee_27.png",
        "ee_28.png",
        "ee_29.png",
        "ee_30.png",
        "ee_31.png",
        "ee_32.png",
        "ee_33.png",
        "ee_34.png",
        "ee_35.png"
      ],
      showFlag: false,
      
    };
  },
  computed: {
    ...mapState({
      userName: state => state.user.userName, // 用户名
      password: state => state.user.password, // 密码
      other: state => state.other, // 对方账号或群ID
      singChatlist: state => state.singChatlist,
      singChatbox: state => state.singChatbox,
      image: state => state.image,
      TXGroup: state => state.TXGroup,
      list: state => state.list,
      userinfo: state => state.userinfo,
      otherInfo: state => state.otherInfo || {}
    }),
    chatType: function() {
      if (this.otherInfo.roomId && this.otherInfo.roomId != "") {
        return 'chatRoom';
      } else if (this.otherInfo.groupId && this.otherInfo.groupId != "") {
        return 'chatGroup';
      } else {
        return 'singleChat';
      }
    }
  },
  watch: {
    otherInfo: {
      handler: function(val) {
        this.$refs.message.innerHTML = '' // 聊天对象变化时清空输入框
        this.$refs.message.innerText = ''
      },
      deep:true
    }
  },
  methods: {
    showListHidden() {
      // console.log('123')
        for(var i = 0; i < this.$parent.$children.length; i++){
          if(this.$parent.$children[i].addmembershow)  this.$parent.$children[i].addmembershow = false
          if(this.$parent.$children[i].singChatboxShow)  this.$parent.$children[i].singChatboxShow = false
      }
    },
    emoji (item) {
      return 'http://oa.shanlinjinrong.com/static/faces/' + item
    },
    keyboardEvent(e) {
      // console.log(e)
      this.sendPrivateText();
      e.preventDefault();
      e.stopPropagation()
      // var code;
      // if (!e) var e = window.event;
      // if (e.keyCode) code = e.keyCode;
      // else if (e.which) code = e.which;
      // if (code == 13 && window.event) {
      //   e.returnValue = false;
      //   this.sendPrivateText();
      // } else if (code == 13) {
      //   e.preventDefault();
      // }
    },
    decrptReCont(strCont){
      // console.log(strCont)
      let emotion = [
        { name: "ee_1.png", text: "[):]" },
        { name: "ee_2.png", text: "[:D]" },
        { name: "ee_3.png", text: "[;)]" },
        { name: "ee_4.png", text: "[:-o]" },
        { name: "ee_5.png", text: "[:p]" },
        { name: "ee_6.png", text: "[(H)]" },
        { name: "ee_7.png", text: "[:@]" },
        { name: "ee_8.png", text: "[:s]" },
        { name: "ee_9.png", text: "[<o)]" },
        { name: "ee_10.png", text: "[:(]" },
        { name: "ee_11.png", text: "[:'(]" },
        { name: "ee_12.png", text: "[:$]" },
        { name: "ee_13.png", text: "[(a)]" },
        { name: "ee_14.png", text: "[8o|]" },
        { name: "ee_15.png", text: "[8-|]" },
        { name: "ee_16.png", text: "[+o(]" },
        { name: "ee_17.png", text: "[|-)]" },
        { name: "ee_18.png", text: "[:|]" },
        { name: "ee_19.png", text: "[*-)]" },
        { name: "ee_20.png", text: "[:-#]" },
        { name: "ee_21.png", text: "[:-*]" },
        { name: "ee_22.png", text: "[^o)]" },
        { name: "ee_23.png", text: "[8-)]" },
        { name: "ee_24.png", text: "[(|)]" },
        { name: "ee_25.png", text: "[(u)]" },
        { name: "ee_26.png", text: "[(S)]" },
        { name: "ee_27.png", text: "[(*)]" },
        { name: "ee_28.png", text: "[(#)]" },
        { name: "ee_29.png", text: "[(R)]" },
        { name: "ee_30.png", text: "[({)]" },
        { name: "ee_31.png", text: "[(})]" },
        { name: "ee_32.png", text: "[(k)]" },
        { name: "ee_33.png", text: "[(F)]" },
        { name: "ee_34.png", text: "[(W)]" },
        { name: "ee_35.png", text: "[(D)]" }
      ]

      for (var i in emotion) {     
        var item = emotion[i];
        var strimg ='<img style="width: 32px;height: 32px;vertical-align: middle" src="http://oa.shanlinjinrong.com/static/faces/' + item.name + '">';
        strCont=strCont.replace(new RegExp(strimg,'g'), item.text);
      }    
    return strCont;
    },
    messageInputChange (x) {
      this.$nextTick(function () {
        x.target.innerHTML = x.target.innerText // 只有文本
      })
    },
    sendPrivateText() {
      this.keyStr = this.userName
      // 点击发送消息
      if (this.chatType === 'chatRoom') {
        this.sendRoomText()
        return
      } else if(this.chatType === 'chatGroup') {
        this.sendGroupText()
        return
      }
      this.text = document.getElementById("textarea").innerHTML;
      this.text = this.text.replace(/&nbsp;/g, " ");
      // this.text = this.text.replace(/<br\s*\/?>/gi,"");
      if (this.text.trim() == "") return;
      var id = this.$conn.getUniqueId();
      var msg = new this.$WebIM.message("txt", id)
      var that = this;
      that.text = this.decrptReCont(that.text)
      that.text = chat.escape2Html(that.text)
      console.log(that.text)
      msg.set({
        msg: chat.encrypt(that.text), //   消息内容
        //msg: that.text, //   消息内容
        to: this.other, //   对方账号或群ID
        roomType: false,
        success: function(id, serverMsgId) {
          // console.log(id, serverMsgId)
          let timestamp = Date.parse(new Date()) / 1000;
          let obj = {
            id: serverMsgId,
            nameType: 1,
            formType: 1,
            value: this.msg,
            from: that.userName,
            to: this.to,
            time: timestamp
          }; // nameType 1 = 发送消息 2 = 接收消息
          that.$store.dispatch("sendText", obj); // formType 1 = 文本 2 = 文件 3 = 图片
        },
        fail: function(e) {
          console.log("Send private text error");
        }
      });
      msg.body.chatType = "singleChat";
      this.$conn.send(msg.body);
      this.text = document.getElementById("textarea").innerHTML = "";
    },
    writeTB() {
      this.showFlag = !this.showFlag;
      this.$parent.isShowImMask = true;
    },
    selectEmoji (item) {
      //console.log(item)
       let itemMes= chat.simle(item)
       //let itemMes= item
      //console.log(item
      if (this.showFlag == true) {
        let tmp = this.$refs.message.innerHTML
        var str ='<img style="width: 32px;height: 32px;vertical-align: middle" src="http://oa.shanlinjinrong.com/static/faces/' + item + '" />';
        this.$refs.message.innerHTML = tmp + str
        //this.$refs.message.innerHTML =  tmp + itemMes
        this.showFlag = false;
      } else {
        this.showFlag = true;
      }
      this.$parent.isShowImMask = false
      this.messageInputFocus(this.$refs.message)
    },
    messageInputFocus (item) {
      let el = item || this.$refs.message
      el.focus();
      if (document.selection) {
        var range = document.selection.createRange();
        this.last = range;
        range.moveToElementText(el);
        range.select();
        document.selection.empty(); // 取消选中
      } else {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    },
    sendPrivateDocument () {
      this.$refs.sendPrivateDocument.click()
    },
    DocumentChange() {
      console.log('发送文件')
      let that = this;
      let id = this.$conn.getUniqueId();
      let msg = new this.$WebIM.message('file', id);
      let input = this.$refs.sendPrivateDocument; // 选择图片的input
      let file = this.$WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
      let name = file.filename
      let fileSize = parseInt(file.data.size)
      let fileType = file.filetype
      console.log('发送文件', input.files, file)
      let alertMsgBox = this.$message
      let allowType = {
        'txt': true,
        'zip': true,
        'rar': true,
        'doc': true,
        'docx': true,
        'xls': true,
        'xlsx': true,
        'ppt': true,
        'pptx': true,
        'accdb': true,
        'pdf': true,
        'rtf': true,
        'psd': true,
        'wps': true,
        'pages':true,
        'numbers':true,
        'key':true
      }
      if (file.filetype.toLowerCase() in allowType) {
        let localType = this.chatType === 'chatGroup' ? 'groupchat' : 'chat'
        let msgTo = this.chatType === 'chatGroup' ? this.otherInfo.groupid : this.other.toLowerCase()
        let localTo = msgTo.toUpperCase()
        let from = this.userinfo.code
        let sId =  this.other
        let timestamp = Date.parse(new Date()) / 1000;
        let localMsgobj = {
          nameType: 1, // nameType 1 = 发送消息 2 = 接收消息
          formType: 2, // formType 1 = 文本 2 = 文件 3 = 图片
          name: name,
          from: from,
          to: localTo,
          sId: sId,
          time: timestamp,
          size: fileSize,
          type: localType
        }
        let option = {
          apiUrl: this.$WebIM.config.apiUrl,
          file: file,
          to: msgTo, // 对方账号(包含sl_)或群ID(不含G_)
          roomType: false,
          ext: {
            'file_length': fileSize,
            'filetype': fileType,
            'type': file.data.type
          },
          chatType: this.chatType === 'chatGroup' ? 'chatRoom' : 'singleChat',
          onFileUploadError: function(x) {
            console.log("onFileUploadError", x);
            alertMsgBox({message: '文件上传失败', type: 'warning'});
          },
          onFileUploadComplete: function(x) {
            console.log('文件上传成功', x)
            localMsgobj.url = x.uri + '/' + x.entities[0].uuid
          },
          success: function(id, serverMsgId) {
            // console.log('send success', id, serverMsgId)
            localMsgobj.id = serverMsgId
            that.$store.dispatch("sendText", localMsgobj);
            input.value = "";
          },
          flashUpload: this.$WebIM.flashUpload
        };
        msg.set(option);
        if (this.chatType === 'chatGroup') {
          msg.setGroup('groupchat');
        }
        this.$conn.send(msg.body);
      } else {
        input.value = "";
        alertMsgBox({message: '文件格式不允许', type: 'warning'});
        return;
      }
    },
    sendPrivateImg () {
      this.$refs.sendPrivateImg.click()
    },
    imgChange () {
      console.log('发送图片')
      let that = this
      let input = this.$refs.sendPrivateImg; // 选择图片的input
      let file = this.$WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
      let allowType = {
        'jpg': true,
        'jpeg': true,
        'gif': true,
        'png': true,
        'bmp': true,
        'tif': true
      };
      console.log('发送图片', input.files, file)
      let alertMsgBox = this.$message
      if (file.filetype.toLowerCase() in allowType) {
        let id = this.$conn.getUniqueId(); // 生成本地消息id
        let msg = new this.$WebIM.message('img', id); // 创建图片消息
        let name = file.filename; // 获取文件名
        let fileSize = parseInt(file.data.size) // 获取文件大小
        let fileType = file.filetype // 获取文件大小
        let msgTo = this.chatType === 'chatGroup' ? this.otherInfo.groupid : this.other.toLowerCase()
        let localTo = msgTo.toUpperCase()
        let from = this.userinfo.code
        let sId =  this.other
        let localType = this.chatType === 'chatGroup' ? 'groupchat' : 'chat'
        let timestamp = Date.parse(new Date()) / 1000;
        let localMsgobj = {
          nameType: 1, // nameType 1 = 发送消息 2 = 接收消息
          formType: 3, // formType 1 = 文本 2 = 文件 3 = 图片
          name: name,
          from: from,
          to: localTo,
          sId: sId,
          time: timestamp,
          size: fileSize,
          type: localType
        }
        let option = {
          apiUrl: this.$WebIM.config.apiUrl,
          file: file,
          to: msgTo, //   对方账号或群ID
          roomType: false,
          ext: {
            'file_length': fileSize,
            'filetype': fileType,
            'type': file.data.type
          },
          chatType: this.chatType === 'chatGroup' ? 'chatRoom' : 'singleChat',
          onFileUploadError: function() {
            console.log("onFileUploadError");
            alertMsgBox({message: '图片上传失败', type: 'warning'});
          },
          onFileUploadComplete: function(x) {
            console.log('图片上传成功', x)
            localMsgobj.url = x.uri + '/' + x.entities[0].uuid
          },
          success: function(id, serverMsgId) {
            localMsgobj.id = serverMsgId
            that.$store.dispatch("sendText", localMsgobj);
            input.value = "";
          },
          flashUpload: this.$WebIM.flashUpload
        };
        msg.set(option);
        if (this.chatType === 'chatGroup') {
          msg.setGroup('groupchat');
        }
        this.$conn.send(msg.body);
      } else {
        input.value = "";
        alertMsgBox({message: '图片格式不对', type: 'warning'});
        return;
      }
    },
    getFileName(o) {
      var pos = o.lastIndexOf("\\");
      return o.substring(pos + 1);
    },
    sendRoomText () {
      if (this.chatType != 'chatRoom') {return}
      let messageText = this.$refs.message.innerHTML.replace(/&nbsp;/g, " ");
      if (messageText.trim() == '') {return}
      //console.log(messageText)
      let to = this.otherInfo.roomId
      let sId =  'R_' + to
      let from = this.userinfo.code
      let msgId = this.$conn.getUniqueId(); // 生成本地消息id
      let msg = new this.$WebIM.message('txt', msgId); // 创建文本消息
      let timestamp = Date.parse(new Date()) / 1000;
      let that = this

      // chat.encrypt(messageText)
      let option = {
        // msg: chat.encrypt(messageText),
        msg: messageText,
        to: to,
        roomType: true,
        chatType: 'chatRoom',
        success: function () {
          let obj = {
            nameType: 1, // nameType 1 = 发送消息 2 = 接收消息
            formType: 1, // formType 1 = 文本 2 = 文件 3 = 图片
            // value: chat.encrypt(messageText),
            value: messageText,
            from: from,
            to: to,
            sId: sId,
            type: 'chatroom',
            time: timestamp
          };
          that.$store.dispatch("sendText", obj);
          that.$refs.message.innerHTML = ''
        },
        fail: function () {
          console.log(['聊天室：发送文本失败', msg]);
        }
      };
      msg.set(option);
      msg.setGroup('groupchat');
      this.$conn.send(msg.body);
    },
    //群组聊天
    async sendGroupText () {
      // console.log(11111)
      if (this.chatType != 'chatGroup') {return}
      let messageText = this.$refs.message.innerHTML.replace(/&nbsp;/g, " ");
      if (messageText.trim() == '') {return}
      //console.log(messageText)
      let to = this.otherInfo.groupId
      let sId =  'G_' + to
      let from = this.userinfo.code
      let msgId = this.$conn.getUniqueId(); // 生成本地消息id
      let msg = new this.$WebIM.message('txt', msgId); // 创建文本消息
      let timestamp = Date.parse(new Date()) / 1000;
      let that = this
      messageText = this.decrptReCont(messageText)
      if (to) { // 检查群是否存在(龚海平要求)
          try {
            await chat.queryGroupInfo(to)
          } catch (error) {
            console.log(error)
            if (error && error.type === 17 && JSON.parse(error.data).error === 'service_resource_not_found') {
              //chat.updateGroup(to, 'delete')
              console.log('服务器找不到此群')
              this.$message({
                message: '该群已被解散,无法发送!',
                type: 'warning',
              });
              that.$refs.message.innerHTML = ''
              return
            }
          }
        }
      let option = {
        msg: chat.encrypt(messageText),
        //msg: messageText,
        to: to,
        roomType: false,
        chatType: 'chatGroup',
        success: function () {
          let obj = {
            nameType: 1, // nameType 1 = 发送消息 2 = 接收消息
            formType: 1, // formType 1 = 文本 2 = 文件 3 = 图片
            value: chat.encrypt(messageText),
            //value: messageText,
            from: from,
            to: to,
            sId: sId,
            type: 'chatRoom',
            time: timestamp
          };
          that.$store.dispatch("sendText", obj);
          that.$refs.message.innerHTML = ''
        },
        fail: function () {
          console.log(['群组：发送文本失败', msg]);
        }
      };
      msg.set(option);
      msg.setGroup('groupchat');
      this.$conn.send(msg.body);
    }
  }
}
</script>
<style scoped>
#singleChatboxWrite {
  position: relative;
}
.singleChatboxWrite {
  height: 149px;
  width: 100%;
}
.singleChatboxWrite .icon i {
  margin-left: 10px;
  margin-top: 5px;
}
.singleChatboxWrite .icon .smile,
.singleChatboxWrite .icon .document,
.singleChatboxWrite .icon .picture
{
  display: inline-block;
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100%;
}
.singleChatboxWrite .icon .document {
  background-image: url("../assets/img-chat/document.png");
}
.singleChatboxWrite .icon .smile {
  background-image: url("../assets/img-chat/smile.png");
}
.singleChatboxWrite .icon .picture{
  background-image: url("../assets/img-chat/picture.png");
}
.textarea {
  width: 520px;
  height: 70px;
  background: #eee;
  border: none;
  resize: none;
  overflow-y: auto;
  overflow-x: hidden;
}
.textarea:focus {
  outline: none;
}
.button-send {
  float: right;
  margin-right: 10px;
}
.font_img {
  z-index: 101;
  width: 396px;
  height: 117px;
  background: #ddd;
  position: absolute;
  left: 10px;
  top: 25px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #9fa4ad;
}
.font_img .imglist {
  width: 32px;
  height: 32px;
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
}
.font_img .imglist:hover {
  background-color: #aaa;
}
/* .sendTXT {
  width: 25px;
  height: 15px;
  position: absolute;
  left: 38px;
  top: 6px;
  z-index: 0;
  background: #fff;
  border: none;
  outline: none;
  opacity: 0;
} */
.el-icon-document {
  position: relative;
  z-index: 10;
}
</style>
