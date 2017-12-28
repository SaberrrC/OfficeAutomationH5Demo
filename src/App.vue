<template>
  <div id="app">
    <template v-if="checkToken">
      <the-header/>
      <sidebar
        v-if="sidebarList.length"
        :list="sidebarList"/>
      <section :class="['content', sidebarList.length ? '' : 'full-screen']">
        <router-view/>
      </section>
      <chatting v-if="itShowChat"></chatting>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import Sidebar from '@/components/Sidebar'
import Chatting from '@/chatting/index.vue'
import chat from '@/module/chatting'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    TheHeader,
    Sidebar,
    Chatting
  },
  data () {
    return {
    }
  },
  beforeCreate () {
    let code = this.$store.state.userinfo.code || window.localStorage.getItem('userCode')
    let uid = this.$store.state.userinfo.uid || window.localStorage.getItem('uid')
    let token = this.$store.state.userinfo.token || window.localStorage.getItem('token')
    this.$store.dispatch('setUsers', {
      code: code,
      uid: uid,
      token: token
    })
    chat.queryUserInfo(code)
  },
  created () {
    // this.$store.dispatch('queryUserInfo').then((data) => {
    //   console.log(data)
    //   window.localStorage.setItem('username', data.username)
    //   window.localStorage.setItem('userCode', data.code)
    // })
  },
  computed: {
    ...mapState({
      token: state => state.token,
      userInfo: state => state.user.userInfo,
      sidebar: state => state.user.sidebar,
      organization: state => state.user.organization,
      userName: state => state.user.userName, // 用户名
      password: state => state.user.password, // 密码
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
    checkToken () {
      return this.$store.state.token || window.localStorage.getItem('token')
    },
    //  放在这一层是为了根据数组 length 判断是否隐藏 sidebar
    sidebarList () {
      return this.$store.state.sidebar
    },
    itShowChat () {
      return true
    }
  }
}
</script>

<style lang="scss">
body {
  background: #ebeff8;
}
#app {
  font: 14px/1.6 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .organization .ivu-tree {
    position: absolute;
    top: 109px;
    right: 16px;
    bottom: 16px;
    left: 16px;
    overflow-y: auto;
  }
  .ivu-tree-title {
    font-size: 14px;
  }
  .ivu-tree-title:hover, .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
    background: transparent;
  }
  .ivu-tree-arrow, .ivu-checkbox-wrapper, .ivu-tree-title {
    margin-right: 0;
    vertical-align: middle;
    line-height: 19px;
  }
  .news-list .ivu-carousel-dots {
    bottom: 14px;
    padding-right: 16px;
    text-align: right;
  }
  .full-calendar-header {
    display: none;
  }
  .full-calendar-body {
    .weeks {
      border: 0;
      .week {
        border: 0;
      }
    }
    .week-row {
      border: 0;
      .day-cell {
        min-height: 40px;
        padding: 15px 0;
        border: 0;
        line-height: 40px;
        p {
          height: 40px;
          width: 40px;
          margin: 0 auto;
          font-size: 14px;
          text-align: center;
        }
      }
      .today {
        background-color: #fff;
        p {
          border: 1px solid #2d8cf0;
          border-radius: 50%;
        }
      }
    }
    .events-day {
      position: relative;
      min-height: 40px;
      height: 40px;
      padding: 15px 0;
      box-sizing: content-box;
      .day-number {
        padding: 0;
      }
      .event-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -20px 0 0 -20px;
        .event-item {
          height: 40px;
          width: 40px;
          margin: 0;
          padding: 0;
          line-height: 40px;
          text-align: center;
          border-radius: 50%;
        }
        .leave {
          color: #fff;
          background-color: #19be6b;
        }
        .abnormal {
          color: #fff;
          background-color: #ed3f14;
        }
        .overtime {
          color: #fff;
          background-color: #f90;
        }
        .business {
          color: #fff;
          background-color: #2d8cf0;
        }
      }
    }
  }
  .duty-record {
    .comp-full-calendar {
      padding: 0;
    }
    .week-row {
      .day-cell {
        min-height: 32px;
        padding: 15px 0;
        line-height: 30px;
        p {
          height: 32px;
          width: 32px;
          font-size: 12px;
        }
      }
    }
    .events-day {
      min-height: 32px;
      height: 32px;
      padding: 15px 0;
      .event-box {
        margin: -16px 0 0 -16px;
        .event-item {
          height: 32px;
          width: 32px;
          line-height: 30px;
        }
      }
    }
  }
}
.content {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 240px;
}
.full-screen {
  left: 0;
}
</style>
