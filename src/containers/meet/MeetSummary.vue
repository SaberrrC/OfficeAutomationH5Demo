<template>
  <div>
    <p class="header">
      <Button>取消</Button>
      <Button type="primary" @click = query()>发布</Button>
    </p>
    <div class="work-report-daily">
      <h3 slot="title">会议纪要</h3>
      <Card class="contents" shadow>
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
                  <Upload
                    :action="action"
                    :headers="headers"
                     multiple
                    :max-size="1024"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess"
                  >
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
                <keep-alive>
                  <member-selector
                    v-if="memberSelectorIsShow"
                    :init-tree-data="initTreeData"
                    @getSelectedMembers="getSelectedMembers"/>
                </keep-alive>
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
  import MemberTree from '@/components/MemberTree'
  import MemberSelector from '@/components/MemberSelector'
  export default {
    components: {
      MemberTree,
      MemberSelector
    },
    data () {
      return {
        action: `http://10.255.232.234/oa-api/file`,
        headers: {
          token: 'f19dc8a190f445a2a4cee5b5c3c872c0',
          uid: '84'
        },
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
        title: '',
        showTitle: false,
        meetTitle: 0,
        meetList: [],
        invitee: [],          //  与会人员
        ranges: [],           //  发布范围
        initTreeData: [
          {
            id: '1',
            title: '善林金融',
            loading: false,
            children: []
          }
        ],
        treeData: [
          {
            id: '1',
            title: '善林（上海）金融信息服务有限公司',
            loading: false,
            children: []
          }
        ]
      }
    },
    methods: {
//    获取会议主题
      getTitle () {
        this.$ajax.get(`/queryMeeting`, {
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
        this.formItem = this.meetList[this.meetTitle]
        if (this.meetList[this.meetTitle].users !== []) {
          var len = this.meetList[this.meetTitle].users.length
          var users = []
          var ids = []
          for (var i = 0; i < len; i++) {
            users.push(this.meetList[this.meetTitle].users[i].name)
            ids.push(this.meetList[this.meetTitle].users[i].uid)
          }
          users = users.join(",")
          ids = ids.join(",")
          this.formItem.users = users
          this.invitee.ids = ids
          this.formItem.range = this.ranges.users = users
          this.ranges.ids = ids
        }
      },
//    上传成功的方法
      handleSuccess (res, file, fileList) {
        if (res.code === '000000') {
          console.log(res)
          console.log(file)
          console.log(fileList)
          this.uploadList = fileList
          this.$Message.info('success')
        }
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
        console.log(this.formItem)
        /********组装数据**********/
        var approveRequest = {
          meetingId: '',               // 会议id
          time: '',                    // 会议时间
          meetingPlace: '',            // 会议地点
          title: '',                   // 会议主题
          recorder: '',                // 记录人
          content: '',                 // 主要议题
          conclusion: '',              // 会议结论
          accessoryUrl: '',            // 相关附件
          sendRange: '',               // 发布范围
          sendType: ''                 // 发布方式
        }
        /********调发布接口**********/
        this.$ajax.post(`/sendMeetingSummary`, approveRequest, {
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.$Message.success('收回成功')
            this.$router.push({path: this.type})
          } else {
            this.$Message.success(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
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
          console.log('请选择主持人')
        }
      },
//    选择发布范围
      checkRange () {
        if (this.formItem.title === '') {
          this.$Message.info('请先选择会议主题')
        } else {
          this.$store.dispatch('changeMemberSelector', true)
          console.log('请选择发布范围')
        }
      },
      getSelectedMembers (data) {
        //  TODO 在这里处理选中的数组
        console.log(data)
        var len = data.length
        var ids = []
        var users = []
        for (var i = 0; i < len; i++) {
          ids.push(data[i].uid)
          users.push(data[i].username)
        }
        ids = ids.join(",")
        users = users.join(",")
//        this.meetInline.user = users
//        this.part_uid = ids
//        this.$refs.meetInline.validateField('user')
        console.log(ids)
        console.log(users)
      }
    },
    computed: {
      //  TODO 从 state 获取是否显示状态并利用计算属性触发更新
      memberSelectorIsShow () {
        return this.$store.state.showMemberSelector
      }
    },
    created () {
      this.getTitle()
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
