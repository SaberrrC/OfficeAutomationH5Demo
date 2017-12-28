<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'AttendAdmin',
  created () {
    this.$store.dispatch('querySidebarList', 'attend_admin')
  }
}
</script>
