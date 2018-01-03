<template>
  <div class="login">
    <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
      <FormItem prop="email">
        <Input type="text" v-model="formLogin.email" placeholder="邮箱或工号">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="pwd">
        <Input type="password" v-model="formLogin.pwd" placeholder="请输入密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="code">
        <div style="height:32px">
          <Input v-model="formLogin.code" style="float:left;width:80px;margin-right:5px"/>
          <img :src="`data:image/gif;base64,${codeImg}`" alt="" @click="handleUpdateImg">
        </div>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formLogin')" long>登 录</Button>
      </FormItem>
    </Form>
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
          //  执行登录 010123381
          this.$ajax.post('/user/webLogin', qs.stringify(this.formLogin)).then((response) => {
            if (response.data && response.data.code === '000000') {
              const data = response.data.data
              localStorage.setItem('token', data.token)
              localStorage.setItem('uid', data.uid)
              this.$router.replace(this.$route.query.redirect)
              setTimeout(() => {
                window.location.reload()
              }, 0)
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  width: 400px;
  margin: auto;
  padding: 45px;
  form img {
    display: block;
    float: left;
  }
  .ivu-form-item-error-tip {
    clear: both;
  }
}
</style>
