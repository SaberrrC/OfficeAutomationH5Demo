<template>
  <div class="steps">
    <!--步骤条-->
    <div>
    <Steps :current="current">
      <Step title="填写工号"></Step>
      <Step title="验证手机"></Step>
      <Step title="完成"></Step>
    </Steps>
    </div>
    <!--表单-->
    <div class="form">
    <Form
      ref="formInline"
      :model="formInline"
      :rules="ruleInline"
      label-position="top"
    >
      <FormItem label="工号：" prop="Jobnumber">
        <Input v-model="formInline.Jobnumber" placeholder="请输入工号" class="i-input Jobnumber"></Input>
      </FormItem>
      <FormItem label="验证码：" prop="code">
        <Input v-model="formInline.code" placeholder="请输入验证码" class="i-input"></Input>
        <img src="data:image/gif;base64,R0lGODdhUAAeAIAAAAQCBPz+/CwAAAAAUAAeAAACd4SPqcvtD6OctNqLs968+w+G4kiW5omm6spuQYC87SgftXgDOSO/cJTbfYI/h88gXBBJPVgysXz4psVGs2p0aiHRbAyrrD2h27GtakaiwYqulZrWrblzad2uBt7fX3p/xnfmJwgI4laImKi4yNjo+AgZKTlJaVEAADs=" alt="">
      </FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">下一步</Button>
    </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
//    验证工号格式
      var checkJobnumber = (rule, value, callback) => {
        if (!/^[0-9]{9}$/.test(value)) {
          callback(new Error('请输入9位纯数字工号!'))
        } else {
          callback()
        }
      }
      return {
        current: 0,
        formInline: {
          Jobnumber: '',
          code: ''
        },
        ruleInline: {
          Jobnumber: [
            {required: true, message: '请输入工号', trigger: 'blur'},
            {validator: checkJobnumber, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        console.log(123)
      }

    }
  }
</script>

<style scoped>
  .steps{
    height: 76px;
    line-height: 76px;
    background: #eeeeee;
    padding-left: 20%;
    padding-top: 30px;
    font-size: 28px;
  }
  .i-input{
    width: 150px;
  }
  .Jobnumber{
    width:300px;
  }
  .form {
    margin-left: 25%;
    margin-top: 50px;
  }
  .ivu-form-item{
    width: 300px;
  }
  .ivu-form .ivu-form-item-label{
    font-size: 14px;
  }
  .form img{
    display: inline-block;
    float: right;
    margin-right: 30px;
    padding: 1px 0;
  }
</style>
