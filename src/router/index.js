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
import forgetPwd from '../containers/forgetPwd/forgetPwd.vue'
import forgetPwdCode from '../containers/forgetPwd/code.vue'
import forgetPwdEmail from '../containers/forgetPwd/email.vue'
import forgetPwdSuccess from '../containers/forgetPwd/success.vue'
import MeetingAdmin from '../containers/meet/Meet.vue'
import MeetAdd from '../containers/meet/MeetAdd.vue'
import MeetTime from '../containers/meet/MeetTime.vue'
import MeetConfirm from '../containers/meet/MeetConfirm.vue'
import MeetRoomEdit from '../containers/meet/MeetRoomEdit.vue'
import MyMeeting from '../containers/meet/MyMeeting.vue'
import MeetSummary from '../containers/meet/MeetSummary.vue'
import Process from '../containers/process/Process.vue'
import LaunchProcessIndex from '../containers/process/LaunchProcessIndex.vue'
import LaunchBillProcess from '../containers/process/LaunchBillProcess.vue'
import LaunchWorkApplyProcess from '../containers/process/LaunchWorkApplyProcess.vue'
import LaunchSignCardProcess from '../containers/process/LaunchSignCardProcess.vue'
import LaunchFurloughProcess from '../containers/process/LaunchFurloughProcess.vue'
import signCardProcessInfo from '../containers/process/signCardProcessInfo.vue'
import BillProcessInfo from '../containers/process/BillProcessInfo.vue'
import WorkApplyProcessInfo from '../containers/process/WorkApplyProcessInfo.vue'
import FurloughProcessInfo from '../containers/process/FurloughProcessInfo.vue'
import MyLaunchProcess from '../containers/process/MyLaunchProcess.vue'
import ToDoProcess from '../containers/process/ToDoProcess.vue'
import HaveToDoProcess from '../containers/process/HaveToDoProcess.vue'
import LogAdmin from '../containers/log/LogAdmin.vue'
import WebLogList from '../containers/log/WebLogList.vue'
import ApiLogList from '../containers/log/ApiLogList.vue'

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
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd,
      children: [
        { path: 'code', component: forgetPwdCode, name: 'forgetPwdCode' },
        { path: 'email', component: forgetPwdEmail, name: 'forgetPwdEmail' },
        { path: 'success', component: forgetPwdSuccess, name: 'forgetPwdSuccess' }
      ]
    },
    {
      path: '/meeting_admin',
      name: 'MeetingAdmin',
      component: MeetingAdmin,
      redirect: '/meeting_admin/add',
      children: [
        { path: 'add', component: MeetAdd, name: 'MeetAdd' },
        { path: 'time', component: MeetTime, name: 'MeetTime' },
        { path: 'confirm', component: MeetConfirm, name: 'MeetConfirm' },
        { path: 'meetRoomEdit', component: MeetRoomEdit, name: 'MeetRoomEdit' },
        { path: 'myMeeting', component: MyMeeting, name: 'MyMeeting' },
        { path: 'meetSummary', component: MeetSummary, name: 'MeetSummary' }
      ]
    },
    {
      path: '/process',
      name: 'Process',
      component: Process,
      redirect: '/process/launchIndex',
      children: [
        { path: 'launchIndex', component: LaunchProcessIndex, name: 'LaunchProcessIndex' },
        { path: 'launchBill', component: LaunchBillProcess, name: 'LaunchBillProcess' },
        { path: 'launchWorkApply', component: LaunchWorkApplyProcess, name: 'LaunchWorkApplyProcess' },
        { path: 'launchSignCard', component: LaunchSignCardProcess, name: 'LaunchSignCardProcess' },
        { path: 'launchFurlough', component: LaunchFurloughProcess, name: 'LaunchFurloughProcess' },
        { path: 'signCardLaunchInfo', component: signCardProcessInfo, name: 'signCardProcessInfo' },
        { path: 'billLaunchInfo', component: BillProcessInfo, name: 'billLaunchInfo' },
        { path: 'workApplyLaunchInfo', component: WorkApplyProcessInfo, name: 'workApplyLaunchInfo' },
        { path: 'furloughLaunchInfo', component: FurloughProcessInfo, name: 'furloughLaunchInfo' },
        { path: 'myLaunch', component: MyLaunchProcess, name: 'myLaunch' },
        { path: 'todo', component: ToDoProcess, name: 'todo' },
        { path: 'haveTodo', component: HaveToDoProcess, name: 'haveToDo' }
      ]
    },
    {
      path: '/log_admin',
      name: 'LogAdmin',
      component: LogAdmin,
      redirect: '/log_admin/webLogList',
      children: [
        { path: 'webLogList', component: WebLogList, name: 'WebLogList' },
        { path: 'apiLogList', component: ApiLogList, name: 'ApiLogList' }
        ]
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
