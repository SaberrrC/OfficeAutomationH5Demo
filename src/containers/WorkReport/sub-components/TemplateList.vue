<template>
  <div class="work-report-template">
    <Card>
      <div slot="title" align="right">
        <Button type="primary" @click="modal6 = true">新建模板</Button>
        <Modal
          v-model="modal6"
          title="添加模板"
          :loading="loading"
          ok-text="添加"
          @on-ok="asyncOK">
          <p style="margin-bottom: 20px;">
            模板类型
            <Select v-model="defaultType" style="width:300px;">
              <Option v-for="item in selectType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
          <p>
            模板名称
            <Input v-model="templateName" placeholder="Enter something..." style="width: 300px"></Input>
          </p>
        </Modal>
      </div>
      <Table :columns="columns" :data="listData"></Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'work-report-template',
  data () {
    return {
      modal6: false,
      loading: true,
      selectType: [
        {
          value: '0',
          label: '日报'
        },
        {
          value: '1',
          label: '周报'
        }
      ],
      defaultType: '0',
      templateName: '',
      columns: [
        {
          title: '模板类型',
          align: 'center',
          key: 'type'
        },
        {
          title: '模板名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '更新日期',
          align: 'center',
          key: 'updateTime'
        },
        {
          title: '操作',
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
                  click: () => {
                    console.log(params)
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
                  click: () => {
                    console.log(params)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      listData: [
        {
          type: '日报',
          name: '日报2',
          updateTime: '2017-10-09'
        },
        {
          type: '日报',
          name: '日报2',
          updateTime: '2017-10-09'
        },
        {
          type: '日报',
          name: '日报2',
          updateTime: '2017-10-09'
        },
        {
          type: '日报',
          name: '日报2',
          updateTime: '2017-10-09'
        }
      ]
    }
  },
  methods: {
    newTemplate () {

    },
    asyncOK () {
      setTimeout(() => {
        this.modal6 = false
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.work-report-template{
  padding: 16px;
}
</style>
