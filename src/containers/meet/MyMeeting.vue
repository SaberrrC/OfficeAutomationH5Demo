<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col :lg="{span:5}" :xs="{span:10}">
          <a href="javascript:void (0)" @click="clickLaunchList()">
            <h3 style="display: inline-block;" :class="{active:LaunchList.isActive}">{{LaunchList.title}}</h3>
          </a>
          <h3 style="display: inline-block;margin: 0 10px">|</h3>
          <a href="javascript:void (0)" @click="clickBeInvitedList()">
            <h3 style="display: inline-block" :class="{active:BeInvitedList.isActive}">{{BeInvitedList.title}}</h3>
          </a>
        </i-Col>
      </Row>
    </span>
    </p>

  <div class="work-report-daily">
    <Card :dis-hover="true">
      <!--发起列表-->
      <div v-show="showLaunchList">
        <Table border :columns="launchTableHead" :data="launchTableData" :loading="launchLoading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div>
            <Page
              :total="launchTotal"
              :current="launchCurrentPage"
              :page-size="launchPageSize"
              @on-change="changePage"
              @on-page-size-change="pageSizeChange"
              show-total
              show-sizer>
            </Page>
          </div>
        </div>
      </div>

        <!--受邀列表-->
      <div v-show="showBeInvitedList">
        <Table border :columns="beInvitedTableHead" :data="beInvitedTableData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div>
            <Page
              :total="BeInvitedTotal"
              :current="BeInvitedCurrentPage"
              :page-size="BeInvitedPageSize"
              @on-change="changePage"
              @on-page-size-change="pageSizeChange"
              show-total
              show-sizer>
            </Page>
          </div>
        </div>
      </div>
    </Card>
  </div>
  </div>
</template>

<script>
  import qs from "qs"
  //  TODO 临时测试环境变量
  const TEST_CONFIG = 'http://118.31.18.67:8084'
  export default {
    name: 'MyMeeting',
    data () {
      return {
        showLaunchList: true,
        showBeInvitedList: false,
        launchTotal: 0,                 // 发起列表总条数
        launchPageSize: 10,              // 发起列表每页显示条数
        launchCurrentPage: 1,              // 发起列表当前页数
        launchLoading: true,                 // 发起列表loading状态
        BeInvitedTotal: 0,                 // 发起列表总条数
        BeInvitedPageSize: 10,              // 发起列表每页显示条数
        BeInvitedCurrentPage: 1,              // 发起列表当前页数
        LaunchList: {
          title: '发起列表',
          isActive: true
        },
        BeInvitedList: {
          title: '受邀列表',
          isActive: false
        },
        launchTableHead: [
          {
            title: '会议主题',
            key: 'title',
            align: 'center'
          },
          {
            title: '会议时间',
            key: 'date',
            align: 'center'
          },
          {
            title: '会议室名称',
            key: 'meetRoom',
            align: 'center'
          },
          {
            title: '与会人员',
            key: 'meetUser',
            align: 'center',
            ellipsis: true
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.updateTime(params.row)
                    }
                  }
                }, '调期'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '取消')
              ])
            }
          }
        ],
        launchTableData: [],
        beInvitedTableHead: [
          {
            title: '会议主题',
            key: 'title',
            align: 'center'
          },
          {
            title: '会议时间',
            key: 'date',
            align: 'center'
          },
          {
            title: '会议室名称',
            key: 'meetRoom',
            align: 'center'
          },
          {
            title: '与会人员',
            key: 'meetUser',
            align: 'center',
            ellipsis: true
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.refuse(params.index)
                    }
                  }
                }, '拒绝')
              ])
            }
          }
        ],
        beInvitedTableData: []       // TODO    被邀列表
      }
    },
    methods: {
//    点击发起列表
      clickLaunchList () {
        this.showLaunchList = true
        this.showBeInvitedList = false
        this.LaunchList.isActive = true
        this.BeInvitedList.isActive = false
      },
//    点击受邀列表
      clickBeInvitedList () {
        this.showLaunchList = false
        this.showBeInvitedList = true
        this.LaunchList.isActive = false
        this.BeInvitedList.isActive = true
      },
//      获取发起列表
      getLaunchMeet () {
        this.launchLoading = true
        this.$ajax.post(`${TEST_CONFIG}/newMeetings/reserve`, qs.stringify({currentPage: this.launchCurrentPage, pageSize: this.launchPageSize}), {
          headers: {
            token: 'c955d939c180414fa2ffa24be4ebf921', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000' && response.data.data.data.length !== 0) {
            this.launchLoading = false
            this.launchTotal = parseInt(response.data.data.total)
            var data = response.data.data.data
            var len = data.length
            for (var i = 0; i < len; i++) {
              /*
              * 拼装时间
              * */
              var myDate = new Date(parseInt(data[i].start_time) * 1000)
              var year = myDate.getFullYear()
              var mouth = myDate.getMonth()
              mouth = mouth === 0 ? 1 : mouth + 1
              var day = myDate.getDate()
              var hour = myDate.getHours()
              var week
              switch (myDate.getDay()) {
                case 0:
                  week = '周日'
                  break
                case 1:
                  week = '周一'
                  break
                case 2:
                  week = '周二'
                  break
                case 3:
                  week = '周三'
                  break
                case 4:
                  week = '周四'
                  break
                case 5:
                  week = '周五'
                  break
                case 6:
                  week = '周六'
                  break
              }
              data[i].date = year + '-' + mouth + '-' + day + ' ' + hour + ':00' + ' ' + week
              data[i].meetRoom = data[i].roomname
              /*
              * 拼装与会人员
              * */
              if (data[i].part_name.length === 0) {
                data[i].meetUser = ''
              } else {
                var length = data[i].part_name.length
                var users = ''
                for (var j = 0; j < length; j++) {
                  users += ',' + data[i].part_name[j].name
                }
                users = users.substring(1)
                data[i].meetUser = users
              }
            }
            this.launchTableData = data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      updateTime (row) {
        var myDate = new Date()
        var time = Math.round(myDate.getTime() / 1000)      // 当前时间戳
        if (row.start_time <= time) {
          this.$Message.error('当前会议已过期，请选择其他会议')
        } else {
          this.$router.push({path: 'time', query: {meet_id: row.id, roomId: row.room_id, meet_time: row.start_time, send_type: row.send_type}})
        }
      },
      remove (index) {
        var data = {
          id: this.launchTableData[index].id,
          send_type: '1,2'   //  TODO  后期需修改
        }
        const title = '确认'
        const content = '<p>确认是否取消该会议？</p>'
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: (() => {
            //      调删除会议室接口
            this.$ajax.post(`${TEST_CONFIG}/newMeetings/deleteMeeting`, qs.stringify(data), {
              params: {
                room_id: this.launchTableData[index].room_id //  TODO 临时测试
              },
              headers: {
                token: 'c955d939c180414fa2ffa24be4ebf921', //  TODO 临时测试
                uid: '84' //  TODO 临时测试
              }
            }).then((response) => {
              if (response.data.code === '000000') {
                this.launchTableData.splice(index, 1)
                this.$Message.success('取消会议成功')
              }
            }).catch(function (err) {
              console.log(err)
            })
          })
        })
      },
      changePage (page) {
        this.launchCurrentPage = page              // 发起列表当前页数
        this.getLaunchMeet()
      },
      pageSizeChange (pageSize) {
        this.launchPageSize = pageSize              // 发起列表每页显示条数
        this.getLaunchMeet()
      }
    },
    created () {
      this.getLaunchMeet()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    background: #ffffff;
  }
  .header a {
    color: #495060;
  }
  .active {
    color: #2d8cf0;
  }
</style>
