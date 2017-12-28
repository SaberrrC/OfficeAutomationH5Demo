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
      redirect: '/report_admin/daily',
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
