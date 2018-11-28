<template>
<div>
  <v-form v-model="valid">
    <v-text-field
      v-model="steamID"
      :rules="steamIDRules"
      :counter="10"
      label="steamID"
      required
    ></v-text-field>
    <v-btn
      @click="getUserFromOD"
    >
      submit
    </v-btn>
  </v-form>
  <v-layout v-if="resultVisibility">
    {{ userdata.userStats.profile.personaname }}
    {{ userdata.userStats.mmr_estimate }}
  </v-layout>
</div>
</template>

<script>
import DBService from '../services/dbService.js'

export default {
  data: () => ({
    valid: false,
    steamID: '',
    userdata: {},
    resultVisibility: false,
    steamIDRules: [
      v => !!v || 'steamID is required',
      v => v.length <= 10 || 'steamID must be less than 10 characters'
    ]
  }),
  methods: {
    async getUserFromOD () {
      DBService.fetchUserStatsFromOpenDota(this.steamID)
        .then((response) => {
          console.log(response.data)
          this.userdata = response.data
          this.resultVisibility = true
          this.$emit('userdata', this.userdata)
        })
        .catch((error) => {
          console.log(error)
          console.log('Error fetching users from DB')
        })
      
    }
  }
}
</script>
