<template>
  <div>
    <v-navigation-drawer v-model="drawer" app fixed :width="250" v-if="isLogged">
      <router-link to="/">
        <div class="site-logo">
        </div>
      </router-link>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ currentMenuName }}</v-toolbar-title>
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
export default {
  name: 'CommonHeader',
  data: () => ({
    drawer: null
  }),
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    },
    user () {
      return this.$store.state.user.userInfo
    },
    menus () {
      return this.$store.state.menu.menus
    },
    currentMenuName () {
      let menuName = ''
      this.menus.forEach(parentMenu => {
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
    }
  },
  created () {
  },
  methods: {
    logout () {
      this.$store.dispatch('setUserInfo', {})
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
