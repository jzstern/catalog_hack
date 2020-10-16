<script>
/* eslint-disable */
export default {
  name: "Login",
  computed: {
    loggingIn() {
      return this.$store.state.user.isLoggingIn
    },
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
      this.$store.commit("sidebarComponent", "Browse Artists");
    },
    login() {
      if (this.email && this.password) this.$store.dispatch('login', { email: this.email, pw: this.password})
      else this.invalidForm = true
    },
    register() {
      this.$store.commit("sidebarComponent", "Register");
    },
  },
  mounted() {
    document.onkeydown = e => {
      if (e.keyCode === 13 && !this.loggingIn) this.login
    }
  }
};
</script>

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
    <button
      class="buttonPrimary"
      v-if="!loggingIn"
      @click="login"
    >
      Login
    </button>
    <p v-else>signing you in...</p>
    <p v-if="invalidForm">
      Looks like you're missing an email // pw
    </p>
    <br>
    <br>
    <button
      class="buttonSecondary"
      @click="register"
    >
      Register
    </button>
    <br>
    <br>
    <button
      class="buttonSecondary"
      @click="artists"
    >
      Back to artists
    </button>
  </div>
</template>

<style lang="scss">
.login {
  // display: block !important;
  padding: 0px 24px;
}

.invalidForm {
  border: 1px solid red;
}
</style>