<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>    
  </div>
</template>

<script>
export default {
  name: 'Setting'
}
</script>

<style scoped>

</style>