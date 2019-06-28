<template>
<div>
  <loading :value="this.$store.getters.loading" message="Logging you in"></loading>
  <div class="mr-0" :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-3': $vuetify.breakpoint.mdAndUp}">
    <div v-if="(user && stats.userStats.profile)">
      <v-layout>
        <v-flex xs4>
          <div class="text-xs-center">
            <img v-bind:src="stats.userStats.profile.avatarfull" />
            <!--<img height=200px src="@/assets/blank_avatar.png" alt="">-->
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
        <v-flex xs8 class="pl-2 mr-0">
          <div v-if="user">
            <h1>You are logged in.</h1>
            <p>{{ user }}</p>
            <p>{{ LSuser }}</p>
            <h1>User Stats:</h1>
            <p>Username: {{ stats.userStats.profile.personaname }}</p>
            <p>Competitive Rank: {{ stats.userStats.competitive_rank }}</p>
            <!-- <h1>Token:</h1>
            <p>{{ token.stsTokenManager }}</p> -->
            <h1>User Totals:</h1>
            <p>Games played: {{ stats.totals.games }}</p>
            <p>Kills: {{ stats.totals.kills }}</p>
            <p>Assists: {{ stats.totals.assists }}</p>
            <p>Deaths: {{ stats.totals.deaths }}</p>
            <h1>User Averages:</h1>
            <p>Kills per game: {{ stats.averages.kills }}</p>
            <p>Assists per game: {{ stats.averages.assists }}</p>
            <p>Deaths per game: {{ stats.averages.deaths }}</p>
            <h1>Match Stats:</h1>

              <v-data-table
                :headers="stats.headers"
                :items="stats.matchStats"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">{{ props.item.match_id }}</td>
                  <td :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">{{ props.item.hero_id }}</td>
                  <td :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">{{ props.item.duration }}</td>
                  <td :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">{{ props.item.kills }}</td>
                  <td :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">{{ props.item.assists }}</td>
                  <td :class="{'red lighten-3': !winOrLoss(props.item), 'green lighten-3': winOrLoss(props.item)}">{{ props.item.deaths }}</td>
                </template>
              </v-data-table>

            <!--<div v-for="match in stats.matchStats" :key=match.match_id>
              <v-card :class="{'red lighten-3': !winOrLoss(match), 'green lighten-3': winOrLoss(match)}">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Match: {{match.match_id}}</h3>
                    <li>Hero Played: {{ match.hero_id }}</li>
                    <li>Duration: {{ match.duration }}</li>
                    <li>Kills: {{ match.kills }}</li>
                    <li>Assists: {{ match.assists }}</li>
                    <li>Deaths: {{ match.deaths }}</li>
                  </div>
                </v-card-title>
              </v-card>
            </div>-->
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</div>
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
