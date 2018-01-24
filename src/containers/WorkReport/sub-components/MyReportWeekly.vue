<template>
	<div class="work-report-weekly">
		<Row style="background-color: white;height: 53px;padding-top: 10px;padding-left: 16px;">
	      <Col span="24" align="left">
	      开始时间
	      <DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px;margin-right: 20px;" format="yyyy-MM-dd" readonly></DatePicker>
	      结束时间
	      <DatePicker type="date" :value="endTime" placeholder="Select date" style="width: 200px" format="yyyy-MM-dd" readonly></DatePicker>
	      </Col>
	    </Row>
    <div style="padding: 16px;">
		<Card shadow>
			<p slot="title" style="text-align: center;">本周工作总结</p>
			<Row>
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
						<tr v-for="(item, index) in weeklySummary">
							<td>
								<Input type="textarea" placeholder="" v-model="item.workPlan" readonly></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.work" readonly></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.difference" readonly></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.remark" readonly></Input>
							</td>
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

						<tr v-for="(item, index) in nextWeekPlane">
							<td>
								<Input type="textarea" placeholder="" v-model="item.nextWorkPlan" readonly></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.personLiable" readonly></Input>
							</td>
							<td>
								<Input type="textarea" placeholder="" v-model="item.remark" readonly></Input>
							</td>
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
        <Input type="textarea" placeholder="" v-model="checkmanRating"></Input>
        </Col>
      </Row>
			<Row>
				<Col span="24">
				<p class="leader">
					<span>接收人：{{this.checkmantext}}</span>

					<Button type="info" size="small"><Icon type="plus-round"></Icon></Button>
				</p>
				<p class="btn">
					<Button type="info" @click="goBack">返回</Button>
				</p>
				</Col>
			</Row>
		</Card>

		</div>
	</div>
</template>

<script>
export default {
  name: 'WorkReportWeekly',
  data () {
    return {
      startTime: '',
      endTime: '2017-12-12',
      checkmantext: '',
      checkman: '',
      checkmanId: '',
      searchName: '',
      checkmanRating: '',
      weeklySummary: [{
        workPlan: '',
        work: '',
        difference: '',
        remark: '',
        del: false
      }, {
        workPlan: '',
        work: '',
        difference: '',
        remark: '',
        del: false
      }, {
        workPlan: '',
        work: '',
        difference: '',
        remark: '',
        del: false
      }, {
        workPlan: '',
        work: '',
        difference: '',
        remark: '',
        del: false
      }],
      nextWeekPlane: [{
        nextWorkPlan: '',
        personLiable: '',
        remark: '',
        del: false
      }, {
        nextWorkPlan: '',
        personLiable: '',
        remark: '',
        del: false
      }, {
        nextWorkPlan: '',
        personLiable: '',
        remark: '',
        del: false
      }, {
        nextWorkPlan: '',
        personLiable: '',
        remark: '',
        del: false
      }],
      columns: [{
        title: '姓名',
        key: 'username'
      }, {
        title: '部门',
        key: 'organization'
      }, {
        title: '岗位',
        key: 'post'
      }]
    }
  },
  computed: {

  },
  methods: {
    //  获取周报数据
    getReportWeeklyData () {
      this.$ajax({
        method: 'post',
        url: '/weekreport/detail',
        data: {
          'id': this.$route.params.id,
          'titleType': '1'
        }
      }).then((res) => {
        console.log('获取周报数据', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.startTime = result.startTime
          this.endTime = result.endTime
          this.checkmantext = result.checkman + '———' + result.postName
          this.weeklySummary = result.weeklySummary
          this.nextWeekPlane = result.weekPlane
          this.checkmanRating = result.checkmainRating
        } else {

        }
      }, (res) => {

      })
    },
    //  返回
    goBack () {
      location.hash = '/work_report/my_report/myReportList'
    }
  },
  mounted () {
    this.getReportWeeklyData()
  },
  activated () {
    this.getReportWeeklyData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-weekly {
		/*padding: 16px;*/
	}

	h4 {
		text-align: center;
	}

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
</style>

<style>
	textarea {
		overflow: hidden;
		resize: none;
		height: 57px;
	}
</style>
