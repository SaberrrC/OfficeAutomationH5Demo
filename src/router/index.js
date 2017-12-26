import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import WorkReportDaily from '@/containers/WorkReportDaily'
import WorkReportWeekly from '@/containers/WorkReportWeekly'
import Setting from '@/containers/Setting'
import Login from '@/containers/Login'
import Help from '@/containers/Help'
import Demo from '@/containers/MemberSelectorDemo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Homepage',
      component: Homepage,
      meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/work_report',
      name: 'WorkReport',
      component: WorkReport,
      redirect: '/work_report/daily',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'daily',
          name: 'WorkReportDaily',
          component: WorkReportDaily
        },
        {
          path: 'weekly',
          name: 'WorkReportWeekly',
          component: WorkReportWeekly
        }
      ]
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
