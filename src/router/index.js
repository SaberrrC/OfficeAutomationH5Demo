import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import WorkReportDaily from '@/containers/WorkReportDaily'
import WorkReportWeekly from '@/containers/WorkReportWeekly'
import Setting from '@/containers/Setting'
import Login from '@/containers/Login'
import Help from '@/containers/Help'
import AttendAdmin from '@/containers/AttendAdmin'
import WorkAttend from '@/containers/WorkAttend'
import LeaveQuery from '@/containers/LeaveQuery'
//  TODO  del
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
          component: WorkReportDaily,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'weekly',
          name: 'WorkReportWeekly',
          component: WorkReportWeekly,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    //  attend_admin
    {
      path: '/attend_admin',
      name: 'AttendAdmin',
      component: AttendAdmin,
      redirect: '/attend_admin/work_attend',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'work_attend',
          name: 'WorkAttend',
          component: WorkAttend,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'leave_query',
          name: 'LeaveQuery',
          component: LeaveQuery,
          meta: {
            requireAuth: true
          }
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
    //  TODO  del
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.localStorage.getItem('token')) {
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
