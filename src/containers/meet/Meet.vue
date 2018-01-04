<template>
  <div class="meeting-admin">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'MeetingAdmin',
    created () {
      this.$store.dispatch('querySidebarList', '10')
    }
  }
</script>
