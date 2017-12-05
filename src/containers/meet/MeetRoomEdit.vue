<template>
  <div class="work-report-daily">
    <Card>
      <p slot="title">
        <span>
          <h3 style="display: inline-block">会议室设置</h3>
          <Button slot="extra" type="primary" style="float: right;margin-right: 12%">新建</Button>
        </span>

      </p>

      <Table  :columns="tableHead" :data="tableDate"></Table>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        tableHead: [
          {
            title: '序号',
            key: 'index',
            align: 'center'
          },
          {
            title: '会议室名称',
            key: 'meetRoom',
            align: 'center'
          },
          {
            title: '会议室地点',
            key: 'meetAddress',
            align: 'center'
          },
          {
            title: '会议室设备',
            key: 'meetDevice',
            align: 'center'
          },
          {
            title: '会议室容量',
            key: 'meetNop',
            align: 'center'
          },
          {
            title: '会议室图片',
            key: 'meetRoomImage',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#2b85e4',
                    ellipsis: true
                  },
                  on: {
                    click: () => {
                      console.log(params.row.meetRoomImage)
                    }
                  }
                }, params.row.meetRoomImage)
              ])
            }
          },
          {
            title: '使用状态',
            key: 'isUse',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Switch', {
                  props: {
                    size: 'large'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '使用'),
                h('Switch', {
                  props: {
                    size: 'large'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '停用')
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
//                      this.show(params.index)
                      console.log(params.row)
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
        tableDate: [
          {
            index: '1',
            meetRoom: '火星会议室',
            title: 'OA项目评审',
            meetAddress: '星创5层',
            meetDevice: '投影仪',
            meetNop: '20人',
            meetRoomImage: 'http://img07.tooopen.com/images/20170922/tooopen_sy_225230576346.jpg',
            isUse: '1'
          }
        ]
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1)
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
  .work-report-daily p{
    height: 32px;
  }
</style>
