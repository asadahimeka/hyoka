<template>
  <div class="nfd">
    <h1 class="nfd-title">Not found</h1>
    <img class="nfd-img" src="../assets/img/404.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'Notfound'
}
</script>

<style scoped>
.nfd{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.nfd-title{
  text-align: center;
}
.nfd-img{
  width: 457px;
  height: 285px;
  margin: 0 auto;
}
@media (max-width: 480px) {
  .nfd-img{
    width: 100%;
    height: 100%;
  }
}
</style>