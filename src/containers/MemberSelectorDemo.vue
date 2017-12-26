<template>
  <div>
    <Button type="primary" @click="doSelectMember(data1)">选择人员</Button>
    <Button type="primary" @click="doSelectMember(data2)">这里也需要选择人员</Button>
    <member-selector
      v-if="isShow"
      :init-tree-data="initTreeData"
      @getSelectedMembers="getSelectedMembers"
      @removeMemberSelector="handleRemove('isShow')"/>
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
      isShow: false,
      //  这里是选择人员的初始化数组，一般根据业务场景异步取得
      initTreeData: []
    }
  },
  created () {
    this.data1 = [{
      id: '1',
      title: '善林金融',
      loading: false,
      children: []
    }]
    this.data2 = [{
      id: '1',
      title: '善林金融2',
      loading: false,
      children: []
    }]
  },
  methods: {
    doSelectMember (data) {
      this.initTreeData = data
      this.isShow = true
    },
    getSelectedMembers (data) {
      //  在这里处理选中的数组
      console.log(data)
    },
    handleRemove (name) {
      this[name] = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
