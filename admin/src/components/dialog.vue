<template>
  <mu-dialog :open="options.open" :title="options.title" @close="_close">
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
export const closeDialog = () => {
  store.commit('DIALOG', {
    open: false
  })
}
export default {
  name: 'Dialog',
  props: ['options'],
  methods: {
    _close() {
      closeDialog()
      this.options.closeFn && this.options.closeFn(this)
    },
    _cancel() {
      closeDialog()
      this.options.cancelFn && this.options.cancelFn(this)
    },
    _submit() {
      closeDialog()
      this.options.submitFn && this.options.submitFn(this)
    }
  }
}
</script>

<style scoped>

</style>
