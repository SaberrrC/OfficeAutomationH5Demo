<template>
  <aside class="sidebar">
    <Menu
      ref="menu"
      theme="dark"
      :active-name="activeName"
      :open-names="openNames"
      @on-select="handleSelect">
      <Submenu
        v-for="item in list"
        :key="item.id"
        :name="item.url">
        <template slot="title">
          <Icon :type="item.iconType"/>
          {{item.name}}
        </template>
        <MenuItem
          v-for="i in item.children"
          :key="i.id"
          :name="`${item.url}/${i.url}`">
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
    '$route' (to) {
      this.updateSidebar(to.path)
    }
  },
  created () {
    this.updateSidebar()
  },
  updated () {
    this.$nextTick(() => {
      this.$refs.menu.updateActiveName()
      this.$refs.menu.updateOpened()
    })
  },
  methods: {
    updateSidebar (path) {
      path = path || this.$route.path
      const arr = path.split('/')
      this.activeName = arr[1] + '/' + arr[2]
      this.addOpenList(arr[1], this.openNames)
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
