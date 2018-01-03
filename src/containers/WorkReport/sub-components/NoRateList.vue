<template>
	<div class="work-report-no-rate">
		<Card shadow>
			<div slot="title">
				<Form :label-width="80">
					<Row>
						<Col span="6">
						<FormItem label="类型">
							<Select v-model="defaultType">
								<Option v-for="item in selectType" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="汇报日期">
							<Select v-model="defaultReport">
								<Option v-for="item in reportTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="12" align="right">
						<Button type="primary" @click="handleSelect" v-if="visible">批量提交</Button>
						</Col>
					</Row>
				</Form>
			</div>
			<Table height="450" ref="selection" :columns="dailycolumns" :data="DailyData" v-if="visible"></Table>
			<Table height="450" :columns="weeklycolumns" :data="WeeklyData" v-if="!visible"></Table>
			<br />
			<Page :total="total" :current="pageNum" @on-change="handPageChange" :on-page-size-change="handPageSizeChange" show-sizer show-total></Page>
		</Card>
		<Modal v-model="modal" title="批量审批" @on-ok="selectSubmit" @on-cancel="selectCancel">
			<p>是否批量提交已勾选的日报评价？</p>
		</Modal>
	</div>
</template>

<script>
export default {
  name: 'WorkReportNoRate',
  data () {
    return {
      visible: true,
      defaultType: '1',
      defaultReport: '1',
      modal: false,
      selectData: [],
      selectType: [{
        value: '1',
        label: '日报'
      }, {
        value: '2',
        label: '周报'
      }],
      reportTime: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '本月'
      }, {
        value: '2',
        label: '上月'
      }, {
        value: '3',
        label: '近两月'
      }, {
        value: '4',
        label: '近三个月'
      }, {
        value: '5',
        label: '近六个月'
      }],
      dailycolumns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '类型',
        key: 'type',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            this.typeFormat(params.row.type)
          ])
        }
      }, {
        title: '发起人',
        key: 'name',
        align: 'center'
      }, {
        title: '汇报日期',
        key: 'reportingDate',
        align: 'center',
        sortable: true
      }, {
        title: '发布时间',
        key: 'releaseDate',
        align: 'center',
        sortable: true
      }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.returnDaily(params.row.dailyid)
                }
              }
            }, '退回'),
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
                  this.toDailyDetails(params.row.dailyid)
                }
              }
            }, '详细')
          ])
        }
      }, {
        title: '评价',
        key: 'totalRating',
        align: 'center',
        render: (h, params) => {
          return h('Select', {
            props: {
              value: params.row.totalRating ? params.row.totalRating : ''
            },
            on: {
              'on-change': (v) => {
                console.log(v)
                params.row.totalRating = v
                this.DailyData[params.index].totalRating = v
              }
            }
          }, [
            h('Option', {
              props: {
                value: '优秀'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                change: () => {

                }
              }
            }),
            h('Option', {
              props: {
                value: '良好'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                change: () => {

                }
              }
            }),
            h('Option', {
              props: {
                value: '一般'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                change: () => {

                }
              }
            })
          ])
        }
      }, {
        title: '打分',
        key: 'totalScore',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('InputNumber', {
              props: {
                max: 100,
                min: 0,
                value: params.row.totalScore ? params.row.totalScore : 0
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (v) => {
                  params.row.totalScore = v
                  this.DailyData[params.index].totalScore = v
                }
              }
            })
          ])
        }
      }],
      weeklycolumns: [{
        title: '类型',
        align: 'center',
        key: 'type',
        render: (h, params) => {
          return h('div', [
            this.typeFormat(params.row.type)
          ])
        }
      }, {
        title: '姓名',
        align: 'center',
        key: 'name'
      }, {
        title: '汇报日期',
        align: 'center',
        key: 'reportingDate',
        sortable: true
      }, {
        title: '发布时间',
        align: 'center',
        key: 'releaseDate',
        sortable: true
      }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.returnWeekly(params.row.dailyid)
                }
              }
            }, '退回'),
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
                  this.toWeeklyDetails(params.row.dailyid)
                }
              }
            }, '详细')
          ])
        }
      }],
      DailyData: [],
      WeeklyData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    typeFormat (type) {
      switch (type) {
        case 1:
          return '日报'
        case 2:
          return '周报'
        default:
          return ''
      }
    },
    //  点击页码切换
    handPageChange (val) {
      console.log(val)
      this.pageNum = val
      if (this.defaultType === '1') {
        this.getDailyNoRateList()
        this.visible = true
      } else {
        this.getWeeklyNoRateList()
        this.visible = false
      }
    },

    //  每页显示条数切换
    handPageSizeChange (val) {
      this.pageSize = val
      if (this.defaultType === '1') {
        this.getDailyNoRateList()
        this.visible = true
      } else {
        this.getWeeklyNoRateList()
        this.visible = false
      }
    },
    handleSelect () {
      console.log(this.$refs.selection.getSelection(true))
      let selectList = this.$refs.selection.getSelection(true)
      if (selectList.length === 0) {
        this.$Message.error('请勾选需要评价的日报')
      } else {
        this.modal = true
        this.selectData = []
        for (let i = 0; i < selectList.length; i++) {
          this.selectData.push({
            id: selectList[i].dailyid,
            ratings: selectList[i].totalRating,
            totalScore: selectList[i].totalScore
          })
        }
      }
    },
    selectSubmit () {
      this.$ajax({
        method: 'post',
        url: '/batch/batchScore',
        data: {
          reportData: this.selectData,
          reportType: 1
        }
      }).then((res) => {
        console.log('批量审核数据', res.data)
        if (res.data.code === '000000') {
          this.$Message.success('批量审核成功')
          this.getDailyNoRateList()
        } else {
          this.$Message.error(res.data.message)
        }
      }, (res) => {

      })
    },
    selectCancel () {

    },
    getDailyNoRateList () {
      this.$ajax({
        method: 'post',
        url: '/dailyreport/leader',
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ratingStatus: 1,
          time: this.defaultReport,
          type: this.defaultType
        }
      }).then((res) => {
        console.log('待评分', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.DailyData = result.data
          this.total = result.total
        } else {
          if (res.data.code === '020000') {
            this.DailyData = []
            this.total = 0
          }
        }
      }, (res) => {

      })
    },
    getWeeklyNoRateList () {
      this.$ajax({
        method: 'post',
        url: '/weekreport/leader',
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ratingStatus: 1,
          time: this.defaultReport,
          type: this.defaultType
        }
      }).then((res) => {
        console.log('待评分', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.WeeklyData = result.data
          this.total = result.total
        } else {
          if (res.data.code === '020000') {
            this.WeeklyData = []
            this.total = 0
          }
        }
      }, (res) => {

      })
    },
    returnDaily (dailyid) {
      this.$ajax({
        method: 'get',
        url: '/dailyreport/reject/' + dailyid
      }).then((res) => {
        console.log('退回数据', res.data)
        if (res.data.code === '000000') {
          this.$Message.success('日报退回成功')
          this.getDailyNoRateList()
        } else {

        }
      }, (res) => {

      })
    },
    returnWeekly (dailyid) {
      this.$ajax({
        method: 'get',
        url: '/weekreport/reject/' + dailyid
      }).then((res) => {
        console.log('退回数据', res.data)
        if (res.data.code === '000000') {
          this.$Message.success('周报退回成功')
          this.getWeeklyNoRateList()
        } else {

        }
      }, (res) => {

      })
    },
    toDailyDetails (dailyid) {
      this.$router.push({
        name: 'NoRateDaily',
        params: {
          dailyid: dailyid
        }
      })
    },
    toWeeklyDetails (dailyid) {
      this.$router.push({
        name: 'NoRateWeekly',
        params: {
          dailyid: dailyid
        }
      })
    }
  },
  watch: {
    defaultType () {
      if (this.defaultType === '1') {
        this.getDailyNoRateList()
        this.visible = true
      } else {
        this.getWeeklyNoRateList()
        this.visible = false
      }
    },
    defaultReport () {
      if (this.defaultType === '1') {
        this.getDailyNoRateList()
        this.visible = true
      } else {
        this.getWeeklyNoRateList()
        this.visible = false
      }
    }
  },
  mounted () {
    this.getDailyNoRateList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-no-rate {
		padding: 16px;
	}
</style>
