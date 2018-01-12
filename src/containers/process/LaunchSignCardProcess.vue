<template>
  <!--发起签卡申请页面-->
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col span="3">
          <h3 @click="pageClose()" style="padding: 0 5px"><Button type="text" icon="close-round"></Button></h3>
        </i-Col>
        <i-Col span="3" offset="18" style="text-align: right;padding-right: 16px">
          <Button type="primary" @click="submitEvectionApply()">提交</Button>
        </i-Col>
      </Row>
    </span>
    </p>
    <div class="work-report-daily">
      <!--签卡申请-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>签卡申请</h3>
            </div>
          </i-Col>
        </Row>
        <Form ref="billTitle" :model="billTitle"  :rules="ruleBillTitle" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card" style="padding-bottom: 2px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="签卡编码">
                        <span>{{ billTitle.billCode }}</span>　
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card" style="padding-bottom: 2px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="申请日期">
                        <span>{{ billTitle.applyDate }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
        </Form>
      </div>

      <!--签卡明细-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>签卡明细</h3>
            </div>
          </i-Col>
          <Form ref="billDetail" :model="billDetail" :rules="rulebillDetail" :label-width="82" label-position="left">
          <Row>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="签卡时间" prop="signTime">
                      <DatePicker
                        v-model="billDetail.signTime"
                        type="datetime"
                        :options="options"
                        :editable="false"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择签卡时间">
                      </DatePicker>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="签卡原因" prop="signCause">
                      <Select v-model="billDetail.signCauseId" :label-in-value="true"  @on-change="v =>{ setOption(v,'billDetail')}">
                        <Option v-for="(item,key) in type" :value="item.id" :key="item.id">{{item.name}}</Option>
                      </Select>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
          </Row>
          <Row>
            <i-Col>
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="签卡说明" prop="signRemark">
                      <Input placeholder="请填写签卡说明" v-model="billDetail.signRemark"></Input>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
          </Row>
          </Form>
        </Row>
      </div>
      <!--添加签卡明细-->
      <div v-show="showAddBill">
        <Row>
          <i-Col>
            <div class="title">
              <h3>签卡明细</h3>
            </div>
          </i-Col>
          <Form ref="addBill" :model="addBill" :rules="ruleaddBill" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="签卡时间" prop="signTime">
                        <DatePicker
                          v-model="addBill.signTime"
                          type="datetime"
                          :options="options"
                          :editable="false"
                          placeholder="请选择签卡时间">
                        </DatePicker>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="签卡原因" prop="signCause">
                        <Select v-model="addBill.signCauseId" :label-in-value="true"  @on-change="v =>{ setOption(v,'add')}">
                          <Option v-for="(item,key) in type" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
            <Row>
              <i-Col>
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="签卡说明" prop="signRemark">
                        <Input placeholder="请填写签卡说明" v-model="addBill.signRemark"></Input>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
          </Form>
        </Row>
      </div>
      <!--添加/取消添加按钮-->
      <Row>
        <i-Col>
          <div class="card" style="text-align: center">
            <p>
              <Button icon="plus" type="text" style="color:#2d8cf0" @click="addBillDeatil()" v-show="showAddbillButton">
                添加签卡明细
              </Button>
              <Button icon="minus" type="text" style="color:#ed3f14" @click="deleteBillDeatil()" v-show="showDeletebillButton">
                删除签卡明细
              </Button>
            </p>
          </div>
        </i-Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LaunchSignCard',
    data () {
      return {
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        },
        showAddBill: false,
        showAddbillButton: true,
        showDeletebillButton: false,
        billTitle: {
          billCode: '',          // 签卡单号
          applyDate: ''          // 申请日期
        },
        type: [],              // 签卡原因
        nCHREvectionApplyDeatil: [],               // 签卡明细
        billDetail: {
          signTime: this.$route.query.date ? this.$route.query.date : '',          // 签卡时间
          signRemark: '',        // 签卡说明
          signCause: '',         // 签卡原因
          signCauseId: ''          // 签卡原因ID
        },
        addBill: {
          signTime: '',      // 签卡时间
          signRemark: '',    // 签卡说明
          signCause: '',     // 签卡原因
          signCauseId: ''    // 签卡原因ID

        },
        duration: '',          // 时长(单位)
        ruleBillTitle: {
          type: [
            { required: true, message: '请选择签卡类型', trigger: 'change' }
          ]
        },
        rulebillDetail: {
          signTime: [
            { required: true, type: 'date', message: '请选择签卡时间', trigger: 'change' }
          ],
          signRemark: [
            { required: true, message: '请输入签卡说明', trigger: 'blur' }
          ],
          signCause: [
            { required: true, message: '请选择签卡原因', trigger: 'blur' }
          ]
        },
        ruleaddBill: {
          signTime: [
            { required: true, type: 'date', message: '请选择签卡时间', trigger: 'change' }
          ],
          signRemark: [
            { required: true, message: '请输入签卡说明', trigger: 'blur' }
          ],
          signCause: [
            { required: true, message: '请选择签卡原因', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /*
      * 获取签卡单编号
      * */
      getBillCode () {
        this.$ajax.get(`/nchrcommon/getBillCode`, {
          params: {
            billType: '6402'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.billTitle.billCode = response.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    获取签卡原因
      getBillType () {
        this.$ajax.get(`/nchrSign/findSignReason`, {
        }).then((response) => {
          if (response.data.code === '000000') {
            var data = response.data.data
            var len = data.length
            for (var i = 0; i < len; i++) {
              data[i].id = data[i].SIGNCAUSEID
              data[i].name = data[i].SIGNCAUSE
            }
            this.type = response.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    获取当前日期
      getTime () {
        var myDate = new Date()
        var year = myDate.getFullYear()
        var mouth = myDate.getMonth()
        mouth = mouth === 0 ? 1 : mouth + 1
        var day = myDate.getDate()
        this.billTitle.applyDate = year + '-' + mouth + '-' + day
      },
//    选择签卡原因
      setOption (value, type) {
        if (type === 'billDetail') {
          this.billDetail.signCause = value.label
        }
        if (type === 'add') {
          this.addBill.signCause = value.label
        }
      },
//    点击确定按钮（提交）
      submitEvectionApply () {
        var step = true
        if (this.showAddBill === false) {
          //      验证签卡类型
          this.$refs.billTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证签卡明细
          this.$refs.billDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (this.showAddBill === true) {
          //      验证签卡类型
          this.$refs.billTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证签卡明细
          this.$refs.billDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
          //      验证添加明细
          this.$refs.addBill.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (step === true) {
          if (this.nCHREvectionApplyDeatil.length === 0 && this.showAddBill === false) {
            this.nCHREvectionApplyDeatil.push(this.billDetail)
          } else if (this.nCHREvectionApplyDeatil.length === 1 && this.showAddBill === true) {
            this.nCHREvectionApplyDeatil.push(this.addBill)
          }
        } else {
          return false
        }
//      调添加签卡申请接口   // TODO
        var len = this.nCHREvectionApplyDeatil.length
        for (var i = 0; i < len; i++) {
          var start = new Date(this.nCHREvectionApplyDeatil[i].signTime)
          var startYear = start.getFullYear()
          var startMouth = start.getMonth()
          startMouth = startMouth < 10 ? '0' + (startMouth + 1) : (startMouth + 1).toString()
          var startDate = start.getDate()
          startDate = startDate < 10 ? '0' + startDate : startDate.toString()
          var startHours = start.getHours()
          startHours = startHours < 10 ? '0' + startHours : startHours.toString()
          var startMinutes = start.getMinutes()
          startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes.toString()
          var startSeconds = start.getSeconds()
          startSeconds = startSeconds < 10 ? '0' + startSeconds : startSeconds.toString()
          start = startYear + '-' + startMouth + '-' + startDate + ' ' + startHours + ':' + startMinutes + ':' + startSeconds
          this.nCHREvectionApplyDeatil[i].signTime = start
        }
        var data = {
          date: this.billTitle.applyDate,
          monocode: this.billTitle.billCode,
          nchrSignDetails: this.nCHREvectionApplyDeatil
        }  // TODO 组装数据
        this.$ajax.post(`/nchrSign/saveSign`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.$Message.success('申请成功')
            this.$router.push({path: 'myLaunch'})
          } else {
            this.$Message.error(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击添加按钮
      addBillDeatil () {
        this.showAddBill = true
        this.showAddbillButton = false
        this.showDeletebillButton = true
        if (this.nCHREvectionApplyDeatil.length === 0) {
          this.nCHREvectionApplyDeatil.push(this.billDetail)
        }
        this.nCHREvectionApplyDeatil.push(this.addBill)
      },
//    点击取消添加
      deleteBillDeatil () {
        this.showAddBill = false
        this.showAddbillButton = true
        this.showDeletebillButton = false
        this.nCHREvectionApplyDeatil.splice(1, 1)
        this.addBill.signRemark = ''
        this.addBill.signCause = ''
        this.addBill.signCauseId = ''
        this.addBill.signTime = ''
      },
      pageClose () {
        this.$router.push({path: 'launchIndex'})
      }
    },
    created () {
      this.getBillCode()
      this.getBillType()
      this.getTime()
//      this.getTimeDifference()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .header {
    height: 53px;
    line-height: 53px;
    /*padding-left: 20px;*/
    background: #ffffff;
  }
  .header h3 {
    display: inline-block;
    padding:0 20px;
    border-right: solid 1px #ccc;
  }
  .title {
    padding: 0;
    border: 1px solid #eeeeee;
  }
  .title h3{
    height: 36px;
    line-height: 36px;
    background: #F5F6F8;
    padding-left: 16px;
  }
  .code-row-bg {
    text-align: center;
  }
  .card {
    border: 1px solid #eeeeee;
    padding-left: 16px;
    padding-top: 8px;
    background: #ffffff;
  }
</style>
