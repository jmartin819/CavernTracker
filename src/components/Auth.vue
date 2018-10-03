<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <alert v-if="error" @dismissed="onDismissed" :text="error.message"></alert>
            <v-form @submit.prevent="onSignin">
            <v-card class="elevation-12">
              <v-toolbar color="#B71C1C">
                <v-toolbar-title class="white--text">Please Login to Proceed</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                  <v-text-field v-model="email" id ="email" name="email" label="Email" type="text" prepend-icon="fa-user" ></v-text-field>
                  <v-text-field v-model="password" id="password" name="password" label="Password" type="password" prepend-icon="fa-lock"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="#B71C1C">Login</v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import alert from './Alert.vue'

export default {
  name: 'Auth',
  components: {
    alert
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password}).then(() => {
        this.$router.push('/home')
      })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  props: {
    source: String
  }
}
</script>
