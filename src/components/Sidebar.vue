<template>
  <aside class="sidebar">
    <Menu
      ref="sidebar"
      theme="dark"
      :active-name="activeName"
      :open-names="openNames"
      @on-select="handleSelect">
      <Submenu
        v-for="item in list"
        :key="item.id"
        :name="item.id">
        <template slot="title">
          <Icon :type="item.iconType"/>
          {{item.name}}
        </template>
        <MenuItem
          v-for="i in item.children"
          :key="i.id"
          :name="`${item.id}/${i.id}`">
          {{i.name}}
        </MenuItem>
      </Submenu>
    </Menu>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    list: Array
  },
  data () {
    return {
      activeName: '',
      openNames: []
    }
  },
  watch: {
    '$route' (val) {
      this.updateSidebar(val.path)
    }
  },
  created () {
    this.updateSidebar(this.$route.path)
  },
  methods: {
    updateSidebar (path) {
      var arr = path.substring(1).split('/')
      this.activeName = arr[0] + '/' + arr[1]
      console.log('path', path)
      console.log('activeName', this.activeName)
      this.addOpenList(path.split('/')[1], this.openNames)
      this.$nextTick(() => {
        this.$refs.sidebar.updateActiveName()
        this.$refs.sidebar.updateOpened()
      })
    },
    //  防止重复添加数组元素
    addOpenList (item, list) {
      if (!~list.indexOf(item)) list.push(item)
    },
    handleSelect (path) {
      if (path) {
        //  判断是否外链
        if (~path.indexOf('://')) {
          window.location.href = path
        } else {
          this.$router.push(`/${path}`)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 240px;
  background: #495060;
  .ivu-menu, .ivu-menu-item {
    font-size: 16px;
  }
}
</style>
