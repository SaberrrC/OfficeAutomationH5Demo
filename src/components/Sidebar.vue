<template>
  <aside class="sidebar">
    <Menu
      theme="dark"
      :active-name="activeName"
      :open-names="[openName]"
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
          :name="i.id">
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
      openName: ''
    }
  },
  created () {
    const paths = this.$route.path.split('/')
    this.activeName = paths[2]
    this.openName = paths[1]
  },
  methods: {
    handleSelect (id) {
      if (id) {
        //  判断是否外链
        if (~id.indexOf('://')) {
          window.location.href = id
        } else {
          this.$router.push(`/${this.openName}/${id}`)
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
}
</style>
