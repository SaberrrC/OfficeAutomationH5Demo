<template>
  <div class="user-center-email">
    <Card>
      <p slot="title">个人邮箱修改</p>
      <div slot="extra" class="card-title-extra">
        <Button type="primary">修改</Button>
        <Button type="primary">保存</Button>
      </div>
      <i-form :model="formEmail" :label-width="80" style="width:400px;">
        <FormItem label="个人邮箱">
          <Input type="text" v-model="formEmail.email" :disabled="true"></Input>
        </FormItem>
      </i-Form>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'UserCenterEmail',
    data() {
      return {
        formEmail:{
          email:""
        }
      }
    },
    created() {
      console.log('##### UserCenterEmail created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user-center-email {
    padding: 16px;
    .card-title-extra {
      width: 116px;
      position: absolute;
      top: -4px;
      right: 0;
    }
  }
</style>
