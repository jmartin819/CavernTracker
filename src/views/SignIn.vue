<template>
  <div>
    <loading :value="this.$store.getters.loading" message="Logging you in"></loading>
    <auth></auth>
  </div>
</template>

<script>
import auth from '../components/Auth'
import loading from '../components/Loading.vue'

export default {
  name: 'SignIn',
  components: {
    auth,
    loading
  },
  data: () => {
    return {

    }
  },
  computed: {
  }
}
</script>
