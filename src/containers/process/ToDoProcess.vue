<template>
  <div>
    <!--左侧-->
        <div class="nav">
          <div>
            <h3>行政流程类</h3>
            <ul>
              <Button type="text"><li>办公用品申请</li></Button>
            </ul>
          </div>
          <div>
            <h3>HR流程类</h3>
            <ul>
              <Button type="text" v-for="(item,index) in items" @click = "HrType(index)"><li><span :class="{active:item.isActive}">{{item.label}}</span></li></Button>
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
                          <Input
                            placeholder="搜索发起人"
                            v-model="formItem.launchUser"
                            icon="ios-search"
                            @on-click="searchLaunchUser"
                            @on-enter="searchLaunchUser"
                          ></Input>
                        </FormItem>
                      </i-Col>
                    </Form>
                    </row>
              </i-Col>
              <i-Col :lg="{span:6,offset:8}" :md="{span:8,offset:4}" :sm="{span:10}" :xs="{span:6,offset:8}">
                <Button type="primary" style="margin-right: 20px" :disabled="disabled" @click="handleBatchAgree">批量同意</Button>
                <Button type="error" :disabled="disabled" @click="handleBatchReject">批量驳回</Button>
              </i-Col>
            </Row>
          </span>
        </p>
          <div class="work-report-daily">
            <Table
              ref="selection"
              :columns="toDoListHeader"
              :data="toDoList"
              @on-selection-change="handleChecked"
              @on-row-click="showInfo"
            >
            </Table>
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
    name: 'WorkReportDaily',
    data () {
      return {
        formItem: {
          time: '0',
          launchUser: ''
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
        toDoListHeader: [
          {
            type: 'selection',
            width: 30,
            align: 'center'
          },
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
            title: '操作',
            key: 'status',
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
                    click: (event) => {
                      this.HandleAgree(params.row)
//                      console.log(params.row)
                      event.stopPropagation()
                    }
                  }
                }, '同意'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: (event) => {
//                      this.remove(params.index)
                      this.handleReject(params.row)
                      event.stopPropagation()
                    }
                  }
                }, '驳回')
              ])
            }
          }
        ],
        toDoList: [],         // 列表
        disabled: true,      // 开关是否可点
        checkList: []        // 选中列表
      }
    },
    methods: {
//    选择待我审批类型
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
        this.getToDoList()
      },
//    获取待我审批列表
      getToDoList () {
        this.$ajax.get(`/MyAplication/selectMyAplication`, {
          params: {
            checkmanId: '010014136',
            userName: this.formItem.launchUser,
            isCheck: 'N',
            pkBillType: this.billType,
            time: this.formItem.time,
            pageNum: this.launchCurrentPage,
            pageSize: this.launchPageSize
          },
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.launchTotal = response.data.data.total
            this.toDoList = response.data.data.data
          } else if (response.data.code === '020000') {
            this.toDoList = []
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    选择发起时间
      checkTime () {
        this.getToDoList()
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
//    选中状态改变
      handleChecked (selection) {
        if (selection.length === 0) {
          this.disabled = true
        } else {
          this.disabled = false
        }
        this.checkList = selection
        console.log(this.checkList)
      },
//    点击批量同意
      handleBatchAgree () {
        this.handleEdit('true')
      },
//    点击批量驳回
      handleBatchReject () {
        this.handleEdit('false')
      },
      HandleAgree (row) {
        var len = this.checkList.length
        console.log(len)
        if (len !== 0) {
          this.checkList = []
          this.checkList.push(row)
          this.handleEdit('true')
        } else {
          this.checkList.push(row)
          this.handleEdit('true')
        }
//        console.log(row)
      },
//    点击驳回
      handleReject (row) {
        var len = this.checkList.length
        if (len !== 0) {
          this.checkList = []
          this.checkList.push(row)
          this.handleEdit('false')
        } else {
          this.checkList.push(row)
          this.handleEdit('false')
        }
      },
//    调同意/驳回接口
      handleEdit (text) {
        var len = this.checkList.length
        var approveRequest = []
        for (var j = 0; j < len; j++) {
          var data = {
            monocode: this.checkList[j].billNo,
            status: text,
            type: this.checkList[j].pkBillType,
            message: ''
          }
          approveRequest.push(data)
        }
        console.log(approveRequest)
        this.$ajax.post(`/Approve/allApprove`, approveRequest, {
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.$Message.success('审批成功')
            this.getToDoList()
            this.checkList = []
          } else {
            this.$Message.error(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    搜索发起人
      searchLaunchUser () {
        this.getToDoList()
      },
//    分页
      changePage (page) {
        this.launchCurrentPage = page              // 发起列表当前页数
        this.getToDoList()
      },
      pageSizeChange (pageSize) {
        this.launchPageSize = pageSize              // 发起列表每页显示条数
        this.getToDoList()
      }
    },
    created () {
      this.getToDoList()
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
