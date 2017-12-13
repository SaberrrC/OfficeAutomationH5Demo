<template>
  <div class="news">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'news',
  created () {
    this.$store.dispatch('querySidebarList', 'news')
  }
}
</script>
