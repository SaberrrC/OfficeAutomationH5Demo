<template>
	<div class="work-report-weekly">
		<Card>
			<p slot="title" style="text-align: center;">本周工作总结</p>

			<Row>
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
				<p class="btn">
					<Button type="info" @click="saveTemp">保存</Button>
					<Button type="warning" @click="$router.push({path: '/work_report/template/templateList'})">取消</Button>
					<Button type="success" @click="useTemp">使用</Button>
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
			}
		},
		methods: {
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
			getTempData() {
				this.$ajax({
					method: 'get',
					url: '/templateManage/selectWeekChildTemplate',
					headers: {
						token: window.token,
						uid: window.uid
					},
					params: {
						childId: this.$route.params.childId
					}
				}).then((res) => {
					console.log('模版数据', res.data)
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
			},
			saveTemp() {
				var data = {
					id: this.$route.params.childId,
					parentId: this.$route.params.id,
					weeklySummary: this.weeklySummary,
					nextWeekPlane: this.nextWeekPlane
				};
				this.$ajax({
					method: 'post',
					url: '/templateManage/insertWeekTemplate',
					headers: {
						token: window.token,
						uid: window.uid
					},
					data: data
				}).then((res) => {
					console.log('保存模版数据', res.data)
					var result = res.data.data
					if(res.data.code === '000000') {
						this.$Message.success("保存成功");
						this.$router.push({
							path: "/work_report/template/templateList"
						})
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {

				})
			},
			//使用模版
			useTemp() {
				if(this.$route.params.childId) {
					this.$router.push({
						name: 'WorkReportWeekly',
						params: {
							childId: this.$route.params.childId
						}
					});
				} else {
					this.$Message.error("请先保存模版");
				}
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
		},
		mounted() {
			if(this.$route.params.childId) {
				this.getTempData() // 获取模版详情
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