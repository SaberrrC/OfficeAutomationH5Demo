<template>
  <div class="home">
    <Row :gutter="16">
      <Col span="6">
      <Card class="organization">
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
  position: relative;
  height: 100%;
  padding: 16px;
  .ivu-row, .ivu-col {
    height: 100%;
  }
}
.organization {
  position: relative;
  height: 100%;
  overflow-y: hidden;
  .ivu-tree {
    position: absolute;
    top: 92px;
    bottom: 0;
    width: 100%;
  }
}
</style>
