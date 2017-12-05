<template>
  <div class="work-report-daily">
    <Card>
      <p slot="title">
        <span>发起列表</span>
        <span style="margin: 0 10px">|</span>
        <span>受邀列表</span>
      </p>
      <Table border :columns="tableHead" :data="tableDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
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
            title: '会议主题',
            key: 'title',
            align: 'center'
          },
          {
            title: '会议时间',
            key: 'date',
            align: 'center'
          },
          {
            title: '会议室名称',
            key: 'meetRoom',
            align: 'center'
          },
          {
            title: '与会人员',
            key: 'meetUser',
            align: 'center',
            ellipsis: true
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
                      this.show(params.index)
                    }
                  }
                }, '调期'),
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
                }, '取消')
              ])
            }
          }
        ],
        tableDate: [
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
          },
          {
            title: 'OA项目评审',
            date: '2017-12-04 星期一',
            meetRoom: '火星会议室',
            meetUser: '朱展宏，吴方华，束林那...'
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
</style>
