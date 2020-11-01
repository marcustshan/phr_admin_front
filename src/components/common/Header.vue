<template>
  <div>
    <v-navigation-drawer
      class="navigation"
      v-model="drawer"
      app
      fixed
      :width="250"
      v-if="isLogged"
    >
      <router-link to="/">
        <div class="site-logo"></div>
      </router-link>

      <div class="user-info">
        <v-list-item class="sidebar-profile">
          <v-list-item-avatar>
            <v-icon color="black">person</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="ml-4">
            <v-list-item-title>
              <span class="font-weight-bold">{{ user.name }}</span>
            </v-list-item-title>
          </v-list-item-content>
          <v-menu
            bottom
            offset-y
            right
            content-class="userblock-dropdown"
            nudge-top="-10"
            nudge-right="0"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on" class="ma-0">
                <v-icon color="black">more_vert</v-icon>
              </v-btn>
            </template>
            <div class="dropdown-content">
              <v-list class="dropdown-list">
                <v-list-item @click="getUserProfile()">
                  <v-icon class="mr-3">person</v-icon>
                  <span>정보 수정</span>
                </v-list-item>
                <v-list-item @click="logoutUser()">
                  <v-icon class="mr-3">exit_to_app</v-icon>
                  <span>로그 아웃</span>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
        </v-list-item>
      </div>

      <v-divider />

      <div class="menu-container">
        <v-list dense>
          <template v-for="(parentMenu, parentMenuIndex) in showMenus">
            <div :key="parentMenuIndex">
              <div
                class="subtitle-2 font-weight-black px-4 py-2"
                :class="parentMenuIndex !== 0 ? 'border-top' : ''"
              >
                <v-icon v-if="parentMenu.iconFont" left color="#5c4037">
                  {{ parentMenu.iconFont }}
                </v-icon>
                {{ parentMenu.name }}
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

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-10">공공 PHR 관리자</v-toolbar-title>
      <v-divider vertical class="mx-10"></v-divider>
      <v-toolbar-title class="ml-10">{{ currentMenuName }}</v-toolbar-title>
      <v-row no-gutters>
        <v-col cols="12" class="text-right">
          <v-btn icon @click="logout" title="로그아웃" color="blue-grey">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommonHeader',
  data: () => ({
    drawer: null,
    selectedMenu: {}
  }),
  computed: {
    ...mapGetters({
      isLogged: 'user/isLogged'
    }),
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
    logout () {
      this.$store.dispatch('setUserInfo', {})
      this.$router.push({ name: 'login' })
    },
    isCurrentMenu (menu) {
      const fullPath = this.$route.fullPath
      if (menu.children && menu.children.length > 0) {
        for (const sub of menu.children) {
          if (sub.menuPath === fullPath) {
            return true
          }
        }
      } else if (menu.menuPath === fullPath) {
        return true
      }
      return false
    }
  }
}
</script>
