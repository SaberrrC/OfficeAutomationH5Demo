<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col :lg="{span:5}" :xs="{span:10}">
          <a href="javascript:void (0)" @click="clickLaunchList()">
            <h3 style="display: inline-block;" :class="{active:LaunchList.isActive}">{{LaunchList.title}}</h3>
          </a>
          <!--<h3 style="display: inline-block;margin: 0 10px">|</h3>-->
          <!--<a href="javascript:void (0)" @click="clickBeInvitedList()">-->
            <!--<h3 style="display: inline-block" :class="{active:BeInvitedList.isActive}">{{BeInvitedList.title}}</h3>-->
          <!--</a>-->
        </i-Col>
      </Row>
    </span>
    </p>

  <div class="work-report-daily">
    <Card :dis-hover="true">
      <!--发起列表-->
      <div v-show="showLaunchList">
        <Table border height="450"
               :columns="launchTableHead"
               :data="launchTableData"
               :loading="launchLoading"
        ></Table>
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
        <Table border height="450" :columns="beInvitedTableHead" :data="beInvitedTableData"></Table>
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
import qs from 'qs'
export default {
  name: 'MyMeeting',
  data () {
    return {
      launchLoading: false,
      showLaunchList: true,
      showBeInvitedList: false,
      launchTotal: 0,                 // 发起列表总条数
      launchPageSize: 10,              // 发起列表每页显示条数
      launchCurrentPage: 1,              // 发起列表当前页数
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
                  size: 'small',
                  disabled: params.row.start_time < parseInt((new Date().getTime()) / 1000)
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
                  size: 'small',
                  disabled: params.row.start_time < parseInt((new Date().getTime()) / 1000)
                },
                on: {
                  click: () => {
                    this.remove(params.row, params.index)
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
      this.$ajax.post(`/newMeetings/reserve`, qs.stringify({currentPage: this.launchCurrentPage, pageSize: this.launchPageSize}), {
      }).then((response) => {
        if (response.data.code === '000000' && response.data.data.data.length !== 0) {
          this.launchTotal = parseInt(response.data.data.total)
          let data = response.data.data.data
          let len = data.length
          for (let i = 0; i < len; i++) {
            /*
            * 拼装时间
            * */
            let myDate = new Date(parseInt(data[i].start_time) * 1000)
            let year = myDate.getFullYear()
            let mouth = myDate.getMonth()
            mouth = mouth === 0 ? 1 : mouth + 1
            let day = myDate.getDate()
            let hour = myDate.getHours()
            let week
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
              let length = data[i].part_name.length
              let users = ''
              for (let j = 0; j < length; j++) {
                users += ',' + data[i].part_name[j].name
              }
              users = users.substring(1)
              data[i].meetUser = users
            }
          }
          this.launchTableData = data
          this.launchLoading = false
        } else {
          this.launchTableData = []
          this.launchLoading = false
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    updateTime (row) {
      this.$router.push({path: 'time', query: {meet_id: row.id, roomId: row.room_id, meet_time: row.start_time, type: this.$route.name}})
    },
    remove (row, index) {
      let myDate = new Date()
      let time = Math.round(myDate.getTime() / 1000)      // 当前时间戳
      let data = {
        id: row.id
      }
      const title = '确认'
      const content = '<p>确认是否取消该会议？</p>'
      this.$Modal.confirm({
        title: title,
        content: content,
        onOk: () => {
          if (row.start_time <= time) {
            this.$Message.error('当前会议时间已过，不可以删除')
          } else {
            //      调删除会议室接口
            this.$ajax.post(`/newMeetings/deleteMeeting`, qs.stringify(data), {
              params: {
                room_id: row.room_id //  TODO 临时测试
              }
            }).then((response) => {
              if (response.data.code === '000000') {
                this.launchTableData.splice(index, 1)
                this.$Message.success('取消会议成功')
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        }
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
    height: 53px;
    line-height: 53px;
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
