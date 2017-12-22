<template xmlns:member-tree="http://www.w3.org/1999/html">
  <div class="home">
    <Row :gutter="16">
      <Col span="5" class="home-col-1">
      <Card class="organization">
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
      <Col span="14" class="home-col-2">
      <Card>
        <h3 slot="title">
          <Icon type="ios-world-outline"/>
          公司新闻
        </h3>
        <member-selector
          :modal="true"/>
      </Card>
      <Card>
        <h3 slot="title">
          <Icon type="ios-chatboxes-outline"/>
          公司公告
        </h3>
      </Card>
      </Col>
      <Col span="5">
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
import MemberTree from '@/components/MemberTree'
import MemberSelector from '@/components/MemberSelector'

export default {
  name: 'Homepage',
  components: {
    MemberTree,
    MemberSelector
  },
  data () {
    return {
      treeData: [
        {
          id: '1',
          title: '善林（上海）金融信息服务有限公司',
          loading: false,
          children: []
        }
      ]
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
  .home-col-1 > div {
    height: 100%;
  }
  .home-col-2 > div:first-child {
    margin-bottom: 16px;
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
</style>
