<template>
	<div class="notice-company-detail">
		<Card>
			<p slot="title">公司公告</p>
			<div slot="extra" class="card-title-extra">
				<Button type="primary" @click="exit">退出</Button>
			</div>
			<i-form :model="formItem" :label-width="80" label-position="left">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<FormItem label="标题">
								<Input v-model="formItem.title" placeholder="请输入标题"></Input>
							</FormItem>
						</td>
						<td>
							<FormItem label="公告类别">
								<i-select v-model="formItem.noticeClass" placeholder="请选择状态">
									<Option v-for="item in noticeClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</i-select>
							</FormItem>
						</td>
					</tr>
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
						<td colspan="2">
							<FormItem label="内容">
								<Input type="textarea" v-model="formItem.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公告内容"></Input>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<FormItem label="相关附件">
								<div class="demo-upload-list" v-for="item in uploadList">
									<template v-if="item.status === 'finished'">
										<!--<iframe :src="item.url"></iframe>-->
										<img :src="item.url">
										<div class="demo-upload-list-cover">
											<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
											<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
										</div>
									</template>
									<template v-else>
										<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
									</template>
								</div>
								<Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :before-upload="handleBeforeUpload" multiple type="drag" :headers="header" action="/oa-web/notice/upload" style="display: inline-block;width:58px;">
									<div style="width: 58px;height:58px;line-height: 58px;">
										<Icon type="camera" size="20"></Icon>
									</div>
								</Upload>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="发布范围">
								<i-select v-model="formItem.oIds" style="width:200px">
									<i-option v-for="item in oIdsList" :value="item.value" :key="item.value">{{ item.label }}
									</i-option>
								</i-select>
							</FormItem>
						</td>
						<td>
							<FormItem label="发布方式">
								<CheckboxGroup v-model="formItem.postType">
									<Checkbox label="2" value="2">邮件</Checkbox>
									<Checkbox label="1" value="1">消息</Checkbox>
								</CheckboxGroup>
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
		name: 'NoticeCompanyDetail',
		data() {
			return {
				formItem: {
					title: "",
					content: "",
					noticeClass: "",
					postType: [],
					oIds: ""
				},
				release: "",
				releaseMode: [],
				oIdsList: [{
					label: "400",
					value: 400
				}],
				uploadList: [],
				visible: false,
				header: {},
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
				]
			}
		},
		methods: {
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				this.uploadList.splice(this.uploadList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				console.log(res);
				if(res.code == "000000") {
					this.uploadList.push({
						url: this.$GLOBAL_IMG_URL + res.data,
						name: res.data,
						status: "finished"
					})
				}

			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if(!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
					});
				}
				return check;
			},
			formatPostType(postType) {
				if(postType.length != 0) {
					var postTypeNum = 0;
					for(var i = 0; i < postType.length; i++) {
						postTypeNum = postTypeNum + postType[i] * 1;
					}
					return postTypeNum;
				}
			},

			formatAttachPath(attachPath) {
				if(attachPath.length != 0) {
					var attachPathStr = "";
					for(var i = 0; i < attachPath.length; i++) {
						if(i > 0) {
							attachPathStr = attachPathStr + "," + attachPath[i].name;
						} else {
							attachPathStr = attachPath[i].name;
						}

					}
					return attachPathStr;
				}
			},

			//获取公司公告详情信息
			getCompanyData() {
				var id = this.$route.params.id;
				this.$ajax({
					method: 'get',
					url: '/oa-web/notice/' + id,
					headers: {
						token: '9d52355800cf43cd9aaf6b5f5bf2bdcb',
						uid: '357'
					},
				}).then((res) => {
					console.log("获取公司公告详情信息", res.data)
					if(res.data.code == "000000") {
						var result = res.data.data;
						if(result.length != 0){
							this.formItem = result[0];
						}
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
			},
			exit() {
				this.$router.push({
					path: '/notice/from'
				})
			}
		},
		mounted() {
			this.getCompanyData();
			this.header = {
				token: '554fb9447f5e4d6a83e8ce23cf6f208b',
				uid: '54368'
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.notice-company-detail {
		padding: 16px;
		.card-title-extra {
			/*width: 117px;*/
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
		}
		.demo-upload-list {
			display: inline-block;
			width: 60px;
			height: 60px;
			text-align: center;
			line-height: 60px;
			border: 1px solid transparent;
			border-radius: 4px;
			overflow: hidden;
			background: #fff;
			position: relative;
			box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
			margin-right: 4px;
		}
		.demo-upload-list img {
			width: 100%;
			height: 100%;
		}
		.demo-upload-list-cover {
			display: none;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, .6);
		}
		.demo-upload-list:hover .demo-upload-list-cover {
			display: block;
		}
		.demo-upload-list-cover i {
			color: #fff;
			font-size: 20px;
			cursor: pointer;
			margin: 0 2px;
		}
	}
</style>