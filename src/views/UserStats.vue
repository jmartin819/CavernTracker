<template>
  <div>
    <form>
      <!-- @submit="getUserStatsFromOpenDota(userID)"> -->
        <input v-model="userID" placeholder="Enter UserID">
        <v-btn v-on:click="getUserStatsFromOpenDota(userID)">Lookup User</v-btn>
    </form>

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


</template>

<script>
import { db } from '../main'
//import axios from 'axios'
export default {
  name: 'UserStats',
  data () {
    return {
      userID: ''    }
  },
  computed: {
    stats () {
      return this.$store.getters.stats
    }
  },
  methods: {
    getUserStatsFromOpenDota (userID) {
      console.log("consolelogging: " + userID)
      this.$store.dispatch('getUserStatsFromOpenDota', {userID: this.userID})//.then(() => {
      //        console.log('hey')
        //      this.$router.next()
          //  })
    }
  }
}
</script>

<style>
</style>
