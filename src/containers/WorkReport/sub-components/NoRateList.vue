<template>
  <div class="work-report-no-rate">
    <Card>
      <div slot="title">
        <Form :label-width="80">
          <Row>
            <Col span="5">
            <FormItem label="类型">
              <Select v-model="defaultType">
                <Option v-for="item in selectType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="汇报日期">
              <Select v-model="defaultReport">
                <Option v-for="item in reportTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="5">
            <Input v-model="value" placeholder="搜索发起人" style="width: 80%;margin-left: 20px;margin-top:1px;" icon="ios-search-strong" @on-click="serachPerson"></Input>
            </Col>
            <Col span="9" align="right">
            <Button type="primary">批量提交</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Table ref="selection" :columns="columns" :data="listData"></Table>
    </Card>

  </div>
</template>

<script>
  export default {
    name: 'WorkReportNoRate',
    data () {
      return {
        selectType: [
          {
            value: '0',
            label: '日报'
          },
          {
            value: '1',
            label: '周报'
          },
          {
            value: '2',
            label: '全部'
          }
        ],
        defaultType: '0',
        reportTime: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '今天'
          },
          {
            value: '2',
            label: '近三天'
          },
          {
            value: '3',
            label: '近一周'
          },
          {
            value: '4',
            label: '近一个月'
          }
        ],
        defaultReport: '0',
        value: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '类型',
            key: 'type',
            align: 'center'
          },
          {
            title: '发起人',
            key: 'person',
            align: 'center'
          },
          {
            title: '汇报日期',
            key: 'reportTime',
            align: 'center',
            sortable: true
          },
          {
            title: '操作',
            key: 'operation',
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
                      console.log(params)
                    }
                  }
                }, '退回')
              ])
            }
          },
          {
            title: '评价',
            key: 'judgeof',
            align: 'center',
            render: (h, params) => {
              return h('Select', [
                h('Option', {
                  props: {
                    value: '优秀'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    change: () => {

                    }
                  }
                }),
                h('Option', {
                  props: {
                    value: '良好'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    change: () => {

                    }
                  }
                }),
                h('Option', {
                  props: {
                    value: '一般'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    change: () => {

                    }
                  }
                })
              ])
            }
          },
          {
            title: '打分',
            key: 'rate',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Input-number', {
                  props: {
                    size: 'small',
                    max: 100,
                    min: 0,
                    value: 0
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    change: () => {

                    }
                  }
                })
              ])
            }
          }
        ],
        listData: [
          {
            type: '日报',
            person: '丁通',
            reportTime: '2016-10-03'
          },
          {
            type: '日报',
            person: '丁通',
            reportTime: '2016-10-04'
          },
          {
            type: '日报',
            person: '丁通',
            reportTime: '2016-10-05'
          },
          {
            type: '日报',
            person: '丁通',
            reportTime: '2016-10-06'
          }
        ]
      }
    },
    methods: {
      serachPerson () {
      }
    },
    created () {
      console.log('##### WorkReportWeekly created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-no-rate {
    padding: 16px;
  }
</style>



