<template>
	<div class="notice-from">
		<Card>
			<div slot="title">
				<i-form :label-width="80">
					<Row>
						<Col span="6">
						<FormItem label="是否已读">
							<i-select v-model="isRead" placeholder="请选择状态">
								<Option v-for="item in readList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="公告类型">
							<i-select v-model="noticeType" placeholder="请选择状态">
								<Option v-for="item in noticeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="公告类别">
							<i-select v-model="noticeClass" placeholder="请选择状态">
								<Option v-for="item in noticeClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="发布日期">
							<i-select v-model="dateFilter" placeholder="请选择状态">
								<Option v-for="item in dateFilterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
					</Row>
				</i-form>
			</div>
			<div class="container">
				<Table height="450" :columns="columns" :data="data"></Table>
				<br>
				<Page :total="total" :current="pageNum" :on-change="handPageChange" :on-page-size-change="handPageSizeChange" show-sizer show-total></Page>
			</div>
		</Card>
	</div>
</template>

<script>
	export default {
		name: 'NoticeFrom',
		data() {
			return {
				isRead: 0,
				noticeType: "",
				noticeClass: "",
				dateFilter: 0,
				readList: [{
						value: 1,
						label: "已读"
					},
					{
						value: 2,
						label: "未读"
					}
				],
				noticeTypeList: [{
						value: 1,
						label: "公司公告"
					},
					{
						value: 2,
						label: "部门公告"
					}
				],
				noticeClassList: [{
						value: 1,
						label: "通知"
					},
					{
						value: 2,
						label: "表彰"
					},
					{
						value: 3,
						label: "活动"
					}
				],
				dateFilterList: [{
						value: "",
						label: "全部"
					},
					{
						value: 1,
						label: "今天"
					},
					{
						value: 2,
						label: "近三天"
					},
					{
						value: 3,
						label: "近一周"
					},
					{
						value: 4,
						label: "近一个月"
					}
				],
				total: 0,
				pageNum: 1,
				pageSize: 10,
				columns: [{
						title: 'Name',
						key: 'name',
						sortable: true
					},
					{
						title: 'Age',
						key: 'age',
						sortable: true
					},
					{
						title: 'Address',
						key: 'address',
						render: (h, params) => {
							return h('div', [
								h('i-switch', {
									on: {
										"on-change": (status) => {
											this.showHomeChange(status, params)
										}
									}
								}, params.row.showHome)
							]);
						}
					}
				],
				data: [{
						name: 'John Brown',
						age: 18,
						address: 'New York No. 1 Lake Park',
						date: '2016-10-03'
					},
					{
						name: 'Jim Green',
						age: 24,
						address: 'London No. 1 Lake Park',
						date: '2016-10-01'
					},
					{
						name: 'Joe Black',
						age: 30,
						address: 'Sydney No. 1 Lake Park',
						date: '2016-10-02'
					},
					{
						name: 'Jon Snow',
						age: 26,
						address: 'Ottawa No. 2 Lake Park',
						date: '2016-10-04'
					},
					{
						name: 'John Brown',
						age: 18,
						address: 'New York No. 1 Lake Park',
						date: '2016-10-03'
					},
					{
						name: 'Jim Green',
						age: 24,
						address: 'London No. 1 Lake Park',
						date: '2016-10-01'
					},
					{
						name: 'Joe Black',
						age: 30,
						address: 'Sydney No. 1 Lake Park',
						date: '2016-10-02'
					},
					{
						name: 'Jon Snow',
						age: 26,
						address: 'Ottawa No. 2 Lake Park',
						date: '2016-10-04'
					}
				]
			}
		},
		methods: {
			//点击页码切换
			handPageChange(val) {
				this.pageNum = val;
				this.getNewsData();
			},

			//每页显示条数切换
			handPageSizeChange(val) {
				this.pageSize = val;
				this.getNewsData();
			},
			getNoticeData() {
				this.$ajax({
					method: 'get',
					url: '/oa-web/notice',
					headers: {
						token: '554fb9447f5e4d6a83e8ce23cf6f208b',
						uid: '54368'
					},
					params: {
						page: this.pageNum,
						limit: this.pageSize,
						isRead: this.isRead,
						dateFilter: this.dateFilter,
						noticeType: this.noticeType,
						noticeClass: this.noticeClass,
						oIds: 400,
					/*	postUserId:"",
						postDeptId:"",
						isHomeShow:""*/
					}
				}).then((res) => {
					console.log("发送给我的公告列表", res.data)
					if(res.data.code == "000000") {
						
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {
					this.$Message.error("信息获取失败");
				});
			}
		},
		watch: {
			isRead() {
				this.getNoticeData();
			},

			noticeType() {
				this.getNoticeData();
			},

			noticeClass() {
				this.getNoticeData();
			},

			dateFilter() {
				this.getNoticeData();
			}
		},
		created() {},
		mounted() {
			this.getNoticeData();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.notice-from {
		padding: 16px;
	}
</style>