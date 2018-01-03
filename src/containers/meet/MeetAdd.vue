<template>
  <div>
    <p slot="title" class="header">
    <span>
      <Row>
        <i-Col :lg="{span:5}" :xs="{span:10}">
          <a href="javascript:void (0)"><h3 style="display: inline-block">会议室预定</h3></a>
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
                <i-Col span="18">
                  <p>{{room.roomname}}</p>
                  <Row>
                    <i-Col span="8"><span>{{room.nop}}人</span></i-Col>
                    <i-Col span="8"><span><Icon type="ios-location-outline"></Icon>{{room.address}}</span></i-Col>
                    <i-Col span="8" v-if="room.device !== ''"><span><Icon type="ios-recording-outline"></Icon>{{room.device}}</span></i-Col>
                    <i-Col span="8" v-else></i-Col>
                  </Row>
                </i-Col>
                <i-Col span="6" style="text-align: right">
                  <!--<Button type="warning" style="background: #FFE5AD1A">立即预约</Button>-->
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
                response.data.data[i].roomimg = this.$ajax.defaults.baseURL + response.data.data[i].roomimg
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
        this.$router.push({path: 'time', query: {roomId: roomId, roomName: roomName, nop: nop, device: device}})
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
  }
  img {
    width: 100%;
    height: 221px;
    display: block;
  }
  .header {
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    background: #ffffff;
  }
</style>

