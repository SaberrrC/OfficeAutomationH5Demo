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
      empty-text="数据加载中，请稍后..."
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
    console.log('##### MemberTree updated')
  },
  methods: {
    handleSearch () {
      //  console.log(this.initMemberData([this.tmp]))
      //  this.list = this.initMemberData([this.tmp])
      this.$ajax.get('/organization/queryUserByName', {
        params: {
          token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
          uid: '84', //  TODO 临时测试
          name: this.searchValue
        }
      }).then((response) => {
        if (response.data) {
          this.list = []
          const list = this.initMemberData(response.data.data)
          for (let i = 0, l = list.length; i < l; i++) {
            this.$set(this.list, i, {render: list[i].render})
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //  初始化根节点
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
    //  初始化子节点
    initChildrenData (data) {
      let result = []
      const originUsers = data.users
      const members = this.initMemberData(originUsers)
      const departments = []
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
    //  渲染成员列表
    initMemberData (list) {
      console.log(list)
      const members = []
      if (list.length > 0) {
        for (let i = 0, l = list.length; i < l; i++) {
          members[i] = {
            render: (h, {r, n, d}) => {
              return h(MemberItem, {
                props: {
                  type: this.type,
                  options: list[i]
                },
                on: {
                  onMemberItemClick: this.handleMemberItemClick
                }
              })
            }
          }
        }
      }
      return members
    },
    //  递归载入数据
    loadData (item, callback) {
      const id = item.id
      this.$store.dispatch('queryOrganization', id).then((data) => {
        callback(this.initChildrenData(data))
      })
    },
    //  选中子节点回调，需要开启 showCheckbox
    handleCheckChange (list) {
      console.log(list)
    },
    //  memberItem 组件的点击回调
    handleMemberItemClick (opts) {
      console.log(opts)
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
