<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          @click="drawer = false"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="#B71C1C"
      class="white--text"
    >
      <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-btn flat class="white--text" to="/herolist">Heroes</v-btn>
      <v-btn flat class="white--text" to="/userstats">User Stats</v-btn>
      <v-spacer></v-spacer>

      <span v-if="userIsAuthenticated">Welcome {{ user.email }}</span>
      <v-btn v-if="!userIsAuthenticated" class="white--text" to="/signin" flat>Sign In</v-btn>
      <v-btn v-if="userIsAuthenticated" class="white--text" @click="logout" flat>Sign Out</v-btn>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 No Salt Studios</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'fa-home', title: 'Home', link: '/' },
        { icon: 'fa-bolt', title: 'Heroes', link: '/herolist' },
        { icon: 'fa-gg', title: 'Stats', link: '/userstats' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TurboDoto'
    }
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
