<template>
  <div class="work-report-daily">
    <Card>
      <p slot="title">发起日报</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'WorkReportDaily',
  data () {
    return {
    }
  },
  created () {
    console.log('##### WorkReportDaily created')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.work-report-daily {
  padding: 16px;
}
</style>
