<template>
  <div class="work-report-weekly">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'WorkReportWeekly',
  data () {
    return {
      msg: '发起周报'
    }
  },
  created () {
    console.log('##### WorkReportWeekly created')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
