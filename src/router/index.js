import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import WorkReportDaily from '@/containers/WorkReportDaily'
import WorkReportWeekly from '@/containers/WorkReportWeekly'
import Setting from '@/containers/Setting'
import SignIn from '@/containers/SignIn'
import UserCenter from '@/containers/UserCenter'
import UserCenterBasic from '@/containers/UserCenterBasic'
import UserCenterPassword from '@/containers/UserCenterPassword'
import UserCenterEmail from '@/containers/UserCenterEmail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/work_report',
      name: 'WorkReport',
      component: WorkReport,
      redirect: '/work_report/daily',
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
      path: '/sign_in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/user_center',
      name: 'UserCenter',
      component: UserCenter,
      redirect: '/user_center/basic',
      children: [
        {
          path: 'basic',
          name: 'UserCenterBasic',
          component: UserCenterBasic
        },
        {
          path: 'password',
          name: 'UserCenterPassword',
          component: UserCenterPassword
        },
        {
          path: 'email',
          name: 'UserCenterEmail',
          component: UserCenterEmail
        }
      ]
    },
  ]
})
