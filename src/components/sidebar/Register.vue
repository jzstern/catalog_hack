<template>
  <div class="register">
    <div class="form-item">
      <label>Email</label>
      <input v-model="email" type="email" />
    </div>

    <div class="form-item">
      <label>Password</label>
      <input v-model="password" type="password" />
    </div>

    <div class="form-item">
      <label>Display Name</label>
      <input v-model="name" type="text" />
    </div>

    <div class="form-item">
      <label>Handle</label>
      <input v-model="handle" type="text" />
    </div>

    <button class="buttonPrimary" @click="register">Register</button>

    <button class="buttonSecondary" @click="login">Log in</button>
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
      this.$store.commit("sidebarComponent", "Browse Artists");
    },
    login() {
      this.$store.commit("sidebarComponent", "Login");
    },
    register() {
      this.$store.dispatch("register", { email, password, handle, name });
    },
  },
};
</script>

<style lang="scss">
.register {
  padding: 0px 24px;
}

.disclaimer {
  padding: 0px 32px;
  line-height: 24px;
  margin-top: 32px;
  text-align: center;
  opacity: 0.7;
}
</style>