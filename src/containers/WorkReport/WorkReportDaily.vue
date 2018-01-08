<template>
	<div class="work-report-daily">
    <Row style="background-color: white;height: 53px;padding-top: 10px;padding-left: 16px;">
      <Col span="24">
      日期
      <DatePicker :options="options" type="date" placeholder="Select date" style="width: 200px" v-model="reportTime" format="yyyy-MM-dd" @on-change="changeTime" :clearable="false"></DatePicker>
      </Col>
    </Row>
    <div style="padding: 16px;">
		<Card shadow>
			<Modal v-model="showDraft" title="信息" @on-ok="drawDraft">
				<p>是否导入草稿？</p>
			</Modal>
      <Modal
        v-model="cancel"
        title="信息"
        >
        <p>是否放弃当前编辑</p>
      </Modal>
			<p slot="title" style="text-align: center;">
				日工作汇报
			</p>
			<div slot="extra">

			</div>
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
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="9"> 工 <br/> 作 <br/> 日 <br/> 志 </td>
								<td class="record_time">9:00-10:00</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workPlanOne" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workOne" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workResultOne" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="workSelf.selfRatingOne" :maxlength="50"></Input>
								</td>
							</tr>
							<tr>
								<td>10:00-11:00</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workPlanTwo" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workTwo" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workResultTwo" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="workSelf.selfRatingTwo" :maxlength="50"></Input>
								</td>
							</tr>
							<tr>
								<td>11:00-12:00</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workPlanThree" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workThree" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="textAreaData.workResultThree" :maxlength="50"></Input>
								</td>
								<td>
									<Input type="textarea" placeholder="" v-model="workSelf.selfRatingThree" :maxlength="50"></Input>
								</td>
              </tr>
              <tr>
                <td>13:00-14:00</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workPlanFour" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workFour" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workResultFour" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="workSelf.selfRatingFour" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>14:00-15:00</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workPlanFive" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workFive" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workResultFive" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="workSelf.selfRatingFive" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>15:00-16:00</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workPlanSix" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workSix" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workResultSix" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="workSelf.selfRatingSix" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>16:00-17:00</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workPlanSeven" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workSeven" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workResultSeven" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="workSelf.selfRatingSeven" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>17:00-17:30</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workPlanEigth" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workEigth" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="textAreaData.workResultEigth" :maxlength="50"></Input>
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="workSelf.selfRatingEigth" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td style="text-align: center">
                  <Button type="error" size="small" @click="oneKey(workSelf,'优秀')">优秀</Button>
                  <Button type="warning" size="small" @click="oneKey(workSelf,'良好')">良好</Button>
                  <Button type="success" size="small" @click="oneKey(workSelf,'一般')">一般</Button>
                </td>
              </tr>
              <tr>
                <td rowspan="7"> 职 <br/> 业 <br/> 素 <br/> 养 </td>
                <td>1.个人言行</td>
                <td colspan="3" style="text-align: left;"> 言行一致，不弄虚作假，不搬弄是非，清正廉洁，遵守各项法律规章制度，有原则性，不徇私舞弊，以权谋私</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="professionSelf.selfBehavior" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>2.环境卫生</td>
                <td colspan="3" style="text-align: left;"> 保持个人工作环境干净整洁,无灰尘无死角,桌面地面无纸屑杂物,办公用品摆放整齐</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="professionSelf.selfEnvironMental" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>3.节约</td>
                <td colspan="3" style="text-align: left;"> 成本意识强烈，能积极节省，避免浪费</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="professionSelf.selfSave" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>4.沟通协调能力</td>
                <td colspan="3" style="text-align: left;"> 善于根据不同对象营造恰当的氛围表达顾虑</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="professionSelf.selfCommunication" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>5.仪容仪表</td>
                <td colspan="3" style="text-align: left;"> 仪容干净整洁，按规定着装，配戴胸卡，仪表端庄大方，言谈有度，举止得体</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="professionSelf.selfAppearance" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>6.工作纪律</td>
                <td colspan="3" style="text-align: left;"> 工作时间不看与工作无关的图书，不玩手机，不闲聊，不听音乐，不打游戏，不浏览与工作无关的网页，不以办公事为由出门办理个人私事
                </td>
                <td>
                  <Input type="textarea" placeholder="" v-model="professionSelf.selfDiscipline" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td style="text-align: center">
                  <Button type="error" size="small" @click="oneKey(professionSelf,'优秀')">优秀</Button>
                  <Button type="warning" size="small" @click="oneKey(professionSelf,'良好')">良好</Button>
                  <Button type="success" size="small" @click="oneKey(professionSelf,'一般')">一般</Button>
                </td>
              </tr>
              <tr>
                <td rowspan="5"> 团 <br/> 队 <br/> 合 <br/> 作 </td>
                <td>1.工作主动性</td>
                <td colspan="3" style="text-align: left;"> 能经常主动了解他人的服务需求，并提供需要的服务</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="teamSelf.selfJobInitiative" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>2.合作性</td>
                <td colspan="3" style="text-align: left;"> 团结同事，乐于助人，以大局为重</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="teamSelf.selfCooperation" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>3.敬业精神</td>
                <td colspan="3" style="text-align: left;"> 有较强的事业心和责任心，积极主动，勤奋敬业</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="teamSelf.selfDedicated" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td>4.服从组织安排</td>
                <td colspan="3" style="text-align: left;"> 服从组织安排，组织所交代的工作必须有速度有效率的完成</td>
                <td>
                  <Input type="textarea" placeholder="" v-model="teamSelf.selfOrganization" :maxlength="50"></Input>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td style="text-align: center">
                  <Button type="error" size="small" @click="oneKey(teamSelf,'优秀')">优秀</Button>
                  <Button type="warning" size="small" @click="oneKey(teamSelf,'良好')">良好</Button>
                  <Button type="success" size="small" @click="oneKey(teamSelf,'一般')">一般</Button>
                </td>
              </tr>
              <tr>
                <td> 明 <br/> 日 <br/> 计 <br/> 划 </td>
                <td>工作任务或工作目标</td>
                <td colspan="4">
                  <Input type="textarea" placeholder="" height="200px" v-model="textAreaData.tomorrowPlan" :maxlength="800"></Input>
                </td>
              </tr>
						</tbody>
					</table>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<p class="leader">
						<span>接收人：{{leaderName}}</span>
						<Button type="info" size="small" @click="switchLeader"><Icon type="plus-round"></Icon></Button>
						<Modal v-model="showLeader" title="接收人">
							<p>
								<Input v-model="leadname" placeholder="搜索" style="width: 200px"></Input>
								<Button type="info" @click="getLeaderList">搜索</Button>
							</p>
							<p style="margin-top: 20px;">
								<Table height="325" :columns="columns" :data="leaderList" @on-row-click="changeLeader"></Table>
							</p>
							<div slot="footer"></div>
						</Modal>
					</p>
					<p class="btn">
						<Button type="info" @click="cancel=true">取消</Button>
						<Button type="info" @click="saveDraft">存草稿</Button>
						<Button type="info" @click="submitReport" :loading="loading">提交</Button>
					</p>
					</Col>
				</Row>
			</div>
		</Card>
    </div>
	</div>
</template>

<script>
export default {
  name: 'WorkReportDaily',
  data () {
    return {
      loading: false,
      options: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      showDraft: false,
      cancel: false,
      //  工作日志数据
      textAreaData: {
        workPlanOne: '',
        workPlanTwo: '',
        workPlanThree: '',
        workPlanFour: '',
        workPlanFive: '',
        workPlanSix: '',
        workPlanSeven: '',
        workPlanEigth: '',
        workOne: '',
        workTwo: '',
        workThree: '',
        workFour: '',
        workFive: '',
        workSix: '',
        workSeven: '',
        workEigth: '',
        workResultOne: '',
        workResultTwo: '',
        workResultThree: '',
        workResultFour: '',
        workResultFive: '',
        workResultSix: '',
        workResultSeven: '',
        workResultEigth: '',
        tomorrowPlan: ''
      },
      //  工作日志自评
      workSelf: {
        selfRatingOne: '',
        selfRatingTwo: '',
        selfRatingThree: '',
        selfRatingFour: '',
        selfRatingFive: '',
        selfRatingSix: '',
        selfRatingSeven: '',
        selfRatingEigth: ''
      },
      //  职业素养自评
      professionSelf: {
        selfBehavior: '',
        selfEnvironMental: '',
        selfSave: '',
        selfCommunication: '',
        selfAppearance: '',
        selfDiscipline: ''
      },
      //  团队合作自评
      teamSelf: {
        selfJobInitiative: '',
        selfCooperation: '',
        selfDedicated: '',
        selfOrganization: ''
      },
      //  汇报日期
      reportTime: this.getTime(new Date()),
      //  接收人姓名
      leadusername: '',
      leadname: '',
      leaderName: '',
      leaderId: '',
      showLeader: false,
      columns: [{
        title: '姓名',
        key: 'username'
      }, {
        title: '部门',
        key: 'organization'
      }, {
        title: '岗位',
        key: 'post'
      }],
      leaderList: [{
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }, {
        username: '丁通',
        organization: '技术部',
        post: '前端开发'
      }]
    }
  },
  methods: {
    //  默认获取当前时间,切换时间
    getTime (date) {
      let year = date.getFullYear()
      let mounth = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      return year + '-' + mounth + '-' + day
    },
    changeTime (e) {
      this.reportTime = e
      console.log(this.reportTime)
    },
    //  获取当前领导人
    getcurrentLeader () {
      this.$ajax({
        method: 'get',
        url: '/user/getCurrentLeader'
      }).then((res) => {
        console.log('当前领导人', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.leadusername = result.username
          this.leaderName = result.username + '———' + result.post
          this.leaderId = result.id
        } else {

        }
      }, (res) => {

      })
    },
    //  获取领导人列表，并展示，搜索领导人也是这个，无非是leadname有无值罢了
    getLeaderList () {
      this.$ajax({
        method: 'get',
        url: '/user/query/sameOrganization?username=' + this.leadname + '&pagesize=50&pagenum=1'
      }).then((res) => {
        console.log('领导人列表', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.leaderList = result.data
        } else {

        }
      }, (res) => {

      })
    },
    //  切换领导人
    changeLeader (row, index) {
      console.log('row', row)
      this.leadusername = row.username
      this.leaderName = row.username + '———' + row.post
      this.leaderId = row.id
      this.showLeader = false
    },
    //  点击加号
    switchLeader () {
      this.showLeader = true
      this.leadname = ''
      this.getLeaderList()
    },
    //  一键自评
    oneKey (typeData, btnStr) {
      for (let k in typeData) {
        typeData[k] = btnStr
      }
    },
    //  保存草稿
    saveDraft () {
      let data = {}
      data = Object.assign(data, this.textAreaData, this.workSelf, this.professionSelf, this.teamSelf)
      this.$ajax({
        method: 'post',
        url: '/workreportdraft/addDraft',
        data: data
      }).then((res) => {
        console.log('保存草稿', res.data)
        // var result = res.data.data
        if (res.data.code === '000000') {
          this.$Message.success('保存成功')
        } else {

        }
      }, (res) => {

      })
    },
    //  判断是否有模板 ，如果有则渲染
    getTempData () {
      this.$ajax({
        method: 'get',
        url: '/templateManage/selectWorkChildTemplate?childId=' + this.$route.params.childId
      }).then((res) => {
        console.log('草稿数据', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.commonExtend(this.textAreaData, JSON.parse(result.reportContent))
          this.commonExtend(this.textAreaData, JSON.parse(result.workResult))
          this.textAreaData.tomorrowPlan = result.tomorrowPlan
          this.commonExtend2(this.workSelf, JSON.parse(result.selfRating))
          this.commonExtend2(this.professionSelf, JSON.parse(result.selfRating))
          this.commonExtend2(this.teamSelf, JSON.parse(result.selfRating))
        } else {

        }
      }, (res) => {

      })
    },
    //  查询草稿,有则提示
    getDraft () {
      this.$ajax({
        method: 'get',
        url: '/workreportdraft/selectWorkDraftByUserId?userId=' + window.localStorage.getItem('uid')
      }).then((res) => {
        console.log('草稿数据', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.showDraft = true
          console.log(JSON.parse(result.reportContent))
          console.log(JSON.parse(result.selfRating))
          console.log(result.tomorrowPlan)
          console.log(JSON.parse(result.workResult))
          this.drawDraft = () => {
            this.commonExtend(this.textAreaData, JSON.parse(result.reportContent))
            this.commonExtend(this.textAreaData, JSON.parse(result.workResult))
            this.textAreaData.tomorrowPlan = result.tomorrowPlan
            this.commonExtend2(this.workSelf, JSON.parse(result.selfRating))
            this.commonExtend2(this.professionSelf, JSON.parse(result.selfRating))
            this.commonExtend2(this.teamSelf, JSON.parse(result.selfRating))
          }
        } else {

        }
      }, (res) => {

      })
    },
    //  渲染草稿方法
    drawDraft () {

    },
    commonExtend (obj, obj2) {
      //  将obj2中有的，赋值给obj,谁少循环谁
      for (let k in obj2) {
        obj[k] = obj2[k]
      }
    },
    commonExtend2 (obj, obj2) {
      for (let k in obj) {
        obj[k] = obj2[k]
      }
    },
    //  提交日报
    submitReport () {
      let data = {}
      data = Object.assign(data, this.textAreaData, this.workSelf, this.professionSelf, this.teamSelf)
      data.checkman = this.leadusername
      data.checkmanId = this.leaderId
      data.supervisor = this.leadusername
      data.supervisorId = this.leaderId
      data.time = this.getTime(this.reportTime)
      console.log(data)
      for (let k in data) {
        if (!data.checkmanId) {
          this.$Message.error({
            content: '请选择接收人'
          })
          return
        }
        if (!data[k]) {
          this.$Message.error({
            content: '当前还有未填写的日报内容，请检查'
          })
          return
        }
      }
      this.loading = true
      if (this.$route.params.id) {
        //  编辑的提交
        data.dailyId = this.$route.params.id
        this.$ajax({
          method: 'put',
          url: '/upddailyreport',
          data: data
        }).then((res) => {
          console.log('编辑提交日报', res.data)
          // var result = res.data.data
          if (res.data.code === '000000') {
            this.loading = false
            this.$Message.success('提交成功')
            location.hash = '/work_report/my_report/myReportList'
          } else {
            this.loading = false
            this.$Message.error(res.data.message)
          }
        }, (res) => {
          this.loading = false
        })
      } else {
        this.$ajax({
          method: 'post',
          url: '/dailyreport',
          data: data
        }).then((res) => {
          console.log('提交日报', res.data)
          // var result = res.data.data
          if (res.data.code === '000000') {
            this.loading = false
            this.$Message.success('提交成功')
            location.hash = '/work_report/my_report/myReportList'
          } else {
            this.loading = false
            this.$Message.error(res.data.message)
          }
        }, (res) => {
          this.loading = false
        })
      }
    },
    //  编辑数据
    getEditData (id) {
      this.$ajax({
        method: 'get',
        url: '/dailyreport/' + id
      }).then((res) => {
        console.log('日报展示', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.reportTime = new Date(result.time)
          this.commonExtend2(this.textAreaData, result)
          this.commonExtend2(this.workSelf, result)
          this.commonExtend2(this.professionSelf, result)
          this.commonExtend2(this.teamSelf, result)
        } else {
        }
      }, (res) => {
      })
    }
  },
  created () {
    console.log('##### WorkReportDaily created')
  },
  mounted () {
    this.getcurrentLeader() // 当前领导人
    this.getLeaderList() //  领导人列表
    if (this.$route.params.childId) {
      //  使用了模板
      this.getTempData()
      this.getDraft()
      return
    }
    if (this.$route.params.id) {
      //  编辑入口
      this.getEditData(this.$route.params.id)
      return
    }
    this.getDraft()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-daily {
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
			.leader,
			.btn {
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
