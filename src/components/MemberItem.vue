<template>
  <div
    :class="['member-item', type]"
    @click="handleClick(options)">
    <span :class="['avatar', 'ivu-avatar', this.options.sex === '男' ? 'male' : 'female']">{{options.username.substring(0, 1)}}</span>
    <span class="member-name">{{options.username}}</span>
    <span v-if="type === 'complex'" class="post-title">{{options.post_title}}</span>
    <div v-if="type === 'complex' && /^1\d{10}$/.test(this.options.phone)" class="phone"><Icon type="ios-telephone"/> <span>{{this.options.phone}}</span></div>
    <div v-if="type === 'complex' && /^.+@.+\.\w+$/.test(this.options.email)" class="email"><Icon type="email"/> <span>{{this.options.email}}</span></div>
    <Icon v-if="options.isSelected" class="selected-icon" type="checkmark-circled"/>
  </div>
</template>

<script>
export default {
  name: 'MemberItem',
  props: {
    type: String,
    options: Object
  },
  data () {
    return {
    }
  },
  methods: {
    handleClick (data) {
      console.log('#From MemberItem =>')
      console.log(data)
      this.$emit('onMemberItemClick', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.member-item {
  position: relative;
  z-index: 99;
  height: 32px;
  margin-top: -19px;
  padding: 10px 16px 10px 48px;
  box-sizing: content-box;
  font-size: 14px;
  cursor: default;
  background: #fff;
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
.post-title {
  float: right;
  line-height: 32px;
  font-size: 12px;
  color: #666;
}
.complex {
  height: auto;
  min-height: 32px;
  .member-name, .post-title {
    line-height: 16px;
    margin-bottom: 8px;
  }
}
.phone, .email {
  line-height: 16px;
  font-size: 12px;
  clear: both;
}
.email span {
  color: #999;
}
.selected-icon {
}
</style>
