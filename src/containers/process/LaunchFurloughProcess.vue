<template>
  <!--发起休假申请页面-->
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
      <!--休假申请-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>休假申请</h3>
            </div>
          </i-Col>
        </Row>
        <Form ref="furloughTitle" :model="furloughTitle"  :rules="rulefurloughTitle" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="休假编码">
                        <span>{{ furloughTitle.furloughCode }}</span>　
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem prop="type" label="休假类别" >
                        <Select v-model="furloughTitle.type" :label-in-value="true"  @on-change="v =>{ setOption(v,'type')}">
                          <Option v-for="(item,key) in type" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
            <Row>
              <i-Col span="12">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="申请日期">
                        <span>{{ furloughTitle.applyDate }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="假期年度">
                        <Select v-model="furloughTitle.date">
                          <Option v-for="item in date" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
        </Form>
      </div>

      <!--休假明细-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>休假明细</h3>
            </div>
          </i-Col>
          <Form ref="furloughDetail" :model="furloughDetail" :rules="rulefurloughDetail" :label-width="82" label-position="left">
          <Row>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="开始时间" prop="startTime">
                      <DatePicker
                        v-model="furloughDetail.startTime"
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
                        v-model="furloughDetail.endTime"
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
                      <span>{{furloughDetail.timeDifference}}</span>
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
                    <FormItem label="休假事由" prop="FurloughRemark">
                      <Input placeholder="请填写休假事由" v-model="furloughDetail.FurloughRemark"></Input>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="工作交接人" prop="handOverPepole">
                      <Input placeholder="请选择交接人"
                             icon="person"
                             v-model="billDetailHandOverPepole.name"
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
      <!--添加休假明细-->
      <div v-show="showAddfurlough">
        <Row>
          <i-Col>
            <div class="title">
              <h3>休假明细</h3>
            </div>
          </i-Col>
          <Form ref="addfurlough" :model="addfurlough" :rules="ruleaddfurlough" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="开始时间" prop="startTime">
                        <DatePicker
                          v-model="addfurlough.startTime"
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
                          v-model="addfurlough.endTime"
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
                        <span>{{addfurlough.timeDifference}}</span>
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
                      <FormItem label="休假事由" prop="FurloughRemark">
                        <Input placeholder="请填写休假事由" v-model="addfurlough.FurloughRemark"></Input>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="工作交接人" prop="handOverPepole">
                        <Input placeholder="请选择交接人"
                               icon="person"
                               v-model="billAddHandOverPepole.name"
                               @on-focus="checkAddHandOverPepole()"></Input>
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
              <Button icon="plus" type="text" style="color:#2d8cf0" @click="addfurloughDeatil()" v-show="showAddfurloughButton">
                添加休假明细
              </Button>
              <Button icon="minus" type="text" style="color:#ed3f14" @click="deletefurloughDeatil()" v-show="showDeletefurloughButton">
                删除休假明细
              </Button>
            </p>
          </div>
        </i-Col>
      </Row>
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

      <Modal
        v-model="checkAddUser"
        title="选择工作交接人"
        @on-ok="handleAddOk"
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
  </div>
</template>

<script>
  export default {
    name: 'LaunchFurlough',
    data () {
      const validateStartTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择开始时间'))
        } else {
          if (this.furloughDetail.endTime !== '' && value > this.furloughDetail.endTime) {
            callback(new Error('开始时间不能大于结束时间!'))
          }
        }
      }
      const validateEndTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择结束时间'))
        } else if (value < this.furloughDetail.startTime) {
          callback(new Error('结束时间不能小于开始时间!'))
        } else {
          callback()
        }
      }
      return {
        checkUser: false,
        checkAddUser: false,
        handOverPepole: [],
        billDetailHandOverPepole: {},
        billAddHandOverPepole: {},
        handOverPepoleIndex: 0,
        showAddfurlough: false,
        showAddfurloughButton: true,
        showDeletefurloughButton: false,
        furloughTitle: {
          furloughCode: '',      // 休假单号
          type: '',              // 休假类别
          applyDate: '',         // 申请日期
          date: ''               // 假期年度
        },
        type: [],                // 休假类别
        date: [                  // 休假类别
          {
            id: new Date().getFullYear(),
            name: new Date().getFullYear()
          },
          {
            id: new Date().getFullYear() - 1,
            name: new Date().getFullYear() - 1
          }
        ],
        nCHREvectionApplyDeatil: [],               // 休假明细
        furloughDetail: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          FurloughRemark: '',    // 休假事由
          handOverPepole: '',    // 工作交接人
          timeDifference: ''     // 时长
        },
        addfurlough: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          FurloughRemark: '',    // 休假事由
          handOverPepole: '',    // 工作交接人
          timeDifference: ''     // 时长
        },
        duration: '',          // 时长(单位)
        rulefurloughTitle: {
          type: [
            { required: true, message: '请选择休假类型', trigger: 'change' }
          ]
        },
        rulefurloughDetail: {
          startTime: [
            { validator: validateStartTime, trigger: 'change' }
          ],
          endTime: [
            { validator: validateEndTime, trigger: 'change' }
          ],
          FurloughRemark: [
            { required: true, message: '请输入休假事由', trigger: 'blur' }
          ],
          handOverPepole: [
            { required: true, message: '请选择交接人', trigger: 'blur' }
          ]
        },
        ruleaddfurlough: {
          startTime: [
            { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
          ],
          endTime: [
            { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
          ],
          FurloughRemark: [
            { required: true, message: '请输入休假事由', trigger: 'blur' }
          ],
          handOverPepole: [
            { required: true, message: '请选择交接人', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /*
      * 获取休假单编号
      * */
      getfurloughCode () {
        this.$ajax.get(`/nchrcommon/getBillCode`, {
          params: {
            billType: '6404'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.furloughTitle.furloughCode = response.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    获取休假类别
      getfurloughType () {
        this.$ajax.get(`/nchrEvection/queryBilltype`, {
          params: {
            itemtype: '0'
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
        this.furloughTitle.applyDate = year + '-' + mouth + '-' + day
      },
//    点击确定按钮（提交）
      submitEvectionApply () {
        let step = true
        if (this.showAddfurlough === false) {
//      验证休假类型
          this.$refs.furloughTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证休假明细
          this.$refs.furloughDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (this.showAddfurlough === true) {
          //      验证休假类型
          this.$refs.furloughTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证休假明细
          this.$refs.furloughDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
          //      验证添加明细
          this.$refs.addfurlough.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (step === true) {
          if (this.nCHREvectionApplyDeatil.length === 0 && this.showAddfurlough === false) {
            this.nCHREvectionApplyDeatil.push(this.furloughDetail)
          } else if (this.nCHREvectionApplyDeatil.length === 1 && this.showAddfurlough === true) {
            this.nCHREvectionApplyDeatil.push(this.addfurlough)
          }
          console.log(this.nCHREvectionApplyDeatil)
        } else {
          return false
        }
//      调添加休假申请接口   // TODO
        var len = this.nCHREvectionApplyDeatil.length
        for (var i = 0; i < len; i++) {
          var start = new Date(this.nCHREvectionApplyDeatil[i].startTime)
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
          this.nCHREvectionApplyDeatil[i].startTime = start
          var end = new Date(this.nCHREvectionApplyDeatil[i].endTime)
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
          this.nCHREvectionApplyDeatil[i].endTime = end
        }
        var data = {
          applyDate: this.furloughTitle.applyDate,
          billCode: this.furloughTitle.furloughCode,
          date: this.furloughTitle.date,
          type: this.furloughTitle.type,
          nchrfurloughApplyDetail: this.nCHREvectionApplyDeatil
        }  // TODO 组装数据
        this.$ajax.post(`/nchrFurlough/submitFurlough`, JSON.stringify(data), {
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
//    选择休假类型
      setOption (value, type) {
        if (value.label === '加班转调休' || value.label === '哺乳假') {
          this.duration = '小时'
          if (this.furloughDetail.startTime !== '' && this.furloughDetail.endTime !== '') {
            // 判断开始时间小于结束时间
            if (this.furloughDetail.startTime < this.furloughDetail.endTime) {
              this.getTimeDifference(this.furloughDetail.startTime, this.furloughDetail.endTime, 'furloughDetail')
            }
          }
          if (this.showAddfurlough === true && this.addfurlough.startTime !== '' && this.addfurlough.endTime !== '') {
            this.getTimeDifference(this.addfurlough.startTime, this.addfurlough.endTime, 'add')
          }
        } else {
          this.duration = '天'
          if (this.furloughDetail.startTime !== '' && this.furloughDetail.endTime !== '') {
            // 判断开始时间小于结束时间
            if (this.furloughDetail.startTime < this.furloughDetail.endTime) {
              this.getTimeDifference(this.furloughDetail.startTime, this.furloughDetail.endTime, 'furloughDetail')
            }
          }
          if (this.showAddfurlough === true && this.addfurlough.startTime !== '' && this.addfurlough.endTime !== '') {
            this.getTimeDifference(this.addfurlough.startTime, this.addfurlough.endTime, 'add')
          }
        }
      },
//    点击添加按钮
      addfurloughDeatil () {
//        this.nCHREvectionApplyDeatil.push(this.addfurlough)
        this.showAddfurlough = true
        this.showAddfurloughButton = false
        this.showDeletefurloughButton = true
        if (this.nCHREvectionApplyDeatil.length === 0) {              // TODO
          this.nCHREvectionApplyDeatil.push(this.furloughDetail)
        }
        this.nCHREvectionApplyDeatil.push(this.addfurlough)
        console.log(this.nCHREvectionApplyDeatil)
      },
//    点击取消添加
      deletefurloughDeatil () {
        this.showAddfurlough = false
        this.showAddfurloughButton = true
        this.showDeletefurloughButton = false
        this.nCHREvectionApplyDeatil.splice(1, 1)
        this.addfurlough.startTime = ''
        this.addfurlough.endTime = ''
        this.addfurlough.FurloughRemark = ''
        this.addfurlough.handOverPepole = ''
        this.addfurlough.timeDifference = ''
        console.log(this.nCHREvectionApplyDeatil)
      },
//    开始时间改变(休假明细)
      changeStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.furloughDetail.startTime !== '' && this.furloughDetail.endTime !== '') {
        // 判断开始时间小于结束时间
          if (this.furloughDetail.startTime < this.furloughDetail.endTime) {
            this.getTimeDifference(this.furloughDetail.startTime, this.furloughDetail.endTime, 'furloughDetail')
          }
        }
      },
//    结束时间改变(休假明细)
      changeEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.furloughDetail.startTime !== '' && this.furloughDetail.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.furloughDetail.startTime < this.furloughDetail.endTime) {
            this.getTimeDifference(this.furloughDetail.startTime, this.furloughDetail.endTime, 'furloughDetail')
          }
        }
      },
      changeAddStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addfurlough.startTime !== '' && this.addfurlough.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addfurlough.startTime < this.addfurlough.endTime) {
            this.getTimeDifference(this.addfurlough.startTime, this.addfurlough.endTime, 'add')
          }
        }
      },
//    结束时间改变(休假明细)
      changeAddEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addfurlough.startTime !== '' && this.addfurlough.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addfurlough.startTime < this.addfurlough.endTime) {
            this.getTimeDifference(this.addfurlough.startTime, this.addfurlough.endTime, 'add')
          }
        }
      },
//    获取时长
      getTimeDifference (startTime, endTime, type) {
        this.$refs.furloughTitle.validate((valid) => {
          if (valid) {
            var start = new Date(startTime)
            start = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds()
            var end = new Date(endTime)
            end = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds()
            this.$ajax.get(`/nchrcommon/queryDuration`, {
              params: {
                startTime: start,
                endTime: end,
                type: '6404',
                billCode: this.furloughTitle.furloughCode,
                applyType: this.furloughTitle.type
              }
            }).then((response) => {
              if (response.data.code === '000000') {
                if (type === 'furloughDetail') {
                  this.furloughDetail.timeDifference = response.data.data
                  this.furloughDetail.startTime = start
                  this.furloughDetail.endTime = end
                } else if (type === 'add') {
                  this.addfurlough.timeDifference = response.data.data
                  this.addfurlough.startTime = start
                  this.addfurlough.endTime = end
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
//    选择工作交接人(add)
      checkAddHandOverPepole () {
        this.checkAddUser = true
      },
//    点击ok
      ok () {
        this.billDetailHandOverPepole = this.handOverPepole[this.handOverPepoleIndex]
        this.furloughDetail.handOverPepole = this.handOverPepole[this.handOverPepoleIndex].pk_psnjob
        console.log(this.billDetailHandOverPepole)
        this.$refs.furloughDetail.validateField('handOverPepole')
      },
//    点击ok(add)
      handleAddOk () {
        this.billAddHandOverPepole = this.handOverPepole[this.handOverPepoleIndex]
        this.addfurlough.handOverPepole = this.handOverPepole[this.handOverPepoleIndex].pk_psnjob
        console.log(this.billDetailHandOverPepole)
        this.$refs.addfurlough.validateField('handOverPepole')
      },
//    页面关闭
      pageClose () {
        this.$router.push({path: 'launchIndex'})
      }
    },
    created () {
      this.getfurloughCode()
      this.getfurloughType()
      this.getTime()
      this.getHandoverUser()
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

