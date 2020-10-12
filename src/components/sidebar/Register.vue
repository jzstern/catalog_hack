<template>
  <div class="register">
    <label>Email</label>
    <br>
    <input
      v-model="email"
      type="email"
    >
    <br>
    <label>Password</label>
    <br>
    <input
      v-model="password"
      type="password"
    >
    <br>
    <label>Display Name</label>
    <br>
    <input
      v-model="name"
      type="text"
    >
    <br>
    <label>Handle</label>
    <br>
    <input
      v-model="handle"
      type="text"
    >
    <br>
    <button @click="register">
      Register
    </button>
    <br>
    <br>
    <button @click="login">
      Login
    </button>
    <br>
    <br>
    <button @click="artists">
      Back to artists
    </button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Login",
  data: () => ({
    email: null,
    handle: null,
    name: null,
    password: null,
  }),
  methods: {
    artists() {
      this.$store.commit('sidebar', 'Browse Artists')
    },
    login() {
      this.$store.commit('sidebar', 'Login')
    },
    register() {
      this.$store.dispatch('register', {email, password, handle, name})
    }
  }
};
</script>

<style lang="scss">
.register {
  
}
</style>