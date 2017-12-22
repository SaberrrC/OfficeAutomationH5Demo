<template>
  <div class="meeting-admin">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'Process',
    created () {
      this.$store.dispatch('querySidebarList', 'process')
    }
  }
</script>
