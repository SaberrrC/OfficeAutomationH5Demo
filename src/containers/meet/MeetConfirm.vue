<template>
  <div class="work-report-daily">
    <Card>
      <!--会议室预定-->
      <Row>
        <i-Col span="8">
        <h4 class="title">
        会议室预定
        </h4>
        <Card>
          <ul>
            <li v-for="item in meetRoomInfo" class="text">
              {{item.name}}
            </li>
          </ul>
        </Card>
        </i-Col>
        </Row>
      <!--会议邀请-->
      <Row>
        <i-Col span="18">
        <h4 class="title">
        会议邀请
        </h4>
        <Card>
          <row>
            <i-Col span="12">
              <template>
                <div style="margin-bottom: 24px">
                  <Checkbox v-model="checked" @on-change="isInvite()">是否发起会议邀请</Checkbox>
                </div>
              </template>
            </i-Col>
          </row>
          <Form ref="meetInline" :model="meetInline"  :rules="ruleMeetInline" :label-width="80" label-position="left">
            <!--会议主题/邀请方式-->
            <row>
              <i-Col span="12">
                <FormItem prop="title" label="会议主题">
                  <Input v-model="meetInline.title" placeholder="请输入会议主题" :disabled="disabled"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="9" offset="3">
                <FormItem prop="checkbox" label="邀请方式">
                  <CheckboxGroup v-model="meetInline.checkbox">
                    <Checkbox label="1" :disabled="disabled">消息</Checkbox>
                    <Checkbox label="2" :disabled="disabled">邮件</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </i-Col>
            </row>
            <!--与会人员-->
            <row>
              <i-Col span="12">
                <FormItem prop="user" label="与会人员">
                  <Input v-model="meetInline.user" placeholder="请选择与会人员" icon="person" :disabled="disabled"></Input>
                </FormItem>
              </i-Col>
            </row>
            <!--会议内容-->
            <row>
              <i-Col span="12">
                <FormItem prop="content" label="会议内容">
                  <Input type="textarea" v-model="meetInline.content" placeholder="请输入会议内容,不大于200字" icon="ios-search" :disabled="disabled"></Input>
                </FormItem>
              </i-Col>
            </row>
          </Form>
        </Card>
        </i-Col>
      </Row>
        <div style="margin: 20px">
          <Button type="primary" @click="fallBack()">返回</Button>
          <Button type="success" style="margin-left: 20px" @click="nextStep()">确定</Button>
        </div>
    </Card>
  </div>
</template>

<script>
  import qs from "qs"
  export default {
//    name: 'WorkReportDaily',
    data () {
      return {
        checked: false,
        disabled: true,
        room_id: this.$route.query.roomId,
        meetRoomInfo: [
          { name: '资源名称：' + this.$route.query.roomName },
          { name: '资源规格：' + this.$route.query.nop + '人' },
          { name: '使用时间：' + this.$route.query.start_time + ' -- ' + this.$route.query.end_time},
          { name: '设备条件：' + this.$route.query.device },
          { name: '预 定 人： ' + '朱展宏' }
        ],
        meetInline: {
          title: '',
          checkbox: [],
          user: [],
          content: ''
        },
        ruleMeetInline: {
          title: [
            { required: true, message: '请输入会议主题', trigger: 'blur' },
            { max: 10, message: '长度不能大于 10个字', trigger: 'blur' }
          ],
          checkbox: [
            { required: true, type: 'array', min: 1, message: '请至少选择一种邀请方式', trigger: 'change' }
          ],
          user: [
            { required: true, type: 'array', min: 1, message: '请选择邀请人', trigger: 'blur' }
          ],
          content: [
            { required: false, message: '请填写活动形式', trigger: 'blur' },
            { type: 'string', max: 200, message: '长度不能大于 200个字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
//    获取参会人员信息
      getUsers () {},
//    是否发起会议邀请
      isInvite () {
        if (this.checked === true) {
          this.disabled = false
        } else if (this.checked === false) {
          this.disabled = true
          this.$refs.meetInline.resetFields()
        }
      },
//    点击返回按钮
      fallBack () {
        this.$router.push({ path: 'time', query: {roomId: this.room_id} })
      },
//    点击确定按钮
      nextStep () {
        if (this.checked === true) {
          this.$refs.meetInline.validate((valid) => {
            if (valid) {         //   通过验证   调添加会议接口  TODO
              this.meetSave()
            } else {
              console.log('error')
            }
          })
        } else {
          console.log('不邀请')           //  不发起邀请  调添加会议接口  TODO
          this.meetSave()
        }
      },
//    保存会议
      meetSave () {
        var data = {}  // TODO 组装数据
        this.$ajax.post(`$/newMeetings/save`, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.getMeetRoom()
            this.$Message.success('会议室创建成功')
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    created () {
      this.getUsers()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }

  .title {
    margin: 16px 0;
  }
  .text {
    padding: 4px 0;
  }
</style>
