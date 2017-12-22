<template>
  <div class="contacts">
    <div class="search-bar">
      <Input
        v-model="searchValue"
        placeholder="搜索">
      <Button
        slot="append"
        icon="ios-search"
        @click="handleSearch"></Button>
      </Input>
    </div>
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
      searchValue: '',
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
    handleSearch () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contacts {
  height: 100%;
}
.search-bar {
  margin-bottom: 16px;
}
</style>
