<template>
  <div class="user-center">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'UserCenter',
    created() {
      this.$store.dispatch('querySidebarList', 'user_center')
    }
  }
</script>
