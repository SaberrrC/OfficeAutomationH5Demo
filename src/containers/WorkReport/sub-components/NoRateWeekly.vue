<template>
	<div class="no-rate-weekly">
		<Card shadow>
			<p slot="title" style="text-align: center;">本周工作总结</p>

			<Row>
				<Col span="12" style="text-align: center;"> 开始时间
				<DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px" format="yyyy-MM-dd" readonly></DatePicker>
				</Col>
				<Col span="12" style="text-align: center;"> 结束时间
				<DatePicker type="date" :value="endTime" placeholder="Select date" style="width: 200px" format="yyyy-MM-dd" readonly></DatePicker>
				</Col>
			</Row>

			<Row style="margin-top: 40px;">
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
				<Input type="textarea" placeholder="" v-model="checkManRating" :maxlength="800"></Input>
				</Col>
			</Row>
			<Row style="margin: 20px;">
				<Col span="24" align="center">
				<Button type="primary" style="margin-right: 20px;" @click="rateWeeklySubmit">发送</Button>
				<Button type="primary" @click="$router.push({path: '/work_report/no_rate/noRateList'})">取消</Button>
				</Col>
			</Row>
		</Card>
	</div>
</template>

<script>
export default {
  name: 'NoRateWeekly',
  data () {
    return {
      startTime: '',
      endTime: '',
      checkManRating: '',
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
      }]
    }
  },
  methods: {
    getRateData () {
      this.$ajax({
        method: 'post',
        url: '/weekreport/detail',
        data: {
          'id': this.$route.params.dailyid,
          'titleType': '2'
        }
      }).then((res) => {
        console.log('周报数据', res.data)
        let result = res.data.data
        if (res.data.code === '000000') {
          this.startTime = new Date(result.startTime)
          this.endTime = new Date(result.endTime)
          if (result.weeklySummary) {
            this.weeklySummary = result.weeklySummary
          }
          if (result.weekPlane) {
            this.nextWeekPlane = result.weekPlane
          }
        } else {

        }
      }, (res) => {

      })
    },
    rateWeeklySubmit () {
      let data = {
        id: this.$route.params.dailyid,
        checkManRating: this.checkManRating
      }
      this.$ajax({
        method: 'put',
        url: '/weekreport',
        data: data
      }).then((res) => {
        console.log('评价周报', res.data)
        // var result = res.data.data
        if (res.data.code === '000000') {
          this.$Message.success('评价成功')
          this.$router.push({
            path: '/work_report/no_rate/noRateList'
          })
        } else {
          this.$Message.error(res.data.message)
        }
      }, (res) => {

      })
    }
  },
  mounted () {
    this.getRateData()
  }
  /* activated () {
    this.getRateData()
  } */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.no-rate-weekly {
		padding: 16px;
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
