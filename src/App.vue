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
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'app',
  components: {
    TheHeader,
    Sidebar
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    checkToken () {
      return this.$store.state.token || window.localStorage.getItem('token')
    },
    //  放在这一层是为了根据数组 length 判断是否隐藏 sidebar
    sidebarList () {
      return this.$store.state.sidebar
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
        .event-item {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -20px 0 0 -20px;
          display: none;
          height: 40px;
          width: 40px;
          padding: 0;
          line-height: 40px;
          text-align: center;
          border-radius: 50%;
        }
        .leave {
          display: block;
          color: #fff;
          background-color: #19be6b;
        }
        .abnormal {
          display: block;
          color: #fff;
          background-color: #ed3f14;
        }
        .overtime {
          display: block;
          color: #fff;
          background-color: #f90;
        }
        .business {
          display: block;
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
.work-attendance-info {
  span {
    display: inline-block;
    vertical-align: middle;
    width: 25%;
    text-align: center;
    em {
      font-style: normal;
    }
    i {
      display: inline-block;
      height: 12px;
      width: 12px;
      line-height: 12px;
      border-radius: 50%;
    }
  }
  .leave i {
    background-color: #19be6b;
  }
  .abnormal i {
    background-color: #ed3f14;
  }
  .overtime i {
    background-color: #f90;
  }
  .business i {
    background-color: #2d8cf0;
  }
}
</style>
