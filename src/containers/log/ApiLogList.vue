<template>
  <div class="work-report-daily">
    <Card :dis-hover="true">
      <p slot="title">API日志导出</p>
      <div style="height: 450px;overflow: auto">
      <ul>
        <li>
          <Row>
            <i-Col span="6" offset="2">日志名</i-Col>
            <i-Col span="6">操作</i-Col>
          </Row>
        </li>
        <li v-for="item in logList">
          <a href="#" @click="download(item)">
            <Row>
              <i-Col span="6" offset="2">{{ item }}</i-Col>
              <i-Col span="6">下载</i-Col>
            </Row>
          </a>
        </li>
      </ul>
      </div>
      <div style="margin: 10px;overflow: hidden">
        <div>
          <Page
            :total="Total"
            :current="CurrentPage"
            :page-size="PageSize"
            @on-change="changePage"
            @on-page-size-change="pageSizeChange"
            show-total
            show-sizer>
          </Page>
        </div>
        <!--<iframe ref="dwIfr" style="display:none;" src=""></iframe>-->
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        Total: 0,                 // 发起列表总条数
        PageSize: 10,              // 发起列表每页显示条数
        CurrentPage: 1,            // 发起列表当前页数
        logList: []
      }
    },
    methods: {
//    获取日志数据
      getLog () {
        this.$ajax.get(`log/apiloglist`, {
          params: {
            page: this.CurrentPage,
            limit: this.PageSize
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            console.log(response.data)
            this.Total = response.data.data.count
            this.logList = response.data.data.list
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    调下载日志接口
      download (item) {
        window.location.href = this.$ajax.defaults.baseURL + '/log/apidownlogs?logname=' + item + '&token=' + this.$ajax.defaults.headers.common['token'] + '&uid=' + this.$ajax.defaults.headers.common['uid']
      },
      changePage (page) {
        this.CurrentPage = page              // 发起列表当前页数
        this.getLog()
      },
      pageSizeChange (pageSize) {
        this.PageSize = pageSize              // 发起列表每页显示条数
        this.getLog()
      }
    },
    created () {
      this.getLog()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
    /*max-height: 450px;*/
  }
  .work-report-daily li {
    border-bottom: 1px dashed #eee;
    line-height: 45px
  }
  .work-report-daily li a{
    color: #495060;
  }
</style>
