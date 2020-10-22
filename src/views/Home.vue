<script>
/* eslint-disable */
export default {
  name: "Home",
  components: {
    Dropdown: () => import("../components/dropdown/Dropdown"),
  },
  data: () => ({
    showHelpers: true
  }),
  methods: {
    deleteUsers() {
      this.$store.dispatch("deleteUser", "01en7d73ke3nj1zb7s9ngb9ej5");
    },
    getAllUsers() {
      this.$store.dispatch("getAllUsers");
    },
    getAllTracks() {
      this.$store.dispatch("getAllTracks");
    },
    deleteTracks() {
      this.$store.dispatch("deleteItem", "01en7der0z2sd23qq7crjqntb1");
      this.$store.dispatch("deleteItem", "01en70mkhsvevv4rc147y5vneh");
      this.$store.dispatch("deleteItem", "01en72ht54k2pfbt3wh1nt6sac");
      this.$store.dispatch("deleteItem", "01en72j1aes1ccyz8z6s8sf0ns");
      this.$store.dispatch("deleteItem", "01en76q0fzpd3g9q827mwhvdy1");
    },
    updateUser() {
      this.$store.dispatch("updateUser", {
        ...this.$store.state.user,
        _id: "01en6z9h38j1gn63fjvzfr53rr",
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
    <div v-if="showHelpers">
      <button @click="updateUser">update user</button>
      <button @click="getAllUsers">get all users</button>
      <button @click="deleteUsers">delete users</button>
      <button @click="getAllTracks">get tracks</button>
      <button @click="deleteTracks">delete tracks</button>
    </div>
    </div>

    <div class="home-background"></div>
  </div>
</template>

<style scoped lang="scss">
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
