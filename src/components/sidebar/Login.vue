<template>
  <div class="login">
    <label>Email</label>
    <input v-model="email" type="email" />
    <label>Password</label>
    <input v-model="password" type="password" />
  </div>
</template>

<script>
export default {
  /* eslint-disable */

  name: "Login",
  data: () => ({
    email: null,
    password: null,
  }),
};
</script>

<style lang="scss">
.login {
}
</style>