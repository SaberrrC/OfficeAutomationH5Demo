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
    <Card>
      <Row>
        <Col :xs="{ span: 11, offset: 1 }" :sm="{ span: 11, offset: 1 }" :md="{ span: 11, offset: 1 }" :lg="{ span: 7, offset: 1 }" v-for="room in roomList" class="meetroom">
          <Card @click="step(room.room_id)">
            <img :src="room.roomimg" alt="会议室图片" @click="step(room.room_id,room.roomname,room.nop,room.device)">
            <div>
              <span>{{room.roomname}}</span>
              <div @click="step(room.room_id,room.roomname,room.nop,room.device)">
                <p style="display:inline-block;margin-right: 25px">
                  <span>{{room.nop}}人</span>&nbsp;
                  <span><Icon type="ios-location-outline"></Icon>{{room.address}}</span>&nbsp;
                  <span><Icon type="ios-gear-outline"></Icon>{{room.device}}</span>
                </p>
                <Button type="primary">立即预约</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

    </Card>
  </div>
  </div>
</template>

<script>
  //  TODO 临时测试环境变量
  const TEST_CONFIG = 'http://118.31.18.67:8084'
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
        this.$ajax.get(`${TEST_CONFIG}/newMeetingRooms`, {
          params: {
          },
          headers: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84' //  TODO 临时测试
          }
        }).then((response) => {
          if (response.data.code === '000000') {
            var len = response.data.data.length
            var room = []
            for (var i = 0; i < len; i++) {
              if (response.data.data[i].isuse === 1) {
                response.data.data[i].roomimg = 'http://118.31.18.67:96' + response.data.data[i].roomimg
                room.push(response.data.data[i])
              }
            }
            this.roomList = room
            console.log(room)
            console.log(this.roomList)
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

    margin-bottom: 15px;
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
