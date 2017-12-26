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
    console.log(this.$route.query.redirect)
    this.handleUpdateImg()
  },
  methods: {
    handleUpdateImg () {
      this.$ajax.get('/user/webCode').then((response) => {
        if (response.data) {
          console.log(response.data)
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
          console.log(this.formLogin)
          this.$ajax.post('/user/webCode', this.formLogin).then((response) => {
            if (response.data) {
              console.log(response.data.data)
            }
          }).catch((err) => {
            console.log(err)
          })
          //  this.$Message.success('Success!')
        } else {
          //  this.$Message.error('Fail!')
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
