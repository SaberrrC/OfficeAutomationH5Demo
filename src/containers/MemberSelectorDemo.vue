<template>
  <div>
    <Button type="primary" @click="$store.dispatch('changeMemberSelector', true)">选择人员</Button>
    <member-selector
      v-if="memberSelectorIsShow"
      :init-tree-data="initTreeData"
      @getSelectedMembers="getSelectedMembers"/>
  </div>
</template>

<script>
import MemberSelector from '@/components/MemberSelector'

export default {
  name: 'Demo',
  components: {
    MemberSelector
  },
  data () {
    return {
      //  这里是选择人员的初始化数组，一般根据业务场景异步取得
      initTreeData: [
        {
          id: '1',
          title: '善林金融',
          loading: false,
          children: []
        }
      ]
    }
  },
  computed: {
    //  从获取是否显示状态并利用计算属性触发更新
    memberSelectorIsShow () {
      return this.$store.state.showMemberSelector
    }
  },
  created () {
  },
  methods: {
    getSelectedMembers (data) {
      //  在这里处理选中的数组
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
