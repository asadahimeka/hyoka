<template>
  <div class="first">
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <h1>Welcome, {{adminname}}</h1>
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="50">
        <mu-sub-header>SHORTCUT</mu-sub-header>
        <mu-grid-list class="gridlist-demo">
          <mu-grid-tile v-for="(t,i) in titles" :key="i" :cols="docked?1:2" titleBarClass="titleBar" actionPosition="right">
            <div :style="'width:100%;height:100%;background:'+t.bg+';border-radius: 5px;'"></div>
            <span style="display:block;text-align:center;font-size:9px;" slot="title">{{t.value}}</span>
            <mu-flexbox slot="subTitle" justify="center">
              <mu-flat-button labelClass="ftsz20" color="#fff" :label="t.title" :to="t.to" />
            </mu-flexbox>
            <mu-icon-button :icon="t.icon" slot="action" :to="t.to" />
          </mu-grid-tile>
        </mu-grid-list>
      </mu-col>
      <mu-col width="100" tablet="50" desktop="50">
        <mu-sub-header>TODO</mu-sub-header>
        <Todo where='index' class="todo" />
      </mu-col>
    </mu-row>
    <div class="pb20"></div>

  </div>
</template>

<script>
import Todo from '../components/todo'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      adminname: 'Admin',
      titles: [
        {
          icon: 'person_add',
          title: '学生管理',
          to: '/hello',
          value: 'STUDENTS',
          bg: '#f06292'
        },
        {
          icon: 'date_range',
          title: '课程管理',
          to: '',
          value: 'COURSES',
          bg: '#d84315'
        },
        {
          icon: 'star_rate',
          title: '评价管理',
          to: '',
          value: 'RATES',
          bg: '#0277bd'
        },
        {
          icon: 'settings',
          title: '设置',
          to: '',
          value: 'SETTING',
          bg: '#ef5350'
        }
      ]
    }
  },
  components: {
    Todo
  },
  computed: {
    ...mapState(['docked', 'navHide', 'drOpen'])
  }
}
</script>

<style scoped>
.first div[class*="col-"] {
  padding: 0 20px;
}
.todo {
  margin-bottom: 60px;
}
.pb20 {
  padding-bottom: 30px;
}
@media (max-width: 480px) {
  .first div[class*="col-"] {
    padding: 0;
  }
}
</style>
<style>
.titleBar {
  width: 100%;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0);
}
.ftsz20 {
  font-size: 17px;
}
</style>
