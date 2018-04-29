<template>
  <mu-row gutter>
    <mu-col width="100" tablet="100" desktop="30">
      <mu-menu style="margin-top:30px;">
        <mu-menu-item v-for="m in menus" :key="m.title" :title="m.title" :to="m.to" rightIcon="keyboard_arrow_right" />
      </mu-menu>
    </mu-col>
  </mu-row>
</template>

<script>
export default {
  name: 'SetIndex',
  data() {
    return {
      menus: [
        {
          title: '我的信息',
          to: '/setting/info'
        },
        {
          title: '修改密码',
          to: '/setting/pwd'
        }
      ]
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>