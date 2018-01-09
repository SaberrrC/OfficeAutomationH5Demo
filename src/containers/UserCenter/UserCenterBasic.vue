<template>
	<div class="user-center-basic">
		<Card :dis-hover="true">
			<p slot="title">个人基本信息</p>
			<i-form :model="formBasic" :label-width="80">
				<FormItem label="姓名">
					{{formBasic.username}}
				</FormItem>
				<FormItem label="部门">
					{{formBasic.organ}}
				</FormItem>
				<FormItem label="岗位">
					{{formBasic.postname}}
				</FormItem>
				<FormItem label="电话">
					{{formBasic.phone}}
				</FormItem>
				<FormItem label="邮箱">
					{{formBasic.email}}
				</FormItem>
				<FormItem label="头像">
					<div class="upload-img">
						<img :src="formBasic.portrait" v-if="visible">
					</div>
					<Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="this.$ajax.defaults.baseURL + '/user/upload'" :headers="header" style="display: inline-block;">
						<Button type="primary" style="width:100px;">点击上传</Button>
					</Upload>
				</FormItem>
			</i-Form>
		</Card>
	</div>
</template>

<script>
	import chat from '../../module/chatting'
	export default {
	  name: 'UserCenterBasic',
	  data () {
	    return {
	      formBasic: {
	        username: '',
	        organ: '',
	        postname: '',
	        phone: '',
	        email: '',
	        portrait: ''
	      },
	      visible: false,
	      header: {
	        token: this.$ajax.defaults.headers.common['token'],
	        uid: this.$ajax.defaults.headers.common['uid']
	      }
	    }
	  },
	  methods: {
	// 图片上传成功
	    handleSuccess (res, file) {
	      if (res.code === '000000') {
	        this.visible = true
	        this.formBasic.portrait = res.data.portrait
	        chat.updateCurUserInfo() // IM 当前用户信息更新
	      }
	    },

	// 图片上传前格式验证
	    handleFormatError (file) {
	      this.$Notice.warning({
	        title: '图片格式限制',
	        desc: '文件 ' + file.name + ' 图片格式错误, 只能上传 jpg 或 png.'
	      })
	    },

	// 图片上传前大小限制
	    handleMaxSize (file) {
	      this.$Notice.warning({
	        title: '图片大小限制',
	        desc: '文件  ' + file.name + ' 太大, 不能超过 2M.'
	      })
	    },

	// 获取个人信息
	    getUserInfoById () {
	      this.$ajax({
	        method: 'get',
	        url: '/user/getUserInfoById',
	        params: {
	          uid: this.$ajax.defaults.headers.common['uid']
	        }
	      }).then((res) => {
	        if (res.data.code === '000000') {
	          this.formBasic = res.data.data
	          if (this.formBasic.portrait) {
	            this.visible = true
	          }
	        } else {
	          this.$Message.error(res.data.message)
	        }
	      }, (res) => {})
	    }
	  },

	  mounted () {
	    this.getUserInfoById()
	  }
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.user-center-basic {
		padding: 16px;
		.upload-img {
			margin-right: 16px;
			width: 100px;
			height: 100px;
			border: 1px solid #cccccc;
			img {
				width: 100px;
				height: 100px;
			}
		}
	}
</style>
