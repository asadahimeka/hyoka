<template>
  <mu-row gutter>
    <mu-col width="100" tablet="100" desktop="100">
      <mu-breadcrumb style="font-size:17px;">
        <mu-breadcrumb-item v-for="l in list" :key="l.title" :href="l.href">
          <mu-icon v-if="docked" :value="l.icon" :size="15" style="margin-right:5px" /> {{l.title}}
        </mu-breadcrumb-item>
      </mu-breadcrumb>
    </mu-col>
  </mu-row>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['list'],
  computed: {
    docked() {
      return this.$store.state['docked']
    }
  }
}
</script>

<style scoped>

</style>