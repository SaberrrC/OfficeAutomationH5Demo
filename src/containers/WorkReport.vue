<template>
  <div class="work-report">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'WorkReport',
  created () {
    this.$store.dispatch('querySidebarList', '2')
  }
}
</script>
<style scoped>
  .work-report{
    height: 88vh;
    overflow: auto;
  }
</style>
