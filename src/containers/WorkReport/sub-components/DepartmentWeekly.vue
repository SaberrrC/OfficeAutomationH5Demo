<template>
  <div class="whole-weekly">


    <Card>
      <p slot="title" style="text-align: center;">
        周工作汇报
      </p>
      <p slot="extra">
        <Button type="error">关闭</Button>
        <Button type="primary">
          <Icon type="chevron-left"></Icon>
        </Button>
        <Button type="primary">
          <Icon type="chevron-right"></Icon>
        </Button>
      </p>
      <Table :columns="columns" :data="listData"></Table>
    </Card>




    <Card>
      <Row  style="margin-top: 40px;">
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
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
          </tr>
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
          </tr>
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
          </tr>
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
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
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
          </tr>
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
          </tr>
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
          </tr>
          <tr>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
            <td><Input type="textarea" placeholder=""></Input></td>
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
        <Input type="textarea" placeholder=""></Input>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'WholeWeekly',
    data () {
      return {
        columns: [
          {
            title: '部门',
            key: 'department',
            align: 'center'
          },
          {
            title: '岗位',
            key: 'station',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '汇报时间',
            key: 'reportTime',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
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
                      this.showDetail = true
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        listData: [
          {
            department: '创新服务技术',
            station: '前端开发',
            name: '丁通',
            reportTime: '2017-10-03',
            status: '已评分',
            remark: ''
          },
          {
            department: '创新服务技术',
            station: '前端开发',
            name: '丁通',
            reportTime: '2017-10-03',
            status: '已评分',
            remark: ''
          },
          {
            department: '创新服务技术',
            station: '前端开发',
            name: '丁通',
            reportTime: '2017-10-03',
            status: '已评分',
            remark: ''
          },
          {
            department: '创新服务技术',
            station: '前端开发',
            name: '丁通',
            reportTime: '2017-10-03',
            status: '已评分',
            remark: ''
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .whole-weekly{
    padding: 16px;
  }
  h4{
    text-align: center;
  }
  table{
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
</style>
<style>
  textarea {
    overflow: hidden;
    resize: none;
    height: 57px;
  }
</style>
