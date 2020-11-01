<template>
  <v-app class="app-container">
    <Header v-if="!isLoginView" />
    <v-main>
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
    }
  },
  data: () => ({
  }),
  created () {
  }
}
</script>
