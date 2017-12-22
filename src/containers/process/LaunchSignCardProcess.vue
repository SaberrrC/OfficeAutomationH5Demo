<template>
  <!--发起签卡申请页面-->
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col span="3">
          <h3 @click="pageClose()"><Icon type="close-round"></Icon></h3>
        </i-Col>
        <i-Col span="3" offset="18">
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
                <div class="card" style="padding-bottom: 10px;">
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
                <div class="card" style="padding-bottom: 10px;">
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
                    <FormItem label="签卡时间" prop="startTime">
                      <DatePicker
                        v-model="billDetail.startTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择签卡时间"
                        @on-open-change="changeStartTime">
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
                    <FormItem label="签卡原因" prop="evectionRemark">
                      <Input placeholder="请填写签卡原因" v-model="billDetail.evectionRemark"></Input>
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
                    <FormItem label="签卡说明" prop="evectionAddress">
                      <Input placeholder="请填写签卡说明" v-model="billDetail.evectionAddress"></Input>
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
                      <FormItem label="签卡时间" prop="startTime">
                        <DatePicker
                          v-model="addBill.startTime"
                          type="datetime"
                          @on-open-change="changeAddStartTime"
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
                      <FormItem label="签卡原因" prop="evectionRemark">
                        <Input placeholder="请填写签卡原因" v-model="addBill.evectionRemark"></Input>
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
                      <FormItem label="签卡说明" prop="evectionAddress">
                        <Input placeholder="请填写签卡说明" v-model="addBill.evectionAddress"></Input>
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
  import qs from "qs"
  export default {
    name: 'WorkReportDaily',
    data () {
      const validateStartTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择签卡时间'))
        } else {
          if (this.billDetail.endTime !== '' && value > this.billDetail.endTime) {
            callback(new Error('开始时间不能大于结束时间!'))
          }
        }
      }
      const validateEndTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择结束时间'))
        } else if (value < this.billDetail.startTime) {
          callback(new Error('结束时间不能小于开始时间!'))
        } else {
          callback()
        }
      }
      return {
        showAddBill: false,
        showAddbillButton: true,
        showDeletebillButton: false,
        billTitle: {
          billCode: '',          // 签卡单号
          type: '',              // 签卡类别
          applyDate: ''          // 申请日期
        },
        type: [],              // 签卡类别
        nCHREvectionApplyDeatil: [],               // 签卡明细
        billDetail: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          evectionAddress: '',   // 签卡地点
          evectionRemark: '',    // 签卡原因
          handOverPepole: '',    // 工作交接人
          timeDifference: ''     // 时长
        },
        addBill: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          evectionAddress: '',   // 签卡地点
          evectionRemark: '',    // 签卡原因
          handOverPepole: '',    // 工作交接人
          timeDifference: ''     // 时长
        },
        duration: '',          // 时长(单位)
        ruleBillTitle: {
          type: [
            { required: true, message: '请选择签卡类型', trigger: 'change' }
          ]
        },
        rulebillDetail: {
          startTime: [
            { validator: validateStartTime, trigger: 'change' }
          ],
          endTime: [
            { validator: validateEndTime, trigger: 'change' }
          ],
          evectionAddress: [
            { required: true, message: '请输入签卡地点', trigger: 'blur' }
          ],
          evectionRemark: [
            { required: true, message: '请输入签卡原因', trigger: 'blur' }
          ],
          handOverPepole: [
            { required: true, message: '请选择交接人', trigger: 'blur' }
          ]
        },
        ruleaddBill: {
          startTime: [
            { required: true, type: 'date', message: '请选择签卡时间', trigger: 'change' }
          ],
          endTime: [
            { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
          ],
          evectionAddress: [
            { required: true, message: '请输入签卡地点', trigger: 'blur' }
          ],
          evectionRemark: [
            { required: true, message: '请输入签卡原因', trigger: 'blur' }
          ],
          handOverPepole: [
            { required: true, message: '请选择交接人', trigger: 'blur' }
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
            billType: '6403'
          },
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.billTitle.billCode = response.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    获取签卡类别
      getBillType () {
        this.$ajax.get(`/nchrEvection/queryBilltype`, {
          params: {
            itemtype: '2'
          },
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.type = response.data.data
          }
          console.log(this.type)
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
          if (this.nCHREvectionApplyDeatil.length === 0) {
            this.nCHREvectionApplyDeatil.push(this.billDetail)
          } else if (this.nCHREvectionApplyDeatil.length === 1) {
            this.nCHREvectionApplyDeatil.push(this.addBill)
          }
          console.log(this.nCHREvectionApplyDeatil)
        } else {
          return false
        }
//      调添加签卡申请接口   // TODO
        console.log(this.billTitle)
        var data = {
          applyDate: this.billTitle.applyDate,
          billCode: this.billTitle.billCode,
          type: this.billTitle.type,
          nCHREvectionApplyDeatil: this.nCHREvectionApplyDeatil
        }  // TODO 组装数据
        this.$ajax.post(`/nchrEvection/submitEvectionApply`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.$Message.success('申请成功')
          } else {
            this.$Message.error(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    选择签卡类型
      setOption (value, type) {
        if (value.label === '签卡') {
          this.duration = '天'
          if (this.billDetail.startTime !== '' && this.billDetail.endTime !== '') {
            // 判断开始时间小于结束时间
            if (this.billDetail.startTime < this.billDetail.endTime) {
              this.getTimeDifference(this.billDetail.startTime, this.billDetail.endTime, 'billDetail')
            }
          }
          if (this.showAddBill === true && this.addBill.startTime !== '' && this.addBill.endTime !== '') {
            this.getTimeDifference(this.addBill.startTime, this.addBill.endTime, 'add')
          }
        } else if (value.label === '外出') {
          this.duration = '小时'
          if (this.billDetail.startTime !== '' && this.billDetail.endTime !== '') {
            // 判断开始时间小于结束时间
            if (this.billDetail.startTime < this.billDetail.endTime) {
              this.getTimeDifference(this.billDetail.startTime, this.billDetail.endTime, 'billDetail')
            }
          }
          if (this.showAddBill === true && this.addBill.startTime !== '' && this.addBill.endTime !== '') {
            this.getTimeDifference(this.addBill.startTime, this.addBill.endTime, 'add')
          }
        }
      },
//    点击添加按钮
      addBillDeatil () {
//        this.nCHREvectionApplyDeatil.push(this.addBill)
        this.showAddBill = true
        this.showAddbillButton = false
        this.showDeletebillButton = true
        if (this.nCHREvectionApplyDeatil.length === 0) {              // TODO
          this.nCHREvectionApplyDeatil.push(this.billDetail)
        }
        this.nCHREvectionApplyDeatil.push(this.addBill)
        console.log(this.nCHREvectionApplyDeatil)
      },
//    点击取消添加
      deleteBillDeatil () {
        this.showAddBill = false
        this.showAddbillButton = true
        this.showDeletebillButton = false
        this.nCHREvectionApplyDeatil.splice(1, 1)
        this.addBill.startTime = '',
        this.addBill.endTime = '',
        this.addBill.evectionAddress = '',
        this.addBill.evectionRemark = '',
        this.addBill.handOverPepole = '',
        this.addBill.timeDifference = '',
        console.log(this.nCHREvectionApplyDeatil)
      },
//    开始时间改变(签卡明细)
      changeStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.billDetail.startTime !== '' && this.billDetail.endTime !== '') {
        // 判断开始时间小于结束时间
          if (this.billDetail.startTime < this.billDetail.endTime) {
            this.getTimeDifference(this.billDetail.startTime, this.billDetail.endTime, 'billDetail')
          }
        }
      },
//    结束时间改变(签卡明细)
      changeEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.billDetail.startTime !== '' && this.billDetail.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.billDetail.startTime < this.billDetail.endTime) {
            this.getTimeDifference(this.billDetail.startTime, this.billDetail.endTime, 'billDetail')
          }
        }
      },
      changeAddStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addBill.startTime !== '' && this.addBill.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addBill.startTime < this.addBill.endTime) {
            this.getTimeDifference(this.addBill.startTime, this.addBill.endTime, 'add')
          }
        }
      },
//    结束时间改变(签卡明细)
      changeAddEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addBill.startTime !== '' && this.addBill.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addBill.startTime < this.addBill.endTime) {
            this.getTimeDifference(this.addBill.startTime, this.addBill.endTime, 'add')
          }
        }
      },
//    获取时长
      getTimeDifference (startTime, endTime, type) {
          this.$refs.billTitle.validate((valid) => {
            if (valid) {
              var start = new Date(startTime)
              start = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds()
              var end = new Date(endTime)
              end = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds()
              this.$ajax.get(`/nchrcommon/queryDuration`, {
                params: {
                  startTime: start,
                  endTime: end,
                  type: '6403',
                  billCode: this.billTitle.billCode,
                  applyType: this.billTitle.type
                },
                headers: {
                  token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
                  uid: '84' //  TODO 临时测试
                }
              }).then((response) => {
                if (response.data.code === '000000') {
                  if (type === 'billDetail') {
                    this.billDetail.timeDifference = response.data.data
                  } else if (type === 'add') {
                    this.addBill.timeDifference = response.data.data
                  }
                }
              }).catch(function (err) {
                console.log(err)
              })
            }
          })
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
    height: 48px;
    line-height: 48px;
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
    padding-bottom: 8px;
    background: #ffffff;
  }

  .ivu-form-item {
    margin-bottom: 0;
  }

</style>
<style>
  .work-report-daily .ivu-form-item-error-tip {
    top: 15%;
    right: -94px;
    left:auto;
  }
</style>

