<template>
  <div id="app">
    <the-header/>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'app',
  components: {
    TheHeader
  },
  computed: {
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
#app {
  font: 14px/1.6 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
