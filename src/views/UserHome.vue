<template>
  <v-container>
    <v-layout>
      <v-flex xs4 border>
        <div class="text-xs-center">
          <img height=200px src="@/assets/blank_avatar.png" alt="">
          <h1>{{ user.email }}</h1>
        </div>
      </v-flex>
      <v-flex xs8>
          <div v-if="user">
            <h1>You are logged in. Click Heroes in the nav to browse!</h1>
            <p>{{ user }}</p>
            <p>userdata: {{ userInfo }}</p>
          </div>
      </v-flex>
    </v-layout>

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
