<template>
  <div id="app">
    <the-header/>
    <sidebar
      v-if="sidebarList.length"
      :list="sidebarList"/>
    <section :class="['section', sidebarList.length ? '' : 'full-screen']">
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
      return this.$store.state.sidebar.list
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

<style>
body {
  background: #ebeff8;
}
#app {
  font: 14px/1.6 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.section {
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
