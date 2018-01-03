<template>
  <div class="work-report-daily">
    <Card>
      <p slot="title">
        <span>选择时间</span>
        <br>
        <span>
          <Row>
            <i-Col :lg="{ span: 6 }" :md="{ span: 8 }" :sm="{ span:10 }">
                <Button @click="lastWeek()">
                   <Icon type="chevron-left"></Icon>
                  上一周
                </Button>
                <Button type="primary" style="margin: 0 10px" @click="thisWeek()">本周</Button>
                <Button @click="nextWeek()">
                  下一周
                  <Icon type="chevron-right"></Icon>
                </Button>
            </i-Col>

            <i-Col :lg="{ span: 6, offset: 1 }" :md="{ span: 6, offset: 1}" :sm="{ span:8 }">
              <span>{{weekOneDate}}</span>-- <span>{{weekSevenDate}}</span>
            </i-Col>

            <i-Col :lg="{ span: 4, offset: 7}" :md="{ span: 6, offset: 3}" :sm="{ span:6 }">
              <Button type="primary" @click="fallBack()">返回</Button>
              <Button type="success" style="margin-left: 20px" @click="nextStep()">确定</Button>
            </i-Col>
          </Row>
        </span>
      </p>
        <Table border :columns="tableHeader" :data="tableData"></Table>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        nowTime: this.$route.query.meet_time ? parseInt(this.$route.query.meet_time) : parseInt(new Date().getTime() / 1000), // 当前时间戳
        meet_id: this.$route.query.meet_id ? this.$route.query.meet_id : '',                    //    会议id
        send_type: this.$route.query.send_type ? this.$route.query.send_type : '',                    //    发送方式
        roomId: this.$route.query.roomId,
        roomName: this.$route.query.roomName,
        nop: this.$route.query.nop,
        device: this.$route.query.device,
        date: '',                     // 当前日期
        weekOneDate: '',              // 周一日期
        weekSevenDate: '',            // 周日日期
        click_time: [],               // 选中的时间
        tableHeader: [
          {
            title: '会议时间',
            key: 'date',
            width: 120,
            align: 'center'
          },
          {
            title: '星期一',
            key: 'week1',
            align: 'center',
//            ellipsis: true
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 1)
                  }
                }
              }, params.row.week1)
            }
          },
          {
            title: '星期二',
            key: 'week2',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 2)
                  }
                }
              }, params.row.week2)
            }
          },
          {
            title: '星期三',
            key: 'week3',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 3)
                  }
                }
              }, params.row.week3)
            }
          },
          {
            title: '星期四',
            key: 'week4',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 4)
                  }
                }
              }, params.row.week4)
            }
          },
          {
            title: '星期五',
            key: 'week5',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 5)
                  }
                }
              }, params.row.week5)
            }
          },
          {
            title: '星期六',
            key: 'week6',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 6)
                  }
                }
              }, params.row.week6)
            }
          },
          {
            title: '星期日',
            key: 'week7',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {
                  width: '100%',
                  height: '48px',
                  'line-height': '48px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  'white-space': 'nowrap'
                },
                on: {
                  click: () => {
                    this.handleTd(params.index, 7)
                  }
                }
              }, params.row.week7)
            }
          }
        ],           // 表头
        tableData: [
          {
            date: '9:00 - 10:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '10:00 - 11:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '11:00 - 12:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '12:00 - 13:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '13:00 - 14:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '14:00 - 15:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '15:00 - 16:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '16:00 - 17:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '17:00 - 18:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          },
          {
            date: '18:00 - 19:00',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            week7: ''
          }
        ]              // 表格内容
      }
    },
    methods: {
//    点击返回按钮
      fallBack () {
        this.$router.push({ path: 'add' })
      },
//    数组去重方法
      removeArrayRepElement (arr) {
        let result = []
        let isRepeated
        for (var i = 0; i < arr.length; i++) {
          isRepeated = false
          for (var j = 0; j < arr.length; j++) {
            if (arr[i] === result[j]) {  // 将后面重复的数删掉
              isRepeated = true
              break
            }
          }
          if (!isRepeated) {
            result.push(arr[i])
          }
        }
        return result
      },
//    排序方法
      sortNumber (a, b) {
        return a - b
      },
      //    点击确定按钮
      nextStep () {
        var len = this.click_time.length
        let startClock = ''
        var endClock = ''
        if (len === 0) {
          this.$Message.info('请选择会议时间')
        }
        if (len !== 0) {    //     长度大于1时，判断选择是否连续
          var arr = []
          for (var i = 0; i < len; i++) {
            arr.push(this.click_time[i].click_week)
          }
          arr = this.removeArrayRepElement(arr)
          if (arr.length > 1) {     // 判断选择是否在同一天(不在)
            this.$Message.info('请选择连续的时间')
          } else {          // 在同一天时，判断时间点是否连续
//            var len = this.click_time.length
            var clock = []

            for (let i = 0; i < len; i++) {
              clock.push(this.click_time[i].click_clock)
            }
            clock = clock.sort(this.sortNumber)
            if (clock[0] + len - 1 !== clock[clock.length - 1]) {
              this.$Message.info('请选择连续的时间')
            } else {
              startClock = clock[0]     // 开始时间点
              endClock = clock[0] + len   // 结束时间点
              var n = this.click_time[0].click_week - 1              // 会议时长
              var thisDatetime = this.click_time[0].week1_time + 3600 * 24 * n     // 选择会议当天0点的时间戳
              var myDate = new Date(thisDatetime * 1000)
              var year = myDate.getFullYear()
              var mouth = myDate.getMonth()
              mouth = mouth === 0 ? 1 : mouth + 1
              var day = myDate.getDate()
              var thisDate = year + '-' + mouth + '-' + day
              var startTime = thisDate + ' ' + startClock + ':00'
              var endTime = thisDate + ' ' + endClock + ':00'
              if (this.meet_id === '') {    // 判断会议id为空，说明是预约
                this.$router.push({path: 'confirm', query: {roomId: this.roomId, roomName: this.roomName, nop: this.nop, device: this.device, start_time: startTime, end_time: endTime}})
              } else {   //  调期
//              调取会议调期接口
                var data = {
                  meeting_id: this.meet_id,
                  start_time: startTime,
                  end_time: endTime,
                  send_type: this.send_type
                }
                this.$ajax.post(`/newMeetings/updateMeeting`, data, {
                }).then((response) => {
                  if (response.data.code === '000000') {
                    this.$Message.success('您已成功修改了本次会议的时间')
                    this.$router.push({path: 'myMeeting'})
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
            }
          }
        }
      },
//    已选消息提示框
      open () {
        this.$Message.warning('该时段已被预约，请选择其他时间')
      },
//    过期时间提醒
      outTime () {
        this.$Message.error('该时段小于当前时间，请选择其他时间')
      },
//    点击上一周
      lastWeek () {
        this.nowTime = this.nowTime - 3600 * 24 * 7
        this.getDate(this.nowTime)
        this.getAllMeetings()
      },
//    点击本周
      thisWeek () {
        this.nowTime = parseInt(new Date().getTime() / 1000)
        this.getDate(this.nowTime)
        this.getAllMeetings()
      },
//    点击下一周
      nextWeek () {
        this.nowTime = this.nowTime + 3600 * 24 * 7
        this.getDate(this.nowTime)
        this.getAllMeetings()
      },
//    格式化时间
      getDate (time) {
        var myDate = new Date(time * 1000)
        var todayStart = new Date(myDate.setHours(0, 0, 0, 0)) / 1000        // 获取当天0点的时间戳
        var todayWeek = myDate.getDay()       // 获取当前星期几
        var weekOne = ''
        var weekSeven = ''
        if (todayWeek !== 0) {
          weekOne = parseInt(todayStart) - parseInt(3600 * 24 * (todayWeek - 1))
          weekSeven = parseInt(todayStart) + parseInt(3600 * 24 * (7 - todayWeek))
          this.nowTime = weekOne
        } else if (todayWeek === 0) {
          weekOne = parseInt(todayStart) - parseInt(3600 * 24 * 6)
          weekSeven = parseInt(todayStart)
          this.nowTime = weekOne
        }
        function getLocalTime (nS) {
          return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
        }
        this.date = getLocalTime(todayStart)                                // 当前日期
        this.date = this.date.substr(0, this.date.indexOf(' ') + 1)           // 当前日期
        this.weekOneDate = getLocalTime(weekOne)
//        当前周一时间戳
        this.weekOneDate = this.weekOneDate.substr(0, this.weekOneDate.indexOf(' ') + 1)      // 当前周一日期
        this.weekSevenDate = getLocalTime(weekSeven)
        this.weekSevenDate = this.weekSevenDate.substr(0, this.weekSevenDate.indexOf(' ') + 1)   // 当前周日日期
      },
//    获取当前一周的会议
      getAllMeetings () {
//      清空表格
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].week1 = ''
          this.tableData[i].week2 = ''
          this.tableData[i].week3 = ''
          this.tableData[i].week4 = ''
          this.tableData[i].week5 = ''
          this.tableData[i].week6 = ''
          this.tableData[i].week7 = ''
        }
        this.getDate(this.nowTime)
//      调获取会议接口
        this.$ajax.get(`/newMeetings/get`, {
          params: {
            roomId: this.$route.query.roomId,
            weekdate: this.nowTime
          }
        }).then((response) => {
//        判断成功返回数据
          if (response.data.code === '000000' && response.data.data.length !== 0) {
            let meetingList = response.data.data
            for (let i = 0; i < meetingList.length; i++) {
              meetingList[i].week = new Date((meetingList[i].start_time) * 1000).getDay()
              meetingList[i].start_h = new Date((meetingList[i].start_time) * 1000).getHours()
              meetingList[i].end_h = new Date((meetingList[i].end_time) * 1000).getHours()
              if (meetingList[i].week === 0) {
                meetingList[i].week = 7
              }
            }
            for (let j = 0; j < this.tableData.length; j++) {
              for (let i = 0; i < meetingList.length; i++) {
                if (meetingList[i].week === 1 && meetingList[i].start_h - 9 === j) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week1 = '√'
                      this.click_time.push({week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9})
                    } else {
                      this.tableData[j + k].week1 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
                if (meetingList[i].week === 2 && meetingList[i].start_h === j + 9) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week2 = '√'
                      this.click_time.push({ week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9 })
                    } else {
                      this.tableData[j + k].week2 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
                if (meetingList[i].week === 3 && meetingList[i].start_h === j + 9) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week3 = '√'
                      this.click_time.push({week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9})
                    } else {
                      this.tableData[j + k].week3 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
                if (meetingList[i].week === 4 && meetingList[i].start_h === j + 9) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week4 = '√'
                      this.click_time.push({week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9})
                    } else {
                      this.tableData[j + k].week4 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
                if (meetingList[i].week === 5 && meetingList[i].start_h === j + 9) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week5 = '√'
                      this.click_time.push({week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9})
                    } else {
                      this.tableData[j + k].week5 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
                if (meetingList[i].week === 6 && meetingList[i].start_h === j + 9) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week6 = '√'
                      this.click_time.push({week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9})
                    } else {
                      this.tableData[j + k].week6 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
//
                if (meetingList[i].week === 7 && meetingList[i].start_h === j + 9) {
                  let hour = meetingList[i].end_h - meetingList[i].start_h
                  for (let k = 0; k < hour; k++) {
                    if (this.meet_id === meetingList[i].id) {
                      this.tableData[j + k].week7 = '√'
                      this.click_time.push({week1_time: this.nowTime, click_week: meetingList[i].week, click_clock: j + k + 9})
                    } else {
                      this.tableData[j + k].week7 = meetingList[i].username + ' -- ' + meetingList[i].department
                    }
                  }
                }
              }
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击单元格
      handleTd (a, b) {
        var myDate = new Date()
        var hour = myDate.getHours()
        var todayStart = new Date(myDate.setHours(0, 0, 0, 0)) / 1000        // 获取当天0点的时间戳
        var todayWeek = myDate.getDay() === 0 ? 7 : myDate.getDay()       // 获取当前星期几
        var weekOne = ''
        if (todayWeek !== 0) {
          weekOne = parseInt(todayStart) - parseInt(3600 * 24 * (todayWeek - 1))
        } else if (todayWeek === 0) {
          weekOne = parseInt(todayStart) - parseInt(3600 * 24 * 6)
        }
        if (this.nowTime < weekOne) {
          this.outTime()
          return false
        } else if (this.nowTime === weekOne) {
          if (todayWeek > b) {       // 选择日期小于当前日期
            this.outTime()
          } else if (todayWeek === b) {
            if (a + 9 <= hour) {
              this.outTime()
            } else {
              switch (b) {
                case 1:
                  if (this.tableData[a].week1 === '') {
                    this.tableData[a].week1 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week1 === '√') {
                    this.tableData[a].week1 = ''
                    var len = this.click_time.length
                    for (var i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
                case 2:
                  if (this.tableData[a].week2 === '') {
                    this.tableData[a].week2 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week2 === '√') {
                    this.tableData[a].week2 = ''
                    let len = this.click_time.length
                    for (let i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
                case 3:
                  if (this.tableData[a].week3 === '') {
                    this.tableData[a].week3 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week3 === '√') {
                    this.tableData[a].week3 = ''
                    let len = this.click_time.length
                    for (let i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
                case 4:
                  if (this.tableData[a].week4 === '') {
                    this.tableData[a].week4 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week4 === '√') {
                    this.tableData[a].week4 = ''
                    let len = this.click_time.length
                    for (let i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
                case 5:
                  if (this.tableData[a].week5 === '') {
                    this.tableData[a].week5 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week5 === '√') {
                    this.tableData[a].week5 = ''
                    let len = this.click_time.length
                    for (let i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
                case 6:
                  if (this.tableData[a].week6 === '') {
                    this.tableData[a].week6 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week6 === '√') {
                    this.tableData[a].week6 = ''
                    let len = this.click_time.length
                    for (let i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
                case 7:
                  if (this.tableData[a].week7 === '') {
                    this.tableData[a].week7 = '√'
                    this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                  } else if (this.tableData[a].week7 === '√') {
                    this.tableData[a].week7 = ''
                    let len = this.click_time.length
                    for (let i = 0; i < len; i++) {
                      if (this.click_time[i].click_clock === a + 9) {
                        this.click_time.splice(i, 1)
                      }
                    }
                  } else {
                    this.open()
                  }
                  break
              }
            }
          } else {                //     选择时间大于当前时间(本周)
            switch (b) {
              case 1:
                if (this.tableData[a].week1 === '') {
                  this.tableData[a].week1 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week1 === '√') {
                  this.tableData[a].week1 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
              case 2:
                if (this.tableData[a].week2 === '') {
                  this.tableData[a].week2 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week2 === '√') {
                  this.tableData[a].week2 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
              case 3:
                if (this.tableData[a].week3 === '') {
                  this.tableData[a].week3 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week3 === '√') {
                  this.tableData[a].week3 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
              case 4:
                if (this.tableData[a].week4 === '') {
                  this.tableData[a].week4 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week4 === '√') {
                  this.tableData[a].week4 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
              case 5:
                if (this.tableData[a].week5 === '') {
                  this.tableData[a].week5 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week5 === '√') {
                  this.tableData[a].week5 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
              case 6:
                if (this.tableData[a].week6 === '') {
                  this.tableData[a].week6 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week6 === '√') {
                  this.tableData[a].week6 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
              case 7:
                if (this.tableData[a].week7 === '') {
                  this.tableData[a].week7 = '√'
                  this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
                } else if (this.tableData[a].week7 === '√') {
                  this.tableData[a].week7 = ''
                  let len = this.click_time.length
                  for (let i = 0; i < len; i++) {
                    if (this.click_time[i].click_clock === a + 9) {
                      this.click_time.splice(i, 1)
                    }
                  }
                } else {
                  this.open()
                }
                break
            }
          }
        } else if (this.nowTime > weekOne) {       //        下一周
          switch (b) {
            case 1:
              if (this.tableData[a].week1 === '') {
                this.tableData[a].week1 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week1 === '√') {
                this.tableData[a].week1 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
            case 2:
              if (this.tableData[a].week2 === '') {
                this.tableData[a].week2 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week2 === '√') {
                this.tableData[a].week2 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
            case 3:
              if (this.tableData[a].week3 === '') {
                this.tableData[a].week3 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week3 === '√') {
                this.tableData[a].week3 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
            case 4:
              if (this.tableData[a].week4 === '') {
                this.tableData[a].week4 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week4 === '√') {
                this.tableData[a].week4 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
            case 5:
              if (this.tableData[a].week5 === '') {
                this.tableData[a].week5 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week5 === '√') {
                this.tableData[a].week5 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
            case 6:
              if (this.tableData[a].week6 === '') {
                this.tableData[a].week6 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week6 === '√') {
                this.tableData[a].week6 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
            case 7:
              if (this.tableData[a].week7 === '') {
                this.tableData[a].week7 = '√'
                this.click_time.push({week1_time: this.nowTime, click_week: b, click_clock: a + 9})
              } else if (this.tableData[a].week7 === '√') {
                this.tableData[a].week7 = ''
                let len = this.click_time.length
                for (let i = 0; i < len; i++) {
                  if (this.click_time[i].click_clock === a + 9) {
                    this.click_time.splice(i, 1)
                  }
                }
              } else {
                this.open()
              }
              break
          }
        }
      }
    },
    created () {
      this.getAllMeetings()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .work-report-daily p{
    line-height: 28px;
    height: 60px;
  }

  .ivu-table-cell {
    padding: 0 !important;
  }
  ivu-table-column-center span {

  }
</style>
