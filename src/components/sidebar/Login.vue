<script>
/* eslint-disable */
export default {
  name: "Login",
  computed: {
    badLogin() {
      return this.$store.state.user.login_status === "BAD_LOGIN";
    },
    emptyFields() {
      return this.$store.state.user.login_status === "EMPTY_FIELDS";
    },
    loggingIn() {
      return this.$store.state.user.login_status === "LOGGING_IN";
    },
    missingEmail() {
      return !this.email && this.invalidForm;
    },
    missingPassword() {
      return !this.password && this.invalidForm;
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
      if (this.email && this.password)
        this.$store.dispatch("login", { email: this.email, pw: this.password });
      else {
        this.$store.commit("user", {
          ...this.$store.state.user,
          login_status: "EMPTY_FIELDS",
        });
        this.invalidForm = true;
      }
    },
    register() {
      this.$store.commit("sidebarComponent", "Register");
    },
  },
  mounted() {
    document.onkeydown = (e) => {
      if (e.keyCode === 13 && !this.loggingIn) this.login();
    };
  },
  beforeDestroy() {
    this.$store.commit("user", {
      ...this.$store.state.user,
      login_status: "NOT_LOGGED_IN",
    });
  },
};
</script>

<template>
  <div class="login">
    <div class="form-item">
      <label>Email</label>
      <br />
      <input
        v-model="email"
        type="email"
        required
        :class="{ invalidForm: missingEmail }"
      />
    </div>

    <div class="form-item">
      <label>Password</label>
      <br />
      <input
        v-model="password"
        type="password"
        required
        :class="{ invalidForm: missingPassword }"
      />
    </div>

    <button
      class="buttonPrimary"
      @click="login"
      :class="{ disabled: loggingIn }"
    >
      {{ loggingIn ? "logging in..." : "Log in" }}
    </button>
    <p v-if="badLogin">bad credentials fam</p>
    <p v-else-if="emptyFields">gotta fill out the whole form ya dingus</p>

    <button class="buttonSecondary" @click="register">Register</button>
    <p class="disclaimer">
      Log in with your Audius account to import your information to Catalog.
    </p>
    <img class="audius" src="../../assets/other/audius.svg" />
  </div>
</template>

<style lang="scss">
.audius {
  // position: relative;
  // bottom: 0;
  position: absolute;
  justify-self: center;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.disclaimer {
  font-size: 16px;
  padding: 0px 32px;
  line-height: 24px;
  margin-top: 32px;
  text-align: center;
  opacity: 0.7;
}

.login {
  padding: 0px 24px;
}

.invalidForm {
  border: 1px solid red;
}

.disabled {
  opacity: 0.5;
}
</style>