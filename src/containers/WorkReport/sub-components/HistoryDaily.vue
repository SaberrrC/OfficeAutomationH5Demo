<template>
  <div class="no-rate-daily">
    <Card>
      <p slot="title" style="text-align: center;">
        日工作汇报
      </p>
      <div slot="extra">
        日期
        <DatePicker type="date" placeholder="Select date" style="width: 200px" @on-open-change="func"></DatePicker>
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
                <th>监督人</th>
                <th>检查人</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="8"> 工 <br/> 作 <br/> 日 <br/> 志 </td>
                <td class="record_time">9:00-10:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>10:00-11:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>11:00-12:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>13:00-14:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>14:00-15:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>15:00-16:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>16:00-17:00</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>17:00-17:30</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td rowspan="6"> 职 <br/> 业 <br/> 素 <br/> 养 </td>
                <td>1.个人言行</td>
                <td colspan="3" style="text-align: left;"> 言行一致，不弄虚作假，不搬弄是非，清正廉洁，遵守各项法律规章制度，有原则性，不徇私舞弊，以权谋私</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>2.环境卫生</td>
                <td colspan="3" style="text-align: left;"> 保持个人工作环境干净整洁,无灰尘无死角,桌面地面无纸屑杂物,办公用品摆放整齐</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>3.节约</td>
                <td colspan="3" style="text-align: left;"> 成本意识强烈，能积极节省，避免浪费</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>4.沟通协调能力</td>
                <td colspan="3" style="text-align: left;"> 善于根据不同对象营造恰当的氛围表达顾虑</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>5.仪容仪表</td>
                <td colspan="3" style="text-align: left;"> 仪容干净整洁，按规定着装，配戴胸卡，仪表端庄大方，言谈有度，举止得体</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>6.工作纪律</td>
                <td colspan="3" style="text-align: left;"> 工作时间不看与工作无关的图书，不玩手机，不闲聊，不听音乐，不打游戏，不浏览与工作无关的网页，不以办公事为由出门办理个人私事
                </td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td rowspan="4"> 团 <br/> 队 <br/> 合 <br/> 作 </td>
                <td>1.工作主动性</td>
                <td colspan="3" style="text-align: left;"> 能经常主动了解他人的服务需求，并提供需要的服务</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>2.合作性</td>
                <td colspan="3" style="text-align: left;"> 团结同事，乐于助人，以大局为重</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>3.敬业精神</td>
                <td colspan="3" style="text-align: left;"> 有较强的事业心和责任心，积极主动，勤奋敬业</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td>4.服从组织安排</td>
                <td colspan="3" style="text-align: left;"> 服从组织安排，组织所交代的工作必须有速度有效率的完成</td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
                <td><Input type="textarea" placeholder=""></Input></td>
              </tr>
              <tr>
                <td> 明 <br/> 日 <br/> 计 <br/> 划 </td>
                <td>工作任务或工作目标</td>
                <td colspan="6">
                  <Input type="textarea" placeholder="" height="300px"></Input>
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
          <Col span="8" align="center">工作日志&nbsp;&nbsp;<InputNumber :max="60" :min="0" :step="0.5" v-model="value2"></InputNumber></Col>
          <Col span="8" align="center">职业素养&nbsp;&nbsp;<InputNumber :max="20" :min="0" :step="0.5" v-model="value2"></InputNumber></Col>
          <Col span="8" align="center">团队合作&nbsp;&nbsp;<InputNumber :max="20" :min="0" :step="0.5" v-model="value2"></InputNumber></Col>
        </Row>
        <Row style="margin: 20px;">
          <Col span="24" align="right">总评分：{{}}</Col>
        </Row>
        <Row style="margin: 20px;">
          <Col span="24" align="center">
            <Button type="primary" size="large">返回</Button>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'NoRateDaily',
  data () {
    return {
      value2: null
    }
  },
  methods: {
    func (event) {}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .no-rate-daily{
    padding: 16px;
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
