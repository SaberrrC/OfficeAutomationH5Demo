<template>
	<div class="work-report-history">
		<Row>
			<Col></Col>
		</Row>
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
					</Row>

				</Form>
			</div>
			<Table height="450" :columns="dailycolumns" :data="DailyData" v-if="visible" @on-row-click="dailyRowClick"></Table>
			<Table height="450" :columns="weeklycolumns" :data="WeeklyData" v-if="!visible" @on-row-click="weeklyRowClick"></Table>
			<br />
			<Page :total="total" :current="pageNum" @on-change="handPageChange" :on-page-size-change="handPageSizeChange" show-sizer show-total></Page>
		</Card>
	</div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
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
        title: '状态',
        align: 'center',
        key: 'speedOfProgress',
        render: (h, params) => {
          return h('div', [
            this.statusFomat(params.row.speedOfProgress)
          ])
        }
      }, {
        title: '评价',
        align: 'center',
        key: 'totalRating'
      }, {
        title: '打分',
        align: 'center',
        key: 'totalScore'
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
        title: '状态',
        align: 'center',
        key: 'speedOfProgress',
        render: (h, params) => {
          return h('div', [
            this.statusFomat(params.row.speedOfProgress)
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
    dailyRowClick (row) {
      this.$router.push({
        name: 'HistoryDaily',
        params: {
          dailyid: row.dailyid
        }
      })
    },
    weeklyRowClick (row) {
      this.$router.push({
        name: 'HistoryWeekly',
        params: {
          dailyid: row.dailyid
        }
      })
    },
    //  点击页码切换
    handPageChange (val) {
      console.log(val)
      this.pageNum = val
      if (this.defaultType === '1') {
        this.getDailyHistoryList()
        this.visible = true
      } else {
        this.getWeeklyHistoryList()
        this.visible = false
      }
    },

    //  每页显示条数切换
    handPageSizeChange (val) {
      this.pageSize = val
      if (this.defaultType === '1') {
        this.getDailyHistoryList()
        this.visible = true
      } else {
        this.getWeeklyHistoryList()
        this.visible = false
      }
    },
    getDailyHistoryList () {
      this.$ajax({
        method: 'post',
        url: '/dailyreport/leader',
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ratingStatus: 3,
          time: this.defaultReport,
          type: this.defaultType
        }
      }).then((res) => {
        console.log('历史记录', res.data)
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
    getWeeklyHistoryList () {
      this.$ajax({
        method: 'post',
        url: '/weekreport/leader',
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ratingStatus: 3,
          time: this.defaultReport,
          type: this.defaultType
        }
      }).then((res) => {
        console.log('历史记录', res.data)
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
    }
  },
  watch: {
    defaultType () {
      if (this.defaultType === '1') {
        this.getDailyHistoryList()
        this.visible = true
      } else {
        this.getWeeklyHistoryList()
        this.visible = false
      }
    },
    defaultReport () {
      if (this.defaultType === '1') {
        this.getDailyHistoryList()
        this.visible = true
      } else {
        this.getWeeklyHistoryList()
        this.visible = false
      }
    }
  },
  mounted () {
    this.getDailyHistoryList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-history {
		padding: 16px;
	}
</style>
