<template>
  <div class="loginpage" @keyup.enter="login">
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
          <mu-text-field required icon="account_circle" label="用户名" hintText="请输入用户名" v-model="name" :errorText="nameerror" labelFloat/>
        </mu-flexbox>
        <mu-flexbox justify="center">
          <mu-text-field required icon="lock" label="密码" hintText="请输入密码" type="password" v-model="pwd" :errorText="pwderror" labelFloat/>
        </mu-flexbox>
        <mu-flexbox justify="center" style="margin-top: 40px;">
          <mu-raised-button label="登录" @click="login" class="raised-button" primary/>
        </mu-flexbox>
      </mu-col>
    </mu-row>
    <div class="bg"></div>
    <Popup :options="popupOpt" />
  </div>
</template>

<script>
import md5 from 'md5'
import Popup from '../components/popup'
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      pwd: '',
      nameerror: '',
      pwderror: ''
    }
  },
  computed: {
    popupOpt() {
      return this.$store.state.popupOpt
    }
  },
  components: {
    Popup
  },
  watch: {
    name(val) {
      if (!val) {
        this.nameerror = '请输入用户名'
      } else {
        this.nameerror = ''
      }
    },
    pwd(val) {
      if (!val) {
        this.pwderror = '请输入密码'
      } else {
        if (!this.PWD_REG.test(this.pwd)) {
          this.pwderror = 'Password Invalid(length > 5)'
        } else {
          this.pwderror = ''
        }
      }
    }
  },
  created() {
    if (localStorage.getItem('jt')) {
      this.$popup({
        msg: '已登录',
        type: 'warn'
      })
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      if (!this.name) {
        this.nameerror = '请输入用户名'
        return
      }
      if (!this.pwd) {
        this.pwderror = '请输入密码'
        return
      }
      if (!this.PWD_REG.test(this.pwd)) {
        this.pwderror = 'Password Invalid(length > 5)'
        return
      }
      try {
        let res = await this.$api.login(this.name, md5(md5(this.pwd)))
        let { error, token } = res.data.Login
        if (error == 'INVALID_EMAIL_NAME_PASSWORD') {
          this.$popup({
            msg: '登录信息不正确',
            type: 'warn'
          })
        } else if (token) {
          localStorage.setItem('jt', token)
          this.$popup({
            msg: '登录成功',
            type: 'suc'
          })
          setTimeout(() => {
            if (this.$route.query.redirect && this.$route.query.redirect != '/Register') {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/')
            }
          }, 500)
        }
      } catch (err) {
        console.error(err)
        this.$popup({
          msg: '登录出错',
          type: 'warn'
        })
      }
    }
  }
}
</script>

<style scoped>
.bg {
  position: fixed;
  z-index: -1;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to top,
    #c4c5c7 0%,
    #dcdddf 52%,
    #ebebeb 100%
  );
  background: url("../assets/img/bg_star.png");
  background-size: contain;
  filter: blur(5px);
}
.login {
  padding-top: 50px;
}
</style>