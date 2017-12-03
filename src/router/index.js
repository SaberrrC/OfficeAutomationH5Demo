import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import Setting from '@/containers/Setting'
import SignIn from '@/containers/SignIn'

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
      component: WorkReport
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
    }
  ]
})
