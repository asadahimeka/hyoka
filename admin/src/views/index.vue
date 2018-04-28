<template>
  <div class="layout">

    <div class="header" :class="{'nav-hide':navHide}">
      <mu-appbar title="Title">
        <mu-icon-button icon="menu" @click="toggle()" slot="left" />
        <mu-flat-button label="expand_more" slot="right" />
        <mu-icon-button icon="expand_more" slot="right" />
      </mu-appbar>
    </div>

    <div class="drawer">
      <mu-drawer :open="open" :docked="docked" @close="toggle()">
        <router-link to="/">
          <mu-appbar title="Hyoka Admin">
            <mu-icon slot="left" value="home" />
          </mu-appbar>
        </router-link>
        <div style="overflow:auto;height:90vh;">
          <mu-list @itemClick="!docked&&toggle()">
            <mu-list-item title="课程信息管理">
              <mu-icon slot="left" value="assignment" />
            </mu-list-item>
            <mu-list-item title="学生信息管理">
              <mu-icon slot="left" value="person_add" />
            </mu-list-item>
            <mu-list-item title="教师信息管理">
              <mu-icon slot="left" value="face" />
            </mu-list-item>
            <mu-list-item title="评价指标管理">
              <mu-icon slot="left" value="star_rate" />
            </mu-list-item>
            <mu-list-item title="查看评价信息">
              <mu-icon slot="left" value="list" />
            </mu-list-item>
          </mu-list>
        </div>
      </mu-drawer>
    </div>

    <div class="content" :class="{'nav-hide':navHide}">
      <div class="wrapper">

        <div class="body">
          <mu-sub-header>阳光</mu-sub-header>
          <mu-content-block>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
          </mu-content-block>
        </div>

        <div class="footer">
          HYOKA ©2018 Created by Muse-UI
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      open: true,
      docked: true,
      navHide: false
    }
  },
  computed: {

  },
  created() {
    let flag = document.documentElement.clientWidth >= 993
    this.open = flag
    this.navHide = !flag
    this.docked = flag
    window.addEventListener('resize', () => {
      let flag = document.documentElement.clientWidth >= 993
      this.open = flag
      this.navHide = !flag
      this.docked = flag
    })
  },
  methods: {
    toggle() {
      this.open = !this.open
      this.navHide = !this.navHide
    }
  }
}
</script>

<style scoped>
.layout {
  background-color: rgb(236, 236, 236);
}

.header {
  position: fixed;
  left: 256px;
  right: 0;
  top: 0;
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
  min-height: 490px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
}

.footer {
  width: 100%;
  padding: 20px 0;
  text-align: center;
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
</style>