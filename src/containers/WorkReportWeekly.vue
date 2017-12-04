<template>
  <div class="work-report-weekly">
    <Card>
      <p slot="title">发起周报</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'WorkReportWeekly',
  data () {
    return {
    }
  },
  created () {
    console.log('##### WorkReportWeekly created')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.work-report-weekly {
  padding: 20px;
}
</style>
