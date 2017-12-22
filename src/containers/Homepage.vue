<template>
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
        <Button type="primary" @click="$store.dispatch('changeMemberSelector', true)">选择人员</Button>
        <keep-alive>
          <member-selector
            v-if="memberSelectorIsShow"
            :init-tree-data="initTreeData"
            @getSelectedMembers="getSelectedMembers"/>
        </keep-alive>
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
      //  TODO 这里是选择人员的初始化数组，不要和下面的混淆，一般根据业务场景异步取得
      initTreeData: [
        {
          id: '1',
          title: '善林金融',
          loading: false,
          children: []
        }
      ],
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
  computed: {
    //  TODO 从 state 获取是否显示状态并利用计算属性触发更新
    memberSelectorIsShow () {
      return this.$store.state.showMemberSelector
    }
  },
  created () {
    this.$store.dispatch('querySidebarList', 'home')
  },
  methods: {
    getSelectedMembers (data) {
      //  TODO 在这里处理选中的数组
      console.log(data)
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
