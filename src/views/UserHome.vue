<template>
  <v-container>
    <div v-if="user">
      <v-layout>
        <v-flex xs4 border>
          <div class="text-xs-center">
            <img height=200px src="@/assets/blank_avatar.png" alt="">
            <h1>{{ user.email }}</h1>
            <h2>SteamID: {{ user.steamID }}</h2>
            <v-btn @click="editUser">Change steamID </v-btn>
            <div v-if="modify === 1">
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
                  <v-btn
                    @click="cancelEdit"
                  >
                    Cancel
                  </v-btn>
                </v-form>
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex xs8>
          <div v-if="user">
            <h1>You are logged in.</h1>
            <p>{{ user }}</p>
            <h1>User Stats:</h1>
            <p>Temporarily Disabled...</p>
            <h1>Match Stats:</h1>
            <div v-for="item in stats">
              <v-card v-if="item.player_slot > 127 && item.radiant_win == 0" class="green lighten-3">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Match: {{item.match_id}}</h3>
                    <li>Hero Played: {{ item.hero_id }}</li>
                    <li>Duration: {{ item.duration }}</li>
                    <li>Kills: {{ item.kills }}</li>
                    <li>Assists: {{ item.assists }}</li>
                    <li>Deaths: {{ item.deaths }}</li>
                  </div>
                </v-card-title>
              </v-card>

              <v-card v-else-if="item.player_slot > 127 && item.radiant_win == 1" class="red lighten-3">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Match: {{item.match_id}}</h3>
                    <li>Hero Played: {{ item.hero_id }}</li>
                    <li>Duration: {{ item.duration }}</li>
                    <li>Kills: {{ item.kills }}</li>
                    <li>Assists: {{ item.assists }}</li>
                    <li>Deaths: {{ item.deaths }}</li>
                  </div>
                </v-card-title>
              </v-card>

              <v-card v-else-if="item.player_slot <= 127 && item.radiant_win == 0" class="red lighten-3">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Match: {{item.match_id}}</h3>
                    <li>Hero Played: {{ item.hero_id }}</li>
                    <li>Duration: {{ item.duration }}</li>
                    <li>Kills: {{ item.kills }}</li>
                    <li>Assists: {{ item.assists }}</li>
                    <li>Deaths: {{ item.deaths }}</li>
                  </div>
                </v-card-title>
              </v-card>

              <v-card v-else class="green lighten-3">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Match: {{item.match_id}}</h3>
                    <li>Hero Played: {{ item.hero_id }}</li>
                    <li>Duration: {{ item.duration }}</li>
                    <li>Kills: {{ item.kills }}</li>
                    <li>Assists: {{ item.assists }}</li>
                    <li>Deaths: {{ item.deaths }}</li>
                  </div>
                </v-card-title>
              </v-card>
            </div>
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
      modify: "0"   
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
      this.modify=0
    },
    editUser () {
      this.modify=1
    },
    cancelEdit () {
      this.modify=0
    }
  }
}
</script>
