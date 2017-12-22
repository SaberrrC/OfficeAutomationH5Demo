<template>
	<div class="news-add">
		<Card>
			<p slot="title">公司新闻</p>
			<div slot="extra" class="card-title-extra">
				<Button type="primary">取消</Button>
				<Button type="primary" @click="submitNews">发布</Button>
			</div>
			<i-form :model="formItem" :label-width="80">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<FormItem label="发布日期">
								2017-10-09
							</FormItem>
						</td>
						<td>
							<FormItem label="发布人">
								朱展宏
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="新闻标题">
								<i-input v-model="formItem.newsTitle" :maxlength="10" placeholder="请填写公告标题"></i-input>
							</FormItem>
						</td>
						<td>
							<FormItem label="新闻链接">
								<i-input v-model="formItem.newsLink" placeholder="请添加需要跳转的链接" icon="link"></i-input>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<FormItem label="新闻图片">
								<div class="imgBox">
									<img :src="imgUploadUrl" v-if="visible" />
								</div>
								<Upload ref="upload" action="/oa-web/file" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="1024" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :headers="header" style="display: inline-block;width:58px;">
									<div>
										<Button type="primary" style="width:100px;">点击上传</Button>
									</div>
								</Upload>
							</FormItem>
						</td>
					</tr>
				</table>
			</i-form>
		</Card>
	</div>
</template>

<script>
	export default {
		name: 'NewsAdd',
		data() {
			return {
				formItem: {
					newsTitle: "",
					newsLink: "",
					newsPhoto: ""
				},
				release: "",
				releaseMode: [],
				releaseList: [{
					label: "100",
					value: 1
				}],
				header: {},
				visible: false,
				imgUploadUrl: "",
			}
		},
		methods: {
			//上传图片成功
			handleSuccess(res, file) {
				console.log(res);
				if(res.code == "000000") {
					this.visible = true;
					this.imgUploadUrl = this.$GLOBAL_IMG_URL + res.data;
					this.formItem.newsPhoto = res.data;
				} else {
					this.$Message.error(res.errors);
				}
			},

			//上传图片前格式验证
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
				});
			},

			//上传图片前图片文件大小验证
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 1M。'
				});
			},

			//点击发布新闻
			submitNews() {
				if(!this.formItem.newsTitle) {
					this.$Notice.warning({
						title: '请输入新闻标题'
					});
					return;
				}
				if(!this.formItem.newsLink) {
					this.$Notice.warning({
						title: '请输入新闻链接'
					});
					return;
				}
				if(!this.formItem.newsPhoto) {
					this.$Notice.warning({
						title: '请上传新闻图片'
					});
					return;
				}
				this.$ajax({
					method: 'post',
					url: '/oa-web/news/saveNews',
					headers: {
						token: '9d52355800cf43cd9aaf6b5f5bf2bdcb',
						uid: '357'
					},
					data: this.formItem
				}).then((res) => {
					console.log("newsSubmit", res.data)
					if(res.data.code == "000000") {
						this.$Message.success('发布成功');
						this.formItem.newsTitle = "";
						this.formItem.newsLink = "";
						this.formItem.newsPhoto = "";
						this.visible = false;
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
			}

		},

		created() {},

		mounted() {
			this.header = {
				token: '9d52355800cf43cd9aaf6b5f5bf2bdcb',
				uid: '357'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.news-add {
		padding: 16px;
		.card-title-extra {
			width: 117px;
			position: absolute;
			top: -4px;
			right: 0;
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
			}
			td+td {
				border-left: 1px solid #e9eaec;
			}
			.ivu-form-item {
				margin: 24px 16px;
			}
			.imgBox {
				width: 100px;
				height: 100px;
				border: 1px solid #cccccc;
				img {
					width: 100px;
					height: 100px;
				}
			}
		}
	}
</style>