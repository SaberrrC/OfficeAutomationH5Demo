<template>
  <div id="app">
    <the-header/>
    <sidebar
      v-if="sidebarList.length"
      :list="sidebarList"/>
    <section :class="['content', sidebarList.length ? '' : 'full-screen']">
      <router-view/>
    </section>
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
  computed: {
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
  .duty-record {
    .comp-full-calendar {
      padding: 0;
      .full-calendar-header {
        display: none;
      }
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
          min-height: 32px;
          padding: 15px 0;
          border: 0;
          line-height: 30px;
          p {
            height: 32px;
            width: 32px;
            margin: 0 auto;
            font-size: 12px;
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
        min-height: 32px;
        height: 32px;
        padding: 15px 0;
        box-sizing: content-box;
        .day-number {
          padding: 0;
        }
        .event-box {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -16px 0 0 -16px;
          .event-item {
            height: 32px;
            width: 32px;
            margin: 0;
            padding: 0;
            line-height: 30px;
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
