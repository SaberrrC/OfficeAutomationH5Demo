<template>
  <div class="user-center-basic">
    <Card>
      <p slot="title">个人基本信息</p>
      <i-form :model="formBasic" :label-width="80">
        <FormItem label="姓名">
          {{formBasic.username}}
        </FormItem>
        <FormItem label="部门">
          {{formBasic.department}}
        </FormItem>
        <FormItem label="岗位">
          {{formBasic.station}}
        </FormItem>
        <FormItem label="电话">
          {{formBasic.phone}}
        </FormItem>
        <FormItem label="邮箱">
          {{formBasic.email}}
        </FormItem>
        <FormItem label="头像">
          <div class="upload-img">
            <img src="../assets/images/290878cd5c5c2f849fe09bcb676072df.jpeg" alt="">
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;">
            <Button type="primary">上传</Button>

          </Upload>
        </FormItem>
      </i-Form>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'UserCenterBasic',
    data() {
      return {
        formBasic: {
          username: "张黄琳",
          department: "信息安全部",
          station: "系统运维工程师",
          phone: "13333333333",
          email: "sss@shanlinjinrong.com",
          avatar: ""
        }
      }
    },
    methods: {
      handleSuccess(res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '图片格式限制',
          desc: '文件 ' + file.name + ' 图片格式错误, 只能上传 jpg 或 png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '图片大小限制',
          desc: '文件  ' + file.name + ' 太大, 不能超过 2M.'
        });
      }
    },
    created() {
      console.log('##### UserCenterBasic created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user-center-basic {
    padding: 16px;
    .upload-img {
      float: left;
      margin-right: 16px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }
  }
</style>
