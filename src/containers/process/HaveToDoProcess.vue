<template>
  <div>
    <!--左侧-->
    <div class="nav">
      <div>
        <h3>行政流程类</h3>
        <ul>
          <li>
            <Button type="text">
              <span>办公用品申请</span>
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <h3>HR流程类</h3>
        <ul>
          <li v-for="(item,index) in items" @click = "HrType(index)">
            <Button type="text">
              <span :class="{active:item.isActive}">{{item.label}}</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>

        <div class="contents">
          <p slot="title" class="header">
          <span>
            <Row>
              <i-Col :lg="{span:10}" :md="{span:12}" :sm="{span:14}" :xs="{span:16}" >
                    <row>
                    <Form :model="formItem" :label-width="80">
                      <i-Col span="11">
                        <FormItem label="提交日期">
                          <Select v-model="formItem.time" @on-change="checkTime()">
                          <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </FormItem>
                      </i-Col>
                      <i-Col span="11" offset="2">
                        <FormItem label="搜索发起人">
                          <Input placeholder="搜索发起人"
                                 v-model="formItem.launchUser"
                                 icon="ios-search"
                                 @on-click="searchLaunchUser"
                                 @on-enter="searchLaunchUser"></Input>
                        </FormItem>
                      </i-Col>
                    </Form>
                    </row>
              </i-Col>
            </Row>
          </span>
          </p>
          <div class="work-report-daily">
            <div style="max-height:450px;width: 100%;overflow:auto;">
            <Table
              ref="selection"
              :columns="haveTodoListHeader"
              :data="haveTodoList"
              @on-row-click="showInfo">
            </Table>
            </div>
            <div style="margin: 10px;overflow: hidden">
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


  </div>
</template>

<script>
  export default {
    name: 'HaveTodo',
    data () {
      return {
        formItem: {
          time: '4',
          status: ''
        },
        billType: '',                    // 发起类型
        launchTotal: 0,                 // 发起列表总条数
        launchPageSize: 10,              // 发起列表每页显示条数
        launchCurrentPage: 1,              // 发起列表当前页数
        timeList: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '今天'
          },
          {
            value: '2',
            label: '近三天'
          },
          {
            value: '3',
            label: '近一周'
          },
          {
            value: '4',
            label: '近一个月'
          }
        ],
        items: [
          {label: '出差申请', id: '6403', isActive: false},
          {label: '休假申请', id: '6404', isActive: false},
          {label: '加班申请', id: '6405', isActive: false},
          {label: '签卡申请', id: '6402', isActive: false}
        ],
        haveTodoListHeader: [
          {
            title: '申请类型',
            key: 'billTypeName',
            align: 'center',
            sortable: true
          },
          {
            title: '提交时间',
            key: 'sendDate',
            align: 'center',
            sortable: true
          },
          {
            title: '发起人',
            key: 'userName',
            align: 'center',
            sortable: true
          },
          {
            title: '审批时间',
            key: 'dealDate',
            align: 'center'
          }
        ],
        haveTodoList: []
      }
    },
    methods: {
//    选择发起审批类型
      HrType (index) {
        var len = this.items.length
        for (var i = 0; i < len; i++) {
          if (i === index) {
            this.items[index].isActive = true
          } else {
            this.items[i].isActive = false
          }
        }
        this.billType = this.items[index].id
        this.getHaveToDoList()
      },
//    选择发起时间
      checkTime () {
        this.getHaveToDoList()
      },
//    获取已审批列表
      getHaveToDoList () {
        this.$ajax.get(`/MyAplication/selectMyAplication`, {
          params: {
            checkmanId: this.$store.state.userInfo.code,
            userName: this.formItem.launchUser,
            isCheck: 'Y',
            pkBillType: this.billType,
            time: this.formItem.time,
            pageNum: this.launchCurrentPage,
            pageSize: this.launchPageSize
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.launchTotal = response.data.data.total
            this.haveTodoList = response.data.data.data
          } else if (response.data.code === '020000') {
            this.haveTodoList = []
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击某一行
      showInfo (row, index) {
        console.log(row)
        console.log(index)
        var data = {
          billType: row.pkBillType,          // 单据类型
          billCode: row.billNo,          // 单据编码
//          approveState: row.approveState,          // 单据状态
          type: this.$route.name,                 // 前一页面类型（我的申请）
          total: this.launchTotal,                 // 发起列表总条数
          pageNum: this.launchCurrentPage,            // 发起列表当前页数
          pageSize: this.launchPageSize,              // 发起列表每页显示条数
          time: this.formItem.time,
          selectApproveState: this.formItem.status,   // 查询单据状态
          selectBillType: this.billType,               // 查询方式（加班/签卡/休假/调休/全部）
          index: index
        }
        console.log(data)
        switch (row.pkBillType) {
          case '6402':
            console.log('签卡申请')
            this.$router.push({path: 'signCardLaunchInfo', query: data})
            break
          case '6403':
            console.log('出差申请')
            this.$router.push({path: 'billLaunchInfo', query: data})
            break
          case '6404':
            console.log('休假申请')
            this.$router.push({path: 'furloughLaunchInfo', query: data})
            break
          case '6405':
            console.log('加班申请')
            this.$router.push({path: 'workApplyLaunchInfo', query: data})
            break
        }
      },
//    搜索发起人
      searchLaunchUser () {
        this.getHaveToDoList()
      },
//    分页
      changePage (page) {
        this.launchCurrentPage = page              // 发起列表当前页数
        this.getHaveToDoList()
      },
      pageSizeChange (pageSize) {
        this.launchPageSize = pageSize              // 发起列表每页显示条数
        this.getHaveToDoList()
      }
    },
    created () {
      this.getHaveToDoList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .active {
    color: #4d9aef;
  }
  .nav {
    display: block;
    position:absolute;
    top: 0;
    bottom:0;
    left: 0;
    width: 200px;
    background: #ffffff;
    padding: 20px ;
    color: #1c2438;
  }
  .contents {
    margin-left: 200px;
  }
  .nav ul li {
    padding-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: -0.34px;
    line-height: 36px;
    display: block;
    height: 36px;
  }
  .header {
    height: 48px;
    line-height: 48px;
    padding-left: 24px;
    background: #ffffff;
    border-left: 1px solid #cccccc;
  }
  .ivu-form-item {
    vertical-align: top;
    zoom: 1;
    margin-top: 6px;
  }
</style>
