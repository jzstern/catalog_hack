<script>
/* eslint-disable */
export default {
  name: "Login",
  computed: {
    badLogin() {
      return this.$store.state.user.loginStatus === 'BAD_LOGIN'
    },
    emptyFields() {
      return this.$store.state.user.loginStatus === 'EMPTY_FIELDS'
    },
    loggingIn() {
      return this.$store.state.user.loginStatus === 'LOGGING_IN'
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
      else {
        this.$store.commit('user', {
          ...this.$store.state.user,
          loginStatus: "EMPTY_FIELDS"
        })
        this.invalidForm = true
      }
    },
    register() {
      this.$store.commit("sidebarComponent", "Register");
    },
  },
  mounted() {
    document.onkeydown = e => {
      if (e.keyCode === 13 && !this.loggingIn) this.login()
    }
  },
  beforeDestroy() {
    this.$store.commit('user', {
      ...this.$store.state.user,
      loginStatus: "NOT_LOGGED_IN"
    })
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
      @click="login"
      :class="{ disabled: loggingIn }"
    >
      {{ loggingIn ? "logging in..." : "Login"}}
    </button>
    <p v-if="badLogin">bad credentials fam</p>
    <p v-else-if="emptyFields">
      gotta fill out the whole form ya dingus
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

.disabled {
  opacity: .5;
}
</style>