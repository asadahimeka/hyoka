<template>
  <div class="loginpage">
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-flexbox class="login">
          <mu-flexbox-item class="tac">
            <mu-sub-header style="padding-left:0;">Hyoka Admin</mu-sub-header>
            <h1>LOGIN</h1>
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-flexbox justify="center">
          <mu-text-field required icon="account_circle" label="用户名" hintText="请输入用户名" :errorText="error" labelFloat/>
        </mu-flexbox>
        <mu-flexbox justify="center">
          <mu-text-field required icon="lock" label="密码" hintText="请输入密码" type="password" :errorText="error" labelFloat/>
        </mu-flexbox>
        <mu-flexbox justify="center" style="margin-top: 40px;">
          <mu-raised-button label="登录" class="raised-button" primary/>
        </mu-flexbox>
      </mu-col>
    </mu-row>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bg {
  position: fixed;
  z-index: -1;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
  background: url('../assets/img/bg_star.png');
  background-size: contain;
  filter: blur(5px);
}
.login {
  padding-top: 50px;
}
</style>