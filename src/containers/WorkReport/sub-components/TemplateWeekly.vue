<template>
  <div class="work-report-weekly">
    <Card>
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
      <Row>
        <Col span="24">
          <Button type="primary" style="float:right;margin-top: 20px;">添加一行</Button>
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
            <th>备注（选填</th>
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
      <Row>
        <Col span="24">
        <Button type="primary" style="float:right;margin-top: 20px;">添加一行</Button>
        </Col>
      </Row>


      <Row>
        <Col span="24">
          <p class="btn">
            <Button type="info">保存</Button>
            <Button type="warning">取消</Button>
            <Button type="success">使用</Button>
          </p>
        </Col>
      </Row>
    </Card>

  </div>
</template>

<script>
export default {
  name: 'WorkReportWeekly',
  data () {
    return {
    }
  },
  created () {
    console.log('##### WorkReportWeekly created')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.work-report-weekly {
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

