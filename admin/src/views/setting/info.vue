<template>
  <mu-row gutter>
    <mu-col width="100" tablet="100" desktop="40">
      <mu-sub-header style="margin-left:-10px;">
        <h1>Setting Info</h1>
      </mu-sub-header>
      <!-- <mu-text-field v-model="value" /><br/> -->
      <mu-text-field icon="account_circle" label="用户名(不可更改)" v-model="adminname" disabled  fullWidth />
      <mu-text-field icon="description" label="昵称" v-model="nickname" hintText="请输入昵称"  fullWidth :errorText="' '" />
      <mu-text-field icon="swap_horiz" label="性别" iconClass="inputicon" fullWidth :errorText="error" :underlineShow="false">
        <mu-radio name="sex" label="男" nativeValue="0" v-model="sex" style="margin-right:10px;" />
        <mu-radio name="sex" label="女" nativeValue="1" v-model="sex" />
      </mu-text-field>
      <mu-text-field icon="phone" label="电话" v-model="tel" hintText="请输入电话" type="number"  fullWidth :errorText="error" />
      <mu-text-field icon="email" label="邮箱" v-model="email" hintText="请输入邮箱" fullWidth :errorText="error" />
      <br><br>
      <mu-text-field icon="comment" v-model="comment" hintText="Comment" iconClass="inputicon1" multiLine :rows="3" :rowsMax="6" fullWidth/>
      <mu-raised-button label="提交" class="raised-button" primary/>
      <mu-raised-button label="重置" class="raised-button" />
    </mu-col>
  </mu-row>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      adminname: 'Admin',
      nickname: '',
      sex: '1',
      comment: '',
      tel: '',
      email: '',
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