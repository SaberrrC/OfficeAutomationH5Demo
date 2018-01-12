<template>
  <div class="whole-list">
    <Row>
      <Col span="6">
        <Card style="height: 88vh" shadow>
          <div style="height: 57px;line-height: 50px;" align="center">组织架构</div>
          <Row>
            <Col span="24">
              <Input v-model="departmentName" placeholder="搜索部门" style="width: 80%;margin-left: 20px;margin-top:1px;" icon="ios-search-strong" @on-enter="searchDepartment" @on-click="searchDepartment"></Input>
              <div style="padding-left: 20px"><span>{{prompt}}</span></div>
            </Col>
          </Row>
          <Row>
            <Col span="24" align="center">
              <ul class="departmentUl">
                <li v-for="item in departmentList" @click="changeDepartment(item.id,item.name)" :class="{'cur': item.id === currentLi}">{{item.name}}</li>
              </ul>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span="18">
        <div style="background-color: white;padding-right: 16px;padding-top: 20px;border-left: 1px solid #ebeff8;">
        <Form :label-width="80">

          <Row>
            <Col span="8">
            <FormItem label="姓名">
              <Input v-model="searchName" placeholder=""></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="开始时间">
              <DatePicker type="date" placeholder="Select date" v-model="startTime" format="yyyy-MM-dd" :clearable="false" style="width: 100%"></DatePicker>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="结束时间">
              <DatePicker type="date" placeholder="Select date" v-model="endTime" format="yyyy-MM-dd" :clearable="false" style="width: 100%"></DatePicker>
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
            <Button type="primary" @click="search" :loading="loading" style="margin-right: 20px;">搜索</Button>
            <Button type="primary" @click="exportReport">导出</Button>
            </Col>
          </Row>

        </Form>
      </div>
        <div style="padding: 16px;">
          <Card shadow>

            <Table :columns="columns" :data="listData" height="400" @on-row-click="goDetail"></Table>
            <Page :total="total" show-total style="margin-top: 10px;" :current="current" :page-size="10" @on-change="changePage"></Page>
          </Card>
        </div>
      </Col>
    </Row>

  </div>
</template>

<script>
import config from '@/config/index.js'
export default {
  name: 'WholeList',
  data () {
    return {
      prompt: '',
      currentLi: -1,
      loading: false,
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
        value: 1,
        label: '日报'
      }, {
        value: 2,
        label: '周报'
      }],
      type: 1,
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
          this.prompt = ''
        } else {
          if (res.data.code === '020000') {
            this.prompt = '没有符合条件的结果'
            this.departmentList = []
          }
        }
      }, (res) => {

      })
      if (!this.departmentName) {
        this.department = ''
        this.currentLi = -1
        if (this.type === 1) {
          this.searchDaiy()
        } else {
          this.searchWeekly()
        }
      }
    },
    //  切换部门
    changeDepartment (id, name) {
      this.currentLi = id
      this.department = id
      this.total = 0
      this.current = 1
      if (this.type === 1) {
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
      if (this.type === 1) {
        this.searchDaiy()
      } else {
        this.searchWeekly()
      }
    },
    //  获取日报列表数据
    searchDaiy () {
      //  时间验证
      console.log(this.startTime.getTime(), this.endTime.getTime())
      if (this.startTime.getTime() > this.endTime.getTime()) {
        this.$Message.error('开始时间不可大于结束时间')
        return
      }
      let starttime = this.timeFormat(this.startTime)
      let endtime = this.timeFormat(this.endTime)
      this.loading = true
      this.$ajax({
        method: 'get',
        url: '/dailyreport/hr?name=' + this.searchName + '&startTime=' + starttime + '&endTime=' + endtime + '&state=' + this.state + '&department=' + this.department + '&pageNum=' + this.current + '&pageSize=10'
      }).then((res) => {
        console.log('日报列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          let arr = result.data
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === '1') {
              arr[i].type = '日报'
            }
            if (arr[i].type === '2') {
              arr[i].type = '周报'
            }
            if (arr[i].state === 3) {
              arr[i].state = '已评分'
            }
            if (arr[i].state === 9) {
              arr[i].state = '未填写'
            }
            if (arr[i].state === 1) {
              arr[i].state = '待评分'
            }
          }
          this.listData = arr
          this.total = result.total
          this.GLOBAL_.wholeList = result.data
          this.loading = false
        } else {
          if (res.data.code === '020000') {
            this.listData = []
            this.total = 0
          }
          this.loading = false
        }
      }, (res) => {
        this.loading = false
      })
    },
    //  获取周报列表数据
    searchWeekly () {
      //  时间验证
      console.log(this.startTime.getTime(), this.endTime.getTime())
      if (this.startTime.getTime() > this.endTime.getTime()) {
        this.$Message.error('开始时间不可大于结束时间')
        return
      }
      let starttime = this.timeFormat(this.startTime)
      let endtime = this.timeFormat(this.endTime)
      this.loading = true
      this.$ajax({
        method: 'get',
        url: '/weekreport/hr?name=' + this.searchName + '&startTime=' + starttime + '&endTime=' + endtime + '&state=' + this.state + '&department=' + this.department + '&pageNum=' + this.current + '&pageSize=10'
      }).then((res) => {
        console.log('周报列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          let arr = result.data
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === '1') {
              arr[i].type = '日报'
            }
            if (arr[i].type === '2') {
              arr[i].type = '周报'
            }
            if (arr[i].state === 3) {
              arr[i].state = '已评分'
            }
            if (arr[i].state === 9) {
              arr[i].state = '未填写'
            }
            if (arr[i].state === 1) {
              arr[i].state = '待评分'
            }
          }
          this.listData = arr
          this.total = result.total
          this.GLOBAL_.wholeList = result.data
          this.loading = false
        } else {
          if (res.data.code === '020000') {
            this.listData = []
            this.total = 0
          }
          this.loading = false
        }
      }, (res) => {
        this.loading = false
      })
    },
    //  分页查询
    changePage (e) {
      this.current = e
      if (this.type === 1) {
        this.searchDaiy()
      } else {
        this.searchWeekly()
      }
    },
    //  跳转详情页
    goDetail (row, index) {
      console.log(row, index)
      this.GLOBAL_.currentIndex = index
      console.log({
        'name': this.type === 1 ? 'WholeDaily' : 'WholeWeekly',
        'params': {
          current: this.current,
          index: index,
          userId: row.userId,
          startTime: this.timeFormat(this.startTime),
          endTime: this.timeFormat(this.endTime),
          type: this.type
        }
      })
      this.$router.push({
        'name': this.type === 1 ? 'WholeDaily' : 'WholeWeekly',
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
      location.href = config.OA_API + '/dailyreport/export?department=' + this.department + '&name=' + this.searchName + '&startTime=' + this.timeFormat(this.startTime) + '&endTime=' + this.timeFormat(this.endTime) + '&state=' + this.state + '&type=' + this.type + '&uid=' + window.localStorage.getItem('uid') + '&token=' + window.localStorage.getItem('token')
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
    li.cur{
      background-color: #2d8cf0;
      color: white;
    }
  }
}
</style>
