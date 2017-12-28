<template>
	<div class="work-report-no-rate">
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
						<Col span="12" align="right">
						<Button type="primary" @click="handleSelect">批量提交</Button>
						</Col>
					</Row>
				</Form>
			</div>
			<Table ref="selection" :columns="dailycolumns" :data="DailyData" v-if="visible"></Table>
			<Table :columns="weeklycolumns" :data="WeeklyData" v-if="!visible"></Table>
			<br />
			<Page :total="total" :current="pageNum" @on-change="handPageChange" :on-page-size-change="handPageSizeChange" show-sizer show-total></Page>
		</Card>

	</div>
</template>

<script>
	export default {
		name: 'WorkReportNoRate',
		data() {
			return {
				visible: true,
				selectType: [{
						value: '1',
						label: '日报'
					},
					{
						value: '2',
						label: '周报'
					}
				],
				defaultType: '1',
				reportTime: [{
						value: '0',
						label: '全部'
					},
					{
						value: '1',
						label: '本月'
					},
					{
						value: '2',
						label: '上月'
					},
					{
						value: '3',
						label: '近两月'
					},
					{
						value: '4',
						label: '近三个月'
					},
					{
						value: '5',
						label: '近六个月'
					}
				],
				defaultReport: '0',
				value: '',
				dailycolumns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '类型',
						key: 'type',
						align: 'center'
					},
					{
						title: '发起人',
						key: 'name',
						align: 'center'
					},
					{
						title: '汇报日期',
						key: 'reportingDate',
						align: 'center',
						sortable: true
					},
					{
						title: '发布时间',
						key: 'releaseDate',
						align: 'center',
						sortable: true
					},
					{
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
											console.log(params)
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
											console.log(params)
										}
									}
								}, '详细')
							])
						}
					},
					{
						title: '评价',
						key: 'totalRating',
						align: 'center',
						render: (h, params) => {
							return h('Select', {
								on: {
									"on-change": (v) => {
										console.log(v);
										params.row.totalRating = v;
										this.DailyData[params.index].totalRating = v;
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
					},
					{
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
										"on-change": (v) => {
											params.row.totalScore = v;
											this.DailyData[params.index].totalScore = v;
										}
									}
								})
							])
						}
					}
				],
				weeklycolumns: [{
						title: '类型',
						align: 'center',
						key: 'type',
						render: (h, params) => {
							return h('div', [
								this.typeFormat(params.row.type)
							]);
						}
					},
					{
						title: '姓名',
						align: 'center',
						key: 'name'
					},
					{
						title: '汇报日期',
						align: 'center',
						key: 'reportingDate',
						sortable: true
					},
					{
						title: '发布时间',
						align: 'center',
						key: 'releaseDate',
						sortable: true
					},
					{
						title: '状态',
						align: 'center',
						key: 'speedOfProgress',
						render: (h, params) => {
							return h('div', [
								this.statusFomat(params.row.speedOfProgress)
							]);
						}
					}
				],
				DailyData: [{
						type: '日报',
						person: '丁通',
						reportTime: '2016-10-03',
						totalScore: 6
					},
					{
						type: '日报',
						person: '丁通',
						reportTime: '2016-10-04'
					},
					{
						type: '日报',
						person: '丁通',
						reportTime: '2016-10-05'
					},
					{
						type: '日报',
						person: '丁通',
						reportTime: '2016-10-06'
					}
				],
				WeeklyData: [{}],
				total: 0,
				pageNum: 1,
				pageSize: 10
			}
		},
		methods: {
			typeFormat(type) {
				switch(type) {
					case 1:
						return "日报";
						break;
					case 2:
						return "周报";
						break;
					default:
						return "";
				}
			},
			statusFomat(status) {
				switch(status) {
					case 0:
						return "未提交";
						break;
					case 1:
						return "已提交";
						break;
					case 2:
						return "已退回";
						break;
					case 3:
						return "已评分";
						break;
					default:
						return "";
				}
			},
			//点击页码切换
			handPageChange(val) {
				console.log(val)
				this.pageNum = val;
				this.getNoticeData();
			},

			//每页显示条数切换
			handPageSizeChange(val) {
				this.pageSize = val;
				this.getNoticeData();
			},
			serachPerson() {

			},
			handSelectChange(select) {
				console.log(select);
			},
			handleSelect(){
				console.log(this.$refs.selection.getSelection(true));
//				this.$refs.selection.getSelection(true);
			},
			getDailyNoRateList() {
				this.$ajax({
					method: 'post',
					url: '/dailyreport/leader',
					headers: {
						token: window.token,
						uid: window.uid
					},
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						ratingStatus: 1,
						time: this.defaultReport,
						type: this.defaultType
					}
				}).then((res) => {
					console.log('待评分', res.data)
					var result = res.data.data;
					if(res.data.code === '000000') {
						this.listData = result.data;
						this.total = result.total;
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {

				})
			},
			getWeeklyNoRateList() {
				this.$ajax({
					method: 'post',
					url: '/weekreport/leader',
					headers: {
						token: window.token,
						uid: window.uid
					},
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						ratingStatus: 1,
						time: this.defaultReport,
						type: this.defaultType
					}
				}).then((res) => {
					console.log('待评分', res.data)
					var result = res.data.data;
					if(res.data.code === '000000') {
						this.listData = result.data;
						this.total = result.total;
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {

				})
			}
		},
		watch: {
			defaultType() {
				if(this.defaultType == "1") {
					this.getDailyNoRateList();
					this.visible = true;
				} else {
					this.getWeeklyNoRateList();
					this.visible = false;
				}
			},
			defaultReport() {
				if(this.defaultType == "1") {
					this.getDailyNoRateList();
					this.visible = true;
				} else {
					this.getWeeklyHistoryList();
					this.visible = false;
				}
			}
		},
		mounted() {
			this.getDailyNoRateList();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-no-rate {
		padding: 16px;
	}
</style>