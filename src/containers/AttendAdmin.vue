<template>
  <div class="attend-admin">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AttendAdmin',
  created () {
    this.$store.dispatch('querySidebarList', 'attend_admin')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
