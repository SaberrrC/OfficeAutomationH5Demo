<template>
  <div class="work-report-daily">
    <Card>
      <p slot="title">会议室预定</p>
      <Row>
        <Col :xs="{ span: 11, offset: 1 }" :sm="{ span: 11, offset: 1 }" :md="{ span: 11, offset: 1 }" :lg="{ span: 7, offset: 1 }" v-for="room in roomList" class="meetroom">
          <Card @click="step()">
            <img :src="room.roomimg" alt="会议室图片" @click="step()">
            <div>
              <span>{{room.roomname}}</span>
              <div @click="step()">
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
</template>

<script>
  export default {
    name: 'WorkReportDaily',
    data () {
      return {
        roomList: [
          {
            roomimg: 'http://img07.tooopen.com/images/20170922/tooopen_sy_225230576346.jpg',
            roomname: '七楼大会议室',
            nop: '20',
            address: '星峰企业园5楼',
            device: '投影仪'
          },
          {
            roomimg: 'http://img06.tooopen.com/images/20170106/tooopen_sy_195886579867.jpg',
            roomname: '七楼大会议室',
            nop: '20',
            address: '星峰企业园5楼',
            device: '投影仪'
          },
          {
            roomimg: 'http://img07.tooopen.com/images/20170922/tooopen_sy_225230576346.jpg',
            roomname: '七楼大会议室',
            nop: '20',
            address: '星峰企业园5楼',
            device: '投影仪'
          },
          {
            roomimg: 'http://img07.tooopen.com/images/20170922/tooopen_sy_225230576346.jpg',
            roomname: '七楼大会议室',
            nop: '20',
            address: '星峰企业园5楼',
            device: '投影仪'
          },
          {
            roomimg: 'http://img07.tooopen.com/images/20170922/tooopen_sy_225230576346.jpg',
            roomname: '七楼大会议室',
            nop: '20',
            address: '星峰企业园5楼',
            device: '投影仪'
          }
        ]
      }
    },
    methods: {
      step () {
//        this.$router.push({path:'time',query:{room_id:room_id,roomname:roomname,nop:nop,device:device}})
        console.log(123)
      }
    },
    created () {
      console.log('##### WorkReportDaily created')
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
</style>
