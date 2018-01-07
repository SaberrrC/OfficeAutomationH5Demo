<template>
  <div class="whole-weekly">
    <p style="height: 53px;background-color: white;padding-top: 10px;padding-right: 16px;text-align: right">
      <Button type="error" @click="back">关闭</Button>
      <Button type="primary" @click="goLeft">
        <Icon type="chevron-left"></Icon>
      </Button>
      <Button type="primary" @click="goRight">
        <Icon type="chevron-right"></Icon>
      </Button>
    </p>
    <div style="padding: 16px;">
      <Card shadow>
        <p style="text-align: center;height: 40px;">
          周工作汇报
        </p>
        <Table :columns="columns" :data="listData" @on-row-click="openDetail"></Table>
        <Page :total="total" show-total style="margin-top: 10px;" :current="current" :page-size="10" @on-change="changePage"></Page>
      </Card>
      <Card  v-show="showDetail"  shadow>
        <Row  style="margin-top: 40px;">
          <Col span="24">
          <table cellpadding="0" cellspacing="0">
            <thead>
            <tr>
              <th>工作计划</th>
              <th>实际工作</th>
              <th>差异分析</th>
              <th>备注（选填）</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in weeklySummary">
              <td><Input type="textarea" placeholder="" readonly v-model="item.workPlan"></Input></td>
              <td><Input type="textarea" placeholder="" readonly v-model="item.work"></Input></td>
              <td><Input type="textarea" placeholder="" readonly v-model="item.difference"></Input></td>
              <td><Input type="textarea" placeholder="" readonly v-model="item.remark"></Input></td>
            </tr>
            </tbody>
          </table>
          </Col>
        </Row>



        <h4 style="margin-top: 40px; line-height: 40px;">下周工作计划</h4>
        <Row>
          <Col span="24">
          <table cellpadding="0" cellspacing="0">
            <thead>
            <tr>
              <th>工作计划（计划工作目标、计划节点）</th>
              <th>责任人</th>
              <th>备注（选填）</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in weekPlane">
              <td><Input type="textarea" placeholder="" readonly v-model="item.nextWorkPlan"></Input></td>
              <td><Input type="textarea" placeholder="" readonly v-model="item.personLiable"></Input></td>
              <td><Input type="textarea" placeholder="" readonly v-model="item.remark"></Input></td>
            </tr>
            </tbody>
          </table>
          </Col>
        </Row>



        <Row style="margin: 20px;">
          <Col span="24" align="center">
          <h4>评语（选填）</h4>
          </Col>
        </Row>
        <Row style="margin: 20px;">
          <Col span="24" align="center">
          <Input type="textarea" placeholder=""></Input>
          </Col>
        </Row>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WholeWeekly',
  data () {
    return {
      storeData: this.$route.params,
      columns: [
        {
          title: '部门',
          key: 'department',
          align: 'center'
        },
        {
          title: '岗位',
          key: 'position',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '汇报时间',
          key: 'reportTime',
          align: 'center'
        },
        {
          title: '状态',
          key: 'ratingStatus',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remarks',
          align: 'center'
        }
      ],
      listData: [],
      showDetail: false,
      current: 1,
      total: 0,
      weeklySummary: [
        {
          difference: '',
          remark: '',
          work: '',
          workPlan: ''
        }
      ],
      weekPlane: [
        {
          nextWorkPlan: '',
          personLiable: '',
          remark: ''
        }
      ]
    }
  },
  methods: {
    //  获取列表数据
    getListDate (id) {
      this.$ajax({
        method: 'get',
        url: '/weekreport/detils/' + id + '?pageNum=' + this.current + '&pageSize=10&userId=' + this.storeData.userId + '&startTime=' + this.storeData.startTime + '&endTime=' + this.storeData.endTime
      }).then((res) => {
        console.log('列表详情', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.listData = result.data
          this.total = result.total
        } else {
          if (res.data.code === '020000') {
            this.listData = []
            this.total = 0
          }
        }
      }, (res) => {

      })
    },
    //  分页查询
    changePage (e) {
      this.current = e
      this.getListDate()
    },
    //  点击行，查看详情
    openDetail (row, index) {
      console.log(row, index)
      this.$ajax({
        method: 'get',
        url: '/weekreport/' + row.id
      }).then((res) => {
        console.log('周报详情', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.showDetail = true
          this.weeklySummary = result.weeklySummary
          this.weekPlane = result.weekPlane
        } else {

        }
      }, (res) => {

      })
    },
    //  关闭
    back () {
      location.hash = '/report_admin/whole/wholeList'
    },
    //  左右切换
    goRight () {
      this.GLOBAL_.currentIndex ++
      this.GLOBAL_.currentIndex = this.GLOBAL_.currentIndex === 10 ? 0 : this.GLOBAL_.currentIndex
      let data = this.GLOBAL_.wholeList[this.GLOBAL_.currentIndex]
      this.getListDate(data.userId)
    },
    goLeft () {
      this.GLOBAL_.currentIndex --
      this.GLOBAL_.currentIndex = this.GLOBAL_.currentIndex === -1 ? 9 : this.GLOBAL_.currentIndex
      let data = this.GLOBAL_.wholeList[this.GLOBAL_.currentIndex]
      this.getListDate(data.userId)
    }
  },
  mounted () {
    this.getListDate(this.storeData.userId)
  },
  activated () {
    this.getListDate(this.storeData.userId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.whole-weekly{
  /*padding: 16px;*/
}
h4{
  text-align: center;
}
table{
  width: 100%;
  border: 1px solid #e9eaec;
th {
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #f8f8f9;
}
td {
  border-top: 1px solid #e9eaec;
  border-right: 1px solid #e9eaec;
  padding: 16px;

}
}
.leader,.btn{
  text-align: center;
  margin-top: 20px;
}
</style>
<style>
  textarea {
    overflow: hidden;
    resize: none;
    height: 57px;
  }
</style>
