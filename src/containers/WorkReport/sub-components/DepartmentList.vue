<template>
  <div class="report-admin-department">
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
            <FormItem label="状态">
              <Select v-model="defaultStatus">
                <Option v-for="item in statusData" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="5">
            <Input v-model="value" placeholder="搜索发起人" style="width: 80%;margin-left: 20px;margin-top:1px;" icon="ios-search-strong" @on-click="searchPerson"></Input>
            </Col>
            <Col span="4" align="right">
            <Button type="primary">导出</Button>
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
      statusData: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '待评分'
        },
        {
          value: '2',
          label: '已评分'
        }
      ],
      defaultStatus: '0',
      value: '',
      columns: [
        {
          title: '类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '部门',
          key: 'department',
          align: 'center'
        },
        {
          title: '岗位',
          key: 'station',
          align: 'center'
        },
        {
          title: '次数',
          key: 'times',
          align: 'center'
        },
        {
          title: '平均分',
          key: 'score',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center'
        }
      ],
      listData: [
        {
          type: '日报',
          name: '丁通',
          department: '开发',
          station: '前端',
          times: 0,
          score: 100,
          status: '已评分'
        },
        {
          type: '日报',
          name: '丁通',
          department: '开发',
          station: '前端',
          times: 0,
          score: 100,
          status: '已评分'
        },
        {
          type: '日报',
          name: '丁通',
          department: '开发',
          station: '前端',
          times: 0,
          score: 100,
          status: '已评分'
        },
        {
          type: '日报',
          name: '丁通',
          department: '开发',
          station: '前端',
          times: 0,
          score: 100,
          status: '已评分'
        }
      ]
    }
  },
  methods: {
    searchPerson () {

    },
    searchDepartment () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.report-admin-department{
  padding: 16px;
}
</style>
