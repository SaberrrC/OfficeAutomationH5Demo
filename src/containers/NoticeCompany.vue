<template>
  <div class="notice-company">
    <Card>
      <p slot="title">公司公告</p>
      <div slot="extra" class="card-title-extra">
        <Button type="primary">取消</Button>
        <Button type="primary">发布</Button>
      </div>
      <i-form :model="formItem" :label-width="80" label-position="left">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <FormItem label="标题">
                <Input v-model="formItem.title" placeholder="Enter something..."></Input>
              </FormItem>
            </td>
            <td>
              <FormItem label="公告类别">
                <Input v-model="formItem.title" placeholder="Enter something..."></Input>
              </FormItem>
            </td>
          </tr>
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
            <td colspan="2">
              <FormItem label="内容">
                <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
              </FormItem>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <FormItem label="相关附件">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <Button type="primary">上传附件</Button>
                </Upload>
              </FormItem>
            </td>
          </tr>
          <tr>
            <td>
              <FormItem label="发布范围">
                <i-select v-model="release" style="width:200px">
                  <i-option v-for="item in releaseList" :value="item.value" :key="item.value">{{ item.label }}
                  </i-option>
                </i-select>
              </FormItem>
            </td>
            <td>
              <FormItem label="发布方式">
                <CheckboxGroup v-model="releaseMode">
                  <Checkbox label="邮件"></Checkbox>
                  <Checkbox label="消息"></Checkbox>
                </CheckboxGroup>
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
    name: 'NoticeCompany',
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
      console.log('##### NoticeCompany created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .notice-company {
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
