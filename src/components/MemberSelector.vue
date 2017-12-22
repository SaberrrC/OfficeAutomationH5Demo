<template>
  <Modal
    v-model="modal"
    :closable="false"
    :mask-closable="false"
    :scrollable="true"
    width="488">
    <p slot="header" style="text-align:center"><span>选择人员</span></p>
    <div class="member-selector">
      <div class="options">
        <member-tree
          :init-root-data="treeData"
          @onMemberItemClick="handleMemberItemClick"/>
      </div>
      <div class="selected">
        <div
          v-for="item in selected"
          class="member-item">
          <span :class="['avatar', 'ivu-avatar', item.sex === '男' ? 'male' : 'female']">{{item.username.substring(0, 1)}}</span>
          <span class="member-name">{{item.username}}</span>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="ghost">取消</Button>
      <Button type="primary">添加</Button>
    </div>
  </Modal>
</template>

<script>
import MemberTree from '@/components/MemberTree'

export default {
  name: 'MemberSelector',
  components: {
    MemberTree
  },
  props: {
    modal: Boolean
  },
  data () {
    return {
      treeData: [
        {
          id: '1',
          title: '善林金融',
          loading: false,
          children: []
        }
      ],
      selected: {}
    }
  },
  methods: {
    handleMemberItemClick (data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.member-selector {
  height: 585px;
  .options, .selected {
    float: left;
    height: 100%;
    width: 50%;
    overflow-y: auto;
  }
  .options {
    border-right: 1px solid #ddd;
  }
}
.member-item {
  position: relative;
  height: 32px;
  margin-top: -19px;
  padding: 10px 16px 10px 48px;
  box-sizing: content-box;
  font-size: 14px;
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
