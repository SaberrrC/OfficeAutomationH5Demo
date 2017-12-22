<template>
  <div class="notice">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'notice',
    created() {
      this.$store.dispatch('querySidebarList', 'notice')
    }
  }
</script>
