<template>
  <div class="contacts">
    <member-tree
      type="complex"
      :init-root-data="treeData"/>
  </div>
</template>

<script>
import MemberTree from '@/components/MemberTree'

export default {
  name: 'Contacts',
  components: {
    MemberTree
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
  },
  updated () {
    //  TODO 监控是否重绘，待删除
    console.log('##### MemberTree updated')
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
