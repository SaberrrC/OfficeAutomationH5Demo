<template>
	<div class="notice-to">
		<Card>
			<div slot="title">
				<i-form :label-width="80">
					<Row>
						<Col span="6">
						<FormItem label="公告类型">
							<i-select v-model="noticeType" placeholder="请选择状态">
								<Option v-for="item in noticeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="发布日期">
							<i-select v-model="dateFilter" placeholder="请选择状态">
								<Option v-for="item in dateFilterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="公告类别">
							<i-select v-model="noticeClass" placeholder="请选择状态">
								<Option v-for="item in noticeClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="首页展示">
							<i-select v-model="isHomeShow" placeholder="请选择状态">
								<Option v-for="item in isHomeShowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</i-select>
						</FormItem>
						</Col>
					</Row>
				</i-form>
			</div>
			<div class="container">
				<Table height="450" :columns="columns" :data="data"></Table>
				<br>
				<Page :total="total" :current="pageNum" @on-change="handPageChange" :on-page-size-change="handPageSizeChange" show-sizer show-total></Page>
			</div>
		</Card>
	</div>
</template>

<script>
	export default {
	  name: 'NoticeTo',
	  data () {
	    return {
	      isHomeShow: 0,
	      noticeType: 0,
	      noticeClass: 0,
	      dateFilter: 0,
	      isHomeShowList: [{
	        value: 0,
	        label: '全部'
	      }, {
	        value: 1,
	        label: '展示'
	      }, {
	        value: 2,
	        label: '不展示'
	      }],
	      noticeTypeList: [{
	        value: 0,
	        label: '全部'
	      }, {
	        value: 1,
	        label: '公司公告'
	      }, {
	        value: 2,
	        label: '部门公告'
	      }],
	      noticeClassList: [{
	        value: 0,
	        label: '全部'
	      }, {
	        value: 1,
	        label: '通知'
	      }, {
	        value: 2,
	        label: '表彰'
	      }, {
	        value: 3,
	        label: '活动'
	      }],
	      dateFilterList: [{
	        value: 0,
	        label: '全部'
	      }, {
	        value: 1,
	        label: '今天'
	      }, {
	        value: 2,
	        label: '近三天'
	      }, {
	        value: 3,
	        label: '近一周'
	      }, {
	        value: 4,
	        label: '近一个月'
	      }],
	      total: 0,
	      pageNum: 1,
	      pageSize: 10,
	      columns: [{
	        title: '标题',
	        key: 'title'
	      }, {
	        title: '类型',
	        key: 'noticeType',
	        sortable: true,
	        render: (h, params) => {
	          return h('div', [
	            this.noticeTypeFormat(params.row.noticeType)
	          ])
	        }
	      }, {
	        title: '公告类别',
	        key: 'noticeClass',
	        sortable: true,
	        render: (h, params) => {
	          return h('div', [
	            this.noticeClassFormat(params.row.noticeClass)
	          ])
	        }
	      }, {
	        title: '发布日期',
	        key: 'createTime',
	        sortable: true,
	        render: (h, params) => {
	          return h('div', [
	            this.dateFormat(params.row.createTime)
	          ])
	        }
	      }, {
	        title: '首页展示',
	        key: 'isHomepageShow',
	        sortable: true,
	        render: (h, params) => {
	          return h('div', [
	            h('i-switch', {
	              props: {
	                value: params.row.isHomepageShow === 1
	              },
	              on: {
	                'on-change': (status) => {
	                  this.showHomeChange(status, params)
	                }
	              }
	            }, params.row.showHome)
	          ])
	        }
	      }, {
	        title: '操作',
	        key: 'id',
	        render: (h, params) => {
	          return h('div', [
	            h('Button', {
	              props: {
	                type: 'primary',
	                size: 'small'
	              },
	              on: {
	                click: () => {
	                  this.tableRowClick(params.row, params.index)
	                }
	              }
	            }, '查看详情')
	          ])
	        }
	      }],
	      data: []
	    }
	  },
	  methods: {
	// 点击页码切换
	    handPageChange (val) {
	      this.pageNum = val
	      this.getNoticeData()
	    },

	// 每页显示条数切换
	    handPageSizeChange (val) {
	      this.pageSize = val
	      this.getNoticeData()
	    },
	    noticeTypeFormat (ele) {
	      switch (ele) {
	        case 1:
	          return '公司公告'
	        case 2:
	          return '部门公告'
	        default:
	          return ''
	      }
	    },
	    noticeClassFormat (ele) {
	      switch (ele) {
	        case 1:
	          return '通知'
	        case 2:
	          return '表彰'
	        case 3:
	          return '活动'
	        default:
	          return ''
	      }
	    },

	    dateFormat (ele) {
	      var date = new Date(ele)
	      var y = date.getFullYear()
	      var m = date.getMonth() + 1
	      m = m < 10 ? '0' + m : m
	      var d = date.getDate()
	      d = d < 10 ? ('0' + d) : d
	      return y + '-' + m + '-' + d
	    },
	    getNoticeData () {
	      this.$ajax({
	        method: 'get',
	        url: '/notice',
	        headers: {
	          token: '73bd4ae0e7f54219aea15e6183d3ed1a',
	          uid: '960'
	        },
	        params: {
	          page: this.pageNum,
	          limit: this.pageSize,
	          dateFilter: this.dateFilter,
	          noticeType: this.noticeType,
	          noticeClass: this.noticeClass,
	          isHomeShow: this.isHomeShow
	        }
	      }).then((res) => {
	        if (res.data.code === '000000') {
	          this.data = res.data.data.data
	          this.total = res.data.data.total
	        } else {
	          this.$Message.error(res.data.message)
	        }
	      }, (res) => {})
	    },
	// 首页展示开关切换
	    showHomeChange (status, params) {
	      this.$ajax({
	        method: 'post',
	        url: '/notice/noticeIsShowHome',
	        headers: {
	          token: '73bd4ae0e7f54219aea15e6183d3ed1a',
	          uid: '960'
	        },
	        data: {
	          id: params.row.id,
	          isHomepageShow: status ? 1 : 2
	        }
	      }).then((res) => {
	        if (res.data.code === '000000') {
	          this.getNoticeData()
	        } else {
	          this.$Message.error(res.data.message)
	        }
	      }, (res) => {})
	    },
	    tableRowClick (row, index) {
	      if (row.noticeType === 1) {
	        this.$router.push({
	          name: 'NoticeCompanyDetail',
	          params: {
	            id: row.id,
	            type: 2
	          }
	        })
	      }
	      if (row.noticeType === 2) {
	        this.$router.push({
	          name: 'NoticeDepartmentDetail',
	          params: {
	            id: row.id,
	            type: 2
	          }
	        })
	      }
	    }
	  },
	  watch: {
	    isHomeShow () {
	      this.getNoticeData()
	    },

	    noticeType () {
	      this.getNoticeData()
	    },

	    noticeClass () {
	      this.getNoticeData()
	    },

	    dateFilter () {
	      this.getNoticeData()
	    }
	  },
	  mounted () {
	    this.getNoticeData()
	  }
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.notice-to {
		padding: 16px;
	}
</style>
