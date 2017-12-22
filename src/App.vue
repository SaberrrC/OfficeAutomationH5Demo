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
  },
  created () {
  },
  updated () {
    //  TODO 监控是否重绘，待删除
    console.log('##### App updated')
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
</style>
