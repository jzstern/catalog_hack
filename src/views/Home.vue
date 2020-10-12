<script>
/* eslint-disable */
import router from "../router/index"
  
export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async login() {
      this.$store.dispatch("ethers/login");
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="section-right">
      <div v-if="user.walletAddress">
        <router-link
          class="login"
          :to="`/${user.walletAddress}`"
        >
          {{ user.walletAddress.substr(user.walletAddress.length - 4) }}
        </router-link>
      </div>
      <div
        v-else
        class="login"
        @click="login"
      >
        log in {{ user.loading ? " ..." : "" }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  display: flex;
  height: 100%;
  // overflow: hidden;
  background-image: url("../assets/other/bgHome.png");
  background-repeat: no-repeat;
}

.header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: black;
  display: flex;
  align-items: center;
  height: 85px;
  box-sizing: border-box;
  border-bottom: 2px solid #666666;
  z-index: 200;
}

.login {
  font-family: "Inconsolata-ExtraBold", sans-serif;

  position: absolute;
  top: 22px;
  right: 24px;
  color: #ffcf2e;
  border-radius: 4px;
  padding: 8px 12px 9px 12px;
  box-sizing: border-box;

  &:hover {
    // color: black;
    box-sizing: border-box;

    border: 1px solid #ffcf2e;
    cursor: url("../assets/other/cursor.png"), auto;
  }
}
</style>
