<template>
  <div class="work-report-history">
    <Row>
      <Col></Col>
    </Row>
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
              <FormItem label="审批日期">
                <Select v-model="defaultSubmit">
                  <Option v-for="item in submitTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5">
              <Input v-model="value" placeholder="搜索发起人" style="width: 80%;margin-left: 20px;margin-top:1px;" icon="ios-search-strong" @on-click="serachPerson"></Input>
            </Col>
            <Col span="4" align="right">

            </Col>
          </Row>

        </Form>
      </div>
      <Table :columns="columns" :data="listData"></Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Setting',
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
      value: '',
      columns: [
        {
          title: '类型',
          align: 'center',
          key: 'type'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '汇报日期',
          align: 'center',
          key: 'reportTime',
          sortable: true
        },
        {
          title: '审批日期',
          align: 'center',
          key: 'submitTime',
          sortable: true
        },
        {
          title: '状态',
          align: 'center',
          key: 'status'
        },
        {
          title: '评价',
          align: 'center',
          key: 'judgeof'
        },
        {
          title: '打分',
          align: 'center',
          key: 'score'
        }
      ],
      listData: [
        {
          type: '日报',
          name: '丁通',
          reportTime: '2017-10-09',
          submitTime: '2017-10-09',
          status: '已评分',
          judgeof: '优秀',
          score: 90
        },
        {
          type: '日报',
          name: '丁通',
          reportTime: '2017-10-09',
          submitTime: '2017-10-09',
          status: '已评分',
          judgeof: '优秀',
          score: 90
        },
        {
          type: '日报',
          name: '丁通',
          reportTime: '2017-10-09',
          submitTime: '2017-10-09',
          status: '已评分',
          judgeof: '优秀',
          score: 90
        },
        {
          type: '日报',
          name: '丁通',
          reportTime: '2017-10-09',
          submitTime: '2017-10-09',
          status: '已评分',
          judgeof: '优秀',
          score: 90
        }
      ]
    }
  },
  methods: {
    serachPerson () {
    }
  },
  created () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-history{
    padding: 16px;
  }
</style>
