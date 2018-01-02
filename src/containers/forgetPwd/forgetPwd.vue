<template>

    <div class="header">
    <Row>
      <Col :xs="18" :sm="16" :md="12" :lg="12">
        <img src="../../assets/images/logo(2).png" alt="logo">
        <span>
          <span class="fenge">|</span>
          <span>忘记密码</span>
        </span>
      </Col>
      <Col :xs="6" :sm="8" :md="12" :lg="12">
        <span class="login">
          <span><a :href="LoginUrl">登录</a></span>
        </span>
      </Col>
    </Row>

    <section>
    <div class="contents">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    </section>
  </div>


</template>

<script>
  export default {
    data () {
      return {
        LoginUrl: '/site/login'
      }
    }
  }
</script>

<style scoped>
  .header {

    font-size: 18px;
    line-height: 60px;
    color: rgb(132, 146, 166);
    font-weight: 600;
  }
  .header img {
    width: 240px;
    height: 60px;
    float: left;

  }
  .fenge {
    margin: 0 20px;
  }
  .login {
    float: right;
    margin-right: 20%;
  }
  .login a{
    color: rgb(132, 146, 166);
  }
  .contents{
    margin-top: 24px;

  }
</style>
