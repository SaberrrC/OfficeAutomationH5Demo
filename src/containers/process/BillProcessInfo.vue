<template>
  <!--发起出差申请页面-->
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col span="12">
          <h3 @click="pageClose()" style="padding: 0 5px"><Button type="text" icon="close-round"></Button></h3>
          <h3 @click="pagePrev()"><Button type="text">上一页</Button></h3>
          <h3 @click="pageNext()"><Button type="text">下一页</Button></h3>
        </i-Col>
        <i-Col span="3" offset="9" v-if="type === 'myLaunch' && approveState === '3' " style="text-align: right;padding-right: 16px">
          <Button type="primary" @click="approveCallBack()">收回</Button>
        </i-Col>
        <i-Col span="6" offset="6" v-if="type === 'todo'" style="text-align: right;padding-right: 16px">
                <Button type="primary" @click="handleAgree('true')" style="margin-right: 20px">同意</Button>
                <Button type="error" @click="handleReject('false')">驳回</Button>
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
              <h3><span>{{ userName }}</span>的出差申请</h3>
            </div>
          </i-Col>
        </Row>
        <Form :model="billTitle" :label-width="82" label-position="left">
          <Row>
            <i-Col span="12">
              <div class="card" style="padding-bottom: 10px;">
                <Row>
                  <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                    <FormItem label="出差单编码">
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
                    <FormItem label="出差类别">
                      <span>{{ billTitle.typeName }}</span>
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
      <div v-for="item in nCHREvectionApplyDeatil" v-show="isOpen">
        <Row>
          <i-Col>
            <div class="title">
              <h3>出差明细</h3>
            </div>
          </i-Col>
          <Form :model="item" :label-width="82" label-position="left">
            <Row>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="开始时间" prop="startTime">
                        <span>{{item.startTime}}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="结束时间">
                        <span>{{item.endTime}}</span>
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
                      <FormItem label="出差时长">
                        <span>{{item.timeDifference}}</span>
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
                      <FormItem label="出差地点" prop="startTime">
                        <span>{{item.startTime}}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="12">
                <div class="card">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="出差原因">
                        <span>{{item.endTime}}</span>
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
                      <FormItem label="工作交接人">
                        <span>{{item.psnname}}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
          </Form>
        </Row>
      </div>
      <!--展开/收起明细按钮-->
      <Row>
        <i-Col>
          <div class="card" style="text-align: center">
            <p @click="handleIsOpen()">
              <Button type="text" style="color:#2d8cf0">
                {{ isOpenText }}
              </Button>
            </p>
          </div>
        </i-Col>
      </Row>
      <div>
        <div class="marking">
          <Row v-if="type === 'todo'">
            <div class="title">
            <i-Col span="12">
              <div>
                <span :class="{span: opinion}"><a href="javascript:void (0)" @click="handleOpinion()">审批意见</a></span>
              </div>
            </i-Col>
            <i-Col span="12">
              <div>
                <span :class="{span: review}"><a href="javascript:void (0)" @click="handleReview()">评阅情况</a></span>
              </div>
            </i-Col>
            </div>
          </Row>
          <Row v-else>
            <i-Col>
              <div>
                <span :class="{span: review}">批阅情况</span>
              </div>
            </i-Col>
          </Row>
        </div>
        <div v-if="review === true" class="review" v-for="site in applyWorkFlows">
          <Form :model="site" :label-width="82" label-position="left">
            <Row>
              <i-Col span="8">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="审批人">
                        <span>{{ site.checkUserName }}</span>　
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="8">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="审批状态">
                        <span>{{ site.isCheckCH }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
              <i-Col span="8">
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="审批时间">
                        <span>{{ site.dealDate }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
            <Row>
              <i-Col>
                <div class="card" style="padding-bottom: 10px;">
                  <Row>
                    <i-Col :lg="{span:12}" :md="{span:16}" :sm="{span:20}" :xs="{span:24}">
                      <FormItem label="审批意见">
                        <span>{{ site.approveResultCH }}</span>
                      </FormItem>
                    </i-Col>
                  </Row>
                </div>
              </i-Col>
            </Row>
          </Form>
        </div>
        <div v-else-if="opinion === true" class="opinion">
          <Row>
            <i-Col>
              <Input type="textarea" v-model="reply"></Input>
            </i-Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Bill',
    data () {
      return {
        isOpen: true,                        // 明细是否显示
        isOpenText: '收起出差明细',
        type: this.$route.query.type,                             // 当前页面类型（我发起的/待办/已办）
        approveState: this.$route.query.approveState,             // 当前页面状态
        opinion: this.$route.query.type === 'todo',
        review: this.$route.query.type !== 'todo',
        reply: '',                        // 回复
        billTitle: {
          billCode: '',          // 出差单号
          applyDate: ''          // 申请日期
        },
        nCHREvectionApplyDeatil: [],               // 出差明细
        applyWorkFlows: [],                        // 申请情况

        total: this.$route.query.total,                    // 发起列表总条数
        pageNum: parseInt(this.$route.query.pageNum),                // 发起列表当前页数
        pageSize: parseInt(this.$route.query.pageSize),              // 发起列表每页显示条数
        time: this.$route.query.time,
        selectApproveState: this.$route.query.selectApproveState,   // 查询单据状态
        selectBillType: this.$route.query.selectBillType,               // 查询方式（加班/出差/休假/调休/全部）
        launchUser: this.$route.query.launchUser,               // 查询人员
        index: parseInt(this.$route.query.index),
        userName: '',
        duration: ''
      }
    },
    methods: {
      /*
      * 获取我的申请明细接口
      * */
      getBillInfo () {
        this.$ajax.get(`/myApply/queryApproveDetailByBillCode`, {
          params: {
            billType: this.$route.query.billType,
            billCode: this.$route.query.billCode
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            this.billTitle.billCode = response.data.data.billCode
            this.billTitle.applyDate = response.data.data.applyDate
            this.billTitle.typeName = response.data.data.typeName
            this.nCHREvectionApplyDeatil = response.data.data.nchrevectionApplyDetail
            this.applyWorkFlows = response.data.data.nchrapplyWorkFlow
            this.userName = response.data.data.userName
          }
          if (this.billTitle.typeName === '外出') {
            this.duration = '小时'
          } else if (this.billTitle.typeName === '出差') {
            this.duration = '天'
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击展开明细
      handleIsOpen () {
        if (this.isOpen === true) {
          this.isOpen = false
          this.isOpenText = '展开出差明细'
        } else {
          this.isOpen = true
          this.isOpenText = '收起出差明细'
        }
      },
//    点击评阅情况
      handleOpinion () {
        this.opinion = true
        this.review = false
      },
//    点击审批意见
      handleReview () {
        this.opinion = false
        this.review = true
      },
//    点击通过
      handleAgree (text) {
        /*
        * 调收同意接口
        * */
        var approveRequest = [{
          monocode: this.billTitle.billCode,
          status: text,
          type: this.$route.query.billType,
          message: this.reply
        }]
        this.$ajax.post(`/Approve/allApprove`, approveRequest, {
        }).then((response) => {
          if (response.data.code === '000000') {
            this.$Message.success('审批成功')
            this.$router.push({path: this.type})
          } else {
            this.$Message.success(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击驳回
      handleReject (text) {
        var approveRequest = [{
          monocode: this.billTitle.billCode,
          status: text,
          type: this.$route.query.billType,
          message: this.reply
        }]
        this.$ajax.post(`/Approve/allApprove`, approveRequest, {
        }).then((response) => {
          if (response.data.code === '000000') {
            this.$Message.success('审批成功')
            this.$router.push({path: this.type})
          } else {
            this.$Message.success(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    点击收回
      approveCallBack () {
        /*
        * 调收回接口
        * */
        var approveRequest = {
          monocode: this.billTitle.billCode,
          type: this.$route.query.billType
        }
        this.$ajax.post(`/myApply/approveCallBack`, approveRequest, {
        }).then((response) => {
          if (response.data.code === '000000') {
            this.$Message.success('收回成功')
            this.$router.push({path: this.type})
          } else {
            this.$Message.success(response.data.message)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//    关闭页面
      pageClose () {
        this.$router.push({path: this.type})
      },
//    上一页
      pagePrev () {
//        /***计算当前条数***/
        var serialNumber = 0
        if (this.pageNum === 1) {
          serialNumber = this.index + 1
        } else {
          serialNumber = this.pageNum * this.pageSize + this.index + 1
        }
        if (serialNumber === 1) {
          this.$Message.info('已经是第一条')
          return false
        }
        var num = serialNumber - 1
        var nextData = {}
//        /******调分页接口,获取上一条数据的信息*********/
        let url = ''
        let data = {}
        if (this.type === 'myLaunch') {
          url = '/myApply/queryApproveByAll'
          data = {
            time: this.time,
            approveState: this.selectApproveState,
            billType: this.selectBillType,
            pageNum: num,
            pageSize: 1
          }
          this.$ajax.get(url, {
            params: data
          }).then((response) => {
            if (response.data.code === '000000' && response.data.data.dataList.length !== 0) {
              nextData.billCode = response.data.data.dataList[0].billCode
              nextData.billType = response.data.data.dataList[0].billType
              nextData.approveState = response.data.data.dataList[0].approveState
              if (nextData.billType === this.$route.query.billType) {
                this.$route.query.billCode = nextData.billCode
                this.$route.query.billType = nextData.billType
                this.index = this.index - 1
                this.getBillInfo()
              } else {
                var data = {
                  billType: nextData.billType,          // 单据类型
                  billCode: nextData.billCode,          // 单据编码
                  approveState: nextData.approveState,          // 单据状态
                  type: this.type,                 // 前一页面类型（我的申请）
                  total: this.total,                 // 发起列表总条数
                  pageNum: this.pageNum,            // 发起列表当前页数
                  pageSize: this.pageSize,              // 发起列表每页显示条数
                  time: this.time,
                  selectApproveState: this.selectApproveState,   // 查询单据状态
                  selectBillType: this.selectBillType,               // 查询方式（加班/出差/休假/调休/全部）
                  index: this.index - 1
                }
                switch (nextData.billType) {
                  case '6402':
                    this.$router.push({path: 'signCardLaunchInfo', query: data})
                    this.getBillInfo()
                    break
                  case '6403':
                    this.$router.push({path: 'billLaunchInfo', query: data})
                    break
                  case '6404':
                    this.$router.push({path: 'furloughLaunchInfo', query: data})
                    break
                  case '6405':
                    this.$router.push({path: 'workApplyLaunchInfo', query: data})
                    break
                }
              }
            } else {
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          if (this.type === 'todo') {
            url = '/MyAplication/selectMyAplication'
            data = {
              checkmanId: this.$store.state.userInfo.code,
              userName: '',
              isCheck: 'N',
              pkBillType: this.selectBillType,
              time: this.time,
              pageNum: num,
              pageSize: 1
            }
          } else if (this.type === 'haveTodo') {
            url = '/myApply/queryApproveByAll'
            data = {
              checkmanId: this.$store.state.userInfo.code,
              userName: '',
              isCheck: 'Y',
              pkBillType: this.selectBillType,
              time: this.time,
              pageNum: num,
              pageSize: 1
            }
          }
          this.$ajax.get(url, {
            params: data
          }).then((response) => {
            if (response.data.code === '000000') {
              nextData.billCode = response.data.data.data[0].billNo
              nextData.billType = response.data.data.data[0].pkBillType
              if (nextData.billType === this.$route.query.billType) {
                this.$route.query.billCode = nextData.billCode
                this.$route.query.billType = nextData.billType
                this.index = this.index - 1
                this.getBillInfo()
              } else {
                var data = {
                  billType: nextData.billType,          // 单据类型
                  billCode: nextData.billCode,          // 单据编码
                  approveState: nextData.approveState,          // 单据状态
                  type: this.type,                 // 前一页面类型（我的申请）
                  total: this.total,                 // 发起列表总条数
                  pageNum: this.pageNum,            // 发起列表当前页数
                  pageSize: this.pageSize,              // 发起列表每页显示条数
                  time: this.time,
                  launchUser: this.launchUser,       // 查询人员
                  selectBillType: this.selectBillType,               // 查询方式（加班/出差/休假/调休/全部）
                  index: this.index - 1
                }
                switch (nextData.billType) {
                  case '6402':
                    this.$router.push({path: 'signCardLaunchInfo', query: data})
                    this.getBillInfo()
                    break
                  case '6403':
                    this.$router.push({path: 'billLaunchInfo', query: data})
                    break
                  case '6404':
                    this.$router.push({path: 'furloughLaunchInfo', query: data})
                    break
                  case '6405':
                    this.$router.push({path: 'workApplyLaunchInfo', query: data})
                    break
                }
              }
            } else {
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
//    下一页
      pageNext () {
//        /***计算当前条数***/
        var serialNumber = 0
        if (this.pageNum === 1) {
          serialNumber = this.index + 1
        } else {
          serialNumber = this.pageNum * this.pageSize + this.index + 1
        }
        var num = serialNumber
        if (num === this.total) {
          this.$Message.info('已经是最后一条')
          return false
        } else {
          num = serialNumber + 1
        }
        var nextData = {}
//        /******调分页接口,获取上一条/下一条数据的信息*********/
        let url = ''
        let data = {}
        if (this.type === 'myLaunch') {
          url = '/myApply/queryApproveByAll'
          data = {
            time: this.time,
            approveState: this.selectApproveState,
            billType: this.selectBillType,
            pageNum: num,
            pageSize: 1
          }
          this.$ajax.get(url, {
            params: data
          }).then((response) => {
            if (response.data.code === '000000' && response.data.data.dataList.length !== 0) {
              nextData.billCode = response.data.data.dataList[0].billCode
              nextData.billType = response.data.data.dataList[0].billType
              nextData.approveState = response.data.data.dataList[0].approveState
              if (nextData.billType === this.$route.query.billType) {
                this.$route.query.billCode = nextData.billCode
                this.$route.query.billType = nextData.billType
                this.index = this.index + 1
                this.getBillInfo()
              } else {
                var data = {
                  billType: nextData.billType,          // 单据类型
                  billCode: nextData.billCode,          // 单据编码
                  approveState: nextData.approveState,          // 单据状态
                  type: this.type,                 // 前一页面类型（我的申请）
                  total: this.total,                 // 发起列表总条数
                  pageNum: this.pageNum,            // 发起列表当前页数
                  pageSize: this.pageSize,              // 发起列表每页显示条数
                  time: this.time,
                  selectApproveState: this.selectApproveState,   // 查询单据状态
                  selectBillType: this.selectBillType,               // 查询方式（加班/出差/休假/调休/全部）
                  index: this.index + 1
                }
                switch (nextData.billType) {
                  case '6402':
                    this.$router.push({path: 'signCardLaunchInfo', query: data})
                    this.getBillInfo()
                    break
                  case '6403':
                    this.$router.push({path: 'billLaunchInfo', query: data})
                    break
                  case '6404':
                    this.$router.push({path: 'furloughLaunchInfo', query: data})
                    break
                  case '6405':
                    this.$router.push({path: 'workApplyLaunchInfo', query: data})
                    break
                }
              }
            } else {
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          if (this.type === 'todo') {
            url = '/MyAplication/selectMyAplication'
            data = {
              checkmanId: this.$store.state.userInfo.code,
              userName: '',
              isCheck: 'N',
              pkBillType: this.selectBillType,
              time: this.time,
              pageNum: num,
              pageSize: 1
            }
          } else if (this.type === 'haveTodo') {
            url = '/myApply/queryApproveByAll'
            data = {
              checkmanId: this.$store.state.userInfo.code,
              userName: '',
              isCheck: 'Y',
              pkBillType: this.selectBillType,
              time: this.time,
              pageNum: num,
              pageSize: 1
            }
          }
          this.$ajax.get(url, {
            params: data
          }).then((response) => {
            if (response.data.code === '000000') {
              nextData.billCode = response.data.data.data[0].billNo
              nextData.billType = response.data.data.data[0].pkBillType
              if (nextData.billType === this.$route.query.billType) {
                this.$route.query.billCode = nextData.billCode
                this.$route.query.billType = nextData.billType
                this.index = this.index + 1
                this.getBillInfo()
              } else {
                var data = {
                  billType: nextData.billType,          // 单据类型
                  billCode: nextData.billCode,          // 单据编码
                  approveState: nextData.approveState,          // 单据状态
                  type: this.type,                 // 前一页面类型（我的申请）
                  total: this.total,                 // 发起列表总条数
                  pageNum: this.pageNum,            // 发起列表当前页数
                  pageSize: this.pageSize,              // 发起列表每页显示条数
                  time: this.time,
                  launchUser: this.launchUser,        // 查询人员
                  selectBillType: this.selectBillType,               // 查询方式（加班/出差/休假/调休/全部）
                  index: this.index + 1
                }
                switch (nextData.billType) {
                  case '6402':
                    this.$router.push({path: 'signCardLaunchInfo', query: data})
                    this.getBillInfo()
                    break
                  case '6403':
                    this.$router.push({path: 'billLaunchInfo', query: data})
                    break
                  case '6404':
                    this.$router.push({path: 'furloughLaunchInfo', query: data})
                    break
                  case '6405':
                    this.$router.push({path: 'workApplyLaunchInfo', query: data})
                    break
                }
              }
            } else {
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    },
    created () {
      this.getBillInfo()
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
  .marking {
    margin-top: 20px;
    text-align: center;
    background: #F5F6F8;
  }
  .marking span {
    height: 36px;
    line-height: 36px;
    display: inline-block;
  }
  .span {
    border-bottom: 2px solid #2d8cf0;
    font-weight: bold;
  }
  .marking span a {
    color: #495060;
  }
  .review {
    border: 1px solid #eeeeee;
  }
  .review .card {
    border: 0;
  }
  .opinion {
    background: #ffffff;
    padding: 16px;
    border: 1px solid #eeeeee;
  }
</style>
<style>
  .work-report-daily .ivu-form-item-error-tip {
    top: 15%;
    right: -94px;
    left:auto;
  }
</style>

