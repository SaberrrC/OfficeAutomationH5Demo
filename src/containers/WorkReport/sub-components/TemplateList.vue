<template>
	<div class="work-report-template">
		<Card shadow>
			<div slot="title" align="right">
				<Button type="primary" @click="tempmModal = true">新建模板</Button>
				<Modal v-model="tempmModal" title="添加模板" ok-text="添加" @on-ok="addTemp" @on-cancel="cancelTemp">
					<p style="margin-bottom: 20px;">
						模板类型
						<Select v-model="defaultType" style="width:300px;">
							<Option v-for="item in selectType" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</p>
					<p>
						模板名称
						<Input v-model="templateName" :maxlength="10" placeholder="请输入" style="width: 300px"></Input>
					</p>
				</Modal>
			</div>
			<Table height="450" :columns="columns" :data="listData" @on-row-click="toTempDetail"></Table>
		</Card>
	</div>
</template>

<script>
export default {
  name: 'work-report-template',
  data () {
    return {
      tempmModal: false,
      loading: true,
      selectType: [{
        value: '1',
        label: '日报'
      }, {
        value: '2',
        label: '周报'
      }],
      defaultType: '1',
      templateName: '',
      columns: [{
        title: '模板类型',
        align: 'center',
        key: 'templateType',
        render: (h, params) => {
          return h('div', [
            this.templateTypeFormat(params.row.templateType)
          ])
        }
      }, {
        title: '模板名称',
        align: 'center',
        key: 'templateName'
      }, {
        title: '更新日期',
        align: 'center',
        key: 'updateTime'
      }, {
        title: '操作',
        width: 200,
        key: 'operation',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: (e) => {
                  this.toUseTemp(params.row)
                  e.stopPropagation()
                }
              }
            }, '使用'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: (e) => {
                  this.delTemp(params.row.id)
                  e.stopPropagation()
                }
              }
            }, '删除')
          ])
        }
      }],
      listData: []
    }
  },
  methods: {
    templateTypeFormat (ele) {
      switch (ele) {
        case 1:
          return '日报'
        case 2:
          return '周报'
        default:
          return ''
      }
    },
    //  新增模版
    addTemp () {
      this.$ajax({
        method: 'post',
        url: '/templateManage/insertTemplate',
        data: {
          templateName: this.templateName,
          templateType: this.defaultType
        }
      }).then((res) => {
        console.log('新增模版数据', res.data)
        if (res.data.code === '000000') {
          this.getTempList()
          this.defaultType = '1'
          this.templateName = ''
        } else {
          this.$Message.error(res.data.message)
        }
      }, (res) => {

      })
    },
    cancelTemp () {
      this.defaultType = '1'
      this.templateName = ''
    },
    delTemp (id) {
      this.$ajax({
        method: 'get',
        url: '/templateManage/delTemplateByCid',
        params: {
          id: id
        }
      }).then((res) => {
        console.log('删除模版数据', res.data)
        if (res.data.code === '000000') {
          this.$Message.success('模板删除成功')
          this.getTempList()
        } else {

        }
      }, (res) => {

      })
    },
    toTempDetail (row) {
      if (row.templateType === 1) {
        this.$router.push({
          name: 'TemplateDaily',
          params: {
            id: row.id,
            childId: row.childId
          }
        })
      }
      if (row.templateType === 2) {
        this.$router.push({
          name: 'TemplateWeekly',
          params: {
            id: row.id,
            childId: row.childId
          }
        })
      }
    },
    toUseTemp (row) {
      if (row.templateType === 1) {
        this.$router.push({
          name: 'WorkReportDaily',
          params: {
            childId: row.childId
          }
        })
      }
      if (row.templateType === 2) {
        this.$router.push({
          name: 'WorkReportWeekly',
          params: {
            childId: row.childId
          }
        })
      }
    },
    //  获取模版列表
    getTempList () {
      this.$ajax({
        method: 'get',
        url: '/templateManage/selectTemplateByUserId?userId=' + window.localStorage.getItem('uid')
      }).then((res) => {
        console.log('模版数据', res.data)
        if (res.data.code === '000000') {
          this.listData = res.data.data
        } else {
          if (res.data.code === '020000') {
            this.listData = []
            this.total = 0
          }
        }
      }, (res) => {

      })
    }
  },
  mounted () {
    this.getTempList() // 当前领导人
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.work-report-template {
		padding: 16px;
	}
</style>

