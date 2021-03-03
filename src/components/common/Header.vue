<template>
  <div>
    <v-navigation-drawer
      class="navigation white-text"
      v-model="drawer"
      app
      fixed
      :width="260"
      v-if="isLogged"
    >
      <div class="white--text pa-3 logo_container back_black" @click="goMain">
        <span class="logo">
          <img src="@/assets/img/logo_phr.png" alt="PHR" />
          <em>나의건강기록</em>
        </span>
      </div>

      <div class="menu_container">
        <v-list dense>
          <template v-for="(parentMenu, parentMenuIndex) in showMenus">
            <div :key="parentMenuIndex" v-if="user.ADM_DOB_DT === '1' ? true : parentMenu.mstMenu === false">
              <div
                class="white--text px-6 py-4 menu_item"
                :class="[parentMenuIndex !== 0 ? 'border-top' : '', getCurrentMenuClass(parentMenu)]"
              >
                <v-icon v-if="parentMenu.iconFont" left color="#5c4037">
                  {{ parentMenu.iconFont }}
                </v-icon>
                <div @click="moveMenu(parentMenu)">
                  {{ parentMenu.name }}
                </div>
              </div>
              <template v-for="(menu, menuIndex) in parentMenu.children">
                <v-list-group
                  :value="isCurrentMenu(menu)"
                  class="not-submenu mb-1"
                  :key="menuIndex"
                  append-icon=""
                  no-action
                  :ripple="false"
                >
                  <v-list-item
                    slot="activator"
                    :to="menu.path"
                    :ripple="false"
                    @click.native.stop
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>{{ menu.name }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </template>
            </div>
          </template>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app class="back_black white--text" :height="70">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-10">관리자 시스템</v-toolbar-title>
      <v-row no-gutters>
        <v-col cols="12" class="text-right">
          <p>
            <span>{{ user.ADM_NM }}({{ user.ADM_ID }})</span>
            <v-divider vertical light class="mx-6 white--text"></v-divider>
            <span class="blue--text pointer text-decoration-underline" @click="logout">로그아웃</span>
          </p>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data: () => ({
    drawer: null,
    selectedMenu: {}
  }),
  computed: {
    isLogged () {
      return this.$store.state.user.isLogged
    },
    user () {
      return this.$store.state.user.userInfo
    },
    menus () {
      return this.$store.state.menu.menus
    },
    showMenus () {
      return _.filter(this.menus, { showMenu: true })
    },
    currentMenuName () {
      return this.$route.meta.title
      /*
      let menuName = ''
      this.menus.forEach((parentMenu) => {
        if (parentMenu.children && parentMenu.children.length > 0) {
          const children = parentMenu.children
          const foundMenu = _.find(children, { path: this.$route.path })
          if (foundMenu && foundMenu.name) {
            menuName = foundMenu.name
          }
        } else {
          if (parentMenu.path === this.$route.path) {
            menuName = parentMenu.name
          }
        }
      })
      return menuName
      */
    }
  },
  created () {},
  methods: {
    moveMenu (menu) {
      if (!this.$route.meta.possibleSameMenuMove && this.isCurrentMenu(menu)) {
        this.$router.go(this.$route.currentRoute)
      }
      this.$router.push(menu.path)
    },
    goMain () {
      this.$router.push('/main')
    },
    logout () {
      this.$dialog.confirm('나의건강기록 관리자 시스템<br>로그아웃 하시겠습니까?').then(() => {
        this.$store.dispatch('user/logout')
      })
    },
    isCurrentMenu (menu) {
      const fullPath = this.$route.fullPath
      /*
      if (menu.children && menu.children.length > 0) {
        for (const sub of menu.children) {
          if (sub.path === fullPath) {
            return true
          }
        }
      } else if (fullPath.indexOf(menu.path) > -1) {
        return true
      }
      */
      if (fullPath.indexOf(menu.path) > -1) {
        return true
      }
      return false
    },
    getCurrentMenuClass (menu) {
      if (this.isCurrentMenu(menu)) {
        return 'font-weight-bold current_menu'
      }
    }
  }
}
</script>

<style scoped>
  .back_black { background-color: #000 !important; }
  .logo_container { width: 100%; height: 70px; cursor: pointer; }
  /* 좌측 navigation */
  .navigation {background-color: #43425d !important; }
  .logo {font-size:20px;}
  .logo img {margin-left:13px; margin-right:10px; margin-top: 3px;}
  .logo em {margin-right:15px; font-size:22px; font-weight:800; line-height: 50px;}
  /* 좌측 Menu Container */
  .menu_container { background-color: #43425d !important; max-height: calc(100% - 65px - 56px); overflow-y: auto;}
  .menu_item { position: relative; font-size: 18px !important; word-break: break-all; cursor: pointer; }
  .menu_item.current_menu { background-color: #3c3b54; }
  .menu_item.current_menu:before {position: absolute; top: 0; left: 0; display: block; width: 6px; height: 100%; background: #a3a0fb; content: ''; }
</style>
