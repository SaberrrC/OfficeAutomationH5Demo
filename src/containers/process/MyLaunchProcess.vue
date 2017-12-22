<template>
  <div>
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

        <div class="content">
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
                          <Select v-model="formItem.status" @on-change="checkStatus()">
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
          <Table ref="selection" :columns="myLaunchHeader" :data="myLaunchList" @on-row-click="showInfo"></Table>
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
  import axios from 'axios'
  //  TODO 临时测试环境变量
  const TEST_CONFIG = 'http://118.31.18.67:8084'
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        formItem: {
          time: '',
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
            value: '-2',
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
            key: 'type',
            align: 'center',
            sortable: true
          },
          {
            title: '提交时间',
            key: 'date',
            align: 'center',
            sortable: true
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            sortable: true
          },
          {
            title: '操作',
            key: 'edit',
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
//                      this.show(params.index)
                      console.log(params.row)
                      event.stopPropagation()
                    }
                  }
                }, '收回')
              ])
            }
          }
        ],
        myLaunchList: [
          {
            type: '加班申请',
            date: '10-03 10:30',
            status: '未审批'
          },
          {
            type: '签卡申请',
            date: '10-03 10:31',
            status: '未审批'
          },
          {
            type: '调休申请',
            date: '10-03 10:32',
            status: '未审批'
          }
        ]
      }
    },
    methods: {
//    获取我发起的列表
      getMyLaunchList () {
        this.$ajax.get(`${TEST_CONFIG}/myApply/queryApproveByAll`, {
          params: {
            time: this.formItem.time,
            approveState: this.formItem.status,
            billType: this.billType,
            pageNum: this.launchCurrentPage,
            pageSize: this.launchPageSize
          },
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
//          console.log(response)
          if (response.data.code === '000000' && response.data.data.dataList.length !== 0) {
            this.launchTotal = response.data.data.total
            var data = response.data.data.dataList
            var len = data.length
            for (var i = 0; i < len; i++) {
              data[i].type = data[i].billTypeName
              data[i].date = data[i].creationTime
              data[i].status = data[i].approveStateName
            }
            this.myLaunchList = data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击表格的行触发事件
      showInfo (row, index) {
        console.log(row)
        console.log(index)
      },
//    选择发起时间
      checkTime () {
        this.getMyLaunchList()
      },
//    选择发起状态
      checkStatus () {
        if (this.formItem.status === '-2') {
          this.formItem.status = ''
        }
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
      changePage (page) {
        this.launchCurrentPage = page              // 发起列表当前页数
        this.getMyLaunchList()
      },
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
  .content {
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
