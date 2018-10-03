<template>
  <auth></auth>
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
