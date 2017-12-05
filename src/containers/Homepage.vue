<template>
  <div class="home">
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <h3 slot="title">
            <Icon type="person-stalker"/>
            通讯录
          </h3>
          <contacts/>
        </Card>
      </Col>
      <Col span="12">
        <Card>
          <h3 slot="title">
            <Icon type="ios-world-outline"/>
            公司新闻
          </h3>
        </Card>
        <Card>
          <h3 slot="title">
            <Icon type="ios-chatboxes-outline"/>
            公司公告
          </h3>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <h3 slot="title">
            <Icon type="ios-timer-outline"/>
            我的考勤
          </h3>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Contacts from '@/components/Contacts'

export default {
  name: 'Homepage',
  components: {
    Contacts
  },
  data () {
    return {
      msg: '善林 OA 首页'
    }
  },
  created () {
    this.$store.dispatch('querySidebarList', 'home')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  padding: 16px;
}
.ivu-card {
  margin-bottom: 16px;
}
</style>
