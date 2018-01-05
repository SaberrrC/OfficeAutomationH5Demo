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
          <a href="javascript:void(0);" slot="extra" @click="$router.push('/notice')">更多
            <Icon type="arrow-right-b"/>
          </a>
          <ul>
            <li
              v-for="item in notices"
              @click="handleToNoticeDetail(item.id)"
              :title="item.title">
              <span class="notice-title">{{item.title}}</span><span class="notice-name">{{item.postUserId}}</span><span
              class="notice-type">{{noticeType(item.noticeClass)}}</span><span class="notice-time">{{formatDate(item.createTime*1000,false)}}</span>
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
        <full-calendar :firstDay="1" lang="zh" :events="calendarEvents"/>
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
import formatDate from '@/utils/formatDate'
//  import imgPlaceholder from '../assets/images/news_pic.png'

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
          expand: true,
          children: []
        }
      ],
      newsIndex: 0,
      news: [],
      notices: [],
      workAttendance: {
        leaveCount: '0',
        abnormalCount: '0',
        overtimeCount: '0',
        businessCount: '0'
      },
      calendarEvents: []
    }
  },
  created () {
    //  加载二级菜单
    this.$store.dispatch('querySidebarList', '0')
    //  请求通讯录组织架构
    this.$store.dispatch('queryOrganization').then((response) => {
      let jsonStr = JSON.stringify(response.children)
      jsonStr = jsonStr.replace(/"name"/g, '"title"')
      const json = JSON.parse(jsonStr)
      const newData = []
      json.forEach((item) => {
        if (item.memberCount > 0) {
          item.title = `${item.title}（${item.memberCount}）`
          item.loading = false
          item.children = []
          newData.push(item)
        }
      })
      this.treeData[0].children = newData
    })
    //  请求公司新闻
    this.$ajax.get('/news/imgRoll').then((response) => {
      if (response.data && response.data.code === '000000') {
        this.news = response.data.data
        let len = this.news.length
        for (let i = 0; i < len; i++) {
          this.news[i].newsPhoto = this.GLOBAL_.IMG_URL + this.news[i].newsPhoto
        }
      }
    }).catch((err) => {
      console.log(err)
    })
    //  请求公司公告
    this.$ajax.get('/notice/noticeHome').then((response) => {
      if (response.data && response.data.code === '000000') {
        this.notices = response.data.data
        console.log('notices', this.notices)
      }
    }).catch((err) => {
      console.log(err)
    })
    //  请求我的考勤
    this.$ajax.get('/WorkAttendance/getWorkAttendance', {
      params: {
        userCode: window.localStorage.getItem('userCode'),
        date: formatDate(new Date(), true)
      }
    }).then((response) => {
      if (response.data && response.data.code === '000000') {
        const data = response.data.data
        let abnormalCount = 0
        abnormalCount += parseInt(data.cdCount, 10)
        abnormalCount += parseInt(data.ztCount, 10)
        abnormalCount += parseInt(data.kgCount, 10)
        this.workAttendance.leaveCount = data.xjCount
        this.workAttendance.abnormalCount = `${abnormalCount}`
        this.workAttendance.overtimeCount = data.jbCount
        this.workAttendance.businessCount = data.ccCount
        const events = []
        data.ccWorkAttendanceList.forEach((item) => {
          if (!item.calendar) return
          events.push({
            title: new Date(item.calendar).getDate(),
            start: item.calendar,
            cssClass: 'business'
          })
        })
        data.ycWorkAttendanceList.forEach((item) => {
          if (!item.calendar) return
          events.push({
            title: new Date(item.calendar).getDate(),
            start: item.calendar,
            cssClass: 'abnormal'
          })
        })
        data.jbWorkAttendanceList.forEach((item) => {
          if (!item.calendar) return
          events.push({
            title: new Date(item.calendar).getDate(),
            start: item.calendar,
            cssClass: 'overtime'
          })
        })
        data.xjWorkAttendanceList.forEach((item) => {
          if (!item.calendar) return
          events.push({
            title: new Date(item.calendar).getDate(),
            start: item.calendar,
            cssClass: 'leave'
          })
        })
        this.calendarEvents = events
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleToNoticeDetail (id) {
      //  TODO 公告详情
      console.log(id)
      //  window.open(`/notice_detail/?${id}`)
    },
    formatDate,
    noticeType (type) {
      switch (type) {
        case 1:
          return '通知'
        case 2:
          return '表彰'
        case 3:
          return '活动'
      }
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
</style>
