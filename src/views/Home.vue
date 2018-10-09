<template>
  <v-container>
    <h1>Welcome to TurboDoto.com</h1>
  </v-container>
</template>

<script>

import loading from '../components/Loading.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    loading
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userInfo'
    ])
  }
}
</script>
