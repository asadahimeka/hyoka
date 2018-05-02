<template>
  <div @keyup.enter="chg">
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="40">
        <mu-sub-header style="margin-left:-10px;">
          <h1>Modify Password</h1>
        </mu-sub-header>
        <mu-text-field required v-model="opwd" icon="lock_open" label="旧密码" hintText="请输入旧密码" type="password" :errorText="error" labelFloat fullWidth/><br><br>
        <mu-text-field required v-model="pwd" icon="lock" label="新密码" hintText="请输入新密码" type="password" :errorText="error" labelFloat fullWidth/><br><br>
        <mu-text-field required v-model="rpwd" icon="lock_outline" label="重复新密码" hintText="请重复输入新密码" type="password" :errorText="error" labelFloat fullWidth/><br><br>
        <mu-raised-button label="提交" @click="chg" class="raised-button" primary/>
        <mu-raised-button label="重置" @click="reset" class="raised-button" />
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  name: 'Pwd',
  data() {
    return {
      opwd: '',
      pwd: '',
      rpwd: '',
      error: ''
    }
  },
  methods: {
    async chg() {
      if (!this.opwd || !this.pwd || !this.rpwd) {
        this.$popup('请输入密码')
        return
      }
      if (!this.PWD_REG.test(this.opwd)) {
        this.$popup('Password Invalid(length > 5)')
        return
      }
      if (!this.PWD_REG.test(this.pwd)) {
        this.$popup('Password Invalid(length > 5)')
        return
      }
      if (!this.PWD_REG.test(this.rpwd)) {
        this.$popup('Password Invalid(length > 5)')
        return
      }
      if (this.pwd !== this.rpwd) {
        this.$popup('两次密码不一致')
        return
      }
      try {
        let res = await this.$api.chgPwd(md5(md5(this.opwd)), md5(md5(this.pwd)))
        let { error } = res.data.ChangePassword
        if (error) {
          this.$popup({
            msg: error,
            type: 'warn'
          })
        } else {
          this.$popup({
            msg: '修改成功',
            type: 'suc'
          })
        }
      } catch (err) {
        console.error(err)
        this.$popup({
          msg: '修改出错',
          type: 'warn'
        })
      }
    },
    reset() {
      this.opwd = ''
      this.pwd = ''
      this.rpwd = ''
    }
  }
}
</script>

<style>
.inputicon {
  top: 28px !important;
}
.inputicon1 {
  top: 5px !important;
}
.raised-button {
  margin: 20px 22px 50px;
}
@media (max-width: 480px) {
  .raised-button {
    margin: 20px 10px 50px;
  }
}
</style>