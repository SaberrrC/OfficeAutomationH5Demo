<template>
	<div class="news-all">
		<Card>
			<div slot="title">
				<i-form :label-width="80">
					<Row>
						<Col span="6">
						<FormItem label="发布时间">
							<i-select v-model="newsTime" placeholder="请选择发布时间">
								<Option v-for="item in newsTimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="标题">
							<Input v-model="newsTitle" placeholder="搜索标题" icon="search"></Input>
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
		name: 'NewsAll',
		data() {
			return {
				newsTime: 0,
				newsTitle: "",
				newsTimeList: [{
						value: 0,
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
						title: '标题',
						key: 'newsTitle',
						sortable: true
					},
					{
						title: '发布时间',
						key: 'releaseDate',
						sortable: true
					},
					{
						title: '首页展示',
						key: 'showHome',
						width: 150,
						align: 'center',
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
					}, {
						title: '操作',
						key: 'id',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.delNews(params)
										}
									}
								}, '删除')
							]);
						}
					}
				],
				data: []
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

			//获取新闻列表数据
			getNewsData() {
				this.$ajax({
					method: 'get',
					url: '/oa-web/news/getNewsList',
					headers: {
						token: '9d52355800cf43cd9aaf6b5f5bf2bdcb',
						uid: '357'
					},
					params: {
						time: this.newsTime,
						newsTitle: this.newsTitle,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then((res) => {
					console.log("newsSubmit", res.data)
					if(res.data.code == "000000") {
						var result = res.data.data;
						this.total = result.total;
						this.data = result.data;
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {
				});
			},

			//首页展示开关切换
			showHomeChange(status, params) {
				console.log("status", status);
				console.log("params", params);
				this.$ajax({
					method: 'post',
					url: '/oa-web/news/isShowHome',
					headers: {
						token: '9d52355800cf43cd9aaf6b5f5bf2bdcb',
						uid: '357'
					},
					data: {
						id: params.row.id,
						showHome: status * 1
					}
				}).then((res) => {
					console.log("showHomeChange", res.data)
					if(res.data.code == "000000") {
						this.getNewsData();
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {
				});
			},

			//删除新闻
			delNews(params) {
				this.$ajax({
					method: 'get',
					url: '/oa-web/news/deleteNews',
					headers: {
						token: '0030223a82984787b370a720d024b50c',
						uid: '960'
					},
					params: {
						id: params.row.id
					}
				}).then((res) => {
					console.log("newsSubmit", res.data)
					if(res.data.code == "000000") {
						this.$Message.success("删除成功");
						this.getNewsData();
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {
					this.$Message.error(res.data.message);
				});
			}

		},

		watch: {

			//时间切换 获取新的新闻列表
			newsTime() {
				this.getNewsData();
			},

			//搜索对应标题的新闻列表
			newsTitle() {
				this.getNewsData();
			}
		},

		created() {
			console.log('##### NewsAll created')
		},

		mounted() {
			//获取新闻列表数据
			this.getNewsData();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.news-all {
		padding: 16px;
		.card-title-extra {
			width: 116px;
			position: absolute;
			top: -4px;
			right: 0;
		}
	}
</style>