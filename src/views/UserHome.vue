<template>
<div>
  <loading :value="this.$store.getters.loading" message="Logging you in"></loading>
  <div class="mr-0" :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-3': $vuetify.breakpoint.mdAndUp}">
    <div v-if="(user && stats.userStats.profile)">
      <v-layout>
        <v-flex xs3>
          <div class="text-xs-center">
            <img v-bind:src="stats.userStats.profile.avatarfull" />
          </div>
          <div class="text-xs-center">
            <h2>{{ user.email }}</h2>
            <h3>SteamID: {{ user.steamID }}</h3>
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
        <v-flex xs3>
          <div v-if="user">
            <h1>User:</h1>
            <p>Username: {{ stats.userStats.profile.personaname }}</p>
            <p>MMR Estimate: {{ stats.userStats.mmr_estimate.estimate }}</p>
          </div>
        </v-flex>
        <v-flex xs3>
          <div v-if="user">
            <h1>Totals:</h1>
            <p>Games played: {{ stats.totals.games }}</p>
            <p>Kills: {{ stats.totals.kills }}</p>
            <p>Assists: {{ stats.totals.assists }}</p>
            <p>Deaths: {{ stats.totals.deaths }}</p>
          </div>
        </v-flex>
        <v-flex xs3>
          <div v-if="user">
            <h1>Average Per Game:</h1>
            <p>Kills: {{ stats.averages.kills }}</p>
            <p>Assists: {{ stats.averages.assists }}</p>
            <p>Deaths: {{ stats.averages.deaths }}</p>

          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="pl-2 mr-0">
          <div v-if="user">
            <h1>Match Stats:</h1>
              <v-data-table
                :headers="stats.headers"
                :items="stats.matchStats"
                hide-actions
                disable-initial-sort
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <tr :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">
                    <td>{{ props.item.match_id }}</td>
                    <td>
                      <i :class="heroIconClass(props.item.hero_id)"></i>
                    </td>
                    <td>{{ props.item.duration }}</td>
                    <td>{{ props.item.kills }}</td>
                    <td>{{ props.item.deaths }}</td>
                    <td>{{ props.item.assists }}</td>
                  </tr>
                </template>
              </v-data-table>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</div>
</template>

<style>
  @import '../../node_modules/dota2-minimap-hero-sprites/assets/stylesheets/dota2minimapheroes.css';
</style>

<script>
import loading from '../components/Loading.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    loading
  },
  data () {
    return {
      modify: '0',
      headers: [
        {
          text: 'Match',
          value: 'matchid'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'stats',
      'error',
      'token',
      'LSuser'
    ])
  },
  methods: {
    updateUser () {
      this.$store.dispatch('updateUser', { 'user': this.user })
      this.modify = 0
    },
    editUser () {
      this.modify = 1
    },
    cancelEdit () {
      this.modify = 0
    },
    heroIconClass (hero_id) {
      return "d2mh hero-" + hero_id.toString()
    },
    winOrLoss (match) {
    if((match.player_slot > 127 && match.radiant_win == 0) || (match.player_slot <= 127 && match.radiant_win == 1)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
