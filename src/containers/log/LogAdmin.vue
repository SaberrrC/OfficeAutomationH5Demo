<template>
  <div class="meeting-admin">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'log_admin',
    created () {
      this.$store.dispatch('querySidebarList', '9')
    }
  }
</script>
