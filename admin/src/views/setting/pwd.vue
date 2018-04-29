<template>
  <mu-row gutter>
    <mu-col width="100" tablet="100" desktop="40">
      <mu-sub-header style="margin-left:-10px;">
        <h1>Modify Password</h1>
      </mu-sub-header>
      <mu-text-field required icon="lock_open" label="旧密码" hintText="请输入旧密码" type="password" :errorText="error" labelFloat fullWidth/><br><br>
      <mu-text-field required icon="lock" label="新密码" hintText="请输入新密码" type="password" :errorText="'error'" labelFloat fullWidth/><br><br>
      <mu-text-field required icon="lock_outline" label="重复新密码" hintText="请重复输入新密码" type="password" :errorText="error" labelFloat fullWidth/><br><br>
      <mu-raised-button label="提交" class="raised-button" primary/>
      <mu-raised-button label="重置" class="raised-button" />
    </mu-col>
  </mu-row>
</template>

<script>
export default {
  name: 'Pwd',
  data() {
    return {

      error: ''
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