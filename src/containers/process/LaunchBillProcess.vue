<template>
  <!--发起出差申请页面-->
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col span="3">
          <h3 @click="pageClose()" style="padding: 0 5px"><Button type="text" icon="close-round"></Button></h3>
        </i-Col>
        <i-Col span="3" offset="18">
          <Button type="primary" @click="submitEvectionApply()">提交</Button>
        </i-Col>
      </Row>
    </span>
    </p>
    <div class="work-report-daily">
      <!--出差申请-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>出差申请</h3>
            </div>
          </i-Col>
        </Row>
        <Form ref="billTitle" :model="billTitle"  :rules="ruleBillTitle" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="出差编码">
                        <span>{{ billTitle.billCode }}</span>　
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem prop="type" label="出差类别" >
                        <Select v-model="billTitle.type" :label-in-value="true"  @on-change="v =>{ setOption(v,'type')}">
                          <Option v-for="(item,key) in type" :value="item.id">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="申请人">
                        <span>朱展宏</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
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

      <!--出差明细-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>出差明细</h3>
            </div>
          </i-Col>
          <Form ref="billDetail" :model="billDetail" :rules="rulebillDetail" :label-width="82" label-position="left">
          <Row>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="开始时间" prop="startTime">
                      <DatePicker
                        v-model="billDetail.startTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择开始时间"
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
                    <FormItem label="结束时间" prop="endTime">
                      <DatePicker
                        v-model="billDetail.endTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-open-change="changeEndTime"
                        placeholder="请选择结束时间">
                      </DatePicker>
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
                    <FormItem label="申请时长">
                      <span>{{billDetail.timeDifference}}</span>
                      <span>{{ duration }}</span>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
          </Row>
          <Row>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="出差地点" prop="evectionAddress">
                      <Input placeholder="请填写出差地点" v-model="billDetail.evectionAddress"></Input>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="出差原因" prop="evectionRemark">
                      <Input placeholder="请填写出差原因" v-model="billDetail.evectionRemark"></Input>
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
                  <i-Col :lg="{span:6}" :md="{span:8}" :sm="{span:10}" :xs="{span:12}">
                    <FormItem label="工作交接人" prop="handOverPepole">
                      <Input
                        placeholder="请选择交接人"
                        icon="person"
                        v-model="billDetail.handOverPepole"
                        @on-focus="checkHandOverPepole()"></Input>
                    </FormItem>

                  </i-Col>
                </Row>
              </div>
            </i-Col>
          </Row>
          </Form>
        </Row>
      </div>
      <!--添加出差明细-->
      <div v-show="showAddBill">
        <Row>
          <i-Col>
            <div class="title">
              <h3>出差明细</h3>
            </div>
          </i-Col>
          <Form ref="addBill" :model="addBill" :rules="ruleaddBill" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="开始时间" prop="startTime">
                        <DatePicker
                          v-model="addBill.startTime"
                          type="datetime"
                          @on-open-change="changeAddStartTime"
                          placeholder="请选择开始时间">
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
                      <FormItem label="结束时间" prop="endTime">
                        <DatePicker
                          v-model="addBill.endTime"
                          type="datetime"
                          @on-open-change="changeAddEndTime"
                          placeholder="请选择开始时间"></DatePicker>
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
                      <FormItem label="申请时长">
                        <span>{{addBill.timeDifference}}</span>
                        <span>{{ duration }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="出差地点" prop="evectionAddress">
                        <Input placeholder="请填写出差地点" v-model="addBill.evectionAddress"></Input>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="出差原因" prop="evectionRemark">
                        <Input placeholder="请填写出差原因" v-model="addBill.evectionRemark"></Input>
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
                    <i-Col :lg="{span:6}" :md="{span:8}" :sm="{span:10}" :xs="{span:12}">
                      <FormItem label="工作交接人" prop="handOverPepole">
                        <Input placeholder="请选择交接人" icon="person" v-model="addBill.handOverPepole"></Input>
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
                添加出差明细
              </Button>
              <Button icon="minus" type="text" style="color:#ed3f14" @click="deleteBillDeatil()" v-show="showDeletebillButton">
                删除出差明细
              </Button>
            </p>
          </div>
        </i-Col>
      </Row>
    </div>
    <Modal
      v-model="checkUser"
      title="选择工作交接人"
      @on-ok="ok"
    >
      <div style="border: 1px solid #cccccc;padding: 10px;width: 50%;margin-left: 25%;max-height: 400px;overflow: auto">
        <ul>
          <Form>
            <RadioGroup v-model="handOverPepoleIndex">
              <li v-for="(title,key) in handOverPepole">
                <row>
                  <i-Col span="18" offset="6">
                    <FormItem>
                      <Radio :label="key"><span>{{title.name}}</span></Radio>
                    </FormItem>
                  </i-Col>
                </row>
              </li>
            </RadioGroup>
          </Form>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
  import MemberSelector from '@/components/MemberSelector'
  export default {
    components: {
      MemberSelector
    },
    name: 'LaunchBill',
    data () {
      const validateStartTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择开始时间'))
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

      const validateAddStartTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择开始时间'))
        } else {
          if (this.addBill.endTime !== '' && value > this.addBill.endTime) {
            callback(new Error('开始时间不能大于结束时间!'))
          }
        }
      }
      const validateAddEndTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择结束时间'))
        } else if (value < this.addBill.startTime) {
          callback(new Error('结束时间不能小于开始时间!'))
        } else {
          callback()
        }
      }
      return {
        checkUser: false,
        handOverPepole: [],
        handOverPepoleIndex: 0,
        showAddBill: false,
        showAddbillButton: true,
        showDeletebillButton: false,
        billTitle: {
          billCode: '',          // 出差单号
          type: '',              // 出差类别
          applyDate: ''          // 申请日期
        },
        type: [],              // 出差类别
        nchrevectionApplyDetail: [],               // 出差明细
        billDetail: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          evectionAddress: '',   // 出差地点
          evectionRemark: '',    // 出差原因
          handOverPepole: '',     // 工作交接人
          handOverPepolepk_psnjob: '',     // 工作交接人
          timeDifference: ''     // 时长
        },
        addBill: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          evectionAddress: '',   // 出差地点
          evectionRemark: '',    // 出差原因
          handOverPepole: '',    // 工作交接人
          timeDifference: ''     // 时长
        },
        duration: '',          // 时长(单位)
        ruleBillTitle: {
          type: [
            { required: true, message: '请选择出差类型', trigger: 'change' }
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
            { required: true, message: '请输入出差地点', trigger: 'blur' }
          ],
          evectionRemark: [
            { required: true, message: '请输入出差原因', trigger: 'blur' }
          ],
          handOverPepole: [
            { required: true, message: '请选择交接人', trigger: 'blur' }
          ]
        },
        ruleaddBill: {
          startTime: [
            { validator: validateAddStartTime, trigger: 'change' }
          ],
          endTime: [
            { validator: validateAddEndTime, trigger: 'change' }
          ],
          evectionAddress: [
            { required: true, message: '请输入出差地点', trigger: 'blur' }
          ],
          evectionRemark: [
            { required: true, message: '请输入出差原因', trigger: 'blur' }
          ],
          handOverPepole: [
            { required: true, message: '请选择交接人', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {

//    获取出差单编号
      getBillCode () {
        this.$ajax.get(`/nchrcommon/getBillCode`, {
          params: {
            billType: '6403'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.billTitle.billCode = response.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    获取出差类别
      getBillType () {
        this.$ajax.get(`/nchrEvection/queryBilltype`, {
          params: {
            itemtype: '2'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
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
//    点击确定按钮（提交）
      submitEvectionApply () {
        var step = true
        if (this.showAddBill === false) {
          //      验证出差类型
          this.$refs.billTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证出差明细
          this.$refs.billDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (this.showAddBill === true) {
          //      验证出差类型
          this.$refs.billTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证出差明细
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
          if (this.nchrevectionApplyDetail.length === 0 && this.showAddBill === false) {
            this.nchrevectionApplyDetail.push(this.billDetail)
          } else if (this.nchrevectionApplyDetail.length === 1 && this.showAddBill === true) {
            this.nchrevectionApplyDetail.push(this.addBill)
          }
          console.log(this.nchrevectionApplyDetail)
        } else {
          return false
        }
//      调添加出差申请接口   // TODO
        var len = this.nchrevectionApplyDetail.length
        console.log('nchrevectionApplyDetail=',this.nchrevectionApplyDetail)
        for (var i = 0; i < len; i++) {
          var start = new Date(this.nchrevectionApplyDetail[i].startTime)
          var startYear = start.getFullYear()
          var startMouth = start.getMonth()
          startMouth = startMouth === 0 ? 1 : startMouth + 1
          var startDate = start.getDate()
          startDate = startDate < 10 ? '0' + startDate : startDate
          var startHours = start.getHours()
          startHours = startHours < 10 ? '0' + startHours : startHours
          var startMinutes = start.getMinutes()
          startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes
          var startSeconds = start.getSeconds()
          startSeconds = startSeconds < 10 ? '0' + startSeconds : startSeconds
          start = startYear + '-' + startMouth + '-' + startDate + ' ' + startHours + ':' + startSeconds + ':' + startSeconds
          this.nchrevectionApplyDetail[i].startTime = start
          var end = new Date(this.nchrevectionApplyDetail[i].endTime)
          var endYear = end.getFullYear()
          var endMouth = end.getMonth()
          endMouth = endMouth === 0 ? 1 : endMouth + 1
          var endDate = end.getDate()
          endDate = endDate < 10 ? '0' + endDate : endDate
          var endHours = end.getHours()
          endHours = endHours < 10 ? '0' + endHours : endHours
          var endMinutes = end.getMinutes()
          endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes
          var endSeconds = end.getSeconds()
          endSeconds = endSeconds < 10 ? '0' + endSeconds : endSeconds
          end = endYear + '-' + endMouth + '-' + endDate + ' ' + endHours + ':' + endSeconds + ':' + endSeconds
          this.nchrevectionApplyDetail[i].endTime = end
          console.log('.nchrevectionApplyDetail', this.nchrevectionApplyDetail)
          console.log('.nchrevectionApplyDetail[i].endTime', this.nchrevectionApplyDetail[i].endTime)
        }

        var data = {
          applyDate: this.billTitle.applyDate,
          billCode: this.billTitle.billCode,
          type: this.billTitle.type,
          nchrevectionApplyDetail: this.nchrevectionApplyDetail
        }  // TODO 组装数据
        console.log('data', data)
        this.$ajax.post(`/nchrEvection/submitEvectionApply`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
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
//    选择出差类型
      setOption (value, type) {
        if (value.label === '出差') {
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
//        this.nchrevectionApplyDetail.push(this.addBill)
        this.showAddBill = true
        this.showAddbillButton = false
        this.showDeletebillButton = true
        if (this.nchrevectionApplyDetail.length === 0) {              // TODO
          this.nchrevectionApplyDetail.push(this.billDetail)
        }
        this.nchrevectionApplyDetail.push(this.addBill)
        console.log(this.nchrevectionApplyDetail)
      },
//    点击取消添加
      deleteBillDeatil () {
        this.showAddBill = false
        this.showAddbillButton = true
        this.showDeletebillButton = false
        this.nchrevectionApplyDetail.splice(1, 1)
        this.addBill.startTime = ''
        this.addBill.endTime = ''
        this.addBill.evectionAddress = ''
        this.addBill.evectionRemark = ''
        this.addBill.handOverPepole = ''
        this.addBill.timeDifference = ''
        console.log(this.nchrevectionApplyDetail)
      },
//    开始时间改变(出差明细)
      changeStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.billDetail.startTime !== '' && this.billDetail.endTime !== '') {
        // 判断开始时间小于结束时间
          if (this.billDetail.startTime < this.billDetail.endTime) {
            var start = new Date(this.billDetail.startTime)
            start = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds()
            this.billDetail.startTime = start
            var end = new Date(this.billDetail.endTime)
            end = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds()
            this.billDetail.endTime = end
            this.getTimeDifference(this.billDetail.startTime, this.billDetail.endTime, 'billDetail')
          }
        }
      },
//    结束时间改变(出差明细)
      changeEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.billDetail.startTime !== '' && this.billDetail.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.billDetail.startTime < this.billDetail.endTime) {
            this.getTimeDifference(this.billDetail.startTime, this.billDetail.endTime, 'billDetail')
          }
        }
      },
//    开始时间改变(添加出差明细)
      changeAddStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addBill.startTime !== '' && this.addBill.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addBill.startTime < this.addBill.endTime) {
            this.getTimeDifference(this.addBill.startTime, this.addBill.endTime, 'add')
          }
        }
      },
//    结束时间改变(添加出差明细)
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
//    获取工作交接人
      getHandoverUser () {
        this.$ajax.get(`/HandoverUser/getHandoverUser`, {
          headers: {
            token: 'ecb94cb29a9b4bf396e5b04aad668770',
            uid: '10483'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.handOverPepole = response.data.data
            console.log(this.handOverPepole)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    选择工作交接人
      checkHandOverPepole () {
        this.checkUser = true
      },
      ok () {
        this.billDetail.handOverPepole = this.handOverPepole[this.handOverPepoleIndex].name
        this.billDetail.handOverPepolepk_psnjob = this.handOverPepole[this.handOverPepoleIndex].pk_psnjob
        console.log(this.billDetail)
        this.$refs.billDetail.validateField('handOverPepole')
//        console.log(this.$refs.billDetail)
      },
//    页面关闭
      pageClose () {
        this.$router.push({path: 'launchIndex'})
      }
    },
    created () {
      this.getBillCode()
      this.getBillType()
      this.getTime()
      this.getHandoverUser()
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

