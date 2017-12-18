<template>
  <div class="news-add">
    <Card>
      <p slot="title">公司新闻</p>
      <div slot="extra" class="card-title-extra">
        <Button type="primary">取消</Button>
        <Button type="primary">发布</Button>
      </div>
      <i-form :model="formItem" :label-width="80" label-position="left">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <FormItem label="发布日期">
                2017-10-09
              </FormItem>
            </td>
            <td>
              <FormItem label="发布人">
                朱展宏
              </FormItem>
            </td>
          </tr>
          <tr>
            <td>
              <FormItem label="新闻标题">
                <Input v-model="formItem.title" :maxlength="10" placeholder="请填写公告标题"></Input>
              </FormItem>
            </td>
            <td>
              <FormItem label="新闻链接">
                <Input v-model="formItem.title" placeholder="请添加需要跳转的链接"></Input>
              </FormItem>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <FormItem label="新闻图片">
                <Upload
                  ref="upload"
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="plus-round" size="20"></Icon>
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
      return {
        formItem: {
          title: ""
        },
        release: "",
        releaseMode: [],
        releaseList: [{
          label: "100",
          value: 1
        }],

      }
    },
    created() {
      console.log('##### NewsAdd created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .news-add {
    padding: 16px;
    .card-title-extra {
      width: 116px;
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
    }
  }
</style>
