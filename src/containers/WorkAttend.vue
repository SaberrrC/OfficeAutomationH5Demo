<template>
  <div class="work-attend">
    <Card :dis-hover="true">
      <Tabs v-model="tabIndex" @on-click="handleChangeTab">
        <TabPane v-for="item in tabs" :label="item.name" :key="item.id" :name="item.id"/>
      </Tabs>
      <template v-if="tabIndex === 'abnormal'">
        <div class="search-box">
          统计月份：<DatePicker
          v-model="abnormalInitDate"
          type="month"
          style="width:200px"
          @on-change="handleChangeMonth"/>
        </div>
        <Row>
          <Col span="8">
          <div class="abnormal-list">
            <h3 class="later"><span>{{abnormalData.laterCount}}</span>迟到</h3>
            <div class="abnormal-list-box">
              <div class="abnormal-item" v-for="item in abnormalData.laterList">
                <p>{{item.calendar}}</p>
                <p>上班 {{item.onebegintime}}</p>
                <p>下班 {{item.twoendtime}}</p>
                <p style="text-align:right">
                  <template v-if="item.flg" >
                    <Button type="ghost" shape="circle" size="small" disabled>已签卡</Button>
                  </template>
                  <template v-else>
                    <Button type="info" shape="circle" size="small" @click="handleBtnClick">未签卡</Button>
                  </template>
                </p>
              </div>
            </div>
          </div>
          </Col>
          <Col span="8">
          <div class="abnormal-list">
            <h3 class="early"><span>{{abnormalData.earlyCount}}</span>早退</h3>
            <div class="abnormal-list-box">
              <div class="abnormal-item" v-for="item in abnormalData.earlyList">
                <p>{{item.calendar}}</p>
                <p>上班 {{item.onebegintime}}</p>
                <p>下班 {{item.twoendtime}}</p>
                <p style="text-align:right">
                  <template v-if="item.flg" >
                    <Button type="ghost" shape="circle" size="small" disabled>已签卡</Button>
                  </template>
                  <template v-else>
                    <Button type="info" shape="circle" size="small" @click="handleBtnClick">未签卡</Button>
                  </template>
                </p>
              </div>
            </div>
          </div>
          </Col>
          <Col span="8">
          <div class="abnormal-list">
            <h3 class="absenteeism"><span>{{abnormalData.absenteeismCount}}</span>旷工</h3>
            <div class="abnormal-list-box">
              <div class="abnormal-item" v-for="item in abnormalData.absenteeismList">
                <p>{{item.calendar}}</p>
                <p>上班 {{item.onebegintime}}</p>
                <p>下班 {{item.twoendtime}}</p>
                <p style="text-align:right">
                  <template v-if="item.flg" >
                    <Button type="ghost" shape="circle" size="small" disabled>已签卡</Button>
                  </template>
                  <template v-else>
                    <Button type="info" shape="circle" size="small" @click="handleBtnClick">未签卡</Button>
                  </template>
                </p>
              </div>
            </div>
          </div>
          </Col>
        </Row>
      </template>
      <template v-if="tabIndex === 'calendar'">
        <div class="search-box">
          统计月份：<DatePicker
          v-model="calendarInitDate"
          type="month"
          style="width:200px;margin-right:16px"
          @on-change="handleChangeMonth"/>
          统计人员：<Select v-model="calendarUserCode" style="width:200px" @on-change="handleChangeUser">
            <Option :value="abnormalUserCode" :key="abnormalUserCode">本人</Option>
            <Option v-for="item in calendarUsers" v-if="!item.ifSelf" :value="item.code" :key="item.code">{{ item.psname }}</Option>
          </Select>
        </div>
        <full-calendar
          :init-month="calendarInitDate"
          :firstDay="1"
          lang="zh"
          :events="calendarEvents"
          @dayClick="handleDayClick"
          @eventClick="handleEventClick"/>
        <div class="work-attendance-info">
          <span class="abnormal">异常<em v-if="workAttendance.abnormalCount">：{{workAttendance.abnormalCount}}</em><br/><i></i></span><span class="business">出差<em v-if="workAttendance.businessCount">：{{workAttendance.businessCount}}</em><br/><i></i></span><span class="overtime">加班<em v-if="workAttendance.overtimeCount">：{{workAttendance.overtimeCount}}</em><br/><i></i></span><span class="leave">休假<em v-if="workAttendance.leaveCount">：{{workAttendance.leaveCount}}</em><br/><i></i></span>
        </div>
        <div class="work-attendance-detail">
          <table>
            <thead>
            <tr>
              <th>{{workAttendance.date}}</th>
              <th style="width:70%;text-align:right">{{workAttendance.username}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>上班</td>
              <td style="text-align:right">{{workAttendance.start}}</td>
            </tr>
            <tr>
              <td>下班</td>
              <td style="text-align:right">{{workAttendance.end}}</td>
            </tr>
            <tr>
              <td>状态</td>
              <td style="text-align:right">{{workAttendance.status}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import fullCalendar from '@/components/Calendar'
import formatDate from '@/utils/formatDate'

export default {
  name: 'WorkAttend',
  components: {
    fullCalendar
  },
  data () {
    return {
      tabIndex: 'abnormal',
      tabs: [
        {name: '异常考勤统计', id: 'abnormal'},
        {name: '考勤月历', id: 'calendar'}
      ],
      abnormalInitDate: new Date(),
      abnormalUserCode: window.localStorage.getItem('userCode'),
      calendarInitDate: new Date(),
      calendarUserCode: window.localStorage.getItem('userCode'),
      calendarUsers: [],
      //  异常考勤统计
      abnormalData: {
        laterCount: '0',
        earlyCount: '0',
        absenteeismCount: '0',
        laterList: [],
        earlyList: [],
        absenteeismList: []
      },
      //  考勤月历
      workAttendance: {
        leaveCount: '0',
        abnormalCount: '0',
        overtimeCount: '0',
        businessCount: '0',
        username: '',
        date: '',
        start: '',
        end: '',
        status: '',
        workAttendanceObject: {}
      },
      calendarEvents: []
    }
  },
  created () {
    this.queryWorkAttendance(this.abnormalUserCode, formatDate(this.abnormalInitDate, true))
    //  获取当前用户下属列表
    this.$ajax.get('/BranchStaff/getNCHRBranchStaff').then((response) => {
      if (response.data && response.data.code === '000000') {
        const data = response.data.data
        if (data && data.length) {
          this.calendarUsers = data
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    //  切换 tab 回调，参数为 tab id
    handleChangeTab (id) {
      const code = this[`${id}UserCode`]
      const date = formatDate(this[`${id}InitDate`], true)
      this.queryWorkAttendance(code, date)
    },
    //  切换日期回调，参数为日期字符串
    handleChangeMonth (date) {
      const code = this[`${this.tabIndex}UserCode`]
      this.queryWorkAttendance(code, date)
    },
    //  切换用户回调，参数为用户代码
    handleChangeUser (value) {
      const date = formatDate(this[`${this.tabIndex}InitDate`], true)
      this.queryWorkAttendance(value, date)
    },
    //  点击日期回调，参数为 date 对象
    handleDayClick (date) {
      this.updateWorkAttendanceInfo(formatDate(date))
    },
    handleEventClick (event) {
      this.updateWorkAttendanceInfo(event.start)
    },
    updateWorkAttendanceInfo (key) {
      const obj = this.workAttendance.workAttendanceObject
      if (!obj[key]) return
      this.workAttendance.username = obj[key].psname
      this.workAttendance.date = key
      this.workAttendance.start = obj[key].onebegintime
      this.workAttendance.end = obj[key].twoendtime
      this.workAttendance.status = obj[key].tbmstatus
    },
    //  查询考勤信息，参数用户代码，date 日期字符串
    queryWorkAttendance (userCode, date) {
      this.$ajax.get('/WorkAttendance/getWorkAttendance', {
        params: {
          userCode,
          date
        }
      }).then((response) => {
        if (response.data && response.data.code === '000000') {
          const data = response.data.data
          if (data) {
            if (this.tabIndex === 'abnormal') {
              this.abnormalData = {
                laterCount: data.cdCount,
                earlyCount: data.ztCount,
                absenteeismCount: data.kgCount,
                laterList: data.cdWorkAttendanceList,
                earlyList: data.ztWorkAttendanceList,
                absenteeismList: data.kgWorkAttendanceList
              }
            }
            if (this.tabIndex === 'calendar') {
              let abnormalCount = 0
              abnormalCount += parseInt(data.cdCount, 10)
              abnormalCount += parseInt(data.ztCount, 10)
              abnormalCount += parseInt(data.kgCount, 10)
              this.workAttendance.leaveCount = data.xjCount
              this.workAttendance.abnormalCount = `${abnormalCount}`
              this.workAttendance.overtimeCount = data.jbCount
              this.workAttendance.businessCount = data.ccCount
              const workAttendanceObject = {}
              //  全部考勤信息转为键值对应实现快速查找
              data.allWorkAttendanceList.forEach((item) => {
                if (!item.calendar) return
                workAttendanceObject[item.calendar] = item
              })
              this.workAttendance.workAttendanceObject = workAttendanceObject
              const events = []
              data.ccWorkAttendanceList.forEach((item) => {
                if (!item.calendar) return
                events.push({
                  title: new Date(item.calendar).getDate(),
                  start: item.calendar,
                  cssClass: 'business'
                })
              })
              data.ycWorkAttendanceList.forEach((item) => {
                if (!item.calendar) return
                events.push({
                  title: new Date(item.calendar).getDate(),
                  start: item.calendar,
                  cssClass: 'abnormal'
                })
              })
              data.jbWorkAttendanceList.forEach((item) => {
                if (!item.calendar) return
                events.push({
                  title: new Date(item.calendar).getDate(),
                  start: item.calendar,
                  cssClass: 'overtime'
                })
              })
              data.xjWorkAttendanceList.forEach((item) => {
                if (!item.calendar) return
                events.push({
                  title: new Date(item.calendar).getDate(),
                  start: item.calendar,
                  cssClass: 'leave'
                })
              })
              this.calendarEvents = events
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //  TODO 跳转签卡
    handleBtnClick () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.work-attend {
  padding: 16px;
  height: 100%;
  .ivu-card {
    height: 100%;
    overflow-y: auto;
  }
  .search-box {
    margin-bottom: 20px;
  }
  .abnormal-list {
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
    .abnormal-list-box {
      height: 420px;
      overflow-y: auto;
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
    span {
      float: right;
    }
    .abnormal-item {
      margin: 5px;
      padding: 5px;
      border: 1px solid #eee;
    }
  }
  .work-attendance-info, .work-attendance-detail {
    width: 50%;
    margin: 10px auto;
  }
  .work-attendance-detail {
    border: 1px solid #eee;
    padding: 0 25px;
    table {
      width: 100%;
      th, td {
        height: 40px;
        padding: 0 10px;
      }
      th {
        border-bottom: 1px solid #eee;
        font-weight: normal;
        text-align: left;
      }
    }
  }
}
</style>
