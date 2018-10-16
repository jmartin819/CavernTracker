<template>
  <v-container>
    <h1>Welcome to TurboDoto.com</h1>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="this.$store.getters.loading"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.steamID }}</td>
        <td class="text-xs-right">{{ props.item.totals.games }}</td>
        <td class="text-xs-right">{{ props.item.averages.kills }}</td>
        <td class="text-xs-right">{{ props.item.averages.deaths }}</td>
        <td class="text-xs-right">{{ props.item.averages.assists }}</td>
      </template>
    </v-data-table>
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
import { mapGetters } from 'vuex'
import DBService from '../services/dbService.js'

export default {
  components: {
    loading
  },
  data () {
    return {
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
    this.getAllUsers()
  },
  computed: {
    ...mapGetters([
      'user',
      'userInfo'
    ])
  },
  methods: {
    async getAllUsers () {
      DBService.fetchAllUsersFromDB()
        .then((response) => {
          console.log(response.data.users)
          this.users = response.data.users
        })
        .catch((error) => {
          console.log('Error fetching users from DB')
        })
    }
  }
}

</script>
