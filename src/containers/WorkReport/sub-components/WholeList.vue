<template>
  <div class="whole-list">
    <Row>
      <Col span="6">
        <Card style="height: 88vh" >
          <div style="height: 57px;line-height: 50px;" align="center">组织架构</div>
          <Row>
            <Col span="24">
              <Input v-model="departmentName" placeholder="搜索部门" style="width: 80%;margin-left: 20px;margin-top:1px;" icon="ios-search-strong" @on-click="searchDepartment"></Input>
            </Col>
          </Row>
          <Row>
            <Col span="24" align="center">
              <ul class="departmentUl">
                <li v-for="item in departmentList" @click="changeDepartment(item.id,item.name)">{{item.name}}</li>
              </ul>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span="18">
        <Card>
          <div slot="title">
            <Form :label-width="80">

              <Row>
                <Col span="8">
                  <FormItem label="姓名">
                    <Input v-model="searchName" placeholder=""></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="开始时间">
                    <DatePicker type="date" placeholder="Select date" v-model="startTime" format="yyyy-MM-dd" :clearable="false"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="结束时间">
                    <DatePicker type="date" placeholder="Select date" v-model="endTime" format="yyyy-MM-dd" :clearable="false"></DatePicker>
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <Col span="8">
                  <FormItem label="状态">
                    <Select v-model="state">
                      <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="类型">
                    <Select v-model="type">
                      <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8" align="right">
                  <Button type="primary" @click="search">搜索</Button>
                  <Button type="primary" @click="exportReport">导出</Button>
                </Col>
              </Row>

            </Form>
          </div>


          <Table :columns="columns" :data="listData" height="400" @on-row-click="goDetail"></Table>
          <Page :total="total" show-total style="margin-top: 10px;" :current="current" :page-size="10" @on-change="changePage"></Page>
        </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  name: 'WholeList',
  data () {
    return {
      departmentName: '',
      departmentList: [{}],

      searchName: '',
      startTime: new Date(),
      endTime: new Date(),
      stateList: [{
        value: 0,
        label: '全部'
      }, {
        value: 3,
        label: '已完成'
      }, {
        value: 9,
        label: '未填写'
      }, {
        value: 1,
        label: '待评分'
      }],
      state: 0,
      typeList: [{
        value: 0,
        label: '日报'
      }, {
        value: 1,
        label: '周报'
      }],
      type: 0,
      department: '',
      columns: [{
        title: '类型',
        key: 'type',
        align: 'center'
      }, {
        title: '姓名',
        key: 'name',
        align: 'center'
      }, {
        title: '一级部门',
        key: 'depOne',
        align: 'center'
      }, {
        title: '二级部门',
        key: 'depTwo',
        align: 'center'
      }, {
        title: '岗位',
        key: 'position',
        align: 'center'
      }, {
        title: '次数',
        key: 'count',
        align: 'center'
      }, {
        title: '平均分',
        key: 'avgScore',
        align: 'center'
      }, {
        title: '状态',
        key: 'state',
        align: 'center'
      }, {
        title: '备注',
        key: 'remarks',
        align: 'center'
      }],
      listData: [{
        type: '日报',
        name: '丁通',
        depOne: '技术',
        depTwo: '开发',
        position: '前端',
        count: 0,
        avgScore: 100,
        state: '已评分',
        remarks: '',
        dailyid: ''
      }, {
        type: '日报',
        name: '丁通',
        depOne: '技术',
        depTwo: '开发',
        position: '前端',
        count: 0,
        avgScore: 100,
        state: '已评分',
        remarks: '',
        dailyid: ''
      }, {
        type: '日报',
        name: '丁通',
        depOne: '技术',
        depTwo: '开发',
        position: '前端',
        count: 0,
        avgScore: 100,
        state: '已评分',
        remarks: '',
        dailyid: ''
      }, {
        type: '日报',
        name: '丁通',
        depOne: '技术',
        depTwo: '开发',
        position: '前端',
        count: 0,
        avgScore: 100,
        state: '已评分',
        remarks: '',
        dailyid: ''
      }],
      total: 0,
      current: 1
    }
  },
  methods: {
    //  获取部门列表
    searchDepartment () {
      this.$ajax({
        method: 'get',
        url: '/organization/queryDepartment?departmentName=' + this.departmentName
      }).then((res) => {
        console.log('部门列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.departmentList = result.dataList
        } else {

        }
      }, (res) => {

      })
    },
    //  切换部门
    changeDepartment (id, name) {
      this.department = id
      this.total = 0
      this.current = 1
      if (this.type === 0) {
        this.searchDaiy()
      } else {
        this.searchWeekly()
      }
    },
    //  时间格式化
    timeFormat (date) {
      let year = date.getFullYear()
      let mounth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      return year + '-' + mounth + '-' + day
    },
    //  获取列表
    search () {
      this.total = 0
      this.current = 1
      if (this.type === 0) {
        this.searchDaiy()
      } else {
        this.searchWeekly()
      }
    },
    //  获取日报列表数据
    searchDaiy () {
      let starttime = this.timeFormat(this.startTime)
      let endtime = this.timeFormat(this.endTime)
      this.$ajax({
        method: 'get',
        url: '/dailyreport/hr?name=' + this.searchName + '&startTime=' + starttime + '&endTime=' + endtime + '&state=' + this.state + '&department=' + this.department + '&pageNum=' + this.current + '&pageSize=10'
      }).then((res) => {
        console.log('日报列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.listData = result.data
          this.total = result.total
        } else {

        }
      }, (res) => {

      })
    },
    //  获取周报列表数据
    searchWeekly () {
      let starttime = this.timeFormat(this.startTime)
      let endtime = this.timeFormat(this.endTime)
      this.$ajax({
        method: 'get',
        url: '/weekreport/hr?name=' + this.searchName + '&startTime=' + starttime + '&endTime=' + endtime + '&state=' + this.state + '&department=' + this.department + '&pageNum=' + this.current + '&pageSize=10'
      }).then((res) => {
        console.log('周报列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.listData = result.data
          this.total = result.total
        } else {

        }
      }, (res) => {

      })
    },
    //  分页查询
    changePage (e) {
      this.current = e
      if (this.type === 0) {
        this.searchDaiy()
      } else {
        this.searchWeekly()
      }
    },
    //  跳转详情页
    goDetail (row, index) {
      console.log(row, index)
      this.$router.push({
        'name': this.type === 0 ? 'WholeDaily' : 'WholeWeekly',
        'params': {
          current: this.current,
          index: index,
          userId: row.userId,
          startTime: this.timeFormat(this.startTime),
          endTime: this.timeFormat(this.endTime),
          type: this.type
        }
      })
    },
    //  导出
    exportReport () {
      location.href = '/oa-api/dailyreport/export?department=' + this.department + '&name=' + this.searchName + '&startTime=' + this.timeFormat(this.startTime) + '&endTime=' + this.timeFormat(this.endTime) + '&state=' + this.state + '&type=' + this.type + '&uid=' + window.localStorage.getItem('uid') + '&token=' + window.localStorage.getItem('token')
    }
  },
  mounted () {
    this.searchDepartment() //  获取部门列表
    this.searchDaiy()  //  默认获取周报列表
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.whole-list{
  padding: 16px;
  .departmentUl{
    margin-top: 20px;
    overflow: auto;
    height: 480px;
    margin-bottom: 10px;
    li{
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
    li:hover{
      background-color: #2d8cf0;
      color: white;
    }
  }
}
</style>
