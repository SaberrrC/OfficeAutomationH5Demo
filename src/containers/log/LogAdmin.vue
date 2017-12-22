<template>
  <div class="meeting-admin">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'log_admin',
    created () {
      this.$store.dispatch('querySidebarList', 'log_admin')
    }
  }
</script>
