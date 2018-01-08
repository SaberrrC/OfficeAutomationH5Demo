<template>
  <div class="report-admin-department">
    <Card shadow>
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
  </div>
</template>

<script>
import config from '@/config/index.js'
export default {
  name: 'Setting',
  data () {
    return {
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
      listData: [],
      total: 0,
      current: 1
    }
  },
  methods: {
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
          this.GLOBAL_.wholeList = result.data
        } else {
          if (res.data.code === '020000') {
            this.listData = []
            this.total = 0
          }
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
          this.GLOBAL_.wholeList = result.data
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
      this.GLOBAL_.currentIndex = index
      this.$router.push({
        'name': this.type === 0 ? 'DepartmentDaily' : 'DepartmentWeekly',
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
    //  获取本人的部门
    getDepartment () {
      this.$ajax({
        method: 'get',
        url: '/user/getUserInfoById'
      }).then((res) => {
        console.log('日报列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.department = result.oid
          this.searchDaiy()  //  默认获取周报列表
        } else {

        }
      }, (res) => {

      })
    },
    //  导出
    exportReport () {
      if (this.state === 0) {
        this.$Message.error('全部状态不可导出，请切换其他状态')
      }
      location.href = config.OA_API + '/dailyreport/export?department=' + this.department + '&name=' + this.searchName + '&startTime=' + this.timeFormat(this.startTime) + '&endTime=' + this.timeFormat(this.endTime) + '&state=' + this.state + '&type=' + this.type + '&uid=' + window.localStorage.getItem('uid') + '&token=' + window.localStorage.getItem('token')
    }
  },
  mounted () {
    this.getDepartment()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.report-admin-department{
  padding: 16px;
}
</style>
