<template>
  <mu-dialog :open="open" :title="options.title" @close="_close">
    {{options.text}}
    <mu-flat-button slot="actions" @click="_cancel" primary :label="options.cancelText||'取消'" />
    <mu-flat-button slot="actions" primary @click="_submit" :label="options.submitText||'确定'" />
  </mu-dialog>
</template>

<script>
import store from '../store'
export const showDialog = (opt) => {
  store.commit('DIALOG', {
    open: true,
    ...opt
  })
}
export default {
  name: 'Dialog',
  props: ['options'],
  data() {
    return {
      open: false
    }
  },
  watch: {
    options(val) {
      if (val) {
        this.open = val.open
      }
    }
  },
  methods: {
    _close() {
      this.open = false
      this.options.cancelFn && this.options.cancelFn(this)
    },
    _cancel() {
      this.open = false
      this.options.closeFn && this.options.closeFn(this)
    },
    _submit() {
      this.open = false
      this.options.submitFn && this.options.submitFn(this)
    }
  }
}
</script>

<style scoped>

</style>