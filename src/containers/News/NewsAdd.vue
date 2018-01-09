<template>
  <div class="news-add">
  	<Row style="background-color: #ffffff;height: 53px;padding: 10px 16px 0;">
  		<h3 style="float:left;">公司新闻</h3>
  		<div style="float:right;">
  			<Button type="primary" @click="handleReset('formItem')" style="margin-right: 20px;">取消</Button>
        <Button type="primary" @click="handleSubmit('formItem')">发布</Button>
  		</div>
		</Row>
    <div style="padding: 16px;">
    <Card :dis-hover="true">
      <i-form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="80">
        <table cellpadding="0" cellspacing="0">
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
            <td>
              <FormItem label="新闻标题" prop="newsTitle">
                <i-input v-model="formItem.newsTitle" :maxlength="10" placeholder="请填写公告标题"></i-input>
              </FormItem>
            </td>
            <td>
              <FormItem label="新闻链接" prop="newsLink">
                <i-input v-model="formItem.newsLink" placeholder="请添加需要跳转的链接" icon="link"></i-input>
              </FormItem>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <FormItem label="新闻图片" prop="newsPhoto">
                <div class="imgBox">
                  <img :src="imgUploadUrl" v-if="visible"/>
                </div>
                <Upload ref="upload" :action="this.$ajax.defaults.baseURL + '/file'" :show-upload-list="false" :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']" :max-size="1024" :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize" :headers="header">
                  <div>
                    <Button type="primary" style="width:100px;">点击上传</Button>
                  </div>
                </Upload>
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
    name: 'NewsAdd',
    data () {
      return {
        formItem: {
          newsTitle: '',
          newsLink: '',
          newsPhoto: ''
        },
        header: {
          token: this.$ajax.defaults.headers.common['token'],
          uid: this.$ajax.defaults.headers.common['uid']
        },
        visible: false,
        imgUploadUrl: '',
        ruleValidate: {
          newsTitle: [{
            required: true,
            message: '请输入新闻标题',
            trigger: 'blur'
          }],
          newsLink: [{
            required: true,
            type: 'url',
            message: '请输入正确的新闻链接',
            trigger: 'blur'
          }],
          newsPhoto: [{
            required: true,
            message: '请上传新闻图片',
            trigger: 'change'
          }]

        }
      }
    },
    methods: {
      // 上传图片成功
      handleSuccess (res, file) {
        if (res.code === '000000') {
          this.visible = true
          this.imgUploadUrl = this.GLOBAL_.IMG_URL + res.data
          this.formItem.newsPhoto = res.data
          this.$refs['formItem'].validate((valid) => {})
        } else {
          this.$Message.error(res.errors)
        }
      },

      // 上传图片前格式验证
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },

      // 上传图片前图片文件大小验证
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 1M。'
        })
      },

      // 点击发布新闻
      submitNews () {
        this.$ajax({
          method: 'post',
          url: '/news/saveNews',
          data: this.formItem
        }).then((res) => {
          if (res.data.code === '000000') {
            this.$Message.success('发布成功')
            this.formItem.newsTitle = ''
            this.formItem.newsLink = ''
            this.formItem.newsPhoto = ''
            this.visible = false
          } else {
            this.$Message.error(res.data.message)
          }
        }, (res) => {
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.submitNews()
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.visible = false
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .news-add {
    /*padding: 16px;*/
    .card-title-extra {
      width: 117px;
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
      td + td {
        border-left: 1px solid #e9eaec;
      }
      .ivu-form-item {
        margin: 24px 16px;
      }
      .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #cccccc;
        margin-bottom: 5px;
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
</style>
