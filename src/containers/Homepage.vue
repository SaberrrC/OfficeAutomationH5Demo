<template>
  <div class="home">
    <Card :bordered="false">
      <p slot="title">{{msg}}</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
      msg: '善林 OA 首页'
    }
  },
  created () {
    this.$store.dispatch('querySidebarList', 'home')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  padding: 20px;
}
</style>
