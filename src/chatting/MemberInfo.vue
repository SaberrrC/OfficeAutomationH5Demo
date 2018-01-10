<template>
  <div class="Personalmes" v-if="isShow" :value="value">
    <div class="title">{{member.name}} 的个人信息</div>
    <div class="personnalbaseImg">
      <div class="close" @click='close'>X</div>
      <div class="avatar">
        <img :src="reImgUrl(member.img)" height="37" width="37" :alt="member.name" @error="headImgError">
      </div>
      <div class="baseMes">
        <p>{{member.name}}</p>
        <span>{{member.postname}}&nbsp;&nbsp;&nbsp;{{member.sex}}</span>
      </div>
      <div class="personnalfoot">
        <div class="email">邮箱: {{member.email}}</div>
        <div class="phone">电话: {{member.phone}}</div>
        <div class="department">部门: {{member.departmentName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberInfo',
  props: {
    value: false,
    member: Object
  },
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    if (this.value) {
      this.isShow = true
    }
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  computed: {
  },
  methods: {
    close () {
      console.log('关闭')
      this.isShow = false
    },
    headImgError (img) {
      img.target.src = this.$store.state.image
      img.onerror = null // onerror不再触发
    },
    reImgUrl (url) {
      let oImg = url
      if (url === '' || url === 'http://') {
        oImg = this.$store.state.image
      }
      return oImg
    }
  }
}
</script>
