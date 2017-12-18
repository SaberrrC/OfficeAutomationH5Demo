<template>
  <div class="user-center-password">
    <Card>
      <p slot="title">个人密码修改</p>
      <Button type="primary" slot="extra" class="card-title-extra">保存</Button>
      <i-form :model="formPassword" :label-width="80" style="width:400px;">
        <FormItem label="原始密码" prop="passwd">
          <Input type="password" v-model="formPassword.passwdOld"></Input>
        </FormItem>
        <FormItem label="新密码" prop="passwdCheck">
          <Input type="password" v-model="formPassword.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formPassword.passwdCheck"></Input>
        </FormItem>
      </i-Form>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'UserCenterPassword',
    data() {
      return {
        formPassword: {
          passwdOld: "",
          passwd: "",
          passwdCheck: ""
        }
      }
    },
    created() {
      console.log('##### UserCenterPassword created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user-center-password {
    padding: 16px;
    .card-title-extra {
      position: absolute;
      top: -4px;
      right: 0;
    }
  }
</style>
