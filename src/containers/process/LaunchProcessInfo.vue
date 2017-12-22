<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col span="12">
          <h3 @click="pageClose()"><Icon type="close-round"></Icon></h3>
          <h3 @click="pageLeft()"><Icon type="chevron-left"></Icon></h3>
          <h3 @click="pageRight()"><Icon type="chevron-right"></Icon></h3>
        </i-Col>
        <i-Col span="3" offset="9">
          <Button type="primary">收回</Button>
        </i-Col>
      </Row>
    </span>
    </p>
    <div class="work-report-daily">
      <!--表头-->
      <div>
      <Row>
        <i-Col>
          <div class="title">
            <h3>出差申请</h3>
          </div>
        </i-Col>
      </Row>
      <Row>
        <i-Col span="12">
          <div class="card">
            <p>出差编码</p>
          </div>
        </i-Col>
        <i-Col span="12">
          <div class="card">
            <p>出差类别</p>
          </div>
        </i-Col>
      </Row>
      <Row>
        <i-Col span="12">
          <div class="card">
            <p>申请人</p>
          </div>
        </i-Col>
        <i-Col span="12">
          <div class="card">
            <p>申请日期</p>
          </div>
        </i-Col>
      </Row>
      </div>
      <!--出差明细-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>出差明细</h3>
            </div>
          </i-Col>
          <Row>
            <i-Col span="12">
              <div class="card">
                <p>开始时间</p>
              </div>
            </i-Col>
            <i-Col span="12">
              <div class="card">
                <p>结束时间</p>
              </div>
            </i-Col>
          </Row>
          <Row>
            <i-Col>
              <div class="card">
                <p>申请时长</p>
              </div>
            </i-Col>
          </Row>
          <Row>
            <i-Col span="12">
              <div class="card">
                <p>出差地点</p>
              </div>
            </i-Col>
            <i-Col span="12">
              <div class="card">
                <p>出差原因</p>
              </div>
            </i-Col>
          </Row>
          <Row>
            <i-Col>
              <div class="card">
                <p>工作交接人</p>
              </div>
            </i-Col>
          </Row>
          <Row>
            <i-Col>
              <div class="card" style="text-align: center">
                <p><a href="javascript:void (0)">收起明细</a></p>
              </div>
            </i-Col>
          </Row>
        </Row>
      </div>
      <!--评阅情况-->
      <div style="margin-top: 30px">
        <Row>
          <i-Col>
            <div style="background-color: #ffffff;height: 36px;line-height: 36px;text-align: center">
              <h4>评阅情况</h4>
            </div>
          </i-Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  //  TODO 临时测试环境变量
  const TEST_CONFIG = 'http://118.31.18.67:8084'

  export default {
    name: 'WorkReportDaily',
    data () {
      return {
      }
    },
    methods: {
      getMeetRoom () {
        axios.get(`${TEST_CONFIG}//newMeetingRooms`, {
          params: {
            token: 'c955d939c180414fa2ffa24be4ebf921', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {

          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1)
      },
      pageClose () {
        this.$Message.error('close')
//        this.$router.push({path: 'launchIndex'})
      },
      pageLeft () {
        this.$Message.warning('left')
      },
      pageRight () {
        this.$Message.success('right')
      }
    },
    created () {
      this.getMeetRoom()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 48px;
    line-height: 48px;
    /*padding-left: 20px;*/
    background: #ffffff;
  }
  .header h3 {
    display: inline-block;
    padding:0 20px;
    border-right: solid 1px #ccc;
  }
  .title {
    padding: 0;
    border: 1px solid #eeeeee;
  }
  .title h3{
    height: 36px;
    line-height: 36px;
    background: #F5F6F8;
    padding-left: 16px;
  }
  .code-row-bg {
    text-align: center;
  }
  .card {
    height: 48px;
    line-height: 48px;
    border: 1px solid #eeeeee;
  }
  .card p{
    padding-left: 16px;
    background: #ffffff;
  }
</style>
