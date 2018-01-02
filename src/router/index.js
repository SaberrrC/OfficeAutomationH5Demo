import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import WorkReportDaily from '@/containers/WorkReport/WorkReportDaily'
import WorkReportWeekly from '@/containers/WorkReport/WorkReportWeekly'
import WorkReportMyReport from '@/containers/WorkReport/WorkReportMyReport'
import MyReportList from '@/containers/WorkReport/sub-components/MyReportList'
import MyReportDaily from '@/containers/WorkReport/sub-components/MyReportDaily'
import MyReportWeekly from '@/containers/WorkReport/sub-components/MyReportWeekly'
import WorkReportNoRate from '@/containers/WorkReport/WorkReportNoRate'
import NoRateList from '@/containers/WorkReport/sub-components/NoRateList'
import NoRateDaily from '@/containers/WorkReport/sub-components/NoRateDaily'
import NoRateWeekly from '@/containers/WorkReport/sub-components/NoRateWeekly'
import WorkReportHistory from '@/containers/WorkReport/WorkReportHistory'
import HistoryList from '@/containers/WorkReport/sub-components/HistoryList'
import HistoryDaily from '@/containers/WorkReport/sub-components/HistoryDaily'
import HistoryWeekly from '@/containers/WorkReport/sub-components/HistoryWeekly'
import WorkReportTemplate from '@/containers/WorkReport/WorkReportTemplate'
import TemplateList from '@/containers/WorkReport/sub-components/TemplateList'
import TemplateDaily from '@/containers/WorkReport/sub-components/TemplateDaily'
import TemplateWeekly from '@/containers/WorkReport/sub-components/TemplateWeekly'
import ReportAdminWhole from '@/containers/WorkReport/ReportAdminWhole'
import WholeList from '@/containers/WorkReport/sub-components/WholeList'
import WholeDaily from '@/containers/WorkReport/sub-components/WholeDaily'
import WholeWeekly from '@/containers/WorkReport/sub-components/WholeWeekly'
import ReportAdminDepartment from '@/containers/WorkReport/ReportAdminDepartment'
import DepartmentList from '@/containers/WorkReport/sub-components/DepartmentList'
import DepartmentDaily from '@/containers/WorkReport/sub-components/DepartmentDaily'
import DepartmentWeekly from '@/containers/WorkReport/sub-components/DepartmentWeekly'
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
          component: WorkReportWeekly
        },
        {
          path: 'my_report',
          name: 'WorkReportMyReport',
          component: WorkReportMyReport,
          redirect: '/work_report/my_report/myReportList',
          children: [
            {
              path: 'myReportList',
              name: 'MyReportList',
              component: MyReportList
            },
            {
              path: 'myReportDaily',
              name: 'MyReportDaily',
              component: MyReportDaily
            },
            {
              path: 'myReportWeekly',
              name: 'MyReportWeekly',
              component: MyReportWeekly
            }
          ]
        },
        {
          path: 'no_rate',
          name: 'WorkReportNoRate',
          component: WorkReportNoRate,
          redirect: '/work_report/no_rate/noRateList',
          children: [
            {
              path: 'noRateList',
              name: 'NoRateList',
              component: NoRateList
            },
            {
              path: 'noRateDaily',
              name: 'NoRateDaily',
              component: NoRateDaily
            },
            {
              path: 'noRateWeekly',
              name: 'NoRateWeekly',
              component: NoRateWeekly
            }
          ]
        },
        {
          path: 'history',
          name: 'WorkReportHistory',
          component: WorkReportHistory,
          redirect: '/work_report/history/historyList',
          children: [
            {
              path: 'historyList',
              name: 'HistoryList',
              component: HistoryList
            },
            {
              path: 'historyDaily',
              name: 'HistoryDaily',
              component: HistoryDaily
            },
            {
              path: 'historyWeekly',
              name: 'HistoryWeekly',
              component: HistoryWeekly
            }
          ]
        },
        {
          path: 'template',
          name: 'WorkReportTemplate',
          component: WorkReportTemplate,
          redirect: '/work_report/template/templateList',
          children: [
            {
              path: 'templateList',
              name: 'TemplateList',
              component: TemplateList
            },
            {
              path: 'templateDaily',
              name: 'TemplateDaily',
              component: TemplateDaily
            },
            {
              path: 'templateWeekly',
              name: 'TemplateWeekly',
              component: TemplateWeekly
            }
          ]
        }
      ]
    },
    {
      path: '/report_admin',
      name: 'WorkReport',
      component: WorkReport,
      redirect: '/report_admin/whole',
      children: [
        {
          path: 'whole',
          name: 'ReportAdminWhole',
          component: ReportAdminWhole,
          redirect: '/report_admin/whole/wholeList',
          children: [
            {
              path: 'wholeList',
              name: 'WholeList',
              component: WholeList
            },
            {
              path: 'wholeDaily',
              name: 'WholeDaily',
              component: WholeDaily
            },
            {
              path: 'wholeWeekly',
              name: 'WholeWeekly',
              component: WholeWeekly
            }
          ]
        },
        {
          path: 'department',
          name: 'ReportAdminDepartment',
          component: ReportAdminDepartment,
          redirect: '/report_admin/department/departmentList',
          children: [
            {
              path: 'departmentList',
              name: 'DepartmentList',
              component: DepartmentList
            },
            {
              path: 'departmentDaily',
              name: 'DepartmentDaily',
              component: DepartmentDaily
            },
            {
              path: 'departmentWeekly',
              name: 'DepartmentWeekly',
              component: DepartmentWeekly
            }
          ]
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
        { path: 'haveTodo', component: HaveToDoProcess, name: 'haveTodo' }
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
