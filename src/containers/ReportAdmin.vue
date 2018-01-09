<template>
  <div class="report-admin">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'WorkReport',
  created () {
    this.$store.dispatch('querySidebarList', '21')
  }
}
</script>
<style scoped>
  .work-report{
    height: 88vh;
    overflow: auto;
  }
</style>
