<template>
  <div class="layout">
    <Top />
    <Drawer />
    <section class="content" :class="{'nav-hide':navHide}">
      <section class="wrapper">
        <mu-paper class="body" :zDepth="2">
          <Breadcrumb :list="breadcrumb" />
          <transition name="bounce" mode="out-in">
            <router-view v-if="isRouterAlive" />
          </transition>
        </mu-paper>
      </section>
      <Bottom />
    </section>
    <Dia-log :options="dialogOpt" />
    <Popup :options="popupOpt" />
  </div>
</template>

<script>
import Top from '../components/header'
import Drawer from '../components/drawer'
import Breadcrumb from '../components/breadcrumb'
import Bottom from '../components/footer'
import Dialog from '../components/dialog'
import Popup from '../components/popup'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isRouterAlive: true
    }
  },
  components: {
    Top,
    Drawer,
    Breadcrumb,
    Bottom,
    Popup,
    'Dia-log': Dialog
  },
  computed: {
    ...mapState(['docked', 'navHide', 'drOpen', 'breadcrumb', 'dialogOpt', 'popupOpt'])
  },
  created() {
    this.resizeFn()
    window.addEventListener('resize', this.resizeFn)
  },
  methods: {
    resizeFn() {
      let flag = document.documentElement.clientWidth >= 993
      this.$store.commit('DROPEN', flag)
      this.$store.commit('NAVHIDE', !flag)
      this.$store.commit('DOCKED', flag)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style>
/* .layout {
  background-color: rgb(236, 236, 236);
} */

.header {
  position: fixed;
  left: 256px;
  right: 0;
  top: 0;
  z-index: 100;
  -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}

.header.nav-hide {
  left: 0;
}

.drawer {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.content {
  width: 100vw;
  padding-top: 56px;
  padding-left: 256px;
  -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}

.content.nav-hide {
  padding-left: 0;
}

.wrapper {
  padding: 10px 20px;
}

.body {
  width: 100%;
  min-height: 80vh;
  padding: 10px 20px;
  border-radius: 5px;
  /* background-color: white; */
}

.footer {
  width: 100%;
  padding: 20px 0;
  text-align: center;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease-in-out;
  transform: translate3d(0, 0, 0);
}
.slide-enter {
  transform: translate3d(-100%, 0, 0);
}
.slide-leave-active {
  transition: all 0.3s ease-in-out;
  transform: translate3d(-100%, 0, 0);
}
.slide-leave {
  transform: translate3d(0, 0, 0);
}

.slideDown-enter-active {
  transition: all 0.3s ease-in-out;
  transform: translate3d(0, 0, 0);
}
.slideDown-enter {
  transform: translate3d(0, -100%, 0);
}
.slideDown-leave-active {
  transition: all 0.3s ease-in-out;
  transform: translate3d(0, -100%, 0);
}
.slideDown-leave {
  transform: translate3d(0, 0, 0);
}

@media (max-width: 993px) {
  .header {
    left: 0;
  }
  .content {
    padding-left: 0;
  }
}

@media (min-width: 480px) {
  .content {
    padding-top: 64px;
  }
}

@media (max-width: 480px) {

}
</style>