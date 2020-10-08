<script>
import { PrivateKey } from '@textile/hub'
import router from '../router/index'

export default {
  name: 'Login',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    user() {
      if (this.user.walletAddress) router.push(this.user.walletAddress)
    }
  },
  data: () => ({
    email: null,
    loading: false,
    restored: null
  }),
  methods: {
    async createTextileIdentity() {
      const identity = await PrivateKey.fromRandom()
      console.log(identity.toString())
    },
    async login() {
      // if (this.email) await this.$store.dispatch('loginWithMagic', this.email);
      // this.createTextileIdentity();
      this.getIdentity()
    },
    async getIdentity() {
      /** Restore any cached user identity first */
      const cached = localStorage.getItem('user-private-identity')
      console.log(cached)
      if (cached !== null) {
        /** Convert the cached identity string to a PrivateKey and return */
        console.log('cached identity:')
        console.log(cached)
        return PrivateKey.fromString(cached)
      }
      /** No cached identity existed, so create a new one */
      const identity = await PrivateKey.fromRandom()
      /** Add the string copy to the cache */
      localStorage.setItem('identity', identity.toString())
      console.log(identity.toString())
      const cached2 = localStorage.getItem('user-private-identity')
      console.log(cached2)

      /** Return the random identity */
      return identity
    }
  }
}
</script>

<template>
  <div class="login">
    <div v-if="!user.isLoggedIn && !loading">
    <h1>Sign up or login</h1>
    <input
      v-model="email"
      type="email"
      name="email"
      required="required"
      placeholder="Enter your email"
    />
    <button @click="login">Go</button>
  </div>
  <div v-else>
    <h1>loading...</h1>
  </div>
  </div>
</template>

<style lang="scss">
</style>
