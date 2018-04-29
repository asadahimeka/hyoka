<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Roboto, Lato, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mu-appbar {
  background: #9c27b0;
}
.router-link-active {
  color: #9c27b0 !important;
}
.router-link-active .mu-item-left {
  color: #9c27b0 !important;
}
.router-link-active .mu-item-title {
  color: #9c27b0 !important;
}

.clearfix {
  *zoom: 1;
}
.clearfix:before,
.clearfix:after {
  display: table;
  line-height: 0;
  content: "";
}
.clearfix:after {
  clear: both;
}

.tac{
  text-align: center;
}

input {
  background: 0;
  border: 0;
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;    
   margin: 0;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-track {
  border-radius: 0px;
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(126, 87, 194, 0.4);
}
</style>
