<template>
  <div class="no-rate-weekly">
    <Card>
      <p slot="title" style="text-align: center;">本周工作总结</p>



      <Row>
        <Col span="12" style="text-align: center;">
        开始时间 <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col span="12" style="text-align: center;">
        结束时间 <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
      </Row>



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
      <Row style="margin: 20px;">
        <Col span="24" align="center">
          <Button type="primary" style="margin-right: 20px;">发送</Button>
          <Button type="primary">取消</Button>
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
      msg: '待评分周报'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.no-rate-weekly{
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
