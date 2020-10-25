<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      :width="250"
    >
      <div class="site-logo">
        <router-link to="/">
          PHR
        </router-link>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PHR 관리자</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data: () => ({
    drawer: null,
    menus: []
  }),
  create () {
    this.initMenus()
  },
  methods: {
    initMenus () {
      this.menus = [
        {
          path: '/notice',
          name: '공지사항 관리'
        }
      ]
    }
  }
}
</script>
