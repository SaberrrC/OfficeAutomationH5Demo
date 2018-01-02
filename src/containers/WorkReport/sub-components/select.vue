<template>
  <div class="select-option">
    <Select v-model="model1" style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'selectOption',
  data () {
    return {
      cityList: [
        {
          value: '0',
          label: '一般'
        },
        {
          value: '1',
          label: '良好'
        },
        {
          value: '2',
          label: '优秀'
        }
      ],
      model1: '1'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
