<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col :lg="{span:4}" :md="{span:5}" :sm="{span:6}" :xs="{span:8}" >
          <i class="iconfont icon-shenpiliucheng" style="display: inline-block"></i>
          <h3 style="display: inline-block">审批流程</h3>
        </i-Col>
      </Row>
    </span>
    </p>
    <div class="work-report-daily">
      <div class="title">
          <h3>人事类流程</h3>
        <Row type="flex" justify="space-between" class="code-row-bg">
          <i-Col span="4">
            <div class="card" @click="launchBill()">
                <h4 >出差申请</h4>
            </div>
          </i-Col>
          <i-Col span="4">
            <div class="card" @click="launchWorkApply()">
                <h4>加班申请</h4>
            </div>
          </i-Col>
          <i-Col span="4">
            <div class="card" @click="launchFurlough()">
                <h4>休假申请</h4>
            </div>
          </i-Col>
          <i-Col span="4">
            <div class="card" @click="launchSignCard()">
                <h4>签卡申请</h4>
            </div>
          </i-Col>
        </Row>
      </div>
      <div class="title">
          <h3>行政类流程</h3>
        <Row type="flex" justify="space-between" class="code-row-bg">
          <i-Col span="4">
            <div class="card" @click="launch()">
              <div style="text-align:center" @click="launchOfficeSupplies()">
                <h4>办公用品申请</h4>
              </div>
            </div>
          </i-Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        date: this.$route.query.date ? this.$route.query.date : ''
      }
    },
    methods: {
//    点击出差申请
      launchBill () {
        this.$router.push({ path: 'launchBill' })
      },
//    点击加班申请
      launchWorkApply () {
        this.$router.push({ path: 'launchWorkApply' })
      },
//    点击休假申请
      launchFurlough () {
        this.$router.push({ path: 'launchFurlough' })
      },
//    点击签卡申请
      launchSignCard () {
        this.$router.push({ path: 'launchSignCard', query: {date: this.date} })
      },
//    点击办公用品申请
      launchOfficeSupplies () {
//        this.$router.push({ path: 'launchSignCard' })
        this.$Message.info('该功能正在开发中，敬请期待')
      }
    },
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 53px;
    line-height: 53px;
    padding-left: 20px;
    background: #ffffff;
  }
  .title {
    padding-left: 56px;
  }
  .title h3{
    height: 62px;
    line-height: 62px;
  }
  .code-row-bg {
    text-align: center;
  }
  .card {
    padding: 16px;
    background: #ffffff;
    cursor: pointer
  }
</style>
