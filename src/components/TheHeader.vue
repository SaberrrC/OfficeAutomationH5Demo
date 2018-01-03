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
              <!--
              <DropdownItem
                name="setting"
                divided>
                <Icon type="gear-a"/>
                设置
              </DropdownItem>
              -->
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
          @on-click="handleClick">
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
    this.shortcut = [
      {
        iconType: 'ios-plus',
        name: '发起',
        id: 'launch',
        children: []  //  此处需要异步请求
      },
      {
        iconType: 'ios-help',
        name: '帮助',
        id: 'help',
        children: [
          {name: '帮助中心', id: 'http://oa.shanlinjinrong.com/site/help'},
          {name: '官方qq群', id: '#'},
          {name: '反馈', id: '#'}
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
    //  获取用户信息
    this.$store.dispatch('queryUserInfo').then((data) => {
      window.localStorage.setItem('username', data.username)
      window.localStorage.setItem('userCode', data.code)
    })
    //  刷新页面时初始化 activeName
    this.activeName = this.getCurrentActiveName()
    this.$ajax.get('/navit/queryNaviList').then((response) => {
      if (response.data && response.data.code === '000000') {
        console.log('导航菜单') // toDel
        console.log(response.data.data) // toDel
        this.divideNavigation(response.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
    this.$ajax.get('news/getQuickLaunch').then((response) => {
      if (response.data && response.data.code === '000000') {
        let json = JSON.stringify(response.data.data)
        json = json.replace(/url/g, 'id')
        json = json.replace(/content/g, 'name')
        this.shortcut[0].children = JSON.parse(json)
      }
    }).catch((err) => {
      console.log(err)
    })
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
      if (id === 'logout') {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('uid')
        window.location.reload()
      } else {
        this.handleSelect(id, () => {
          //  更新 navigation 的 currentActiveName
          this.$refs.navigation.currentActiveName = this.getCurrentActiveName()
        })
      }
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
