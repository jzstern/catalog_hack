<script>
export default {
  name: "Account",
  computed: {
    user() { 
      return this.$store.state.user
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
    }
  }
}
</script>

<template>
  <div class="account">
    <label>Name</label>
    <h4>{{ user.name }}</h4>
    <label>Email</label>
    <h4>{{ user.email }}</h4>
    <label>Wallet Address</label>
    <h4>{{ user.walletAddress }}</h4>
    <label>URL</label>
    <h4>{{ user.url }}</h4>


    <br>
    <button @click="logout">
      Logout
    </button>
  
    <!-- <h4>Songs owned:</h4>
    <h4>{{ user.collection.length }}</h4>
    
    <h4>Songs uploaded:</h4>
    <h4>{{ user.catalog.length }}</h4> -->
  </div>
</template>

<style lang="scss">

</style>