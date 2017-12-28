<template>
  <div class="work-report-my-apply">
    <Card>
      <div slot="title">
        <Form :label-width="80">
          <Row>
            <Col span="6">
              <FormItem label="类型">
                <Select v-model="defaultType">
                  <Option v-for="item in selectType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="汇报日期">
                <Select v-model="defaultReport">
                  <Option v-for="item in reportTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="提交日期">
                <Select v-model="defaultSubmit">
                  <Option v-for="item in submitTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
            </Col>
          </Row>
        </Form>
      </div>

      <Table :columns="columns" :data="data5"></Table>
    </Card>

  </div>
</template>

<script>
  export default {
    name: 'WorkReportMyApply',
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
        submitTime: [
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
        defaultSubmit: '0',
        columns: [
          {
            title: '类型',
            key: 'type',
            align: 'center'
          },
          {
            title: '汇报日期',
            key: 'reportTime',
            sortable: true,
            align: 'center'
          },
          {
            title: '提交日期',
            key: 'submitTime',
            sortable: true,
            align: 'center'
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
                }, '编辑')
              ])
            }
          }
        ],
        data5: [
          {
            type: '日报',
            reportTime: '2017-10-09',
            submitTime: '2017-10-09'
          },
          {
            type: '日报',
            reportTime: '2017-10-10',
            submitTime: '2017-10-10'
          },
          {
            type: '日报',
            reportTime: '2017-10-11',
            submitTime: '2017-10-11'
          },
          {
            type: '日报',
            reportTime: '2017-10-12',
            submitTime: '2017-10-12'
          }
        ]
      }
    },
    created () {
      console.log('##### WorkReportWeekly created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-my-apply {
    padding: 16px;
  }
</style>



