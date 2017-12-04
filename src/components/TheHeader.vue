<template>
  <header class="header">
    <h1 id="logo"><img src="../assets/images/logo.png" alt="善林OA"></h1>
    <nav class="navigation">
      <Menu
        ref="navigation"
        mode="horizontal"
        theme="primary"
        :active-name="activeName"
        @on-select="handleSelect">
        <MenuItem name="home">
          <Icon type="home"/>
          首页
        </MenuItem>
        <MenuItem
          v-for="item in navigationIsShow"
          :key="item.id"
          :name="item.id">
          <Icon :type="item.iconType"/>
          {{item.name}}
        </MenuItem>
        <MenuItem :name="NaN">
          <Dropdown
            @on-click="handleSelect">
            <a href="javascript:void(0)">
              更多功能
              <Icon type="arrow-down-b"/>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="item in navigationMore"
                :key="item.id"
                :name="item.id">
                <Icon :type="item.iconType"/>
                {{item.name}}
              </DropdownItem>
              <DropdownItem
                name="setting"
                divided>
                <Icon type="gear-a"/>
                设置
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </MenuItem>
      </Menu>
    </nav>
    <ul class="shortcut">
      <li
        v-for="item in shortcut"
        :key="item.id">
        <Dropdown
          @on-click="handleClick($event)">
          <a href="javascript:void(0)">
            <Icon :type="item.iconType"/>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="i in item.children"
              :key="i.id"
              :name="i.id">
              {{i.name}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      activeName: '',
      navigationIsShow: [],
      navigationMore: [],
      shortcut: []
    }
  },
  created () {
    //  刷新页面时初始化 activeName
    this.activeName = this.getCurrentActiveName()
    //  TODO
    this.divideNavigation([
      {iconType: 'android-clipboard', name: '工作汇报', id: 'work_report', isShow: 1},
      {iconType: 'compose', name: '审批流程', id: 'process', isShow: 1},
      {iconType: 'easel', name: '会议管理', id: 'meeting_admin', isShow: 1},
      {iconType: 'ios-chatboxes-outline', name: '公告管理', id: 'notice', isShow: 0},
      {iconType: 'ios-world-outline', name: '新闻管理', id: 'news_admin', isShow: 0},
      {iconType: 'ios-timer-outline', name: '考勤管理', id: 'attend_admin', isShow: 0},
      {iconType: 'ios-paper-outline', name: '日志管理', id: 'log_admin', isShow: 0}
    ])
    this.shortcut = [
      {
        iconType: 'ios-plus',
        name: '发起',
        id: 'launch',
        children: [
          {name: '写日报', id: 'work_report/daily'},
          {name: '写周报', id: 'work_report/weekly'},
          {name: '会议室预定', id: 'meeting_admin/book'},
          {name: '填申请单', id: 'process/apply'}
        ]
      },
      {
        iconType: 'ios-help',
        name: '帮助',
        id: 'help',
        children: [
          {name: '帮助中心', id: 'https://www.baidu.com/'},
          {name: '官方qq群', id: 'https://www.iviewui.com/'},
          {name: '反馈', id: 'feedback'}
        ]
      },
      {
        iconType: 'person',
        name: '我的',
        id: 'personal',
        children: [
          {name: '个人中心', id: 'user_center'},
          {name: '退出', id: 'logout'}
        ]
      }
    ]
  },
  updated () {
    //  TODO 监控是否重绘，待删除
    console.log('##### TheHeader updated')
  },
  methods: {
    divideNavigation (list) {
      for (let index in list) {
        if (list.hasOwnProperty(index)) {
          if (list[index].isShow) {
            this.navigationIsShow.push(list[index])
          } else {
            this.navigationMore.push(list[index])
          }
        }
      }
    },
    getCurrentActiveName () {
      //  通过路由 path 分隔父级目录和子级目录，这里需要保证路由的规则性
      const paths = this.$route.path.split('/')
      return paths[1]
    },
    handleSelect (id, next) {
      if (id) {
        //  判断是否外链
        if (~id.indexOf('://')) {
          window.location.href = id
        } else {
          this.$router.push(`/${id}`, () => {
            if (next) next()
          })
        }
      } else {
        //  二级菜单点击后重置回 navigation 的 currentActiveName
        this.$refs.navigation.currentActiveName = this.getCurrentActiveName()
      }
    },
    handleClick (id) {
      this.handleSelect(id, () => {
        //  更新 navigation 的 currentActiveName
        this.$refs.navigation.currentActiveName = this.getCurrentActiveName()
        this.$store.dispatch('updateSidebarOpenName', this.getCurrentActiveName())
        this.$store.dispatch('updateSidebarActiveName', this.$route.path.substring(1))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  height: 60px;
  background: #2d8cf0;
}
#logo {
  float: left;
  width: 240px;
  padding: 12px 0 14px;
  img {
    display: block;
    margin: auto;
  }
}
.navigation {
  float: left;
}
.ivu-menu-item {
  font-size: 16px;
}
.ivu-dropdown-rel a {
  color: #fff;
}
.ivu-dropdown-item {
  font-size: 14px!important;
  .ivu-icon {
    margin-right: 4px;
  }
}
.shortcut {
  float: right;
  > li {
    float: left;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    a {
      display: block;
      padding: 0 20px;
    }
    a:hover {
      background: #2b85e4;
    }
  }
}
</style>
