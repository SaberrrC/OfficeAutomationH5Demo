<template>
  <div class="member-selector">
    <div class="member-selector-content">
      <h3 class="member-selector-header"><span>选择人员</span></h3>
      <div class="member-selector-body">
        <div class="options">
          <member-tree
            :init-root-data="initTreeData"
            @onMemberItemClick="handleMemberItemClick"/>
        </div>
        <div class="selected">
          <h3>已选择</h3>
          <ul>
            <li
              v-for="(value, key) in selected"
              class="member-item">
              <span :class="['avatar', 'ivu-avatar', value.sex === '男' ? 'male' : 'female']">{{value.username.substring(0, 1)}}</span>
              <span class="member-name">{{value.username}}</span>
              <span class="remove"  @click="handleRemove(key)"><Icon type="ios-close-outline" :size="18"/></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="member-selector-footer">
        <Button type="ghost" @click="handleCancel">取消</Button><Button type="primary" @click="handleOk">添加</Button>
      </div>
    </div>
    <div class="member-selector-mask"></div>
  </div>
</template>

<script>
import MemberTree from '@/components/MemberTree'

export default {
  name: 'MemberSelector',
  components: {
    MemberTree
  },
  props: {
    initTreeData: Array
  },
  data () {
    return {
      selected: {}
    }
  },
  methods: {
    //  向已选中集合里添加对象，利用 object 的 key 值唯一性保证不重复
    handleMemberItemClick (data) {
      console.log('#From MemberSelector =>')
      console.log(data)
      this.$set(this.selected, data.uid, data)
    },
    handleRemove (id) {
      this.$delete(this.selected, id)
    },
    handleOk () {
      const selected = []
      //  把对象还原为数组
      for (let key in this.selected) {
        if (this.selected.hasOwnProperty(key)) {
          selected.push(this.selected[key])
        }
      }
      //  通过指定方法名称回传选中数据给父组件
      if (selected.length) {
        this.$store.dispatch('changeMemberSelector', false)
        this.$emit('getSelectedMembers', selected)
      }
    },
    handleCancel () {
      this.$store.dispatch('changeMemberSelector', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.member-selector-content {
  position: fixed;
  z-index: 999;
  top: 60px;
  left: 50%;
  width: 488px;
  margin-left: -244px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 4px;
}
.member-selector-header {
  height: 50px;
  font-weight: normal;
  font-size: 16px;
  line-height: 49px;
  text-align: center;
  border-bottom: 1px solid #e1e3e5;
}
.member-selector-body {
  height: 440px;
  padding-bottom: 48px;
  .options, .selected {
    float: left;
    height: 100%;
    width: 50%;
    padding: 16px 16px 0;
    overflow-y: auto;
  }
  .options::after {
    content: '';
    position: absolute;
    height: 440px;
    width: 1px;
    top: 50px;
    left: 50%;
    background: #e1e3e5;
  }
  .selected {
    h3 {
      height: 32px;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
    }
    > ul {
      padding-left: 36px;
    }
  }
}
.member-selector-footer {
  position: absolute;
  right: 16px;
  bottom: 16px;
  button {
    margin-left: 8px;
  }
}
.member-selector-mask {
  position: fixed;
  z-index: 998;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(55,55,55,.6);
}
.member-item {
  position: relative;
  height: 32px;
  padding: 10px 16px 10px 48px;
  box-sizing: content-box;
  font-size: 14px;
  .remove {
    position: absolute;
    top: 50%;
    right: 16px;
    margin-top: -9px;
    cursor: pointer;
  }
}
.avatar {
  position: absolute;
  top: 10px;
  left: 0;
}
.member-name {
  float: left;
  line-height: 32px;
}
.male {
  background: #2d8cf0;
}
.female {
  background: #ed3f14;
}
</style>
