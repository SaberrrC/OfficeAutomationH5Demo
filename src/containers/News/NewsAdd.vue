<template>
  <div class="news-add">
    <Card>
      <p slot="title">公司新闻</p>
      <div slot="extra" class="card-title-extra">
        <Button type="primary" @click="handleReset('formItem')">取消</Button>
        <Button type="primary" @click="handleSubmit('formItem')">发布</Button>
      </div>
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
                {{GLOBAL_.USER_NAME}}
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
                <Upload ref="upload" action="/file" :show-upload-list="false" :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']" :max-size="1024" :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize" :headers="header" style="display: inline-block;width:58px;">
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
</template>

<script>
  export default {
    name: 'NewsAdd',
    data() {
      const validateURL = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新闻链接'));
        } else {
          if (!/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(value)) {
            callback(new Error('新闻链接格式有误'));
          }
          callback();
        }
      };
      return {
        formItem: {
          newsTitle: "",
          newsLink: "",
          newsPhoto: ""
        },
        header: {},
        visible: false,
        imgUploadUrl: "",
        ruleValidate: {
          newsTitle: [{
            required: true,
            message: '请输入新闻标题',
            trigger: 'blur'
          }],
          newsLink: [{
            required: true,
            validator: validateURL,
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
      //上传图片成功
      handleSuccess(res, file) {
        console.log(res);
        if (res.code == "000000") {
          this.visible = true;
          this.imgUploadUrl = this.GLOBAL_.IMG_URL + res.data;
          this.formItem.newsPhoto = res.data;
        } else {
          this.$Message.error(res.errors);
        }
      },

      //上传图片前格式验证
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },

      //上传图片前图片文件大小验证
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 1M。'
        });
      },

      //点击发布新闻
      submitNews() {
        this.$ajax({
          method: 'post',
          url: '/news/saveNews',
          headers: {
            token: '73bd4ae0e7f54219aea15e6183d3ed1a',
            uid: '960'
          },
          data: this.formItem
        }).then((res) => {
          console.log("newsSubmit", res.data)
          if (res.data.code == "000000") {
            this.$Message.success('发布成功');
            this.formItem.newsTitle = "";
            this.formItem.newsLink = "";
            this.formItem.newsPhoto = "";
            this.visible = false;
          } else {
            this.$Message.error(res.data.message);
          }
        }, (res) => {
        });
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.submitNews();
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }

    },

    created() {
    },

    mounted() {
      this.header = {
        token: '73bd4ae0e7f54219aea15e6183d3ed1a',
        uid: '960'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .news-add {
    padding: 16px;
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
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
</style>
