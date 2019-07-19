<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-layout column>
          <v-flex xs8>
            <div class="text-xs-center">
              <img width="25%" src="../assets/turbologo.png">
            </div>
          </v-flex>
          <v-flex xs4>
            <header class="text-xs-center display-3 font-weight-bold">
              TurboDoto
            </header>
            <div class="text-xs-center display-1">The Tracker for Turbo</div>
          </v-flex>
        </v-layout>
        <!-- <h1>Previous searches</h1>
        {{ this.recentUsers }} -->
      </v-flex>
    </v-layout>
    <v-layout row>
     
    </v-layout>
    <v-layout row>
      <v-flex xs6 md12 class="pa-2 mr-2">
        <searchbox v-on:userdata="user1data = $event"></searchbox>
      </v-flex>
      <v-flex xs6 md12 class="pa-2 mr-2">
        <searchbox v-on:userdata="user2data = $event"></searchbox>
      </v-flex>
    </v-layout>
    
    <v-layout row wrap v-if="searchResults">
      <v-flex xs12>
        {{ user1data.userStats.mmr_estimate.estimate }}
        <p class="text-xs-right">{{ user2data.userStats.mmr_estimate.estimate }}</p>
        <v-progress-linear
          :background-color="progBar_bg_color(mmr_ratio)"
          :color="progBar_main_color(mmr_ratio)"
          height="20"
          :value="mmr_ratio"
        ></v-progress-linear>
      </v-flex>
      
      <v-flex xs12>
        <p>{{ user1data.averages.kills }}</p>
        <p class="text-xs-right">{{ user2data.averages.kills }}</p>
        <v-progress-linear
          :background-color="progBar_bg_color(kills_ratio)"
          :color="progBar_main_color(kills_ratio)"
          height="20"
          :value="kills_ratio"
        ></v-progress-linear>
      </v-flex>

      <v-flex xs12>
        <p>{{ user1data.averages.deaths }}</p>
        <p class="text-xs-right">{{ user2data.averages.deaths }}</p>
        <v-progress-linear
          :background-color="progBar_bg_color(deaths_ratio)"
          :color="progBar_main_color(deaths_ratio)"
          height="20"
          :value="deaths_ratio"
        ></v-progress-linear>
      </v-flex>

      <v-flex xs12>
        <p>{{ user1data.averages.assists }}</p>
        <p class="text-xs-right">{{ user2data.averages.assists }}</p>
        <v-progress-linear
          :background-color="progBar_bg_color(assists_ratio)"
          :color="progBar_main_color(assists_ratio)"
          height="20"
          :value="assists_ratio"
        ></v-progress-linear>
      </v-flex>
    </v-layout>
    <!-- <div v-for="user in users" :key=user.firebaseid>
      <p>{{ user }}</p>
      <v-card>
        {{ user }}
      </v-card>
    </div> -->
  </v-container>
</template>

<script>

import loading from '../components/Loading.vue'
import searchbox from '../components/Searchbox.vue'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import DBService from '../services/dbService.js'

export default {
  components: {
    loading,
    searchbox
  },
  data () {
    return {
      user1data: {},
      user2data: {},
      headers: [
        {
          text: 'User',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Games', value: 'games' },
        { text: 'Kills', value: 'kills' },
        { text: 'Deaths', value: 'deaths' },
        { text: 'Assists', value: 'assists' }
      ],
      users: [],
      usersTest: [
        {'name': 'test'},
        {'name': 'test2'}
      ]
    }
  },
  mounted () {
    this.getRecentUsers()
  },
  computed: {
    ...mapGetters([
      'recentUsers'
    ]),
    searchResults: function () {
      if(Object.keys(this.user1data).length != 0 && Object.keys(this.user2data).length != 0){
        return true
      } else {
        return false
      }
    },
    mmr_ratio: function () {
      let ratio = this.progBarRatio(this.user1data.userStats.mmr_estimate.estimate, this.user2data.userStats.mmr_estimate.estimate)
      console.log(ratio)
      return ratio
    },
    kills_ratio: function () {
      let ratio = this.progBarRatio(this.user1data.averages.kills, this.user2data.averages.kills)
      console.log(ratio)
      return ratio
    },
    deaths_ratio: function () {
      let ratio = this.progBarRatio(this.user1data.averages.deaths, this.user2data.averages.deaths)
      console.log(ratio)
      return ratio
    },
    assists_ratio: function () {
      let ratio = this.progBarRatio(this.user1data.averages.assists, this.user2data.averages.assists)
      console.log(ratio)
      return ratio
    },
  },
  methods: {
    ...mapActions({
      getRecentUsers: 'getRecentUsers'
    }),
    async getUserFromOD () {
      DBService.fetchUserStatsFromOpenDota()
        .then((response) => {
          console.log(response.data.users)
          this.users = response.data.users
        })
        .catch((error) => {
          console.log('Error fetching users from DB')
        })
    },
    progBarRatio (input1, input2) {
      console.log(input1, input2)
      console.log(typeof(input1), typeof(input2))
      let ratio = (1 - (parseFloat(input1) / (parseFloat(input1) + parseFloat(input2)))) * 100
      console.log("ratio in function: ", ratio)
      return ratio
    },
    progBar_bg_color (ratio) {
      if(ratio > 50){
        return "lime accent-3"
      } else {
        return "lime accent-2"
      }
    },
    progBar_main_color (ratio) {
      if(ratio > 50){
        return "lime accent-2"
      } else {
        return "lime accent-3"
      }
    }
  }
}

</script>
