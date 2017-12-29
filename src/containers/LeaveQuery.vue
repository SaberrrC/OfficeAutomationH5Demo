<template>
  <div class="leave-query">
    <Card :dis-hover="true">
      <Tabs @on-click="handleChangeTab">
        <TabPane v-for="item in tabs" :label="item.name" :key="item.id" :name="item.id"/>
      </Tabs>
      <table>
        <thead>
        <tr>
          <th colspan="2">{{tabs[tab].name}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            查询期间：
            <Select v-model="year" style="width:200px" @on-change="handleChangeYear">
              <Option v-for="item in years" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </td>
          <td>姓名：{{leaveInfo.psname}}</td>
        </tr>
        <tr>
          <td>人员编码：{{leaveInfo.code}}</td>
          <td>部门：{{leaveInfo.deptname}}</td>
        </tr>
        <tr>
          <td colspan="2">职位名称：{{leaveInfo.jobname}}</td>
        </tr>
        <tr>
          <td>上期结余：{{leaveInfo.lastdayorhour}} {{unit}}</td>
          <td>调整时长：{{leaveInfo.changelength}} {{unit}}</td>
        </tr>
        <tr>
          <td>享有：{{leaveInfo.realdayorhour}} {{unit}}</td>
          <td>当前享有：{{leaveInfo.curdayorhour}} {{unit}}</td>
        </tr>
        <tr>
          <td>已休：{{leaveInfo.yidayorhour}} {{unit}}</td>
          <td>冻结：{{leaveInfo.freezedayorhour}} {{unit}}</td>
        </tr>
        <tr>
          <td>结余：{{leaveInfo.restdayorhour}} {{unit}}</td>
          <td>可用：{{leaveInfo.usefulrestdayorhour}} {{unit}}</td>
        </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'LeaveQuery',
    data () {
      return {
        tab: '0',
        tabs: [
          {name: '年假', id: '0'},
          {name: '带薪病假', id: '1'},
          {name: '转调休', id: '2'}
        ],
        year: '',
        years: [],
        unit: '天',
        leaveInfo: {
          changelength: '0',
          code: '',
          curdayorhour: '0',
          deptname: '',
          freezedayorhour: '0',
          jobname: '',
          lastdayorhour: '0',
          psname: '',
          realdayorhour: '0',
          restdayorhour: '0',
          usefulrestdayorhour: '0',
          yidayorhour: '0'
        }
      }
    },
    created () {
      const currentYear = new Date().getFullYear()
      const lastYear = currentYear - 1
      this.years.push({label: lastYear, value: lastYear})
      this.years.push({label: currentYear, value: currentYear})
      this.year = currentYear
      this.handleQueryLeave(this.tab, this.year)
    },
    methods: {
      handleChangeTab (id) {
        this.tab = id
        this.unit = id === '2' ? '小时' : '天'
        this.handleQueryLeave(id, this.year)
      },
      handleChangeYear (year) {
        this.handleQueryLeave(this.tab, year)
      },
      handleQueryLeave (type, year) {
        this.$ajax.get('/nchrHoliday/getHoliday', {
          params: {
            type,
            year
          }
        }).then((response) => {
          if (response.data && response.data.code === '000000') {
            this.leaveInfo = response.data.data[0]
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.leave-query {
  height: 100%;
  padding: 16px;
  .ivu-card {
    height: 100%;
    overflow-y: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: auto;
    border-top: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
    th {
      height: 60px;
      padding: 0 16px;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      font-size: 20px;
      text-align: left;
      background: #f8f8f9;
    }
    td {
      height: 50px;
      padding: 0 16px;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
    }
  }
}
</style>
