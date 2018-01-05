<template>
  <div class='work-report-daily'>
    <Card :dis-hover='true'>
      <!--会议室预定-->
      <Row>
        <i-Col span='8'>
        <h4 class='title'>
        会议室预定
        </h4>
        <Card :dis-hover='true'>
          <ul>
            <li v-for='item in meetRoomInfo' class='text'>
              {{item.name}}
            </li>
          </ul>
        </Card>
        </i-Col>
        </Row>
      <!--会议邀请-->
      <Row>
        <i-Col span='18'>
        <h4 class='title'>
        会议邀请
        </h4>
        <Card :dis-hover='true'>
          <row>
            <i-Col span='12'>
              <template>
                <div style='margin-bottom: 24px'>
                  <Checkbox v-model='checked' @on-change='isInvite()'>是否发起会议邀请</Checkbox>
                </div>
              </template>
            </i-Col>
          </row>
          <Form ref='meetInline' :model='meetInline'  :rules='ruleMeetInline' :label-width='80' label-position='left'>
            <!--会议主题/邀请方式-->
            <row>
              <i-Col span='12'>
                <FormItem prop='title' label='会议主题'>
                  <Input v-model='meetInline.title' placeholder='请输入会议主题' :disabled='disabled'></Input>
                </FormItem>
              </i-Col>
              <i-Col span='9' offset='3'>
                <FormItem prop='checkbox' label='邀请方式'>
                  <CheckboxGroup v-model='meetInline.checkbox'>
                    <Checkbox label='1' :disabled='disabled'>邮件</Checkbox>
                    <Checkbox label='2' :disabled='disabled'>消息</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </i-Col>
            </row>
            <!--与会人员-->
            <row>
              <i-Col span='12'>
                <FormItem prop='user' label='与会人员'>
                  <Input v-model='meetInline.user' placeholder='请选择与会人员' icon='person' :disabled='disabled' @on-focus='doSelectMember(data1)' :readonly="true"></Input>
                </FormItem>
                <member-selector
                  v-if='isShow'
                  :init-tree-data='initTreeData'
                  @getSelectedMembers='getSelectedMembers'
                  @removeMemberSelector='handleRemove("isShow")'/>
              </i-Col>
            </row>
            <!--会议内容-->
            <row>
              <i-Col span='12'>
                <FormItem prop='content' label='会议内容'>
                  <Input type='textarea' v-model='meetInline.content' placeholder='请输入会议内容,不大于200字' icon='ios-search' :disabled='disabled'></Input>
                </FormItem>
              </i-Col>
            </row>
          </Form>
        </Card>
        </i-Col>
      </Row>
        <div style='margin: 20px'>
          <Button type='primary' @click='fallBack()'>返回</Button>
          <Button type='success' style='margin-left: 20px' @click='nextStep()'>确定</Button>
        </div>
    </Card>
  </div>
</template>

<script>
  import qs from 'qs'
  import MemberSelector from '@/components/MemberSelector'
  export default {
    components: {
      MemberSelector
    },
    data () {
      return {
        isShow: false,
//   这里是选择人员的初始化数组，不要和下面的混淆，一般根据业务场景异步取得
        initTreeData: [],
        checked: false,
        disabled: true,
        room_id: this.$route.query.roomId,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
        meetRoomInfo: [
          { name: '资源名称：' + this.$route.query.roomName },
          { name: '资源规格：' + this.$route.query.nop + '人' },
          {name: '使用时间：' + this.$route.query.start_time + ' -- ' + this.$route.query.end_time},
          { name: '设备条件：' + this.$route.query.device },
          { name: '预 定 人： ' + this.$store.state.userInfo.username }
        ],
        meetInline: {
          title: '',
          checkbox: [],
          user: '',
          content: ''
        },
        part_uid: '',
        ruleMeetInline: {
          title: [
            { required: true, message: '请输入会议主题', trigger: 'blur' },
            { max: 10, message: '长度不能大于 10个字', trigger: 'blur' }
          ],
          checkbox: [
            { required: true, type: 'array', min: 1, message: '请至少选择一种邀请方式', trigger: 'change' }
          ],
          user: [
            { required: true, type: 'string', min: 1, message: '请选择与会人员', trigger: 'blur' }
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
            if (valid) {
              this.meetSave()
            } else {
            }
          })
        } else {
          this.meetSave()
        }
      },
//    保存会议
      meetSave () {
        let data = {
          room_id: this.room_id,
          uid: this.$store.state.userInfo.uid,
          title: this.meetInline.title,
          part_uid: this.part_uid,
          content: this.meetInline.content,
          start_time: this.start_time,
          end_time: this.end_time,
          send_type: this.meetInline.checkbox.join(',')
        }
        this.$ajax.post(`/newMeetings/save`, qs.stringify(data), {
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.$Message.success('会议创建成功')
            this.$router.push({path: 'myMeeting'})
          } else {
            this.$Message.success(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      getSelectedMembers (data) {
        this.meetInline.user = ''
        this.part_uid = ''
        let len = data.length
        let ids = []
        let users = []
        for (let i = 0; i < len; i++) {
          ids.push(data[i].uid)
          users.push(data[i].username)
        }
        ids = ids.join(',')
        users = users.join('、')
        this.meetInline.user = users
        this.part_uid = ids
        this.$refs.meetInline.validateField('user')
      },
      doSelectMember (data) {
        this.initTreeData = data
        this.isShow = true
      },
      handleRemove (name) {
        this[name] = false
      }
    },
    created () {
      this.getUsers()
      this.data1 = [{
        id: '1',
        title: '善林金融',
        loading: false,
        children: []
      }]
      this.data2 = [{
        id: '1',
        title: '善林金融2',
        loading: false,
        children: []
      }]
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
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
