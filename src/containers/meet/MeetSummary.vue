<template>
  <div>
    <p slot="title" class="header">
      <Button>取消</Button>
      <Button type="primary" @click = query()>发布</Button>
    </p>
    <div class="work-report-daily">
      <h3 slot="title">会议纪要</h3>
      <Card class="content" shadow>
          <Form :model="formItem" :label-width="80" label-position="left">
            <!--会议主题-->
              <Row>
                <i-Col span="8">
                  <FormItem label="会议主题">
                    <Input v-model="formItem.title" placeholder="请选择会议主题" @on-focus="showTitle = true"></Input>
                  </FormItem>
                </i-Col>
                <i-Col span="16"></i-Col>
              </Row>
            <!--会议时间/地点-->
              <Row>
                <i-Col span="8">
                  <FormItem label="会议时间">
                    <!--<Input v-model="formItem.time" disabled style="border: none"></Input>-->
                    <span>{{formItem.time}}</span>
                  </FormItem>
                </i-Col>
                <i-Col span="8">&nbsp;</i-Col>
                <i-Col span="8">
                  <FormItem label="会议地点">
                    <!--<Input v-model="formItem.meetingPlace" disabled icon="ios-location-outline"></Input>-->
                    <span>{{formItem.meetingPlace}}</span>
                  </FormItem>
                </i-Col>
              </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="与会人员">
                  <Input v-if="formItem.users !== ''" v-model="formItem.users" disabled></Input>
                  <Input v-else v-model="formItem.users" placeholder="请选择与会人员" @on-focus="checkUsers()"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="16"></i-Col>
            </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="主持人">
                  <Input v-if="formItem.users !== ''" v-model="formItem.moderator" placeholder="主持人" disabled></Input>
                  <Input v-else v-model="formItem.moderator" placeholder="请选择主持人" @on-focus="checkModerator()"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="8">&nbsp;</i-Col>
              <i-Col span="8">
                <FormItem label="记录人">
                  <!--<Input v-if="" v-model="formItem.recorder" placeholder="记录人"></Input>-->
                  <Input v-model="formItem.recorder" placeholder="记录人"></Input>
                </FormItem>
              </i-Col>
            </Row>

            <Row>
              <i-Col span="12">
                <FormItem label="主要议题">
                  <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写会议主要内容"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="12"></i-Col>
            </Row>

            <Row>
              <i-Col span="12">
                <FormItem label="会议结论">
                  <Input v-model="formItem.conclusion" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写会议结论"></Input>
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
                  <Input v-model="formItem.range" placeholder="请选择发布范围" icon="person" @on-focus="checkRange()"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="8">&nbsp;</i-Col>
              <i-Col span="8">
                <FormItem label="发布方式">
                  <CheckboxGroup v-model="formItem.type">
                    <Checkbox label="1">邮件</Checkbox>
                    <Checkbox label="2">消息</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </i-Col>
            </Row>
            </FormItem>


          </Form>
        <Modal
          v-model="showTitle"
          title="选择会议"
          class="title"
          @on-ok="ok"
          @on-cancel="cancel">
          <ul>
            <Form :label-width="80" label-position="left">
            <li>
              <row>
                <i-Col span="18" offset="3">
                  <FormItem label="选择会议">
                    <Input v-model="title" icon="ios-search">
                    </Input>
                  </FormItem>
                </i-Col>
              </row>
            </li>
              <RadioGroup v-model="meetTitle">
              <li v-for="(title,key) in meetList">
                <row>
                  <i-Col span="14" offset="10">
                    <FormItem>
                      <Radio :label="key"><span>{{title.title}}</span></Radio>
                    </FormItem>
                  </i-Col>
                </row>
              </li>
              </RadioGroup>
            </Form>
          </ul>
        </Modal>
      </Card>
    </div>
  </div>
</template>

<script>
  //  TODO 临时测试环境变量
  const TEST_CONFIG = 'http://118.31.18.67:8084'
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        formItem: {
          title: '',
          time: '',
          meetingPlace: '',
          users: '',
          moderator: '',
          recorder: '',
          content: '',
          conclusion: '',
          range: '',
          type: []
        },
        title: '',
        showTitle: false,
        meetTitle: 0,
        meetList: [],
        invitee: {          //  与会人员
          users: '',
          ids: ''
        },
        ranges: {           //   发布范围
          users: '',
          ids: ''
        }
      }
    },
    methods: {
//    获取会议主题
      getTitle () {
        this.$ajax.get(`${TEST_CONFIG}/queryMeeting`, {
          headers: {
            token: 'c955d939c180414fa2ffa24be4ebf921', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.meetList = response.data.data.data
            console.log(this.meetList)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击弹框确定按钮
      ok () {
        console.log(this.meetList[this.meetTitle].users)
        if (this.meetList[this.meetTitle].users !== []) {
          this.formItem = this.meetList[this.meetTitle]
          var len = this.meetList[this.meetTitle].users.length
          var users = ''
          var ids = ''
          for (var i = 0; i < len; i++) {
            users += ',' + this.meetList[this.meetTitle].users[i].name
            ids += ',' + this.meetList[this.meetTitle].users[i].uid
          }
          this.formItem.users = this.invitee.users = users.substring(1)
//          this.formItem.users = ''
//          this.formItem.users = '张三，张三，张三，张三，张三，张三，张三，张三，张三，张三，张三'
          this.invitee.ids = ids.substring(1)
          this.formItem.range = this.ranges.users = users.substring(1)
          this.ranges.ids = ids.substring(1)
        }
      },
//    点击弹框取消按钮
      cancel () {
      },
//    选择主题
      checkTitle (title, k) {
        console.log(title, k)
      },
      HandleModerator () {
        console.log(123)
      },
//    点击发布按钮
      query () {
        console.log(this.formItem)
      },
//    选择与会人
      checkUsers () {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
          console.log('请选择与会人')
        }
      },
//    选择主持人
      checkModerator () {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
          console.log('请选择主持人')
        }
      },
//    选择发布范围
      checkRange () {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
          console.log('请选择发布范围')
        }
      }
    },
    created () {
      this.getTitle()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 52px;
    line-height: 52px;
    text-align: right;
    background: #ffffff;
    padding: 0;
  }
  .header .ivu-btn {
    margin-right: 20px;
  }
  .work-report-daily h3{
    background-color: #F5F6F8 ;
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
  }
  .title .ivu-form-item {
    margin-bottom: 0;
  }
</style>
