<template>
	<div class="notice-department">
		<Row style="background-color: #ffffff;height: 53px;padding: 10px 16px 0;">
	  		<h3 style="float:left;">部门公告</h3>
	  		<div style="float:right;">
	  			<Button type="primary" @click="handleReset('formItem')" style="margin-right: 20px;">取消</Button>
	        	<Button type="primary" @click="handleSubmit('formItem')">发布</Button>
	  		</div>
		</Row>
    	<div style="padding: 16px;">
		<Card :dis-hover="true">
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
								<i-select v-model="formItem.noticeClass" placeholder="请选择状态">
									<Option v-for="item in noticeClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</i-select>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="发布日期">
								{{GLOBAL_.FORMAT_TIME()}}
							</FormItem>
						</td>
						<td>
							<FormItem label="发布人">
								{{this.$store.state.userInfo.username}}
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
						<td>
							<FormItem label="相关附件">
								<Upload ref="upload" :on-success="handleSuccess" multiple :headers="header" :action="this.$ajax.defaults.baseURL + '/notice/upload'" :format="['jpg','jpeg','png','gif','bmp','tif','txt','zip','rar','doc','docx','xls','xlsx','ppt','pptx','accdb','pdf','rtf','psd','wps','pages','numbers','key']" :before-upload="handleBeforeUpload" :on-format-error="handleFormatError" :on-remove="handleRemove">
									<Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
								</Upload>
							</FormItem>
						</td>
						<td>
							<FormItem label="发布方式" prop="postType">
								<CheckboxGroup v-model="formItem.postType">
									<Checkbox label="2">邮件</Checkbox>
									<Checkbox label="1">消息</Checkbox>
								</CheckboxGroup>
							</FormItem>
						</td>
					</tr>
				</table>
			</i-form>
		</Card>
	</div>
	</div>
</template>

<script>
	export default {
	  name: 'NoticeDepartment',
	  data () {
	    const validateUpload = (rule, value, callback) => {
	      if (value.length === 0) {
	        callback(new Error('请至少上传一个附件'))
	      } else {
	        callback()
	      }
	    }
	    return {
	      formItem: {
	        title: '',
	        content: '',
	        noticeType: 2,
	        noticeClass: '',
	        postType: [],
	        attachPath: [],
	        oIds: '',
	        defaultList: []
	      },
	      noticeClassList: [{
	        value: '1',
	        label: '通知'
	      },
	      {
	        value: '2',
	        label: '表彰'
	      },
	      {
	        value: '3',
	        label: '活动'
	      }],
	      visible: false,
	      header: {
	        token: this.$ajax.defaults.headers.common['token'],
	        uid: this.$ajax.defaults.headers.common['uid']
	      },
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
	        defaultList: [{
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
	    handleRemove (file, fileList) {
	      for (let i = 0; i < this.formItem.defaultList.length; i++) {
	        if (this.formItem.defaultList[i] === file.response.data) {
	          this.formItem.defaultList.splice(this.formItem.defaultList.indexOf(this.formItem.defaultList[i]), 1)
	        }
	      }
	      this.$refs['formItem'].validate((valid) => {})
	    },
	    handleBeforeUpload () {
	      const check = this.$refs.upload.fileList.length < 3
	      if (!check) {
	        this.$Notice.warning({
	          title: '最多上传三个附件'
	        })
	      }
	      return check
	    },
	    handleSuccess (res, file) {
	      if (res.code === '000000') {
	        this.formItem.defaultList.push(res.data)
	        this.$refs['formItem'].validate((valid) => {})
	      }
	    },
	    handleFormatError (file) {
	      this.$Notice.warning({
	        title: '上传文件格式有误',
	        desc: '附件 ' + file.name + ' 格式错误, 请选择以下格式：jpg、jpeg、gif、png、bmp、tif、txt、zip、rar、doc、docx、xls、xlsx、ppt、pptx、accdb、pdf、rtf、psd、wps、pages、numbers、key'
	      })
	    },

	// 发布部门公告
	    noticeSubmit () {
	      let data = {
	        title: this.formItem.title,
	        content: this.formItem.content,
	        noticeType: '2',
	        noticeClass: this.formItem.noticeClass,
	        postTypeList: this.formItem.postType,
	        attachList: this.formItem.defaultList
	      }
	      this.$ajax({
	        method: 'post',
	        url: '/notice/create',
	        data: data
	      }).then((res) => {
	        if (res.data.code === '000000') {
	          this.$Message.success('发布成功')
	          this.handleReset('formItem')
	        } else {
	          this.$Message.error(res.data.message)
	        }
	      }, (res) => {})
	    },
	    handleSubmit (name) {
	      this.$refs[name].validate((valid) => {
	        if (valid) {
	          this.noticeSubmit()
	        }
	      })
	    },
	    handleReset (name) {
	      this.$refs[name].resetFields()
	      this.formItem.defaultList = []
	      this.$refs.upload.clearFiles()
	    }
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.notice-department {
		/*padding: 16px;*/
		.card-title-extra {
			width: 118px;
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
