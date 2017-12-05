<template>
  <div class="work-report-daily">
    <Card>
      <p slot="title" class="header">
        <Button>取消</Button>
        <Button type="primary">发布</Button>
      </p>
      <Card class="content" :bordered="false" :dis-hover="true">
           <p slot="title">会议纪要</p>
          <Form :model="formItem" :label-width="80" label-position="left">
            <!--会议主题-->
              <Row>
                <i-Col span="8">
                  <FormItem label="会议主题">
                  <Select v-model="formItem.select">
                    <Option value="beijing">会议1</Option>
                    <Option value="beijing">会议2</Option>
                  </Select>
                  </FormItem>
                </i-Col>
                <i-Col span="16"></i-Col>
              </Row>
            <!--会议时间/地点-->
              <Row>
                <i-Col span="8">
                  <FormItem label="会议时间">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                  </FormItem>
                </i-Col>
                <i-Col span="8">&nbsp;</i-Col>
                <i-Col span="8">
                  <FormItem label="会议地点">
                    <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                  </FormItem>
                </i-Col>
              </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="与会人员">
                  <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
              </i-Col>
              <i-Col span="16"></i-Col>
            </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="主持人">
                  <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
              </i-Col>
              <i-Col span="8">&nbsp;</i-Col>
              <i-Col span="8">
                <FormItem label="记录人">
                  <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
              </i-Col>
            </Row>

            <Row>
              <i-Col span="12">
                <FormItem label="主要议题">
                  <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写会议主要内容"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="12"></i-Col>
            </Row>

            <Row>
              <i-Col span="12">
                <FormItem label="会议结论">
                  <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写会议结论"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="12 "></i-Col>
            </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="相关附件">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="primary">上传附件</Button>
                  </Upload>
                </FormItem>
              </i-Col>
              <i-Col span="16"></i-Col>
            </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="发布范围">
                  <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                </FormItem>
              </i-Col>
              <i-Col span="8">&nbsp;</i-Col>
              <i-Col span="8">
                <FormItem label="发布方式">
                  <CheckboxGroup v-model="formItem.checkbox">
                    <Checkbox label="邮件"></Checkbox>
                    <Checkbox label="消息"></Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </i-Col>
            </Row>
            </FormItem>


          </Form>
      </Card>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    },
    created () {
      console.log('##### WorkReportDaily created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 32px;
    text-align: right;
  }
  .header .ivu-btn {
    margin-right: 20px;
  }
  .content p{
    background: #F5F6F8 !important;
  }
</style>
