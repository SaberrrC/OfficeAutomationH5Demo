<template>
  <div class="whole-daily">
    <div style="height: 53px;padding-top: 10px;padding-right: 16px;background-color: white;text-align: right">
      <Button type="error" @click="back">关闭</Button>
      <Button type="primary" @click="goLeft">
        <Icon type="chevron-left"></Icon>
      </Button>
      <Button type="primary" @click="goRight">
        <Icon type="chevron-right" @click="goRight"></Icon>
      </Button>
    </div>
    <div style="padding: 16px;">
      <Card shadow>
        <p style="text-align: center;height: 40px;">
          日工作汇报
        </p>
        <Table :columns="columns" :data="listData" @on-row-click="openDetail"></Table>
        <Page :total="total" show-total style="margin-top: 10px;" :current="current" :page-size="10" @on-change="changePage"></Page>
      </Card>
      <Card style="margin-top: 20px;" v-show="showDetail" shadow>
        <div class="card">
          <Row>
            <Col span="24">
            <table cellpadding="0" cellspacing="0">
              <thead>
              <tr>
                <th></th>
                <th>时间</th>
                <th>计划工作</th>
                <th>实际工作</th>
                <th>量化数据/结果</th>
                <th>自评</th>
                <th>监督人</th>
                <th>检查人</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td rowspan="8"> 工 <br/> 作 <br/> 日 <br/> 志 </td>
                <td class="record_time">9:00-10:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanOne"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workOne"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultOne"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingOne"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingOne"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingOne"></Input></td>
              </tr>
              <tr>
                <td>10:00-11:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanTwo"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workTwo"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultTwo"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingTwo"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingTwo"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingTwo"></Input></td>
              </tr>
              <tr>
                <td>11:00-12:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanThree"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workThree"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultThree"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingThree"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingThree"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingThree"></Input></td>
              </tr>
              <tr>
                <td>13:00-14:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanFour"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workFour"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultFour"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingFour"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingFour"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingFour"></Input></td>
              </tr>
              <tr>
                <td>14:00-15:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanFive"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workFive"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultFive"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingFive"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingFive"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingFive"></Input></td>
              </tr>
              <tr>
                <td>15:00-16:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanSix"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workSix"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultSix"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingSix"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingSix"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingSix"></Input></td>
              </tr>
              <tr>
                <td>16:00-17:00</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanSeven"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workSeven"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultSeven"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingSeven"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingSeven"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingSeven"></Input></td>
              </tr>
              <tr>
                <td>17:00-17:30</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workPlanEigth"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workEigth"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.workResultEigth"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfRatingEigth"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorRatingEigth"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkRatingEigth"></Input></td>
              </tr>
              <tr>
                <td rowspan="6"> 职 <br/> 业 <br/> 素 <br/> 养 </td>
                <td>1.个人言行</td>
                <td colspan="3" style="text-align: left;"> 言行一致，不弄虚作假，不搬弄是非，清正廉洁，遵守各项法律规章制度，有原则性，不徇私舞弊，以权谋私</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfBehavior"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorBehavior"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkBehavior"></Input></td>
              </tr>
              <tr>
                <td>2.环境卫生</td>
                <td colspan="3" style="text-align: left;"> 保持个人工作环境干净整洁,无灰尘无死角,桌面地面无纸屑杂物,办公用品摆放整齐</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfEnvironmental"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorEnvironMental"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkEnvironMental"></Input></td>
              </tr>
              <tr>
                <td>3.节约</td>
                <td colspan="3" style="text-align: left;"> 成本意识强烈，能积极节省，避免浪费</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfSave"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorSave"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkSave"></Input></td>
              </tr>
              <tr>
                <td>4.沟通协调能力</td>
                <td colspan="3" style="text-align: left;"> 善于根据不同对象营造恰当的氛围表达顾虑</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfCommunication"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorCommunication"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkCommunication"></Input></td>
              </tr>
              <tr>
                <td>5.仪容仪表</td>
                <td colspan="3" style="text-align: left;"> 仪容干净整洁，按规定着装，配戴胸卡，仪表端庄大方，言谈有度，举止得体</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfAppearance"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorAppearance"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkAppearance"></Input></td>
              </tr>
              <tr>
                <td>6.工作纪律</td>
                <td colspan="3" style="text-align: left;"> 工作时间不看与工作无关的图书，不玩手机，不闲聊，不听音乐，不打游戏，不浏览与工作无关的网页，不以办公事为由出门办理个人私事
                </td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfDiscipline"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorDiscipline"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkDiscipline"></Input></td>
              </tr>
              <tr>
                <td rowspan="4"> 团 <br/> 队 <br/> 合 <br/> 作 </td>
                <td>1.工作主动性</td>
                <td colspan="3" style="text-align: left;"> 能经常主动了解他人的服务需求，并提供需要的服务</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfJobInitiative"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorJobInitiative"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkJobInitiative"></Input></td>
              </tr>
              <tr>
                <td>2.合作性</td>
                <td colspan="3" style="text-align: left;"> 团结同事，乐于助人，以大局为重</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfCooperation"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorCooperation"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkCooperation"></Input></td>
              </tr>
              <tr>
                <td>3.敬业精神</td>
                <td colspan="3" style="text-align: left;"> 有较强的事业心和责任心，积极主动，勤奋敬业</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfDedicated"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorDedicated"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkDedicated"></Input></td>
              </tr>
              <tr>
                <td>4.服从组织安排</td>
                <td colspan="3" style="text-align: left;"> 服从组织安排，组织所交代的工作必须有速度有效率的完成</td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.selfOrganization"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.supervisorOrganization"></Input></td>
                <td><Input type="textarea" placeholder="" readonly v-model="reportData.checkOrganization"></Input></td>
              </tr>
              <tr>
                <td> 明 <br/> 日 <br/> 计 <br/> 划 </td>
                <td>工作任务或工作目标</td>
                <td colspan="6">
                  <Input type="textarea" placeholder="" height="300px" readonly v-model="reportData.tomorrowPlan"></Input>
                </td>
              </tr>
              </tbody>
            </table>
            </Col>
          </Row>
          <Row style="margin: 20px;">
            <Col span="24" align="center">
            <h3>检查人进行评分</h3>
            </Col>
          </Row>
          <Row style="margin: 20px;">
            <Col span="8" align="center">工作日志&nbsp;&nbsp;<Input v-model="reportData.worklogScore" readonly></Input></Col>
            <Col span="8" align="center">职业素养&nbsp;&nbsp;<Input v-model="reportData.professionalismScore" readonly></Input></Col>
            <Col span="8" align="center">团队合作&nbsp;&nbsp;<Input v-model="reportData.teamScore" readonly></Input></Col>
          </Row>
          <Row style="margin: 20px;">
            <Col span="24" align="right">总评分：{{reportData.totalScore}}</Col>
          </Row>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WholeDaily',
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
            key: 'name',
            align: 'center'
          },
          {
            title: '汇报时间',
            key: 'dailyTime',
            align: 'center'
          },
          {
            title: '状态',
            key: 'state',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center'
          },
          {
            title: '评分',
            key: 'score',
            align: 'center'
          }
        ],
        listData: [],
        showDetail: false,
        current: 1,
        total: 0,
        reportData: {
          'workPlanOne': '',
          'workPlanTwo': '',
          'workPlanThree': '',
          'workPlanFour': '',
          'workPlanFive': '',
          'workPlanSix': '',
          'workPlanSeven': '',
          'workPlanEigth': '',
          'workOne': '',
          'workTwo': '',
          'workThree': '',
          'workFour': '',
          'workFive': '',
          'workSix': '',
          'workSeven': '',
          'workEigth': '',
          'workResultOne': '',
          'workResultTwo': '',
          'workResultThree': '',
          'workResultFour': '',
          'workResultFive': '',
          'workResultSix': '',
          'workResultSeven': '',
          'workResultEigth': '',
          'selfRatingOne': '',
          'selfRatingTwo': '',
          'selfRatingThree': '',
          'selfRatingFour': '',
          'selfRatingFive': '',
          'selfRatingSix': '',
          'selfRatingSeven': '',
          'selfRatingEigth': '',
          'supervisorRatingOne': '',
          'supervisorRatingTwo': '',
          'supervisorRatingThree': '',
          'supervisorRatingFour': '',
          'supervisorRatingFive': '',
          'supervisorRatingSix': '',
          'supervisorRatingSeven': '',
          'supervisorRatingEigth': '',
          'checkRatingOne': '',
          'checkRatingTwo': '',
          'checkRatingThree': '',
          'checkRatingFour': '',
          'checkRatingFive': '',
          'checkRatingSix': '',
          'checkRatingSeven': '',
          'checkRatingEigth': '',
          'selfBehavior': '',
          'selfEnvironmental': '',
          'selfSave': '',
          'selfCommunication': '',
          'selfAppearance': '',
          'selfDiscipline': '',
          'supervisorBehavior': '',
          'supervisorEnvironmental': '',
          'supervisorSave': '',
          'supervisorCommunication': '',
          'supervisorAppearance': '',
          'supervisorDiscipline': '',
          'checkBehavior': '',
          'checkEnvironmental': '',
          'checkSave': '',
          'checkCommunication': '',
          'checkAppearance': '',
          'checkDiscipline': '',
          'selfJobInitiative': '',
          'selfCooperation': '',
          'selfDedicated': '',
          'selfOrganization': '',
          'supervisorJobInitiative': '',
          'supervisorCooperation': '',
          'supervisorDedicated': '',
          'supervisorOrganization': '',
          'checkJobInitiative': '',
          'checkCooperation': '',
          'checkDedicated': '',
          'checkOrganization': '',
          'tomorrowPlan': '',
          'worklogScore': '',
          'professionalismScore': '',
          'teamScore': '',
          'totalScore': ''
        }
      }
    },
    methods: {
      func (event) {},
      //  获取列表数据
      getListDate (id) {
        this.$ajax({
          method: 'get',
          url: '/dailyreport/detils/' + id + '?pageNum=' + this.current + '&pageSize=10&userId=' + this.storeData.userId + '&startTime=' + this.storeData.startTime + '&endTime=' + this.storeData.endTime
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
          url: '/dailyreport/' + row.dailyid
        }).then((res) => {
          console.log('日报展示', res.data)
          let result = res.data.data
          if (res.data.code === '000000') {
            this.showDetail = true
            this.reportData = result
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
  .whole-daily{
  /*padding: 16px;*/
  .card {
  table {
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
  }
  }
</style>
<style>
  textarea {
    overflow: hidden;
    resize: none;
    height: 57px;
  }
</style>
