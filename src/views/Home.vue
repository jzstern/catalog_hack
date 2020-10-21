<script>
/* eslint-disable */
export default {
  name: "Home",
  components: {
    Dropdown: () => import("../components/dropdown/Dropdown"),
  },
  methods: {
    sendDai() {
      this.$store.dispatch('ethers/sendDai', {to: '0x22A71a4b2bEaE4C5d54E407D81A55CDfCFb22B2a', amount: 10})
    },
    deleteUsers() {
      this.$store.dispatch("deleteUser", "01en3mrkfn1jg6pf9cxdtqstq2");
    },
    getAllUsers() {
      this.$store.dispatch("getAllUsers");
    },
    getAllTracks() {
      this.$store.dispatch("getAllTracks");
    },
    deleteTracks() {
      this.$store.dispatch("deleteItem", "01en28jxatr03h6z4gvekf9m3d");
      this.$store.dispatch("deleteItem", "01en28rxh3vawcm0g34qmd7xmk");
      this.$store.dispatch("deleteItem", "01en28tysta74b1bgzbr07q0nj");
      this.$store.dispatch("deleteItem", "01en28vwhr9t6fr9f7a2hrkr9p");
    },
    updateUser() {
      this.$store.dispatch("updateUser", {
        ...this.$store.state.user,
        _id: "01en2c8x1pfbtce7vcm9cs8nw8",
        catalog: [],
        collection: [],
        // links: [ "https://twitter.com/jzstern", "https://audius.co/jzstern", "https://soundcloud.com/appappa"]
      });
    },
  },
  mounted() {
    this.$store.commit("sidebarComponent", "Browse Artists");
  },
};
</script>

<template>
  <div class="home">
    <div class="home-content">
      <div class="home-title">
        <img src="../assets/other/catalog2.svg" />
        <p class="home-heading">CATALOG</p>
      </div>
      <div class="home-text">
        <p>Sell your music on your terms</p>
        <p>Present your work beautifully</p>
        <p>Share revenue & rewards with <br />your biggest supporters</p>
      </div>
    </div>
    <div class="home-footer">
      <p>Want to talk?</p>
      <a href="https://discord.gg/YBzUcah" target="_blank">Message us</a>
    </div>
    <div class="home-background"></div>
    <button @click="sendDai">send dai</button>
    <button @click="updateUser">update user</button>
    <button @click="getAllUsers">get all users</button>
    <button @click="deleteUsers">delete users</button>
    <button @click="getAllTracks">get tracks</button>
    <button @click="deleteTracks">delete tracks</button>
  </div>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
}

.home {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  text-align: center;
  // background-image: url("../assets/other/bgHome.png");
  // background-repeat: no-repeat;
  // background-size: cover;
}

.home-content {
  height: 100%;
  width: 70%;
  padding: 48px 48px 96px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login {
  font-family: "Inconsolata-ExtraBold", sans-serif;

  position: absolute;
  top: 22px;
  right: 24px;
  color: #f2ba00;
  border-radius: 4px;
  padding: 8px 12px 8px 12px;
  box-sizing: border-box;

  &:hover {
    // color: black;
    box-sizing: border-box;

    border: 1px solid #f2ba00;
    cursor: url("../assets/other/cursor.png"), auto;
  }
}

.home-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "TenorSans", sans-serif;
  font-size: 42px;
  margin-bottom: 0px;
  letter-spacing: 0.05em;
}

.home-footer {
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-self: flex-end;
  font-family: Inconsolata;
  font-size: 14px;
  // position: absolute;
  width: 70%;
  padding: 0px 32px;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  // background-color: black;
  border-top: 1px solid #666666;
  z-index: 0;

  p {
    opacity: 0.6;
  }

  a {
    padding-left: 8px;
    opacity: 0.6;
    cursor: url("../assets/other/cursor.png"), pointer;

    &:hover {
      opacity: 1;
    }
  }
}

.home-heading {
  padding-left: 16px;
  margin: 16px 0;
}

.home-text {
  font-family: Syne, sans-serif;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 15px;
  max-width: 90%;
  line-height: 160%;
  text-align: center;
  letter-spacing: 0.1em;
  opacity: 0.7;
}
.home-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/other/bgHome.png");
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: -100;
}
</style>
