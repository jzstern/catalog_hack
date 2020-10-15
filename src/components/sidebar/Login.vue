<template>
  <div class="login">
    <label>Email</label>
    <br>
    <input
      v-model="email"
      type="email"
      required
      :class="{ invalidForm: missingEmail }"
    >
    <br>
    <label>Password</label>
    <br>
    <input
      v-model="password"
      type="password"
      required
      :class="{ invalidForm: missingPassword }"
    >
    <br>
    <button @click="login">
      Login
    </button>
    <p v-if="invalidForm">
      Looks like you're missing an email // pw
    </p>
    <br>
    <br>
    <button @click="register">
      Register
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
  computed: {
    missingEmail() {
      return !this.email && this.invalidForm
    },
    missingPassword() {
      return !this.password && this.invalidForm
    },
  },
  data: () => ({
    email: null,
    invalidForm: false,
    password: null,
  }),
  methods: {
    artists() {
      this.$store.commit('sidebarComponent', 'Browse Artists')
    },
    login() {
      if (this.email && this.password) this.$store.dispatch('login', this.email, this.password)
      else this.invalidForm = true

      this.$store.dispatch('login')
    },
    register() {
      this.$store.commit('sidebarComponent', 'Register')
    }
  }
};
</script>

<style lang="scss">
.login {
  display: block !important;
}

.invalidForm {
  border: 1px solid red;
}
</style>