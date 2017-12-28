<template>
  <div class="work-attend">
    <Card :dis-hover="true">
      <Tabs @on-click="handleChangeTab">
        <TabPane v-for="item in tabs" :label="item.name" :key="item.id" :name="item.id"/>
      </Tabs>
      <template v-if="tab === '0'">
        <div class="search-box">统计月份：<DatePicker
          :value="new Date()"
          type="month"
          style="width:200px"
          @on-change="handleChangeMonthAbnormal"/></div>
        <Row>
          <Col span="8">
          <div class="abnormal-item"><h3 class="later">迟到</h3></div>
          </Col>
          <Col span="8">
          <div class="abnormal-item"><h3 class="early">早退</h3></div>
          </Col>
          <Col span="8">
          <div class="abnormal-item"><h3 class="absenteeism">旷工</h3></div>
          </Col>
        </Row>
      </template>
      <template v-if="tab === '1'">
        <div class="search-box">统计月份：<DatePicker
          :value="initMonth"
          type="month"
          style="width:200px"
          @on-change="handleChangeMonthAttend"/></div>
        <full-calendar
          :init-month="initMonth"
          :firstDay="1"
          lang="zh"
          :events="workAttendance.events"
          @dayClick="handleDayClick"/>
      </template>
    </Card>
  </div>
</template>

<script>
import fullCalendar from '@/components/Calendar'

export default {
  name: 'WorkAttend',
  components: {
    fullCalendar
  },
  data () {
    return {
      tab: '0',
      tabs: [
        {name: '异常考勤统计', id: '0'},
        {name: '考勤月历', id: '1'}
      ],
      initMonth: new Date(),
      //  TODO
      workAttendance: {
        leaveCount: 1,
        abnormalCount: 1,
        overtimeCount: 1,
        businessCount: 1,
        events: [
          {title: '1', start: '2017-12-01', cssClass: 'leave'},
          {title: '5', start: '2017-12-05', cssClass: 'abnormal'},
          {title: '11', start: '2017-12-11', cssClass: 'overtime'},
          {title: '21', start: '2017-12-21', cssClass: 'business'}
        ]
      }
    }
  },
  created () {
  },
  methods: {
    handleChangeTab (id) {
      this.tab = id
    },
    handleChangeMonthAbnormal (date) {
      console.log(date)
    },
    handleChangeMonthAttend (date) {
      this.initMonth = new Date(date)
      console.log(this.initMonth)
    },
    //  点击日期回调，参数为 date 对象
    handleDayClick (date) {
      console.log(date)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.work-attend {
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  left: 16px;
  .ivu-card {
    height: 100%;
  }
  .search-box {
    margin-bottom: 20px;
  }
  .abnormal-item {
    height: 500px;
    width: 200px;
    margin: auto;
    border: 1px solid #eee;
    h3 {
      height: 80px;
      padding: 0 20px;
      font-weight: normal;
      line-height: 80px;
      color: #fff;
    }
    .later {
      background: #ed3f14;
    }
    .early {
      background: #2d8cf0;
    }
    .absenteeism {
      background: #19be6b;
    }
  }
}
</style>
