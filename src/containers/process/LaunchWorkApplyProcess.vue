<template>
  <!--发起加班申请页面-->
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
      <!--加班申请-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>加班申请</h3>
            </div>
          </i-Col>
        </Row>
        <Form ref="workApplyTitle" :model="workApplyTitle"  :rules="ruleWorkApplyTitle" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="加班编码">
                        <span>{{ workApplyTitle.workApplyCode }}</span>　
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem prop="type" label="加班类别" >
                        <Select v-model="workApplyTitle.type" :label-in-value="true"  @on-change="v =>{ setOption(v,'type')}">
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
                        <span>{{ workApplyTitle.user }}</span>
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
                        <span>{{ workApplyTitle.applyDate }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
        </Form>
      </div>

      <!--加班明细-->
      <div>
        <Row>
          <i-Col>
            <div class="title">
              <h3>加班明细</h3>
            </div>
          </i-Col>
          <Form ref="workApplyDetail" :model="workApplyDetail" :rules="ruleworkApplyDetail" :label-width="82" label-position="left">
          <Row>
            <i-Col span="12">
              <div class="card">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="开始时间" prop="startTime">
                      <DatePicker
                        v-model="workApplyDetail.startTime"
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
                        v-model="workApplyDetail.endTime"
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
                      <span>{{workApplyDetail.timeDifference}}</span>
                      <span>{{ duration }}</span>
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
                    <FormItem label="加班原因" prop="cause">
                      <Input placeholder="请填写加班原因" v-model="workApplyDetail.cause"></Input>
                    </FormItem>
                  </i-Col>
                </Row>
              </div>
            </i-Col>
          </Row>
          </Form>
        </Row>
      </div>
      <!--添加加班明细-->
      <div v-show="showAddWorkApply">
        <Row>
          <i-Col>
            <div class="title">
              <h3>加班明细</h3>
            </div>
          </i-Col>
          <Form ref="addWorkApply" :model="addWorkApply" :rules="ruleaddWorkApply" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="开始时间" prop="startTime">
                        <DatePicker
                          v-model="addWorkApply.startTime"
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
                          v-model="addWorkApply.endTime"
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
                        <span>{{addWorkApply.timeDifference}}</span>
                        <span>{{ duration }}</span>
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
                      <FormItem label="加班原因" prop="cause">
                        <Input placeholder="请填写加班原因" v-model="addWorkApply.cause"></Input>
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
              <Button icon="plus" type="text" style="color:#2d8cf0" @click="addWorkApplyDeatil()" v-show="showAddworkApplyButton">
                添加加班明细
              </Button>
              <Button icon="minus" type="text" style="color:#ed3f14" @click="deleteWorkApplyDeatil()" v-show="showDeleteworkApplyButton">
                删除加班明细
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
    name: 'WorkReportDaily',
    data () {
      const validateStartTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择开始时间'))
        } else {
          if (this.workApplyDetail.endTime !== '' && value > this.workApplyDetail.endTime) {
            callback(new Error('开始时间不能大于结束时间!'))
          }
        }
      }
      const validateEndTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择结束时间'))
        } else if (value < this.workApplyDetail.startTime) {
          callback(new Error('结束时间不能小于开始时间!'))
        } else {
          callback()
        }
      }
      return {
        showAddWorkApply: false,
        showAddworkApplyButton: true,
        showDeleteworkApplyButton: false,
        workApplyTitle: {
          workApplyCode: '',          // 加班单号
          type: '',              // 加班类别
          applyDate: '',          // 申请日期
          user: this.$store.state.userInfo.username
        },
        type: [],              // 加班类别
        nCHREvectionApplyDeatil: [],               // 加班明细
        workApplyDetail: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          cause: '',             // 加班原因
          timeDifference: ''     // 时长
        },
        addWorkApply: {
          startTime: '',         // 开始日期
          endTime: '',           // 结束日期
          cause: '',             // 加班原因
          timeDifference: ''     // 时长
        },
        duration: '',          // 时长(单位)
        ruleWorkApplyTitle: {
          type: [
            { required: true, message: '请选择加班类型', trigger: 'change' }
          ]
        },
        ruleworkApplyDetail: {
          startTime: [
            { validator: validateStartTime, trigger: 'change' }
          ],
          endTime: [
            { validator: validateEndTime, trigger: 'change' }
          ],
          cause: [
            { required: true, message: '请输入加班原因', trigger: 'blur' }
          ]
        },
        ruleaddWorkApply: {
          startTime: [
            { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
          ],
          endTime: [
            { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
          ],
          cause: [
            { required: true, message: '请输入加班原因', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /*
      * 获取加班单编号
      * */
      getWorkApplyCode () {
        this.$ajax.get(`/nchrcommon/getBillCode`, {
          params: {
            billType: '6405'
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.workApplyTitle.workApplyCode = response.data.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    获取加班类别
      getWorkApplyType () {
        this.$ajax.get(`/nchrEvection/queryBilltype`, {
          params: {
            itemtype: '1'
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
        this.workApplyTitle.applyDate = year + '-' + mouth + '-' + day
      },
//    点击确定按钮（提交）
      submitEvectionApply () {
        var step = true
        if (this.showAddWorkApply === false) {
          //      验证加班类型
          this.$refs.workApplyTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证加班明细
          this.$refs.workApplyDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (this.showAddWorkApply === true) {
          //      验证加班类型
          this.$refs.workApplyTitle.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
//      验证加班明细
          this.$refs.workApplyDetail.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
          //      验证添加明细
          this.$refs.addWorkApply.validate((valid) => {
            if (valid) {
            } else {
              step = false
            }
          })
        }
        if (step === true) {
          if (this.nCHREvectionApplyDeatil.length === 0 && this.showAddWorkApply === false) {
            this.nCHREvectionApplyDeatil.push(this.workApplyDetail)
          } else if (this.nCHREvectionApplyDeatil.length === 1 && this.showAddWorkApply === true) {
            this.nCHREvectionApplyDeatil.push(this.addWorkApply)
          }
        } else {
          console.log(123)
          return false
        }
//      调添加加班申请接口   // TODO
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
//          applyDate: this.workApplyTitle.applyDate,
          monocode: this.workApplyTitle.workApplyCode,
          type: this.workApplyTitle.type,
          detailList: this.nCHREvectionApplyDeatil
        }  // TODO 组装数据
        this.$ajax.post(`/WorkApply/addWorkApply`, JSON.stringify(data), {
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
//    选择加班类型
      setOption (value, type) {
        if (value.label === '转调休加班') {
          this.duration = '小时'
          if (this.workApplyDetail.startTime !== '' && this.workApplyDetail.endTime !== '') {
            // 判断开始时间小于结束时间
            if (this.workApplyDetail.startTime < this.workApplyDetail.endTime) {
              this.getTimeDifference(this.workApplyDetail.startTime, this.workApplyDetail.endTime, 'workApplyDetail')
            }
          }
          if (this.showAddWorkApply === true && this.addWorkApply.startTime !== '' && this.addWorkApply.endTime !== '') {
            this.getTimeDifference(this.addWorkApply.startTime, this.addWorkApply.endTime, 'add')
          }
        }
      },
//    点击添加按钮
      addWorkApplyDeatil () {
//        this.nCHREvectionApplyDeatil.push(this.addWorkApply)
        this.showAddWorkApply = true
        this.showAddworkApplyButton = false
        this.showDeleteworkApplyButton = true
        if (this.nCHREvectionApplyDeatil.length === 0) {              // TODO
          this.nCHREvectionApplyDeatil.push(this.workApplyDetail)
        }
        this.nCHREvectionApplyDeatil.push(this.addWorkApply)
        console.log(this.nCHREvectionApplyDeatil)
      },
//    点击取消添加
      deleteWorkApplyDeatil () {
        this.showAddWorkApply = false
        this.showAddworkApplyButton = true
        this.showDeleteworkApplyButton = false
        this.nCHREvectionApplyDeatil.splice(1, 1)
        this.addWorkApply.startTime = ''
        this.addWorkApply.endTime = ''
        this.addWorkApply.cause = ''
        this.addWorkApply.timeDifference = ''
        console.log(this.nCHREvectionApplyDeatil)
      },
//    开始时间改变(加班明细)
      changeStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.workApplyDetail.startTime !== '' && this.workApplyDetail.endTime !== '') {
        // 判断开始时间小于结束时间
          if (this.workApplyDetail.startTime < this.workApplyDetail.endTime) {
            this.getTimeDifference(this.workApplyDetail.startTime, this.workApplyDetail.endTime, 'workApplyDetail')
          }
        }
      },
//    结束时间改变(加班明细)
      changeEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.workApplyDetail.startTime !== '' && this.workApplyDetail.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.workApplyDetail.startTime < this.workApplyDetail.endTime) {
            this.getTimeDifference(this.workApplyDetail.startTime, this.workApplyDetail.endTime, 'workApplyDetail')
          }
        }
      },
      changeAddStartTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addWorkApply.startTime !== '' && this.addWorkApply.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addWorkApply.startTime < this.addWorkApply.endTime) {
            this.getTimeDifference(this.addWorkApply.startTime, this.addWorkApply.endTime, 'add')
          }
        }
      },
//    结束时间改变(加班明细)
      changeAddEndTime (isOpen) {
        // 判断时间选择器关闭并且开始时间和结束时间都不为空
        if (isOpen === false && this.addWorkApply.startTime !== '' && this.addWorkApply.endTime !== '') {
          // 判断开始时间小于结束时间
          if (this.addWorkApply.startTime < this.addWorkApply.endTime) {
            this.getTimeDifference(this.addWorkApply.startTime, this.addWorkApply.endTime, 'add')
          }
        }
      },
//    获取时长
      getTimeDifference (startTime, endTime, type) {
        this.$refs.workApplyTitle.validate((valid) => {
          if (valid) {
            var start = new Date(startTime)
            start = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds()
            var end = new Date(endTime)
            end = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds()
            this.$ajax.get(`/nchrcommon/queryDuration`, {
              params: {
                startTime: start,
                endTime: end,
                type: '6405',
                billCode: this.workApplyTitle.workApplyCode,
                applyType: this.workApplyTitle.type
              }
            }).then((response) => {
              if (response.data.code === '000000') {
                if (type === 'workApplyDetail') {
                  this.workApplyDetail.timeDifference = response.data.data
                } else if (type === 'add') {
                  this.addWorkApply.timeDifference = response.data.data
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
      this.getWorkApplyCode()
      this.getWorkApplyType()
      this.getTime()
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

