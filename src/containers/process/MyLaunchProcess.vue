<template>
  <div>
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
              <Form :model="formItem" :label-width="80">
                <i-Col :lg="{span:10}" :md="{span:12}" :sm="{span:14}" :xs="{span:16}" >
                    <row>
                      <i-Col span="11">
                        <FormItem label="提交日期">
                          <Select v-model="formItem.time" @on-change="checkTime()">
                          <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </FormItem>
                      </i-Col>
                      <i-Col span="11" offset="2">
                        <FormItem label="状态">
                          <Select v-model="formItem.status" @on-change="checkStatus">
                          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </FormItem>
                      </i-Col>
                    </row>
              </i-Col>
              </Form>
            </Row>
          </span>
          </p>

        <div class="work-report-daily">
          <div style="max-height:80%;width: 100%;overflow: auto">
          <Table
            ref="selection"
            :columns="myLaunchHeader"
            :data="myLaunchList"
            height="450"
            :loading="loading"
            @on-row-click="showInfo">
          </Table>
          </div>
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
        </div>
  </div>
</template>

<script>
  export default {
    name: 'MyLaunch',
    data () {
      return {
        loading: false,
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
        statusList: [
          {
            value: 'all',
            label: '全部'
          },
          {
            value: '-1',
            label: '已收回'
          },
          {
            value: '0',
            label: '已驳回'
          },
          {
            value: '1',
            label: '已通过'
          },
          {
            value: '2',
            label: '审批中'
          },
          {
            value: '3',
            label: '未审批'
          }
        ],
        items: [
          {label: '出差申请', id: '6403', isActive: false},
          {label: '休假申请', id: '6404', isActive: false},
          {label: '加班申请', id: '6405', isActive: false},
          {label: '签卡申请', id: '6402', isActive: false}
        ],
        myLaunchHeader: [
          {
            title: '申请类型',
            key: 'billTypeName',
            align: 'center',
            sortable: true
          },
          {
            title: '提交时间',
            key: 'creationTime',
            align: 'center',
            sortable: true
          },
          {
            title: '状态',
            key: 'approveStateName',
            align: 'center',
            sortable: true
          },
          {
            title: '操作',
            key: 'approveState',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.approveState !== '3'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: (event) => {
                      this.approveCallBack(params.row)
                      event.stopPropagation()
                    }
                  }
                }, '收回')
              ])
            }
          }
        ],
        myLaunchList: []
      }
    },
    methods: {
//    获取我发起的列表
      getMyLaunchList () {
        this.loading = true
        let data = {
          time: this.formItem.time,
          approveState: this.formItem.status,
          billType: this.billType,
          pageNum: this.launchCurrentPage,
          pageSize: this.launchPageSize
        }
        if (data.approveState === 'all') {
          data.approveState = ''
        }
        this.$ajax.get(`/myApply/queryApproveByAll`, {
          params: data
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000' && response.data.data.dataList.length !== 0) {
            this.launchTotal = response.data.data.total
            this.myLaunchList = response.data.data.dataList
            this.loading = false
          } else if (response.data.code === '000000' && response.data.data.dataList.length === 0) {
            this.myLaunchList = []
            this.loading = false
          } else {
            this.myLaunchList = []
            this.loading = false
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击表格的行触发事件
      showInfo (row, index) {
        console.log(row)
        console.log(index)
        var data = {
          billType: row.billType,          // 单据类型
          billCode: row.billCode,          // 单据编码
          approveState: row.approveState,          // 单据状态
          type: this.$route.name,                 // 前一页面类型（我的申请）
          total: this.launchTotal,                 // 发起列表总条数
          pageNum: this.launchCurrentPage,            // 发起列表当前页数
          pageSize: this.launchPageSize,              // 发起列表每页显示条数
          time: this.formItem.time,
          selectApproveState: this.formItem.status === 'all' ? '' : this.formItem.status,   // 查询单据状态
          selectBillType: this.billType,               // 查询方式（加班/签卡/休假/调休/全部）
          index: index
        }
        switch (row.billType) {
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
//    选择发起时间
      checkTime () {
        this.getMyLaunchList()
      },
//    选择发起状态
      checkStatus (value) {
        console.log(value)
        this.getMyLaunchList()
      },
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
        this.getMyLaunchList()
      },
//    点击收回
      approveCallBack (row) {
        /*
        * 调收回接口
        * */
        var approveRequest = {
          monocode: row.billCode,
          type: row.billType
        }
        this.$ajax.post(`/myApply/approveCallBack`, approveRequest, {
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.$Message.success('收回成功')
            this.getMyLaunchList()
          } else {
            this.$Message.success(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    翻页
      changePage (page) {
        this.launchCurrentPage = page              // 发起列表当前页数
        this.getMyLaunchList()
      },
//    切换每页显示条数
      pageSizeChange (pageSize) {
        this.launchPageSize = pageSize              // 发起列表每页显示条数
        this.getMyLaunchList()
      }
    },
    created () {
      this.getMyLaunchList()
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
