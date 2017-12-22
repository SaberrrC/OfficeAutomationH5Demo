import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import WorkReportDaily from '@/containers/WorkReportDaily'
import WorkReportWeekly from '@/containers/WorkReportWeekly'
import Setting from '@/containers/Setting'
import SignIn from '@/containers/SignIn'
import UserCenter from '@/containers/UserCenter/UserCenter'
import UserCenterBasic from '@/containers/UserCenter/UserCenterBasic'
import UserCenterPassword from '@/containers/UserCenter/UserCenterPassword'
import UserCenterEmail from '@/containers/UserCenter/UserCenterEmail'
import Notice from '@/containers/Notice/Notice'
import NoticeFrom from '@/containers/Notice/NoticeFrom'
import NoticeTo from '@/containers/Notice/NoticeTo'
import NoticeDepartment from '@/containers/Notice/NoticeDepartment'
import NoticeDepartmentDetail from '@/containers/Notice/NoticeDepartmentDetail'
import NoticeCompany from '@/containers/Notice/NoticeCompany'
import NoticeCompanyDetail from '@/containers/Notice/NoticeCompanyDetail'
import News from '@/containers/News/News'
import NewsAdd from '@/containers/News/NewsAdd'
import NewsAll from '@/containers/News/NewsAll'

Vue.use(Router);

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
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      redirect: '/notice/from',
      children: [
        {
          path: 'from',
          name: 'NoticeFrom',
          component: NoticeFrom
        },
        {
          path: 'to',
          name: 'NoticeTo',
          component: NoticeTo
        },
        {
          path: 'department',
          name: 'NoticeDepartment',
          component: NoticeDepartment
        },
        {
          path: 'company',
          name: 'NoticeCompany',
          component: NoticeCompany
        },
        {
          path: 'department_detail',
          name: 'NoticeDepartmentDetail',
          component: NoticeDepartmentDetail
        },
        {
          path: 'company_detail',
          name: 'NoticeCompanyDetail',
          component: NoticeCompanyDetail
        }
      ]
    },
    {
      path: '/news_admin',
      name: 'News',
      component: News,
      redirect: '/news_admin/add',
      children: [
        {
          path: 'add',
          name: 'NewsAdd',
          component: NewsAdd
        },
        {
          path: 'all',
          name: 'NewsAll',
          component: NewsAll
        }
      ]
    }
  ]
})
