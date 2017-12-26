<template>
	<div class="notice-company">
		<Card>
			<p slot="title">公司公告</p>
			<div slot="extra" class="card-title-extra">
				<Button type="primary" @click="handleReset('formItem')">取消</Button>
				<Button type="primary" @click="handleSubmit('formItem')">发布</Button>
			</div>
			<i-form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" label-position="left">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<FormItem label="标题" prop="title">
								<Input v-model="formItem.title" placeholder="请输入标题"></Input>
							</FormItem>
						</td>
						<td>
							<FormItem label="公告类别" prop="noticeClass">
								<i-select v-model="formItem.noticeClass" placeholder="请选择公告类别">
									<Option v-for="item in noticeClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</i-select>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="发布日期">
								{{formItem.createTime}}
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
							<FormItem label="内容" prop="content">
								<Input type="textarea" v-model="formItem.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公告内容"></Input>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<FormItem label="相关附件" prop="uploadList">
								<Upload ref="upload" :on-success="handleSuccess" :before-upload="handleBeforeUpload" multiple :headers="header" action="/oa-web/notice/upload">
									<Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
								</Upload>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="发布范围" prop="oIds">
								<i-select v-model="formItem.oIds" style="width:200px">
									<i-option v-for="item in oIdsList" :value="item.value" :key="item.value">{{ item.label }}
									</i-option>
								</i-select>
							</FormItem>
						</td>
						<td>
							<FormItem label="发布方式" prop="postType">
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
		name: 'NoticeCompany',
		data() {
			const validateUpload = (rule, value, callback) => {
				if(value.length == 0) {
					callback(new Error('请至少上传一张图片'));
				} else {
					callback();
				}
			};
			return {
				formItem: {
					title: "",
					content: "",
					noticeClass: "",
					postType: [],
					oIds: "",
					createTime: this.GLOBAL_.FORMAT_TIME(),
					uploadList: [],
					uploadListajax:[]
				},
				release: "",
				releaseMode: [],
				oIdsList: [{
					label: "400",
					value: "400"
				}],
				visible: false,
				header: {},
				noticeClassList: [{
						value: "1",
						label: "通知"
					},
					{
						value: "2",
						label: "表彰"
					},
					{
						value: "3",
						label: "活动"
					}
				],
				ruleValidate: {
					title: [{
						required: true,
						message: '请输入公告标题',
						trigger: 'blur'
					}],
					noticeClass: [{
						required: true,
						message: '请选择公告类别',
						trigger: 'change'
					}],
					content: [{
						required: true,
						message: '请输入公告内容',
						trigger: 'blur'
					}],
					uploadList: [{
						required: true,
						validator: validateUpload,
						trigger: 'change'
					}],
					oIds: [{
						required: true,
						message: '请选择发布范围',
						trigger: 'change'
					}],
					postType: [{
						required: true,
						type: 'array',
						min: 1,
						message: '至少选择一种发布方式',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			getTime() {
				var date = new Date();
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				this.formItem.uploadList.splice(this.formItem.uploadList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				console.log(res);
				if(res.code == "000000") {
					this.formItem.uploadList.push({
						url: this.GLOBAL_.IMG_URL + res.data,
						name: res.data,
						status: "finished"
					})
					this.formItem.uploadListajax.push({
						name: res.data
					})
					this.$refs["formItem"].validate((valid) => {
					if(valid) {
						
					} else {
						this.$Message.error('Fail!');
					}
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
				const check = this.formItem.uploadList.length < 5;
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

			//发布部门公告
			companySubmit() {
				var data = {
					title: this.formItem.title,
					content: this.formItem.content,
					noticeType: "1",
					noticeClass: this.formItem.noticeClass,
					postType: this.formItem.postType,
					attachPath: this.formItem.uploadListajax,
					oIds: this.formItem.oIds
				};
				console.log(data);
				this.$ajax({
					method: 'post',
					url: '/oa-web/notice/create',
					headers: {
						token: '73bd4ae0e7f54219aea15e6183d3ed1a',
						uid: '960'
					},
					data: data
				}).then((res) => {
					console.log("发布公司公告", res.data)
					if(res.data.code == "000000") {
						this.$Message.success('发布成功');
					} else {
						this.$Message.error(res.data.message);
					}
				}, (res) => {});
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.companySubmit();
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		},
		mounted() {
			//			this.uploadList = this.$refs.upload.fileList;
			this.header = {
				token: '73bd4ae0e7f54219aea15e6183d3ed1a',
				uid: '960'
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.notice-company {
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