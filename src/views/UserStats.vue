<template>
  <div>
    <form>
      <!-- @submit="getUserStatsFromOpenDota(userID)"> -->
        <input v-model="userID" placeholder="Enter UserID">
        <v-btn v-on:click="getUserStatsFromOpenDota(userID)">Lookup User</v-btn>
    </form>
    <div>
      Stats: {{ stats }}
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
