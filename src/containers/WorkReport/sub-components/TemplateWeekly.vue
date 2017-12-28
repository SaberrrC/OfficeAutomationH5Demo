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
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
					</tbody>
				</table>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<Button type="primary" style="float:right;margin-top: 20px;">添加一行</Button>
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
							<th>备注（选填</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
						<tr>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
							<td>
								<Input type="textarea" placeholder=""></Input>
							</td>
						</tr>
					</tbody>
				</table>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<Button type="primary" style="float:right;margin-top: 20px;">添加一行</Button>
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
			return {}
		},
		methods:{
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
						this.commonExtend(this.textAreaData, JSON.parse(result.reportContent));
						this.commonExtend(this.textAreaData, JSON.parse(result.workResult));
						this.textAreaData.tomorrowPlan = result.tomorrowPlan;
						this.commonExtend2(this.workSelf, JSON.parse(result.selfRating));
						this.commonExtend2(this.professionSelf, JSON.parse(result.selfRating));
						this.commonExtend2(this.teamSelf, JSON.parse(result.selfRating));
					} else {

					}
				}, (res) => {

				})
			},
			saveTemp() {
				var data = {
					id: this.$route.params.childId,
					parentId: this.$route.params.id
				};
				data = Object.assign(data, this.textAreaData, this.workSelf, this.professionSelf, this.teamSelf)
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
				}else{
					this.$Message.error("请先保存模版");
				}
			}
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