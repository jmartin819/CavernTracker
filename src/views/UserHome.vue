<template>
  <v-container>
    <div v-if="user">
      <v-layout>
        <v-flex xs4 border>
          <div class="text-xs-center">
            <img height=200px src="@/assets/blank_avatar.png" alt="">
            <h1>{{ user.email }}</h1>
          </div>
        </v-flex>
        <v-flex xs8>
          <div v-if="user">
            <v-form>
              <v-text-field
                v-model="user.steamID"
                :counter="20"
                label="Steam ID"
              ></v-text-field>
              <v-btn
                @click="updateUser"
              >
                submit
              </v-btn>
            </v-form>
          </div>
          <div v-if="user">
            <h1>You are logged in. Click Heroes in the nav to browse!</h1>
            <p>{{ user }}</p>
            <p>{{ stats }}</p>
          </div>
        </v-flex>
      </v-layout>
    </div>
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
      'stats'
    ])
  },
  methods: {
    updateUser () {
      this.$store.dispatch('updateUser', { "user": this.user })
    }
  }
}
</script>
