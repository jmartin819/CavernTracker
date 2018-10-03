<template>
  <v-container>
    <h1>Welcome to TurboDoto.com</h1>
    <div v-if="user">
      <h1>You are logged in. Click Heroes in the nav to browse</h1>
      <p>{{ this.$store.getters.user }}</p>
    </div>
  </v-container>
</template>

<script>

import loading from '../components/Loading.vue'

export default {
  components: {
    loading
  },
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
