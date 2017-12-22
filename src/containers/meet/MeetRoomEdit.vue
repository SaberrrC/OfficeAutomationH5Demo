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
      @on-ok="ok"
      @on-cancel="cancel"
      :ok-text="okText"
    >
      <Form :model="formItem" :label-width="80">
      <Row>
        <i-Col span="12">
            <FormItem label="会议室名称">
              <Input v-model="formItem.roomname" placeholder="请输入会议室名称"></Input>
            </FormItem>
        </i-Col>
        <i-Col span="12">
            <FormItem label="会议室地点">
              <Input v-model="formItem.address" placeholder="请输入会议室地点"></Input>
            </FormItem>
        </i-Col>
      </Row>
        <Row>
          <i-Col span="12">
            <FormItem label="会议室设备">
              <Input v-model="formItem.device" placeholder="请输入会议室设备"></Input>
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="会议室容量">
              <Input v-model="formItem.nop" placeholder="请输入会议室容量(纯数字)"></Input>
            </FormItem>
          </i-Col>
        </Row>
        <Row>
          <i-Col span="12">
            <FormItem label="会议室图片">
              <div>
                <img v-if="roomimg !== ''" :src="roomimg" alt="会议室图片" style="width: 100px;height: 100px">
                <img v-else style="width: 100px;height: 100px">
              </div>
              <div style="width:100px;text-align: center">
                <Upload
                  :action="action"
                  :headers="headers"
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
    <Card>
      <Table  :columns="tableHead" :data="roomList" :loading="loading"></Table>
    </Card>
  </div>
  </div>
</template>

<script>
  import qs from "qs"
  //  TODO 临时测试环境变量
  const TEST_CONFIG = 'http://118.31.18.67:8084'
  export default {
    name: 'MeetRoomEdit',
    data () {
      return {
        modalTitle: '',
        loading: true,
        okText: '',
        action: `${TEST_CONFIG}` + `/newMeetingRooms/upload`,
        headers: {
          token: 'f19dc8a190f445a2a4cee5b5c3c872c0',
          uid: '84'
        },
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
//                  style: {
//                    marginRight: '5px'
//                  },
                  on: {
                    'on-change': () => {      //  事件
                      this.handleSwitch(params.index)
//                      console.log()
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
                      this.handleUpdate(params.index)
//                      console.log(params.row)
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
        roomList: []
      }
    },
    methods: {
      //      获取会议室列表
      getMeetRoom () {
        this.$ajax.get(`${TEST_CONFIG}/newMeetingRooms`, {
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.loading = false
            console.log(response.data)
            var len = response.data.data.length
            var room = []
            for (var i = 0; i < len; i++) {
              response.data.data[i].index = i + 1
              response.data.data[i].roomimg = response.data.data[i].roomimg
              response.data.data[i].nop = response.data.data[i].nop + '人'
              room.push(response.data.data[i])
            }
            this.roomList = room
            console.log(room)
            console.log(this.roomList)
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
        this.roomimg = ''
      },
//    点击弹层确定/修改
      ok () {
        if (this.okText === '确定') {
          console.log(this.formItem)
//        调新建会议室接口
          this.$ajax.post(`${TEST_CONFIG}/newMeetingRooms`, qs.stringify(this.formItem), {
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
        } else if (this.okText === '修改') {
//        调修改会议室接口
          this.$ajax.post(`${TEST_CONFIG}/newMeetingRooms/update`, qs.stringify(this.formItem), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
              uid: '84' //  TODO 临时测试
            }
          }).then((response) => {
            console.log(response)
            if (response.data.code === '000000') {
              this.getMeetRoom()
              this.$Message.success('会议室修改成功')
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
//    点击弹层取消
      cancel () {
      },
//    上传成功的方法
      handleSuccess (res, file) {
        if (res.code === '000000') {
          this.formItem.roomimg = res.data
          this.roomimg = 'http://118.31.18.67:96' + res.data
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
        this.$ajax.post(`${TEST_CONFIG}/newMeetingRooms/update`, qs.stringify(this.roomList[index]), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          console.log(response)
          if (response.data.code === '000000') {
            this.getMeetRoom()
            this.$Message.success('会议室状态修改成功')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击修改
      handleUpdate (index) {
        this.modal1 = true
        this.modalTitle = '修改会议室'
        this.okText = '修改'
        this.formItem.room_id = this.roomList[index].room_id
        this.formItem.roomname = this.roomList[index].roomname
        this.formItem.address = this.roomList[index].address
        this.formItem.device = this.roomList[index].device
        this.formItem.nop = parseInt(this.roomList[index].nop)
        this.roomimg = 'http://118.31.18.67:96' + this.roomList[index].roomimg
      },
//     删除会议室
      remove (index) {
        const title = '确认'
        const content = '<p>确认是否删除该会议室？</p>'
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: (() => {
            //      调删除会议室接口
            this.$ajax.delete(`${TEST_CONFIG}/newMeetingRooms`, {
              params: {
                room_id: this.roomList[index].room_id //  TODO 临时测试
              },
              headers: {
                token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
                uid: '84' //  TODO 临时测试
              }
            }).then((response) => {
              if (response.data.code === '000000') {
                this.roomList.splice(index, 1)
                this.$Message.success('删除会议室成功')
              }
            }).catch(function (err) {
              console.log(err)
            })
          })
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
</style>
