<template>
  <v-app class="app-container">
    <Header v-if="!isLoginView && isLogined" />
    <v-main class="mainWrap">
      <div class="mainTitle ml-3" v-if="!isLoginView && isLogined">{{ pageTitle }}</div>
      <transition name="router-anim" :enter-active-class="`animated slideInUp`">
        <router-view></router-view>
      </transition>
      <Loading />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/common/Header'
import Loading from './components/common/Loading'

export default {
  name: 'App',
  components: {
    Header,
    Loading
  },
  computed: {
    isLogined () {
      return this.$store.state.user.isLogged
    },
    isLoginView () {
      return this.$route.name === 'login'
    },
    pageTitle () {
      let pageTitle = ''
      if (this.$route.meta) {
        if (this.$route.meta.title) {
          pageTitle = this.$route.meta.title
        }
      }
      return pageTitle
    }
  },
  data: () => ({
  }),
  created () {
  }
}
</script>
