<template>
  <div class="home">
    <Row :gutter="16">
      <Col span="6" class="home-col-1">
      <Card class="organization" :dis-hover="true">
        <h3 slot="title">
          <Icon type="person-stalker"/>
          通讯录
        </h3>
        <member-tree
          type="complex"
          :show-checkbox="false"
          :multiple="false"
          :init-root-data="treeData"/>
      </Card>
      </Col>
      <Col span="12" class="home-col-2">
      <div class="home-col-2-1">
        <Card class="news-list" :dis-hover="true">
          <h3 slot="title">
            <Icon type="ios-world-outline"/>
            公司新闻
          </h3>
          <Carousel
            v-model="newsIndex"
            :autoplay-speed="5000"
            autoplay
            loop>
            <CarouselItem v-for="item in news" :key="item.id">
              <div class="news-item">
                <a :href="item.newsLink" target="_blank"><img :src="item.newsPhoto" :alt="item.newsTitle"></a>
                <p>{{item.newsTitle}}</p>
              </div>
            </CarouselItem>
          </Carousel>
        </Card>
      </div>
      <div class="home-col-2-2">
        <Card class="notice-list" :dis-hover="true">
          <h3 slot="title">
            <Icon type="ios-chatboxes-outline"/>
            公司公告
          </h3>
          <a href="#" slot="extra">更多
            <Icon type="arrow-right-b"/>
          </a>
          <ul>
            <li
              v-for="item in notices"
              @click="handleToNoticeDetail(item.nid)"
              :title="item.title">
              <span class="notice-title">{{item.title}}</span><span class="notice-name">{{item.username}}</span><span
              class="notice-type">{{item.type}}</span><span class="notice-time">{{item.sendTime}}</span>
            </li>
          </ul>
        </Card>
      </div>
      </Col>
      <Col span="6">
      <Card class="duty-record" :dis-hover="true">
        <h3 slot="title">
          <Icon type="ios-timer-outline"/>
          我的考勤
        </h3>
        <full-calendar :firstDay="1" lang="zh" :events="workAttendance.events"/>
        <div class="work-attendance-info">
          <span class="abnormal">异常<em v-if="workAttendance.abnormalCount">：{{workAttendance.abnormalCount}}</em><br/><i></i></span><span class="business">出差<em v-if="workAttendance.businessCount">：{{workAttendance.businessCount}}</em><br/><i></i></span><span class="overtime">加班<em v-if="workAttendance.overtimeCount">：{{workAttendance.overtimeCount}}</em><br/><i></i></span><span class="leave">休假<em v-if="workAttendance.leaveCount">：{{workAttendance.leaveCount}}</em><br/><i></i></span>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import MemberTree from '@/components/MemberTree'
import fullCalendar from '@/components/Calendar'
import imgPlaceholder from '../assets/images/news_pic.png'

export default {
  name: 'Homepage',
  components: {
    MemberTree,
    fullCalendar
  },
  data () {
    return {
      treeData: [
        {
          id: '1',
          title: '善林金融',
          loading: false,
          children: []
        }
      ],
      newsIndex: 0,
      //  TODO
      news: [
        {
          id: '1',
          newsTitle: '北京冬日神泉峡冰瀑醉游人',
          newsLink: '#',
          newsPhoto: imgPlaceholder
        },
        {
          id: '2',
          newsTitle: '国产大型水陆两栖飞机AG600成功首飞',
          newsLink: '#',
          newsPhoto: imgPlaceholder
        },
        {
          id: '3',
          newsTitle: '海归女辞去国企工作 当“网络哄睡师”',
          newsLink: '#',
          newsPhoto: imgPlaceholder
        },
        {
          id: '4',
          newsTitle: '重庆现“最浪”停车库',
          newsLink: '#',
          newsPhoto: imgPlaceholder
        }
      ],
      //  TODO
      notices: [
        {nid: '1', title: '关于全员加强企业文化的通知关于全员加强企业文化的通知', username: '行政部', type: '通知', sendTime: '2017-12-25'},
        {nid: '2', title: '关于全员加强企业文化的通知', username: '行政部', type: '通知', sendTime: '2017-12-25'},
        {nid: '3', title: '关于全员加强企业文化的通知', username: '行政部', type: '通知', sendTime: '2017-12-25'},
        {nid: '4', title: '关于全员加强企业文化的通知', username: '行政部', type: '通知', sendTime: '2017-12-25'},
        {nid: '5', title: '关于全员加强企业文化的通知', username: '行政部', type: '通知', sendTime: '2017-12-25'},
        {nid: '6', title: '关于全员加强企业文化的通知', username: '行政部', type: '通知', sendTime: '2017-12-25'}
      ],
      //  TODO
      workAttendance: {
        leaveCount: 1,
        abnormalCount: 1,
        overtimeCount: 1,
        businessCount: 1,
        events: [
          {title: '1', start: '2017-12-01', cssClass: 'leave'},
          {title: '5', start: '2017-12-05', cssClass: 'abnormal'},
          {title: '11', start: '2017-12-11', cssClass: 'overtime'},
          {title: '21', start: '2017-12-21', cssClass: 'business'}
        ]
      }
    }
  },
  created () {
    this.$store.dispatch('querySidebarList', 'home')
    //  请求公司新闻
    this.$ajax.get('/news/imgRoll').then((response) => {
      if (response.data && response.data.code === '000000') {
        //  TODO 临时数据，需要切换
        console.log('公司新闻')
        console.log(response.data.data)
        //  this.news = response.data.data
      }
    }).catch((err) => {
      console.log(err)
    })
    //  请求公司公告
    this.$ajax.get('/notice/noticeHome').then((response) => {
      if (response.data && response.data.code === '000000') {
        console.log('公司公告')
        //  TODO 临时数据，需要切换
        console.log(response.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
    //  请求我的考勤
    this.$ajax.get('/WorkAttendance/getWorkAttendance', {
      params: {
        userCode: window.localStorage.getItem('userCode'),
        date: '2017-1'
      }
    }).then((response) => {
      if (response.data && response.data.code === '000000') {
        console.log('我的考勤')
        //  TODO 临时数据，需要切换
        console.log(response.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleToNoticeDetail (id) {
      window.open(`//baidu.com?${id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  position: relative;
  height: 100%;
  padding: 16px;
  .ivu-row, .ivu-col {
    height: 100%;
    overflow-y: auto;
  }
  .home-col-1 > div {
    height: 100%;
  }
  .home-col-2 > div {
    overflow: hidden;
    > div {
      height: 100%;
    }
  }
  .home-col-2 > div:first-child {
    padding-bottom: 16px;
  }
}
.organization {
  position: relative;
  overflow-y: hidden;
  .ivu-tree {
    position: absolute;
    top: 92px;
    bottom: 0;
    width: 100%;
  }
}
.news-item {
  position: relative;
  > a {
    display: block;
    img {
      display: block;
      width: 100%;
    }
  }
  > p {
    position: absolute;
    bottom: 0;
    height: 45px;
    width: 100%;
    padding-left: 16px;
    font-size: 14px;
    line-height: 44px;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
  }
}
.notice-list {
  a {
    color: #333;
  }
  li {
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    span {
      display: inline-block;
      padding: 0 5px;
      vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .notice-title {
      width: 50%;
    }
    .notice-name {
      width: 17%;
      text-align: center;
    }
    .notice-type {
      width: 15%;
      text-align: center;
    }
    .notice-time {
      width: 18%;
      text-align: right;
    }
  }
  li:hover {
    background: #eee;
  }
}
.work-attendance-info {
  span {
    display: inline-block;
    vertical-align: middle;
    width: 25%;
    text-align: center;
    em {
      font-style: normal;
    }
    i {
      display: inline-block;
      height: 12px;
      width: 12px;
      line-height: 12px;
      border-radius: 50%;
    }
  }
  .leave i {
    background-color: #19be6b;
  }
  .abnormal i {
    background-color: #ed3f14;
  }
  .overtime i {
    background-color: #f90;
  }
  .business i {
    background-color: #2d8cf0;
  }
}

</style>
