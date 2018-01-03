<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col :lg="{span:3}" :xs="{span:6}">
          <a href="javascript:void (0)"><h3>会议室设置</h3></a>
        </i-Col>
        <i-Col :lg="{span:3,offset:18}" :xs="{span:3,offset:15}">
          <Button type="primary" @click="establish()">新建</Button>
        </i-Col>
      </Row>
    </span>
    </p>
    <Modal
      v-model="modal1"
      :title="modalTitle"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      :ok-text="okText"
      :closable="false"
      class-name="vertical-center-modal"
      class="modal"
    >
      <Form ref="formItem" :model="formItem" :rules="ruleFormItem" :label-width="82">
      <Row>
        <i-Col span="12">
            <FormItem label="会议室名称" prop="roomname">
              <Input v-model="formItem.roomname" placeholder="请输入会议室名称"></Input>
            </FormItem>
        </i-Col>
        <i-Col span="12">
            <FormItem label="会议室地点"  prop="address">
              <Input v-model="formItem.address" placeholder="请输入会议室地点"></Input>
            </FormItem>
        </i-Col>
      </Row>
        <Row>
          <i-Col span="12">
            <FormItem label="会议室设备"  prop="device">
              <Input v-model="formItem.device" placeholder="请输入会议室设备"></Input>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="会议室容量" prop="nop">
              <!--<Input v-model="formItem.nop" placeholder="请输入会议室容量(纯数字)"></Input>-->
              <Select v-model="formItem.nop" placeholder="请选择会议室容量">
                <Option v-for="i in [10,20,30,40]" :value="i" :key="i">{{ i }}  人</Option>
              </Select>
            </FormItem>
          </i-Col>
        </Row>
        <Row>
          <i-Col span="12">
            <FormItem label="会议室图片" prop="roomimg">
              <div>
                <img v-if="formItem.roomimg !== ''" :src="roomimg" alt="会议室图片" style="width: 100px;height: 100px">
                <img v-else style="width: 100px;height: 100px">
              </div>
              <div style="width:100px;text-align: center">
                <Upload
                  :action="action"
                  :headers="headers"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                >
                  <Button type="primary">点击选择图片</Button>
                </Upload>
              </div>

            </FormItem>
          </i-Col>
        </Row>

      </Form>
    </Modal>
  <div class="work-report-daily">
    <Card :dis-hover="true">
      <Table  :columns="tableHead" :data="roomList"></Table>
    </Card>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'MeetRoomEdit',
    data () {
      return {
        loading: true,
        modalTitle: '',
        okText: '',
//        action: `http://10.255.232.234/oa-api/file`,
        action: this.$ajax.defaults.baseURL + `/file`,
        headers: {token: this.$store.state.userInfo.token, uid: this.$store.state.userInfo.uid},
        roomimg: '',
        modal1: false,
        formItem: {
          roomname: '',
          address: '',
          device: '',
          nop: '',
          roomimg: ''
        },
        tableHead: [
          {
            title: '序号',
            key: 'index',
            align: 'center'
          },
          {
            title: '会议室名称',
            key: 'roomname',
            align: 'center'
          },
          {
            title: '会议室地点',
            key: 'address',
            align: 'center'
          },
          {
            title: '会议室设备',
            key: 'device',
            align: 'center'
          },
          {
            title: '会议室容量',
            key: 'nop',
            align: 'center'
          },
          {
            title: '会议室图片',
            key: 'roomimg',
            align: 'center',
            ellipsis: true
          },
          {
            title: '使用状态',
            key: 'isuse',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-Switch', {
                  props: {
//                    size: 'large',       //  尺寸
                    value: params.row.isuse,              //  默认状态
                    'true-value': 1,       //  选中时的值
                    'false-value': 0       //  没有选中时的值
                  },
                  on: {
                    'on-change': () => {      //  事件
                      this.handleSwitch(params.index)
                    }
                  }
                })
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleUpdate(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        roomList: [],
        ruleFormItem: {
          roomname: [
            { required: true, message: '请输入会议室名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入会议室地点', trigger: 'blur' }
          ],
//          device: [
//            { required: true, message: '请输入会议室设备', trigger: 'blur' }
//          ],
          nop: [
            { required: true, type: 'number', message: '请选择会议室容量', trigger: 'change' }
          ],
          roomimg: [
            { required: true, message: '请上传会议室图片', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //      获取会议室列表
      getMeetRoom () {
        this.$ajax.get(`/newMeetingRooms`, {
        }).then((response) => {
          if (response.data.code === '000000') {
            let len = response.data.data.length
            let room = []
            for (let i = 0; i < len; i++) {
              response.data.data[i].index = i + 1
              response.data.data[i].roomimg = response.data.data[i].roomimg
              response.data.data[i].nop = response.data.data[i].nop + '人'
              room.push(response.data.data[i])
            }
            this.roomList = room
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击新建按钮
      establish () {
        this.modal1 = true
        this.modalTitle = '新建会议室'
        this.okText = '确定'
        this.formItem.roomname = ''
        this.formItem.address = ''
        this.formItem.device = ''
        this.formItem.nop = ''
        this.formItem.isuse = 1
        this.formItem.roomimg = ''
        this.roomimg = ''
        this.$refs.formItem.resetFields()
      },
//    点击弹层确定/修改
      ok () {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            if (this.okText === '确定') {
//        调新建会议室接口
              this.$ajax.post(`/newMeetingRooms`, this.formItem, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((response) => {
                if (response.data.code === '000000') {
                  this.getMeetRoom()
                  this.$Message.success('会议室创建成功')
                  this.$Modal.remove()
                }
              }).catch(function (err) {
                console.log(err)
              })
            } else if (this.okText === '修改') {
//        调修改会议室接口
              this.$refs.formItem.validate((valid) => {
                if (valid) {
                  this.$ajax.post(`/newMeetingRooms/update`, this.formItem, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  }).then((response) => {
                    if (response.data.code === '000000') {
                      this.getMeetRoom()
                      this.$Message.success('会议室修改成功')
                      this.$Modal.remove()
                    } else {
                      this.$Message.error(response.data.message)
                      this.getMeetRoom()
                    }
                  }).catch(function (err) {
                    console.log(err)
                  })
                } else {
                }
              })
            }
          } else {
          }
        })
      },
//    点击弹层取消
      cancel () {
      },
//    上传成功的方法
      handleSuccess (res, file) {
        if (res.code === '000000') {
          this.formItem.roomimg = res.data
          this.roomimg = this.$ajax.defaults.baseURL + res.data
          this.$Message.info('success')
        }
      },
//    开关状态改变
      handleSwitch (index) {
        if (this.roomList[index].isuse === 1) {
          this.roomList[index].isuse = 0
        } else if (this.roomList[index].isuse === 0) {
          this.roomList[index].isuse = 1
        }
        this.roomList[index].nop = parseInt(this.roomList[index].nop)
//      调修改会议室状态接口
        this.$ajax.post(`/newMeetingRooms/update`, this.roomList[index], {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.getMeetRoom()
            this.$Message.success('会议室状态修改成功')
          } else {
            this.getMeetRoom()
            this.$Message.error(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击修改
      handleUpdate (row) {
        this.modal1 = true
        this.modalTitle = '修改会议室'
        this.okText = '修改'
        this.formItem.room_id = row.room_id
        this.formItem.roomname = row.roomname
        this.formItem.address = row.address
        this.formItem.device = row.device
        this.formItem.nop = row.nop
        this.formItem.nop = parseInt(row.nop)
        this.formItem.roomimg = row.roomimg
        this.roomimg = this.$ajax.defaults.baseURL + this.formItem.roomimg
        this.$refs.formItem.validate('roomname')
        this.$refs.formItem.validate('address')
        this.$refs.formItem.validate('device')
        this.$refs.formItem.validate('roomimg')
        this.$refs.formItem.validate('nop')
      },
//     删除会议室
      remove (index) {
        const title = '确认'
        const content = '<p>确认是否删除该会议室？</p>'
        this.$Modal.confirm({
          title: title,
          content: content,
          loading: true,
          onOk: () => {
            //      调删除会议室接口
            this.$ajax.delete(`/newMeetingRooms`, {
              params: {
                room_id: this.roomList[index].room_id
              }
            }).then((response) => {
              if (response.data.code === '000000') {
                this.roomList.splice(index, 1)
                this.$Message.success('删除会议室成功')
                this.$Modal.remove()
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        })
      }
    },
    created () {
      this.getMeetRoom()
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
    padding-left: 20px;
    background: #ffffff;
  }
  .header .ivu-btn {
    margin-right: 20px;
  }
  .ivu-modal-content {
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
    top: 60%;
    left: 50%;
  }
</style>
