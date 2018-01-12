<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col :lg="{span:5}" :xs="{span:10}">
          <h3>会议室预定</h3>
        </i-Col>
      </Row>
    </span>
    </p>

  <div class="work-report-daily">
    <Card :dis-hover="true">
      <Row>
        <i-Col :xs="{ span: 11, offset: 1 }" :sm="{ span: 11, offset: 1 }" :md="{ span: 11, offset: 1 }" :lg="{ span: 7, offset: 1 }" v-for="(room,key) in roomList" :key="key" class="meetroom">
          <div class="roomBody" @click="step(room.room_id,room.roomname,room.nop,room.device)">
            <img :src="room.roomimg" alt="会议室图片" >
            <div style="padding: 8px;">
              <Row>
                <i-Col span="16">
                  <Poptip trigger="hover" :content="room.roomname" :transfer="true" placement="top-start">
                  <i-Col style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                    <h4>{{room.roomname}}</h4>
                  </i-Col>
                  </Poptip>
                  <Row style="height: 25px;line-height: 25px">
                    <i-Col span="6"><span>{{room.nop}}人</span></i-Col>
                    <i-Col span="8"  style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                      <Poptip trigger="hover" :content="room.address" :transfer="true">
                        <i-Col style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                          <i class="iconfont icon-dingwei-" style="margin-right: 3px"></i>{{room.address}}
                        </i-Col>
                      </Poptip>
                    </i-Col>
                    <i-Col span="8" offset="2" v-if="room.device !== ''" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                      <Poptip trigger="hover" :content="room.device" :transfer="true">
                        <i-Col style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                          <i class="iconfont icon-touying" style="margin-right: 3px"></i>{{room.device}}
                        </i-Col>
                      </Poptip>
                    </i-Col>
                    <i-Col span="8" offset="2" v-else>&nbsp;</i-Col>
                  </Row>
                </i-Col>
                <i-Col span="8" style="text-align: right">
                  <Button  style="background: #E5AD1A;border-color: #E5AD1A;color: #ffffff;margin-top: 6px">立即预约</Button>
                </i-Col>
              </Row>
            </div>
            </div>
        </i-Col>
      </Row>

    </Card>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        roomList: []
      }
    },
    methods: {
//      获取会议室列表
      getMeetRoom () {
        this.$ajax.get(`/newMeetingRooms`, {
          params: {
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            let len = response.data.data.length
            let room = []
            for (let i = 0; i < len; i++) {
              if (response.data.data[i].isuse === 1) {
                response.data.data[i].roomimg = this.GLOBAL_.IMG_URL + response.data.data[i].roomimg
                room.push(response.data.data[i])
              }
            }
            this.roomList = room
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
//      点击立即预约
      step (roomId, roomName, nop, device) {
        this.$router.push({path: 'time', query: {roomId: roomId, roomName: roomName, nop: nop, device: device, type: this.$route.name}})
      }
    },
    created () {
      this.getMeetRoom()
    },
    mounted: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .work-report-daily {
    padding: 16px;
  }
  .meetroom{
    margin-bottom: 16px;
  }
  .roomBody {
    border: 1px solid #eeeeee;
    cursor: pointer
  }
  img {
    width: 100%;
    height: 221px;
    display: block;
  }
  .header {
    height: 53px;
    line-height: 53px;
    padding-left: 20px;
    background: #ffffff;
  }
  .ivu-poptip {
    display: block!important;
  }
  .ivu-poptip-rel {
    display: block!important;
  }
  .ivu-poptip, .ivu-poptip-rel {
    display: block!important;
  }
</style>
<style>
  .ivu-poptip {
    display: block!important;
  }
  .ivu-poptip-rel {
    display: block!important;
  }
  .ivu-poptip, .ivu-poptip-rel {
    display: block!important;
    /*float: left;*/
  }
</style>
