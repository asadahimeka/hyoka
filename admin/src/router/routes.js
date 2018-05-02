import HelloWorld from '@/components/HelloWorld'
import NFD from '../views/nfd.vue'
import Index from '../views/index.vue'
import First from '../views/first.vue'

import Setting from '../views/setting/setting.vue'
import Setindex from '../views/setting/set-index.vue'
import Info from '../views/setting/info.vue'
import Pwd from '../views/setting/pwd.vue'

import Course from '../views/manage/course.vue'
import Evamng from '../views/manage/evamng.vue'
import Student from '../views/manage/student.vue'
import Teacher from '../views/manage/teacher.vue'
import Vieweva from '../views/manage/vieweva.vue'
import Classinfo from '../views/manage/classinfo.vue'

import Login from '../views/login.vue'

const routes = [{
  path: '/',
  component: Index,
  children: [{
    path: '',
    name: 'First',
    alias: 'index',
    component: First,
    meta: {
      pageTitle: 'Index',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: ''
        }
      ]
    }
  },
  {
    path: 'setting',
    component: Setting,
    children: [{
      path: '',
      name: 'Setting',
      component: Setindex,
      meta: {
        pageTitle: 'Setting',
        bread: [
          {
            icon: 'home',
            title: 'Home',
            href: '#/index'
          },
          {
            icon: 'settings',
            title: 'Setting'
          }
        ]
      }
    },
    {
      path: 'info',
      name: 'Info',
      component: Info,
      meta: {
        pageTitle: 'Info',
        bread: [
          {
            icon: 'home',
            title: 'Home',
            href: '#/index'
          },
          {
            icon: 'settings',
            title: 'Setting',
            href: '#/setting'
          },
          {
            icon: 'account_circle',
            title: 'Info',
            href: ''
          }
        ]
      }
    },
    {
      path: 'pwd',
      name: 'Pwd',
      component: Pwd,
      meta: {
        pageTitle: 'Password',
        bread: [
          {
            icon: 'home',
            title: 'Home',
            href: '#/index'
          },
          {
            icon: 'settings',
            title: 'Setting',
            href: '#/setting'
          },
          {
            icon: 'lock',
            title: 'Password',
            href: ''
          }
        ]
      }
    }]
  },
  {
    path: 'course',
    name: 'Course',
    component: Course,
    meta: {
      pageTitle: 'Course',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: '#/index'
        },
        {
          icon: 'date_range',
          title: 'Course'
        }
      ]
    }
  },
  {
    path: 'classinfo',
    name: 'Class',
    component: Classinfo,
    meta: {
      pageTitle: 'Classinfo',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: '#/index'
        },
        {
          icon: 'class',
          title: 'Classinfo'
        }
      ]
    }
  },
  {
    path: 'evamng',
    name: 'Evamng',
    component: Evamng,
    meta: {
      pageTitle: 'Evaluation Index Manage',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: '#/index'
        },
        {
          icon: 'star_rate',
          title: 'Evaluation Index Manage'
        }
      ]
    }
  },
  {
    path: 'student',
    name: 'Student',
    component: Student,
    meta: {
      pageTitle: 'Student',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: '#/index'
        },
        {
          icon: 'person_add',
          title: 'Student'
        }
      ]
    }
  },
  {
    path: 'teacher',
    name: 'Teacher',
    component: Teacher,
    meta: {
      pageTitle: 'Teacher',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: '#/index'
        },
        {
          icon: 'face',
          title: 'Teacher'
        }
      ]
    }
  },
  {
    path: 'vieweva',
    name: 'Vieweva',
    component: Vieweva,
    meta: {
      pageTitle: 'View Evaluation',
      bread: [
        {
          icon: 'home',
          title: 'Home',
          href: '#/index'
        },
        {
          icon: 'list',
          title: 'View Evaluation'
        }
      ]
    }
  }]
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    pageTitle: 'Login',
    noAuth: true
  }
}, {
  path: '/hello',
  name: 'HelloWorld',
  component: HelloWorld,
  meta: {
    pageTitle: 'Hello',
    noAuth: true
  }
}, {
  path: '*',
  name: 'Notfound',
  component: NFD,
  meta: {
    pageTitle: 'NOT FOUND',
    noAuth: true
  }
}]

export default routes
