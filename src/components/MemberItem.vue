<template>
  <div
    :class="['member-item', type]"
    @click="handleClick(options)">
    <span :class="['avatar', 'ivu-avatar', gender]">{{name.substring(0, 1)}}</span>
    <span class="member-name">{{name}}</span>
    <span class="post-title">{{jobTitle}}</span>
    <div v-if="type === 'complex'" class="phone"><Icon type="ios-telephone"/> <span>{{phone}}</span></div>
    <div v-if="type === 'complex' && email && email !== 'null'" class="email"><Icon type="email"/> <span>{{email}}</span></div>
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
      gender: this.options.sex === '男' ? 'male' : 'female',
      name: this.options.username,
      jobTitle: this.options.post_title,
      phone: this.options.phone,
      email: this.options.email
    }
  },
  created () {
  },
  updated () {
  },
  methods: {
    handleClick (opts) {
      this.$emit('onMemberItemClick', opts)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.member-item {
  position: relative;
  height: 32px;
  margin-top: -19px;
  padding: 10px 16px 10px 48px;
  box-sizing: content-box;
  font-size: 14px;
}
.has-checkbox .member-item {
  margin-left: 42px;
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
  .member-name, .post-title {
    line-height: 16px;
    margin-bottom: 8px;
  }
}
.complex {
  height: auto;
}
.phone, .email {
  line-height: 16px;
  font-size: 12px;
  clear: both;
}
.email span {
  color: #999;
}
</style>
