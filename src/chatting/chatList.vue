<template>
  <div class="communication">
     <div class="personnal">
       <el-input class="search1" v-model="filterText" placeholder="搜索"></el-input>
     </div>
     <div class="p_list">
        <div class="list_name" v-for="(item, index) in openedListDom" v-on:click="openChatBox(item, index)" :class="showSid == item.sId ? 'selectBackground' : ''">
        <template v-if="item.type && item.type === 'chatgroup'">
            <div class="circle">
            <img :src="item.img">
            <span class="num" v-if="item.count">{{item.count}}</span>
          </div>
           <div class="text">
            <div class="child_name">{{item.name}}</div>
            <div class="child_text" v-if="singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length && singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].formType == 1" v-html=" decrpty(singChatbox[item.sId].value[singChatbox[item.sId].value.length-1])"></div>
            <div class="child_text" v-else-if="singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length&&singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].formType == 2"  v-text="file"></div>
            <div class="child_text" v-else-if="singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length&&singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].formType == 3"  v-text="pic"></div>
            <div class="child_text" v-else v-html=''></div>
          </div>
          <div class="lasttime">{{singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length ? new Date(singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].time*1000).toLocaleTimeString('chinese',{hour12:false}) : ''}}</div>
        </template>
        <template v-else-if="item.type && item.type === 'chatroom'">
            <div class="circle">
            <img :src="addHttp(item.img)">
            <span class="num" v-if="item.count">{{item.count}}</span>
          </div>
          <div class="text">
            <div class="child_name">{{item.name}}</div>
            <div class="child_text" v-html="singChatbox[item.sId].value.length ? decrpty(singChatbox[item.sId].value[singChatbox[item.sId].value.length-1]): ''"></div>
          </div>
          <div class="lasttime">{{singChatbox[item.sId].value.length ? new Date(singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].time*1000).toLocaleTimeString('chinese',{hour12:false}) : ''}}</div>
        </template>
        <template v-else-if="item.roomId && item.roomId != ''">
          <div class="circle">
            <img :src="addHttp(item.img)">
            <span class="num" v-if="item.count">{{item.count}}</span>
          </div>
          <div class="text">
            <div class="child_name">{{item.name}}</div>
            <!-- <div class="child_text" v-html="singChatbox['R_' + item.to].value.length ? singChatbox['R_' + item.to].value[singChatbox['R_' + item.to].value.length-1].value : ''"></div> -->
          </div>
          <!-- <div class="lasttime">{{singChatbox['R_' + item.to].value.length ? new Date(singChatbox['R_' + item.to].value[singChatbox['R_' + item.to].value.length-1].time*1000).toLocaleTimeString('chinese',{hour12:false}) : ''}}</div> -->
        </template>
        <template v-else>
          <div class="circle">
            <img :src="addHttp(item.img)">
            <span class="num" v-if="item.count">{{item.count}}</span>
          </div>
          <div class="text">
            <div class="child_name">{{item.name}}</div>
            <div class="child_text" v-if="singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length && singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].formType == 1" v-html=" decrpty(singChatbox[item.sId].value[singChatbox[item.sId].value.length-1])"></div>
            <div class="child_text" v-else-if="singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length&&singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].formType == 2"  v-text="file"></div>
            <div class="child_text" v-else-if="singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length&&singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].formType == 3"  v-text="pic"></div>
            <div class="child_text" v-else v-html=''></div>
          </div>
          <div class="lasttime">{{singChatbox[item.sId] && singChatbox[item.sId].value && singChatbox[item.sId].value.length ? new Date(singChatbox[item.sId].value[singChatbox[item.sId].value.length-1].time*1000).toLocaleTimeString('chinese',{hour12:false}) : ''}}</div>
        </template>
        </div>
     </div>
     <div class="p_listSearch" v-show="p_listSearchShow">
        <div class="list_name" v-for="(item, index) in listSearch" v-on:click="openChatBox(item)" :class="personnelistIndex == index ? 'selectBackground' : ''">
          <div class="text">
            <div class="child_name">{{item.userName}} -- {{item.departmentName}}</div>
          </div>
        </div>
        <div class="list-search-no-match" v-if="listSearch && listSearch.length === 0">
          查询无结果
        </div>
     </div>
  </div>
</template>

<script>
/* eslint-disable */
  import config from '../config/index'
  import {mapState} from 'vuex'
  import qs from 'qs'
  import chat from '../module/chatting'

  export default {
    name: 'listChat',
    data () {
      return {
        filterText:'',
        p_listSearchShow:false,
        listSearch:'',
        newArray:[],
        valueArray:[],
        file:'[文件]',
        pic:'[图片]',
      }
    },
    computed: {
      ...mapState({
        personnelistIndex: (state) => state.personnelistIndex,
        singChatbox: (state) => state.singChatbox,
        singChatlist: (state) => state.singChatlist,
        userinfo: (state) => state.userinfo,
        otherInfo: (state) => state.otherInfo,
        list: (state) => state.list,
        TXGroup: state => state.TXGroup,
        TXRoom: state => state.TXRoom,
        userInfoDb: state => state.userInfoDb,
        image: state => state.image,
        showSid: state => state.showSid
      }),
      openedListDom () {
        // let countTotal = 0;
        let tmp = []
        let oData = this.$store.state.list
        for(var i = 0; i < oData.length; i++) {
          // countTotal += Number(oData[i].count)
          let tmpData = Object.assign({}, oData[i], {
            count: oData[i].count ? oData[i].count : 0,
            time: oData[i].time ? oData[i].time : null,
            name: oData[i].name ? oData[i].name : ''
          })
          if (oData[i].type === 'chat') {
            // console.log('tmp[i]', tmp[i], oData[i])
            let id = ''
            if (oData[i].code) {
              id = oData[i].code
              if (oData[i].code === this.userinfo.code) {
                id = oData[i].to.substring(3)
              }
            } else if (oData[i].from) {
              id = oData[i].from.substring(3)
              if (id === this.userinfo.code) {
                id = oData[i].to.substring(3)
              }
            } else {
              return
            }
            if (this.userInfoDb[id] && this.userInfoDb[id].img) {
              tmpData.img = this.userInfoDb[id].img
              tmpData.name = this.userInfoDb[id].username
            } else {
              tmpData.img = this.image
              let that = this
              chat.queryUserInfo(id).then(() => {
                tmpData.name = this.userInfoDb[id].username
                that.$forceUpdate()
              })
            }
            tmp.push(tmpData)
          }
          if (oData[i].roomId && oData[i].roomId != '') {
            tmpData = Object.assign(tmpData, {
              type: 'chatroom',
              img: this.image,
              name: oData[i].name,
              sId: 'R_' + oData[i].roomId,
              value: typeof(oData[i].value) == 'string' ? oData[i].value : ''
            })
            tmp.push(tmpData)
          } else if (oData[i].type === 'chatroom') {
            let o = this.TXRoom.filter((item) => {return item.roomId === oData[i].sId.substring(2)})
            // console.log('tmp[i]', o)
            tmpData['img'] = this.image
            tmpData = Object.assign(tmpData, {
              type: 'chatroom',
              img: this.image,
              name: o[0].name,
              sId: oData[i].sId,
              value: typeof(oData[i].value) == 'string' ? oData[i].value : ''
            })
            tmp.push(tmpData)
          }
          if (oData[i].groupId && oData[i].groupId != '') {
            // console.log('111', oData[i], this.TXGroup.length, this.TXGroup)
            // for (let j = 0; j < this.TXGroup.length; j++) {
            //   console.log('12345', oData[i].sId.substring(2),  this.TXGroup[j].groupid,  this.TXGroup[j].groupname)
            // }
            tmpData = Object.assign(tmpData, {
              type: 'chatgroup',
              img: this.image,
              name: oData[i].groupname,
              sId: 'G_' + oData[i].groupId,
              value: typeof(oData[i].value) == 'string' ? oData[i].value : ''
            })
            tmp.push(tmpData)
          } else if (oData[i].type === 'groupchat') {
            let o = this.TXGroup.filter((item) => {return item.groupid === oData[i].sId.substring(2)})
            // for (let j = 0; j < this.TXGroup.length; j++) {
            //   console.log('11111', oData[i].sId.substring(2) == this.TXGroup[j].groupid,  this.TXGroup[j].groupname)
            // }
            // console.log('222',o, oData[i], o[0].name, o[0].groupname)
            // tmp[i]['name'] = o[0].name
            if(o && o.length > 0 ) {
              tmpData = Object.assign({}, tmpData, {
                type: 'chatgroup',
                img: this.image,
                name: o[0].groupname,
                sId: oData[i].sId,
                value: typeof(oData[i].value) === 'string' ? oData[i].value : ''
              })
              tmp.push(tmpData)
            }
          }
        }
          // this.$store.state.grossNumber = countTotal;
        // this.$nextTick(function () {
        //   this.$forceUpdate()
        // })
        return tmp
      }
    },
    created () {
      if(this.$store.state.other) {
         this.$store.dispatch('writeStructIsShow',true)
      } else {
        this.$store.dispatch('writeStructIsShow',false)
      }
    },
    mounted: function () {
      this.updateChatListChecked()
      // this.$nextTick(function () {
      //   // Code that will run only after the
      //   // entire view has been rendered
      //   this.$forceUpdate()
      // })
      // this.$forceUpdate()
    },
    methods: {
      updateChatListChecked () {
        let n = this.$store.state.personnelistIndex
        // console.log('222',this.openedListDom[n].sId , this.$store.state.other)
        if (n && this.openedListDom[n] && this.$store.state.other && this.openedListDom[n].sId === this.$store.state.other) {
          this.$store.dispatch('updateListChatStatus', {index: n})
        } else {
          for (let i = 0; i < this.openedListDom.length; i++) {
            if (this.openedListDom[i].sId === this.$store.state.other) {
              this.$store.dispatch('updateListChatStatus', {index: i})
            }
          }
        }
      },
      decrpty (data) {
        let valueNew = chat.decrpty(data.value,data.from)
        //console.log('22',decrptyContent)
        // if( decrptyContent&& decrptyContent.indexOf("[") >=0 &&  data.value.indexOf("]") > 0 ){
        //    decrptyContent = chat.ReCont(decrptyContent)
        // }
        // return data.value
        if(valueNew&&valueNew.indexOf("[") >=0 && valueNew.indexOf("]") > 0 ){
          // console.log(1)
          valueNew = chat.ReCont(valueNew)
        }
        // console.log(1,valueNew)
        return valueNew
      },
      async openChatBox (item, index) { // 点击时 更新对方的账号或群ID
        console.log(this.$parent.$children)
        this.$store.state.showSid = item.sId
        console.log(this.showSid)
        for(var i = 0; i < this.$parent.$children.length; i++){
            if(this.$parent.$children[i].addmembershow)  this.$parent.$children[i].addmembershow = false
            if(this.$parent.$children[i].singChatboxShow)  this.$parent.$children[i].singChatboxShow = false
        }
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
        // document.getElementById('textarea').innerHTML = ''
        this.$store.dispatch('openChatBox', {item: item, index: index})
        if (this.filterText) {
          this.filterText = ''
        }
        this.$parent.sectionType = 1 // 切换到聊天列表
      },
      addHttp (url) {
        // console.log('skldfkkdddd', url)
        let oimg = url
        if (url && url != '' && url.length > 0 && url.indexOf('http://') != 0 && url.indexOf('data') != 0) {
          oimg = 'http://' + url
        }
        if (url == '') {
          // console.log('2', oimg)
          return 'data:image/jpeg;base64,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'
        }
        // console.log('最后', oimg)
        return oimg
      }
    },
    watch:{
      filterText (val) {
        if (val.trim() == '') {
          this.p_listSearchShow = false
          return
        }
        val && chat.userSearch(val).then((x) => {
          this.p_listSearchShow = true
          this.listSearch = []
          for (let i = 0; i < x.length; i++) {
            let tmp = Object.assign({}, x[i], {
              name: x[i].userName,
              img: x[i].portrait ? x[i].portrait : this.$store.state.image,
              sId: 'SL_' + x[i].code,
              type: 'chat'
            })
            this.listSearch.push(tmp)
          }
        }, function () {
          this.p_listSearchShow = true
          this.listSearch = []
        })
      },
      otherInfo: {
        handler:function(val) {
          this.updateChatListChecked()
        },
        deep:true
      }
    }
  }
</script>
