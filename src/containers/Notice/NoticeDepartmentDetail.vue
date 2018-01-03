<template>
	<div class="notice-department">
		<Card>
			<p slot="title">部门公告</p>
			<div slot="extra" class="card-title-extra">
				<Button type="primary" @click="exit">退出</Button>
			</div>
			<i-form :model="formItem" :label-width="80" label-position="left">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<FormItem label="标题">
								<Input v-model="formItem.title" :maxlength="10" placeholder="请输入标题" :disabled="disable"></Input>
							</FormItem>
						</td>
						<td>
							<FormItem label="公告类别">
								<i-select v-model="formItem.noticeClass" placeholder="请选择状态" :disabled="disable">
									<Option v-for="item in noticeClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</i-select>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="发布日期">
								{{GLOBAL_.FORMAT_TIME(formItem.createTime)}}
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
							<FormItem label="内容">
								<Input type="textarea" v-model="formItem.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公告内容" :disabled="disable"></Input>
							</FormItem>
						</td>
					</tr>
					<tr>
						<td>
							<FormItem label="相关附件">
								<Upload ref="upload" action="/notice/upload">
									<Button type="ghost" icon="ios-cloud-upload-outline" :disabled="disable">上传附件</Button>
								</Upload>
								<div v-if="formItem.attachList">
									<div v-for="(item,index) in formItem.attachList">Upload file: {{ item }}
										<a class="downLoad" @click="oDownLoad(GLOBAL_.IMG_URL + item , index )">下载</a>
									</div>
								</div>
							</FormItem>
						</td>
						<td>
							<FormItem label="发布方式">
								<CheckboxGroup v-model="formItem.postTypeList">
									<Checkbox label="2" :disabled="disable">邮件</Checkbox>
									<Checkbox label="1" :disabled="disable">消息</Checkbox>
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
	  name: 'NoticeDepartmentDetail',
	  data () {
	    return {
	      formItem: {
	        title: '',
	        content: '',
	        noticeType: 2,
	        noticeClass: '',
	        postTypeList: [],
	        attachPath: [],
	        oIds: '',
	        createTime: ''
	      },
	      noticeClassList: [{
	        value: 1,
	        label: '通知'
	      },
	      {
	        value: 2,
	        label: '表彰'
	      },
	      {
	        value: 3,
	        label: '活动'
	      }],
	      uploadList: [],
	      visible: false,
	      disable: true
	    }
	  },
	  methods: {
	// 获取公司公告详情信息
	    getDepartmentData () {
	      let id = this.$route.params.id
	      this.$ajax({
	        method: 'get',
	        url: '/notice/' + id
	      }).then((res) => {
	        if (res.data.code === '000000') {
	          let result = res.data.data
	          if (result.length !== 0) {
	            this.formItem = result[0]
	          }
	        } else {
	          this.$Message.error(res.data.message)
	        }
	      }, (res) => {})
	    },
	    exit () {
	      if (this.$route.params.type === 2) {
	        this.$router.push({
	          path: '/notice/to'
	        })
	      }
	      if (this.$route.params.type === 1) {
	        this.$router.push({
	          path: '/notice/from'
	        })
	      }
	    },
	// 判断浏览器类型
	    myBrowser () {
	    // 取得浏览器的userAgent字符串
	      let userAgent = navigator.userAgent
	      let isOpera = userAgent.indexOf('Opera') > -1
	      // 判断是否Opera浏览器
	      if (isOpera) {
	        return 'Opera'
	      }
	      // 判断是否Firefox浏览器
	      if (userAgent.indexOf('Firefox') > -1) {
	        return 'FF'
	      }
	      if (userAgent.indexOf('Chrome') > -1) {
	        return 'Chrome'
	      }
	      // 判断是否Safari浏览器
	      if (userAgent.indexOf('Safari') > -1) {
	        return 'Safari'
	      }
	      // 判断是否IE浏览器
	      if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
	        return 'IE'
	      }
	    // 判断是否Edge浏览器
	      if (userAgent.indexOf('Trident') > -1) {
	        return 'Edge'
	      }
	    },
	    SaveAs5 (imgURL) {
	      let oPop = window.open(imgURL, '', 'width=1, height=1, top=5000, left=5000')
	      for (; oPop.document.readyState !== 'complete';) {
	        if (oPop.document.readyState === 'complete') break
	      }
	      oPop.document.execCommand('SaveAs')
	      oPop.close()
	    },
	    oDownLoad (url, index) {
	      let odownLoad = document.getElementsByClassName('downLoad')[index]
	      if (this.myBrowser() === 'IE' || this.myBrowser() === 'Edge') {
	// IE
	        odownLoad.href = '#'
	        let oImg = document.createElement('img')
	        oImg.src = url
	        oImg.id = 'downImg'
	        let odown = document.getElementById('down')
	        odown.appendChild(oImg)
	        this.SaveAs5(document.getElementById('downImg').src)
	      } else {
	// !IE
	        odownLoad.href = url
	        odownLoad.download = ''
	      }
	    }
	  },
	  mounted () {
	    this.getDepartmentData()
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.notice-department {
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
