<template>
  <div>
    <p class="header">
      <Button>取消</Button>
      <Button type="primary" @click="query()">发布</Button>
    </p>
    <div class="work-report-daily">
      <h3 slot="title">会议纪要</h3>
      <Card class="contents" shadow>
          <Form  ref="formItem" :model="formItem"  :rules="ruleFormItem" :label-width="82" label-position="left">
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
                  <Input v-if="formItem.moderator !== ''" v-model="formItem.moderator" placeholder="主持人" disabled></Input>
                  <Input v-else v-model="formItem.moderator" placeholder="请选择主持人" @on-focus="checkModerator()"></Input>
                </FormItem>
              </i-Col>
              <i-Col span="8">&nbsp;</i-Col>
              <i-Col span="8">
                <FormItem label="记录人">
                  <Input v-if="formItem.recorder !== ''" v-model="formItem.recorder" placeholder="记录人" disabled></Input>
                  <Input v-else placeholder="记录人"></Input>
                </FormItem>
              </i-Col>
            </Row>

            <Row>
              <i-Col span="12">
                <FormItem label="主要议题" prop="content">
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
                  <Upload
                    :action="action"
                    :headers="headers"
                     multiple
                    ref="upload"
                    :max-size="1024"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess"
                    :on-remove="handleUploadRemove"
                  >
                    <Button type="primary">上传附件</Button>
                  </Upload>
                </FormItem>
              </i-Col>
              <i-Col span="16"></i-Col>
            </Row>

            <Row>
              <i-Col span="8">
                <FormItem label="发布范围" prop="range">
                  <Input v-model="formItem.range" placeholder="请选择发布范围" icon="person" @on-focus="doSelectMember(data1)"></Input>
                </FormItem>
                <member-selector
                  v-if="isShow"
                  :init-tree-data="initTreeData"
                  @getSelectedMembers="getSelectedMembers"
                  @removeMemberSelector="handleRemove('isShow')"/>
              </i-Col>
              <i-Col span="8">&nbsp;</i-Col>
              <i-Col span="8">
                <FormItem label="发布方式" prop="type">
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
          @on-cancel="cancel"
        >
          <ul>
            <Form :label-width="80" label-position="left">
            <li>
              <row>
                <i-Col span="18" offset="3">
                  <FormItem label="选择会议">
                    <Input v-model="title" icon="ios-search" @on-change="getTitle">
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
  import MemberSelector from '@/components/MemberSelector'
  export default {
    components: {
      MemberSelector
    },
    data () {
      return {
        isShow: false,
        headers: {
          token: this.$store.state.userInfo.username,
          uid: this.$store.state.userInfo.uid
        },
//        action: `http://10.255.232.234/oa-api/file`,
        action: `http://118.31.18.67:96/file`,
        initTreeData: [],
        uploadList: [],
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
        accessoryUrl: '',
        title: '',
        showTitle: false,
        meetTitle: 0,
        meetList: [],
        invitee: [],          //  与会人员
        ranges: [],           //  发布范围
        treeData: [
          {
            id: '1',
            title: '善林（上海）金融信息服务有限公司',
            loading: false,
            children: []
          }
        ],
        ruleFormItem: {
          range: [
            { required: true, message: '请选择发布范围', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '主要议题不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, type: 'array', min: 1, message: '请至少选择一种发布方式', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
//    获取会议主题
      getTitle () {
        this.$ajax.get(`/queryMeeting`, {
          params: {
            title: this.title
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.meetList = response.data.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击弹框确定按钮
      ok () {
        this.formItem.title = this.meetList[this.meetTitle].title
        this.formItem.id = this.meetList[this.meetTitle].id
        this.formItem.time = this.meetList[this.meetTitle].time
        this.formItem.meetingPlace = this.meetList[this.meetTitle].meetingPlace
        this.formItem.moderator = this.meetList[this.meetTitle].moderator
        this.formItem.recorder = this.meetList[this.meetTitle].recorder
        this.formItem.content = this.meetList[this.meetTitle].content
        this.formItem.conclusion = this.meetList[this.meetTitle].conclusion
        if (this.meetList[this.meetTitle].users !== []) {
          let len = this.meetList[this.meetTitle].users.length
          let users = []
          let ids = []
          for (let i = 0; i < len; i++) {
            users.push(this.meetList[this.meetTitle].users[i].name)
            ids.push(this.meetList[this.meetTitle].users[i].uid)
          }
          users = users.join('、')
          ids = ids.join(',')
          this.formItem.users = users
          this.invitee.ids = ids
          this.formItem.range = this.ranges.users = users
          this.ranges.ids = ids
          this.$refs.formItem.validateField('content')
          this.$refs.formItem.validateField('range')
        }
      },
//    上传成功的方法
      handleSuccess (res, file) {
//        this.$Message.info('上传成功')
      },
      handleUploadRemove () {
        const fileList = this.$refs.upload.fileList
        this.uploadList = fileList
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 3
        if (!check) {
          this.$Message.warning('最多上传3个文件.')
        }
        return check
      },
//    点击弹框取消按钮
      cancel () {
      },
//    点击发布按钮
      query () {
//        return false
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            let len = this.uploadList.length
            let accessoryUrl = []
            if (len !== 0) {
              for (let i = 0; i < len; i++) {
                accessoryUrl.push(this.uploadList[i].response.data)
              }
              this.accessoryUrl = accessoryUrl.join(',')
            } else {
              this.accessoryUrl = ''
            }
            let type = this.formItem.type.join(',')
//            /********组装数据**********/
            let approveRequest = {
              meetingId: this.formItem.id,               // 会议id
              time: this.formItem.time,                    // 会议时间
              meetingPlace: this.formItem.meetingPlace,            // 会议地点
              title: this.formItem.title,                   // 会议主题
              recorder: this.formItem.recorder,                // 记录人
              content: this.formItem.content,                 // 主要议题
              conclusion: this.formItem.conclusion,              // 会议结论
              accessoryUrl: this.accessoryUrl,            // 相关附件
              sendRange: this.ranges.ids,               // 发布范围
              sendType: type                 // 发布方式
            }
//            /********调发布接口**********/
            this.$ajax.post(`/sendMeetingSummary`, approveRequest, {
            }).then((response) => {
              if (response.data.code === '000000') {
                this.$Message.success('收回成功')
                this.$router.push({path: this.type})
              } else {
                this.$Message.success(response.data.message)
              }
            }).catch(function (err) {
              console.log(err)
            })
            this.$Message.success('Success!')
          } else {
          }
        })
      },
//    选择与会人
      checkUsers () {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
          this.$store.dispatch('changeMemberSelector', true)
        }
      },
//    选择主持人
      checkModerator () {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
        }
      },
//    选择发布范围
      doSelectMember (data) {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
          this.initTreeData = data
          this.isShow = true
        }
      },
//    处理选中的人员
      getSelectedMembers (data) {
        this.formItem.range = this.formItem.users
        this.ranges.ids = this.invitee.ids
        let len = data.length
        let ids = []
        let users = []
        for (let i = 0; i < len; i++) {
          ids.push(data[i].uid)
          users.push(data[i].username)
        }
        ids = ids.join(',')
        users = users.join('、')
        this.formItem.range += '、' + users
        this.ranges.ids += ',' + ids
      },
      handleRemove (name) {
        this[name] = false
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    },
    created () {
      this.getTitle()
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
//      this.$store.dispatch('querySidebarList', 'home')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 48px;
    line-height: 48px;
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
