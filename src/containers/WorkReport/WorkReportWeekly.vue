<template>
	<div class="work-report-weekly">
		<Card>
			<Modal v-model="showDraft" title="信息" @on-ok="drawDraft">
				<p>是否导入草稿？</p>
			</Modal>

			<p slot="title" style="text-align: center;">本周工作总结</p>

			<Row>
				<Col span="12" style="text-align: center;"> 开始时间
				<DatePicker v-model="startTime" type="date" :options="options" placeholder="Select date" style="width: 200px" format="yyyy-MM-dd"></DatePicker>
				</Col>
				<Col span="12" style="text-align: center;"> 结束时间
				<DatePicker type="date" :value="endTime" placeholder="Select date" style="width: 200px" format="yyyy-MM-dd" disabled></DatePicker>
				</Col>
			</Row>

			<Row style="margin-top: 40px;">
				<Col span="24">
				<table cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>工作计划</th>
							<th>实际工作</th>
							<th>差异分析</th>
							<th>备注（选填）</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in weeklySummary">
							<td>
								<Input type="textarea" placeholder="" v-model="item.workPlan"></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.work"></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.difference"></Input>
							</td>
							<td>
								<Row>
									<Col span="14">
									<Input type="textarea" placeholder="" v-model="item.remark"></Input>
									</Col>
									<Col span="10" align="center">
									<Button type="error" style="margin-top: 10px;" v-show="item.del" @click="delLine(index)">删除</Button>
									</Col>
								</Row>
							</td>
						</tr>
					</tbody>
				</table>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<Button type="primary" style="float:right;margin-top: 20px;" @click="addLine">添加一行</Button>
				</Col>
			</Row>

			<h4 style="margin-top: 40px; line-height: 40px;">下周工作计划</h4>
			<Row>
				<Col span="24">
				<table cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>工作计划（计划工作目标、计划节点）</th>
							<th>责任人</th>
							<th>备注（选填）</th>
						</tr>
					</thead>
					<tbody>

						<tr v-for="(item, index) in nextWeekPlane">
							<td>
								<Input type="textarea" placeholder="" v-model="item.nextWorkPlan"></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.personLiable"></Input>
							</td>
							<td>
								<Row>
									<Col span="14">
									<Input type="textarea" placeholder="" v-model="item.remark"></Input>
									</Col>
									<Col span="10" align="center">
									<Button type="error" style="margin-top: 10px;" v-show="item.del" @click="delLineNext(index)">删除</Button>
									</Col>
								</Row>
							</td>
						</tr>

					</tbody>
				</table>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<Button type="primary" style="float:right;margin-top: 20px;" @click="addLineNext">添加一行</Button>
				</Col>
			</Row>

			<Row>
				<Col span="24">
				<p class="leader">
					<span>接收人：{{this.checkmantext}}</span>

					<Button type="info" size="small" @click="showLeader = true"><Icon type="plus-round"></Icon></Button>
					<Modal v-model="showLeader" title="接收人">
						<p>
							<Input v-model="searchName" placeholder="搜索" style="width: 200px"></Input>
							<Button type="info" @click="getLeaderList">搜索</Button>
						</p>
						<p style="margin-top: 20px;">
							<Table height="325" :columns="columns" :data="leaderList" @on-row-click="changeLeader"></Table>
						</p>
						<div slot="footer"></div>
					</Modal>
				</p>
				<p class="btn">
					<Button type="info">取消</Button>
					<Button type="info" @click="saveDraft">存草稿</Button>
					<Button type="info" @click="submitWeek">提交</Button>
				</p>
				</Col>
			</Row>
		</Card>

	</div>
</template>

<script>
	export default {
		name: 'WorkReportWeekly',
		data() {
			return {
				startTime: this.getTime(this.getMonday(new Date())),
				endTime: '2017-12-12',
				options: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now()
						// var monday = this.getTime(this.getMonday(new Date()))
					}
				},
				checkmantext: '',
				checkman: '',
				checkmanId: '',
				searchName: '',
				weeklySummary: [{
						workPlan: '',
						work: '',
						difference: '',
						remark: '',
						del: false
					},
					{
						workPlan: '',
						work: '',
						difference: '',
						remark: '',
						del: false
					},
					{
						workPlan: '',
						work: '',
						difference: '',
						remark: '',
						del: false
					},
					{
						workPlan: '',
						work: '',
						difference: '',
						remark: '',
						del: false
					}
				],
				nextWeekPlane: [{
						nextWorkPlan: '',
						personLiable: '',
						remark: '',
						del: false
					},
					{
						nextWorkPlan: '',
						personLiable: '',
						remark: '',
						del: false
					},
					{
						nextWorkPlan: '',
						personLiable: '',
						remark: '',
						del: false
					},
					{
						nextWorkPlan: '',
						personLiable: '',
						remark: '',
						del: false
					},
				],
				columns: [{
						title: '姓名',
						key: 'username'
					},
					{
						title: '部门',
						key: 'organization'
					},
					{
						title: '岗位',
						key: 'post'
					}
				],
				showLeader: false,
				leaderList: [{
						username: '丁通',
						organization: '技术部',
						post: '前端开发'
					},
					{
						username: '丁通',
						organization: '技术部',
						post: '前端开发'
					},
					{
						username: '丁通',
						organization: '技术部',
						post: '前端开发'
					},
					{
						username: '丁通',
						organization: '技术部',
						post: '前端开发'
					}
				],
				showDraft: false
			}
		},
		computed: {

		},
		methods: {
			//  格式化时间
			getTime(date) {
				var year = date.getFullYear()
				var mounth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
				var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
				return year + '-' + mounth + '-' + day
			},
			//  当前周一的时间
			getMonday(date) {
				var day = date.getDay() || 7
				return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)
			},
			//  计算出结束时间
			getEndTime() {
				var date = this.startTime.getTime()
				date = date + 6 * 24 * 60 * 60 * 1000
				console.log(this.getTime(new Date(date)))
				this.endTime = this.getTime(new Date(date))
			},
			//  添加一行方法
			addLine() {
				this.weeklySummary.push({
					workPlan: '',
					work: '',
					difference: '',
					remark: '',
					del: true
				})
			},
			addLineNext() {
				this.nextWeekPlane.push({
					nextWorkPlan: '',
					personLiable: '',
					remark: '',
					del: true
				})
			},
			//  删除一行
			delLine(index) {
				this.weeklySummary.splice(index, 1)
			},
			delLineNext(index) {
				this.nextWeekPlane.splice(index, 1)
			},
			//  获取当前领导人
			getcurrentLeader() {
				this.$ajax({
					method: 'get',
					url: '/user/getCurrentLeader',
					headers: {
						token: window.token,
						uid: window.uid
					}
				}).then((res) => {
					console.log('当前领导人', res.data)
					var result = res.data.data
					if(res.data.code === '000000') {
						this.checkmantext = result.username + '———' + result.post
						this.checkman = result.username
						this.checkmanId = result.id
					} else {

					}
				}, (res) => {

				})
			},
			//  获取领导人列表，并展示，搜索领导人也是这个，无非是searchName有无值罢了
			getLeaderList() {
				this.$ajax({
					method: 'get',
					url: '/user/query/sameOrganization?username=' + this.searchName + '&pagesize=50&pagenum=1',
					headers: {
						token: window.token,
						uid: window.uid
					}
				}).then((res) => {
					console.log('领导人列表', res.data)
					var result = res.data.data
					if(res.data.code === '000000') {
						this.leaderList = result.data
					} else {

					}
				}, (res) => {

				})
			},
			//  切换领导人
			changeLeader(row, index) {
				console.log('row', row)
				this.checkman = row.username
				this.checkmantext = row.username + '———' + row.post
				this.checkmanId = row.id
				this.showLeader = false
			},
			//  保存草稿
			saveDraft() {
				var data = {
					startTime: this.getTime(this.startTime),
					endTime: this.endTime,
					weeklySummary: this.weeklySummary,
					nextWeekPlane: this.nextWeekPlane
				}
				this.$ajax({
					method: 'post',
					url: '/weekreportdraft/addDraft',
					headers: {
						token: window.token,
						uid: window.uid
					},
					data: data
				}).then((res) => {
					console.log('保存草稿', res.data)
					// var result = res.data.data
					if(res.data.code === '000000') {
						this.$Message.success('保存成功')
					} else {

					}
				}, (res) => {

				})
			},
			//  TODO 默认把上周的计划填到这周
			//  TODO 判断是否有模板 ，如果有则渲染

			//  查询草稿,有则提示
			getDraft() {
				this.$ajax({
					method: 'get',
					url: '/weekreportdraft/selectWeekDraftByUserId?userId=' + window.uid,
					headers: {
						token: window.token,
						uid: window.uid
					}
				}).then((res) => {
					console.log('草稿数据', res.data)
					var result = res.data.data
					if(res.data.code === '000000') {
						this.showDraft = true
						this.drawDraft = () => {
							this.startTime = new Date(result.startTime)
							this.endTime = result.endTime
							var workArr = JSON.parse(result.weeklySummary)
							var planArr = JSON.parse(result.weekPlan)
							this.formatDate(workArr)
							this.formatDate(planArr)
							this.weeklySummary = workArr
							this.nextWeekPlane = planArr
						}
					} else {

					}
				}, (res) => {

				})
			},
			//  渲染草稿
			drawDraft() {

			},
			//  渲染方法
			formatDate(arr) {
				for(var i = 0; i < arr.length; i++) {
					if(i < 4) {
						arr[i].del = false
					} else {
						arr[i].del = true
					}
				}
			},
			//  发起周报
			submitWeek() {
				var data = {
					startTime: this.getTime(this.startTime),
					endTime: this.endTime,
					weeklySummary: this.weeklySummary,
					nextWeekPlane: this.nextWeekPlane,
					checkman: this.checkman,
					checkmanId: this.checkmanId
				}
				this.$ajax({
					method: 'post',
					url: '/weekreport/add',
					headers: {
						token: window.token,
						uid: window.uid
					},
					data: data
				}).then((res) => {
					console.log('发起周报', res.data)
					// var result = res.data.data
					if(res.data.code === '000000') {
						this.$Message.success('发送成功')
					} else {

					}
				}, (res) => {

				})
			},
			getTemp() {
				this.$ajax({
					method: 'get',
					url: '/templateManage/selectWeekChildTemplate?childId=' + this.$route.params.childId,
					headers: {
						token: window.token,
						uid: window.uid
					}
				}).then((res) => {
					console.log('草稿数据', res.data)
					var result = res.data.data
					if(res.data.code === '000000') {
						if(result.weeklySummary) {
							var workArr = JSON.parse(result.weeklySummary);
							this.formatDate(workArr);
							this.weeklySummary = workArr;
						}
						if(result.weekPlan) {
							var planArr = JSON.parse(result.weekPlan);

							this.formatDate(planArr);

							this.nextWeekPlane = planArr;
						}
					} else {

					}
				}, (res) => {

				})
			}
		},
		created() {
			console.log('##### WorkReportWeekly created')
		},
		mounted() {
			this.getEndTime() //  结束时间
			this.getcurrentLeader() // 当前领导人
			this.getLeaderList() //  领导人列表
			if(this.$route.params.childId) {
				this.getTemp();
			}
			this.getDraft() //  查询草稿
		},
		watch: {
			startTime() {
				this.getEndTime()
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-weekly {
		padding: 16px;
	}
	
	h4 {
		text-align: center;
	}
	
	table {
		width: 100%;
		border: 1px solid #e9eaec;
		th {
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			background-color: #f8f8f9;
		}
		td {
			border-top: 1px solid #e9eaec;
			border-right: 1px solid #e9eaec;
			padding: 16px;
		}
	}
	
	.leader,
	.btn {
		text-align: center;
		margin-top: 20px;
	}
</style>

<style>
	textarea {
		overflow: hidden;
		resize: none;
		height: 57px;
	}
</style>