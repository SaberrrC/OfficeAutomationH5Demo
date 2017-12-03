<template>
  <div class="work-report">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'WorkReport',
  created () {
    const paths = this.$route.path.split('/')
    this.$store.dispatch('querySidebarList', paths[1])
  }
}
</script>
