<template>
  <div class="notice-from">
    <Card>
      <div slot="title">
        <i-select v-model="isRead" style="width:200px" placeholder="请选择状态">
          <Option v-for="item in readList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-select>
        <i-select v-model="isRead" style="width:200px" placeholder="请选择状态">
          <Option v-for="item in readList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-select>
        <i-select v-model="isRead" style="width:200px" placeholder="请选择状态">
          <Option v-for="item in readList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-select>
        <i-select v-model="isRead" style="width:200px" placeholder="请选择状态">
          <Option v-for="item in readList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-select>
      </div>
      <div class="container">
        <Table height="400" :columns="columns" :data="data"></Table>
        <br>
        <Page :total="100" show-sizer show-total></Page>
      </div>
    </Card>
  </div>
</template>

<script>
  import ISelect from "../../node_modules/iview/src/components/select/select.vue";

  export default {
    components: {ISelect},
    name: 'NoticeFrom',
    data() {
      return {
        isRead: "",
        readList: [{
          value: 1,
          label: "已读"
        },
          {
            value: 2,
            label: "未读"
          }],
        columns: [
          {
            title: 'Name',
            key: 'name',
            sortable: true
          },
          {
            title: 'Age',
            key: 'age',
            sortable: true
          },
          {
            title: 'Address',
            key: 'address',
            sortable: true
          }
        ],
        data: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    created() {
      console.log('##### NoticeFrom created')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .notice-from {
    padding: 16px;
  }
</style>
