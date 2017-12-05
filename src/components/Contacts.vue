<template>
  <div class="contacts">
    <Input
      v-model="searchValue"
      placeholder="搜索">
      <Button
        slot="append"
        icon="ios-search"
        @click="handleSearch"></Button>
    </Input>
    <Tree
      :show-checkbox="isShowCheckbox"
      :multiple="allowedMultiple"
      :data="list"/>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  props: {
    departmentId: String,
    showCheckbox: Boolean,
    multiple: Boolean
  },
  data () {
    return {
      searchValue: '',
      isShowCheckbox: this.showCheckbox || false,
      allowedMultiple: this.multiple || false,
      list: this.$store.state.contacts.departments
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.$store.dispatch('queryContacts', this.departmentId)
  },
  updated () {
    //  TODO 监控是否重绘，待删除
    console.log('##### Sidebar updated')
  },
  methods: {
    handleSearch () {
      console.log(this.searchValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
