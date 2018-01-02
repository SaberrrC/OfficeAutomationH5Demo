<template>
  <div class="communication">
     <div class="groupHead">
       <input class="search" style='text-align:center' v-model="filterText" placeholder="联系人搜索" />
     </div>
     <div class="group_list" id='group_list'>
      <el-tree lazy v-show="showTree" :props="listProps" :load="listLoad"
        @check-change="handleCheckChange"
        @node-click="listNodeClick">
      </el-tree>
      <div class="loading" v-show="loadingValue">
        <p>正在加载中，请稍等.....</p>
      </div>
     </div>
     <div class="p_listSearch" v-if="p_listSearchShow">
        <div class="list_name" v-for="(item, index) in listSearch" v-on:click="openChatBox(item)" >
          <div class="text">
            <div class="child_name">{{item.userName}} -- {{item.departmentName}}</div>
          </div>
        </div>
        <div class="list-search-no-match" v-if="listSearch && listSearch.length === 0">
          查询无结果
        </div>
     </div>
  </div>
</template>

<script>
/* eslint-disable */
import config from '../config/index'
import {mapState} from 'vuex'
import qs from 'qs'
import chat from '../module/chatting'

export default {
  name: 'listAccountBook',
  data() {
    return {
      showTree: false,
      loadingValue: true,
      filterText: '',
      p_listSearchShow: false,
      listSearch: [],
      PersonalmesValue: false,
      listProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      }
      // data2: []
    };
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo,
      showSid: state => state.showSid
    }),
    TXListState() {
      return this.$store.state.TXListState;
    }
  },
  methods: {
    openChatBox (item) {
      console.log(item)
      this.$store.state.showSid = 'SL_' + item.code
      this.filterText = ''
      this.$parent.sectionType = 1 // 切换到聊天列表
      this.$store.dispatch('openChatBox', {item: item})
    },
    listNodeClick (item) {
      if (item.code) {
        this.openChatBox(item)
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log('handleCheckChange', data, checked, indeterminate);
    },
    listLoad (node, resolve) {
      let id = 1
      if (node && node.level > 0) {
        id = node.data.id
        if (typeof node.data.id !== undefined && node.data.id === '') {
          return resolve([])
        }
      }
      let list = []
      chat.queryOrganization(id).then((data) => {
        if (data.children && data.children.length > 0) {
          for (var i = 0; i < data.children.length; i++) {
            if (!data.children[i].memberCount || data.children[i].memberCount < 1) {
              continue
            }
            let obj = data.children[i]
            obj['leaf'] = false
            obj['name'] = data.children[i].name + ' (' + data.children[i].memberCount + ')'
            list.push(obj)
          }
        }
        if (data.users && data.users.length > 0) {
          for (var i = 0; i < data.users.length; i++) {
            let obj = data.users[i]
            obj['name'] = data.users[i].username
            obj['leaf'] = true
            list.push(obj)
          }
        }
        return resolve(list)
      }, () => {
        return resolve(list)
      })
    },
    filterNode(value, data) {
      // 模糊查询
      if (!value) return true;
      console.log(data.label);
      return data.label.indexOf(value) !== -1;
    },
    init() {
      // this.data2 = this.$store.state.TXListState;
    },
    // showPersonalmes (data) {
    //   let pid = 1;
    //   let data1 = {
    //     department_id: pid,
    //     ssid: chat.getSsid()
    //   }
    //     window.axios
    //       .post(config.OA_URL+"index/framework",
    //         qs.stringify(data1),
    //         {
    //           headers: {
    //             token: window.store.state.userinfo.token,
    //             uid: window.store.state.userinfo.uid
    //           }
    //         })
    //       .then(response => {
    //         getArray(
    //           this.data2,
    //           response.data.data.department.department_id,
    //           response.data.data.department,
    //           response.data.data.employee
    //         );
    //       });
    // },
    closepersonnalbase() {
      this.PersonalmesValue = !this.PersonalmesValue;
    }
  },
  watch: {
    filterText (val) {
      if (val.trim() === '') {
        this.p_listSearchShow = false
        return
      }
      val && chat.userSearch(val).then((x) => {
        this.listSearch = []
        this.p_listSearchShow = true
        for (let i = 0; i < x.length; i++) {
          let tmp = Object.assign({}, x[i], {
            name: x[i].userName,
            img: x[i].portrait ? x[i].portrait : this.$store.state.image,
            sId: 'SL_' + x[i].code,
            type: 'chat'
          })
          this.listSearch.push(tmp)
        }
      }, function () {
        this.p_listSearchShow = true
        this.listSearch = []
      })
    }
  },
  mounted() {
    // this.showPersonalmes();
    this.init();
    setTimeout(() => {
      this.loadingValue = false;
      this.showTree = true;
		}, 3000)
  }
};

function getArray(data, department_id, department, employee) {
  for (var i in data) {
    if (data[i].department_id == department_id) {
      data[i].children = [];
      if (getJsonLength(department) > 1) {
        for (let key in department) {
          let childobj = {
            label: department[key].department_name,
            children: [{}]
          };
          data[i].children.push(Object.assign(department[key], childobj));
        }
      }
      if (employee.length > 0) {
        for (let childkey in employee) {
          if (
            employee[childkey].username != null &&
            employee[childkey].username != ""
          ) {
            let treechildobj = { label: employee[childkey].username };
            data[i].children.push(
              Object.assign(employee[childkey], treechildobj)
            );
          }
        }
      }
      break;
    } else {
      if (data[i].children != undefined) {
        getArray(data[i].children, department_id, department, employee);
      }
    }
  }
}
function getJsonLength(jsonData) {
  var jsonLength = 0;
  for (var item in jsonData) {
    jsonLength++;
  }
  return jsonLength;
}
</script>
