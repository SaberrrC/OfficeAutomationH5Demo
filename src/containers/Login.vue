<template>
  <div class="login">
  	<div class="header">
  			<div class="header_left">
  				<img src="../../static/img/logo.png"/>
  			</div>
  			<!--<div class="header_right">
  				<ul>
  					<li><a href="">首页</a></li>
  					<li><a href="">下载</a></li>
  					<li><a href="">使用帮助</a></li>
  				</ul>
  			</div>-->
  	</div>
  	<div class="banner">
  		<div class="login-container">
		  	<div class="formLogin">
			    <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
			      <FormItem prop="email">
			        <Input type="text" v-model.trim="formLogin.email" placeholder="邮箱或工号" @keyup.enter.native="toEnterLogin($event)">
			        <Icon type="ios-person-outline" slot="prepend"></Icon>
			        </Input>
			      </FormItem>
			      <FormItem prop="pwd">
			        <Input type="password" v-model.trim="formLogin.pwd" placeholder="请输入密码" @keyup.enter.native="toEnterLogin($event)">
			        <Icon type="ios-locked-outline" slot="prepend"></Icon>
			        </Input>
			      </FormItem>
			      <FormItem prop="code">
			        <div style="height:32px">
			          <Input v-model="formLogin.code" style="float:left;width:80px;margin-right:5px" @keyup.enter.native="toEnterLogin($event)" />
			          <img :src="`data:image/gif;base64,${codeImg}`" alt="" @click="handleUpdateImg">
			        </div>
			      </FormItem>
			      <FormItem>
			        <Button type="primary" @click="handleSubmit('formLogin')" long>登 录</Button>
			      </FormItem>
			    </Form>
	    </div>
  	</div>
    </div>
    <div class="logo">
    	<h1 style="margin:80px 0 20px;font-weight:400;">改变 , 不只是你的工作方式</h1>
    	<h2 style="font-weight:400;">规范流程，助推企业升级转型。协同沟通，高效执行，让办公轻而易举。</h2>
    	<Row style="padding:60px 0;">
	        <Col span="6" class="hover-box">
	        	<div class="logoBox">
	        		<img src="../../static/img/android.png" alt="" />
	        		<h3>Android版</h3>
	        		<p>扫码下载安装到您的手机</p>
	        	</div>
	        	<div class="qrBox">
	        		<img src="../../static/img/androidCode.png" alt="" />
	        		<h3>扫描二维码</h3>
	        		<h3>下载Android客户端</h3>
	        	</div>
	        </Col>
	        <Col span="6" class="hover-box">
	        	<div class="logoBox">
	        		<img src="../../static/img/ios.png" alt="" />
	        		<h3>iPhone版</h3>
	        		<p>扫码到App Store商店下载</p>
	        	</div>
	        	<div class="qrBox">
	        		<img src="../../static/img/iosCode.png" alt="" />
	        		<h3>扫描二维码</h3>
	        		<h3>下载iPhone客户端</h3>
	        	</div>
	        </Col>
	        <Col span="6">
	        	<div class="logoBox">
	        		<img src="../../static/img/ipad.png" alt="" />
	        		<h3>PAD H5版</h3>
	        		<p>输入本页面域名访问</p>
	        	</div>
	        </Col>
	        <Col span="6">
	        	<div class="logoBox">
	        		<img src="../../static/img/web.png" alt="" />
	        		<h3>Web版</h3>
	        		<p>输入本页面域名访问</p>
	        	</div>
	        </Col>
    	</Row>
	  </div>
  	<div class="detail" style="background-color: #f4f4f4;">
  		<div class="detail_content" style="background: url(../../static/img/show1.png) no-repeat left bottom;">
  			<div class="text" style="float:right;">
  				<h1 style="font-weight: normal;margin-bottom: 30px;">公告通知</h1>
  				<h2 style="font-weight: normal;">覆盖集团、公司、部门的全方位公告平台</h2>
  				<h2 style="font-weight: normal;">所有通知按类区分，历史信息可查询</h2>
  			</div>
  		</div>
  	</div>
  	<div class="detail" style="background-color: #ffffff;">
  		<div class="detail_content" style="background: url(../../static/img/show2.png) no-repeat right bottom;">
  			<div class="text" style="float:left;">
  				<h1 style="font-weight: normal;margin-bottom: 30px;">工作汇报</h1>
  				<h2 style="font-weight: normal;">支持多人收发的汇报平台</h2>
  				<h2 style="font-weight: normal;">随时随地收发，方便高效</h2>
  			</div>
  		</div>
  	</div>
  	<div class="detail" style="background-color: #f4f4f4;">
  		<div class="detail_content">
  			<Row style="padding-bottom: 20px;">
        	<Col span="12" style="background: url(../../static/img/show3.png) no-repeat center bottom;height:360px;">
        		<div class="text text-2">
		  				<h1 style="font-weight: normal;margin-bottom: 30px;">组织架构</h1>
		  				<h2 style="font-weight: normal;">匹配公司架构、人员变动的高效专业平台</h2>
		  				<h2 style="font-weight: normal;">权限自定义管理，可针对个人定制</h2>
		  			</div>
        	</Col>
        	<Col span="12" style="background: url(../../static/img/show4.png) no-repeat center bottom;height:360px;">
        		<div class="text text-2">
		  				<h1 style="font-weight: normal;margin-bottom: 30px;">BI系统</h1>
		  				<h2 style="font-weight: normal;">去繁从简，可视化数据，一目了然</h2>
		  				<h2 style="font-weight: normal;">为管理者提升效率的企业助手</h2>
		  			</div>
        	</Col>
    		</Row>
  		</div>
  	</div>
  	<div class="footer" style="line-height: 24px;padding: 10px;background-color: #666666;color:#FFFFFF;text-align: center;">
  		CopyRight © 善林 (上海) 金融信息服务有限公司 版权所有 &nbsp; &nbsp; &nbsp; &nbsp;沪ICP备14001535号
  	</div>
  	 <BackTop></BackTop>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Login',
  data () {
    return {
      formLogin: {
        email: '',
        pwd: '',
        keyCode: '',
        code: ''
      },
      codeImg: '',
      ruleLogin: {
        email: [
          { required: true, message: '请输入邮箱或工号', trigger: 'click' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'click' },
          { type: 'string', min: 6, message: '密码位数不少于 6 位', trigger: 'click' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'click' },
          { type: 'string', min: 4, message: '验证码不少于 4 位', trigger: 'click' }
        ]
      }
    }
  },
  created () {
    this.handleUpdateImg()
  },
  methods: {
    handleUpdateImg () {
      //  获取图片验证码
      this.$ajax.get('/user/webCode').then((response) => {
        if (response.data && response.data.code === '000000') {
          const data = response.data.data
          this.codeImg = data.img
          this.formLogin.keyCode = data.keyCode
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          //  执行登录
          this.$ajax.post('/user/webLogin', qs.stringify(this.formLogin)).then((response) => {
            if (response.data && response.data.code === '000000') {
              const data = response.data.data
              localStorage.setItem('token', data.token)
              localStorage.setItem('uid', data.uid)
              this.$router.replace(this.$route.query.redirect)
              setTimeout(() => {
                window.location.reload()
              }, 0)
            } else {
              this.$Message.error(response.data.message)
              //  失败后重新换个验证码
              this.handleUpdateImg()
            }
          }).catch((err) => {
            console.log(err)
            this.handleUpdateImg()
          })
        } else {
        }
      })
    },
    toEnterLogin (ev) {
    // 按回车登录
      if (ev.keyCode === 13) {
        this.handleSubmit('formLogin')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
	background-color: #fff;
	.header{
			width:1200px;
			height:100px;
			margin:0 auto;
			.header_left{
				float: left;
			}
			.header_right{
				float: right;
				ul{
					line-height: 97px;
					li{
						float: left;
						margin-left: 90px;
						a{
							padding-bottom: 3px;
							font-size: 18px;
							font-weight: 700;
							color: #000000;
						}
						a:hover{
							color:#4d9aef;
							border-bottom: 1px solid #4d9aef;
						}
					}
					li:first-of-type a{
							color:#4d9aef;
							border-bottom: 1px solid #4d9aef;
					}
				}
			}
		}
		.banner{
			height:310px;
			width:100%;
			background: url(../../static/img/banner.png);
			.login-container{
				width:1200px;
				margin:0 auto;
				}
			.formLogin{
				width: 22%;
				float: right;
				padding: 16px;
				margin-top: 25px;
				background-color: #ffffff;

	  		form img {
	    		display: block;
	    		float: left;
	  		}
	  	.ivu-form-item-error-tip {
	    	clear: both;
	  		}
  		}
		}
  .logo{
  	width:1200px;
  	margin: 0 auto;
  	text-align: center;
  	.logoBox{
  		padding:66px 0;
  		img{
  			height:107px;
  		}
  	}

  	.hover-box{
  		position: relative;
  		.logoBox{
  			opacity: 1;
  			transition: opacity 1.2s;
  		}
  		.qrBox{
  			position: absolute;
  			width:100%;
  			text-align: center;
  			top:0;
  			left:0;
  			opacity: 0;
  			transition: opacity 1s;
  			background-color: #cccccc;
  			padding:66px 0;
  			img{
  				width:100px;
  			}
  		}

  	}
  	.hover-box:hover{
  		.logoBox{
  			opacity: 0;
  		}
  		.qrBox{
  			opacity: 1;
  		}
  	}
  }
  .detail{
  	color: #333333;
  	height:380px;
  	.detail_content{
  		width:1200px;
  		margin: 0 auto;
  		height:380px;
  		.text{
  			margin-top: 150px;
  			width:50%;
  			text-align: center;
  		}
  		.text-2{
  			width:100%;
  			margin-top: 70px;
  		}
  	}
  }
}
</style>
