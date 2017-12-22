import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/containers/Homepage'
import WorkReport from '@/containers/WorkReport'
import WorkReportDaily from '@/containers/WorkReportDaily'
import WorkReportWeekly from '@/containers/WorkReportWeekly'
import Setting from '@/containers/Setting'
import SignIn from '@/containers/SignIn'
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
import LaunchProcessInfo from '../containers/process/LaunchProcessInfo.vue'
import MyLaunchProcess from '../containers/process/MyLaunchProcess.vue'
import ToDoProcess from '../containers/process/ToDoProcess.vue'
import HaveToDoProcess from '../containers/process/HaveToDoProcess.vue'
import LogAdmin from '../containers/log/LogAdmin.vue'
import WebLogList from '../containers/log/WebLogList.vue'
import ApiLogList from '../containers/log/ApiLogList.vue'
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
        { path: 'launchInfo', component: LaunchProcessInfo, name: 'LaunchProcessInfo' },
        { path: 'myLaunch', component: MyLaunchProcess, name: 'MyLaunchProcess' },
        { path: 'toDo', component: ToDoProcess, name: 'ToDoProcess' },
        { path: 'haveToDo', component: HaveToDoProcess, name: 'HaveToDoProcess' }
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
