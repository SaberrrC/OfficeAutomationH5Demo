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
              <i-Col :lg="{span:12}" :md="{span:13}" :sm="{span:12}" :xs="{span:14}" >
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
              <i-Col :lg="{span:8,offset:4}" :md="{span:10,offset:1}" :sm="{span:12,}" :xs="{span:10,offset:0}" style="text-align: right;padding-right: 16px">
                <Button type="primary"  style="margin-right: 20px" :disabled="disabled" @click="handleBatchAgree">批量同意</Button>
                <Button type="error"  :disabled="disabled" @click="handleBatchReject">批量驳回</Button>
              </i-Col>
            </Row>
          </span>
        </p>
          <div class="work-report-daily">
            <Table
              height="450"
              ref="selection"
              :columns="toDoListHeader"
              :data="toDoList"
              :loading="loading"
              @on-selection-change="handleChecked"
              @on-row-click="showInfo"></Table>
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
    name: 'Todo',
    data () {
      return {
        loading: false,
        formItem: {
          time: '4',
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
            width: 150,
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
        this.loading = true
        this.$ajax.get(`/MyAplication/selectMyAplication`, {
          params: {
            checkmanId: this.$store.state.userInfo.code,
            userName: this.formItem.launchUser,
            isCheck: 'N',
            pkBillType: this.billType,
            time: this.formItem.time,
            pageNum: this.launchCurrentPage,
            pageSize: this.launchPageSize
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.launchTotal = response.data.data.total
            this.toDoList = response.data.data.data
            this.loading = false
          } else if (response.data.code === '020000') {
            this.toDoList = []
            this.loading = false
          } else {
            this.toDoList = []
            this.loading = false
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
        var data = {
          billType: row.pkBillType,          // 单据类型
          billCode: row.billNo,          // 单据编码
//          approveState: row.approveState,          // 单据状态
          type: this.$route.name,                 // 前一页面类型（我的申请）
          total: this.launchTotal,                 // 发起列表总条数
          pageNum: this.launchCurrentPage,            // 发起列表当前页数
          pageSize: this.launchPageSize,              // 发起列表每页显示条数
          time: this.formItem.time,
          launchUser: this.formItem.launchUser,   // 搜索人
          selectBillType: this.billType,               // 查询方式（加班/签卡/休假/调休/全部）
          index: index
        }
        switch (row.pkBillType) {
          case '6402':
            this.$router.push({path: 'signCardLaunchInfo', query: data})
            break
          case '6403':
            this.$router.push({path: 'billLaunchInfo', query: data})
            break
          case '6404':
            this.$router.push({path: 'furloughLaunchInfo', query: data})
            break
          case '6405':
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
      },
//    点击批量同意
      handleBatchAgree () {
        const title = '确认'
        const content = '<p>是否批量同意已勾选的申请？</p>'
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: () => {
            this.handleEdit('true')
          }
        })
      },
//    点击批量驳回
      handleBatchReject () {
        const title = '确认'
        const content = '<p>是否批量驳回已勾选的申请？</p>'
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: () => {
            this.handleEdit('false')
          }
        })
      },
//    点击同意
      HandleAgree (row) {
        var len = this.checkList.length
        if (len !== 0) {
          this.checkList = []
          this.checkList.push(row)
          this.handleEdit('true')
        } else {
          this.checkList.push(row)
          this.handleEdit('true')
        }
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
        var batch = ''
        if (len === 1) {
          batch = ''
        } else {
          batch = '批量'
        }
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
        this.$ajax.post(`/Approve/allApprove`, approveRequest, {
        }).then((response) => {
          let len = response.data.data.length
          let number = []
          for (let i = 0; i < len; i++) {
            if (response.data.data[i].status === '2') {
              number.push(response.data.data[i].reason)
            }
          }
          number = number.join(';')
          console.log(number)
          if (number === '') {
            if (text === 'true') {
              this.$Message.success(batch + '审批成功')
            } else if (text === 'false') {
              this.$Message.success(batch + '驳回成功')
            }
          } else if (number !== '') {
            if (text === 'true') {
              this.$Message.error('单号为：' + number + '的申请审批失败')
            } else if (text === 'false') {
              this.$Message.error('单号为：' + number + '的申请驳回失败')
            }
          }
          this.getToDoList()
          this.checkList = []
          this.disabled = true
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
    height: 53px;
    line-height: 53px;
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
