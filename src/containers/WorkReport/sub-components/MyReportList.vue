<template>
	<div class="work-report-my-apply">
		<Card>
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
					</Row>
				</Form>
			</div>

			<Table height="450" :columns="dailycolumns" :data="DailyData" v-if="visible" no-data-text></Table>
			<Table height="450" :columns="weeklycolumns" :data="WeeklyData" v-if="!visible" no-data-text></Table>
			<br />
			<Page :total="total" :current="pageNum" @on-change="handPageChange" :on-page-size-change="handPageSizeChange" show-sizer show-total></Page>
		</Card>

	</div>
</template>

<script>
export default {
  name: 'WorkReportMyApply',
  data () {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      visible: true,
      selectType: [{
        value: '1',
        label: '日报'
      }, {
        value: '2',
        label: '周报'
      }],
      defaultType: '1',
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
      defaultReport: '1',
      dailycolumns: [{
        title: '类型',
        key: 'type',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            this.typeFormat(params.row.type)
          ])
        }
      }, {
        title: '汇报日期',
        key: 'reportingDate',
        sortable: true,
        align: 'center'
      }, {
        title: '提交日期',
        key: 'releaseDate',
        sortable: true,
        align: 'center'
      }, {
        title: '状态',
        key: 'speedOfProgress',
        sortable: true,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            this.statusFomat(params.row.speedOfProgress)
          ])
        }
      }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: params.row.speedOfProgress === 3
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.toEditDaily(params.row.id)
                }
              }
            }, '编辑'),
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
                  this.toDailyDetails(params.row.id)
                }
              }
            }, '查看')
          ])
        }
      }],
      weeklycolumns: [{
        title: '类型',
        key: 'reportType',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            this.typeFormat(params.row.reportType)
          ])
        }
      }, {
        title: '汇报日期',
        key: 'reportDate',
        sortable: true,
        align: 'center'
      }, {
        title: '提交日期',
        key: 'createdAt',
        sortable: true,
        align: 'center'
      }, {
        title: '状态',
        key: 'ratingStatus',
        sortable: true,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            this.statusFomat(params.row.ratingStatus)
          ])
        }
      }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: params.row.ratingStatus === 3
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.toEditWeekly(params.row.id)
                }
              }
            }, '编辑'),
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
                  this.toWeeklyDetails(params.row.id)
                }
              }
            }, '查看')
          ])
        }
      }],
      DailyData: [{}],
      WeeklyData: [{}]
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
    statusFomat (status) {
      switch (status) {
        case 0:
          return '未提交'
        case 1:
          return '已提交'
        case 2:
          return '已退回'
        case 3:
          return '已评分'
        default:
          return ''
      }
    },
    //  点击页码切换
    handPageChange (val) {
      console.log(val)
      this.pageNum = val
      if (this.defaultType === '1') {
        this.getMyReportDailyList()
        this.visible = true
      } else {
        this.getMyReportWeeklyList()
        this.visible = false
      }
    },
    //  每页显示条数切换
    handPageSizeChange (val) {
      this.pageSize = val
      if (this.defaultType === '1') {
        this.getMyReportDailyList()
        this.visible = true
      } else {
        this.getMyReportWeeklyList()
        this.visible = false
      }
    },
    getMyReportDailyList () {
      this.$ajax({
        method: 'get',
        url: '/dailyreport',
        headers: {
          token: window.token,
          uid: window.uid
        },
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          reportType: this.defaultType,
          time: this.defaultReport
        }
      }).then((res) => {
        console.log('我发起的数据', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.DailyData = result.data
          this.total = result.total
        } else {

        }
      }, (res) => {

      })
    },
    getMyReportWeeklyList () {
      this.$ajax({
        method: 'get',
        url: '/weekreport/weekList',
        headers: {
          token: window.token,
          uid: window.uid
        },
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          time: this.defaultReport
        }
      }).then((res) => {
        console.log('我发起的数据', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.WeeklyData = result.data
          this.total = result.total
        } else {

        }
      }, (res) => {

      })
    },
    toEditDaily (id) {
      this.$router.push({
        name: 'WorkReportDaily',
        params: {
          id: id
        }
      })
    },
    toEditWeekly (id) {
      this.$router.push({
        name: 'WorkReportWeekly',
        params: {
          id: id
        }
      })
    },
    toDailyDetails (id) {
      this.$router.push({
        name: 'MyReportDaily',
        params: {
          id: id
        }
      })
    },
    toWeeklyDetails (id) {
      this.$router.push({
        name: 'MyReportWeekly',
        params: {
          id: id
        }
      })
    }
  },
  watch: {
    defaultType () {
      if (this.defaultType === '1') {
        this.getMyReportDailyList()
        this.visible = true
      } else {
        this.getMyReportWeeklyList()
        this.visible = false
      }
    },
    defaultReport () {
      if (this.defaultType === '1') {
        this.getMyReportDailyList()
        this.visible = true
      } else {
        this.getMyReportWeeklyList()
        this.visible = false
      }
    }
  },
  mounted () {
    this.getMyReportDailyList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-my-apply {
		padding: 16px;
	}
</style>
