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
import MeetRoomEdit from '../containers/meet/MeetRoomEdit.vue'
import MyMeeting from '../containers/meet/MyMeeting.vue'
import MeetSummary from '../containers/meet/MeetSummary.vue'


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
        { path: 'meetRoomEdit', component: MeetRoomEdit, name: 'MeetRoomEdit' },
        { path: 'myMeeting', component: MyMeeting, name: 'MyMeeting' },
        { path: 'meetSummary', component: MeetSummary, name: 'MeetSummary' }
      ]
    }
  ]
})
