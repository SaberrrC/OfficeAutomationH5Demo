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
      :data="treeData"
      :load-data="loadData"
      :emptyText="emptyText"></Tree>
  </div>
</template>

<script>
import MemberItem from '@/components/MemberItem'

export default {
  name: 'MemberTree',
  props: {
    initRootData: Array, //  初始化根节点数据
    type: String  //  个人信息是否完整模式，传入 'complex' 则显示电话号码和邮箱
  },
  data () {
    return {
      searchValue: '',
      emptyText: '数据加载中，请稍后...',
      treeData: this.initRootData
    }
  },
  methods: {
    handleSearch () {
      if (this.searchValue) {
        this.$ajax.get('/organization/queryUserByName', {
          params: {
            token: 'f19dc8a190f445a2a4cee5b5c3c872c0', //  TODO 临时测试
            uid: '84', //  TODO 临时测试
            name: this.searchValue
          }
        }).then((response) => {
          if (response.data && response.data.data && response.data.data.length) {
            this.treeData = this.initMemberData(response.data.data)
          } else {
            this.treeData = []
            this.emptyText = '没有符合条件的结果'
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        if (!this.treeData.length) this.treeData = this.initRootData
      }
    },
    loadData (item, callback) {
      this.$store.dispatch('queryOrganization', item.id).then((data) => {
        let json = JSON.stringify(data)
        json = json.replace(/"name"/g, '"title"')
        const newData = JSON.parse(json)
        callback(this.initChildrenData(newData))
      })
    },
    //  初始化子节点
    initChildrenData (data) {
      const children = data.children
      const users = data.users
      let newData = []
      for (let i = 0, l = children.length; i < l; i++) {
        //  过滤 memberCount 为 0 的项
        const item = children[i]
        if (item.memberCount > 0) {
          item.title = `${item.title}（${item.memberCount}）`
          item.loading = false
          item.children = []
          newData.push(item)
        }
      }
      //  判断该层级是否存在成员
      if (users && users.length > 0) {
        const _users = this.initMemberData(users)
        newData = newData.concat(_users)
      }
      return newData
    },
    //  初始化成员列表
    initMemberData (data) {
      const newData = []
      if (data.length > 0) {
        for (let i = 0, l = data.length; i < l; i++) {
          newData[i] = {
            title: data[i].username,
            render: (h) => {
              return h(MemberItem, {
                props: {
                  type: this.type,
                  options: data[i]
                },
                on: {
                  onMemberItemClick: this.handleMemberItemClick
                }
              })
            }
          }
        }
      }
      return newData
    },
    //  点击成员回调函数
    handleMemberItemClick (data) {
      console.log(data)
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
