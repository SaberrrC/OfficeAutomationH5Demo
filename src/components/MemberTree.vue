<template>
  <div class="member-tree">
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
    <Tree
      :class="[isShowCheckbox ? 'has-checkbox' : '']"
      :show-checkbox="isShowCheckbox"
      :multiple="allowedMultiple"
      :data="list"
      :load-data="loadData"
      @on-check-change="handleCheckChange"/>
  </div>
</template>

<script>
import MemberItem from '@/components/MemberItem'

export default {
  name: 'MemberTree',
  components: {
    MemberItem
  },
  props: {
    departmentId: String,
    showCheckbox: Boolean,
    multiple: Boolean,
    type: String  //  个人信息是否完整模式，传入 'complex' 则显示电话号码和邮箱
  },
  data () {
    return {
      searchValue: '',
      isShowCheckbox: this.showCheckbox || false,
      allowedMultiple: this.multiple || true,
      list: []
    }
  },
  created () {
    this.$store.dispatch('queryOrganization', this.departmentId).then((data) => {
      this.list = this.initRootData(data)
    })
  },
  updated () {
    //  TODO 监控是否重绘，待删除
    console.log('##### Sidebar updated')
  },
  methods: {
    handleSearch () {
      console.log(this.searchValue)
    },
    initRootData (data) {
      const result = {
        title: data.name,
        expand: true,
        children: []
      }
      for (let i = 0, l = data.children.length; i < l; i++) {
        const item = data.children[i]
        const memberCount = item.memberCount
        if (memberCount) {
          item.title = `${item.name}(${memberCount})`
          item.children = []
          item.loading = false
          result.children.push(item)
        }
      }
      return [result]
    },
    initChildrenData (data) {
      let result = []
      const originUsers = data.users
      const members = []
      const departments = []
      //  渲染成员列表
      if (originUsers.length > 0) {
        for (let i = 0, l = originUsers.length; i < l; i++) {
          members[i] = {
            render: (h, {r, n, d}) => {
              return h(MemberItem, {
                props: {
                  type: this.type,
                  options: originUsers[i]
                },
                on: {
                  onMemberItemClick: this.handleMemberItemClick
                }
              })
            }
          }
        }
      }
      if (data.children.length > 0 && data.memberCount > originUsers.length) {
        //  还存在子节点
        for (let i = 0, l = data.children.length; i < l; i++) {
          const item = data.children[i]
          item.title = `${item.name}(${item.memberCount})`
          item.children = []
          item.loading = false
          departments.push(item)
        }
      }
      result = departments.concat(members)
      return result
    },
    loadData (item, callback) {
      const id = item.id
      this.$store.dispatch('queryOrganization', id).then((data) => {
        callback(this.initChildrenData(data))
      })
    },
    handleCheckChange (list) {
    },
    //  memberItem 组件的点击回调
    handleMemberItemClick (opts) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.member-tree {
  height: 100%;
}
.search-bar {
  margin-bottom: 16px;
}
</style>
