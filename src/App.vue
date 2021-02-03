<template>
  <v-app class="app-container">
    <Header v-if="!isLoginView" />
    <v-main class="mainWrap">
      <div class="mainTitle">{{ pageTitle }}</div>
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
    isLoginView () {
      return this.$route.name === 'login'
    },
    pageTitle () {
      let pageTitle = ''
      console.log(this.$breadcrumbs)
      for (const breadcrumb of this.$breadcrumbs) {
        if (breadcrumb.meta) {
          if (breadcrumb.meta.title) {
            pageTitle = breadcrumb.meta.title
          }
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
