<script>
/* eslint-disable */
export default {
  name: "Home",
  components: {
    Dropdown: () => import("../components/dropdown/Dropdown"),
  },
  data: () => ({
    showHelpers: false
  }),
  methods: {
    deleteUsers() {
      this.$store.dispatch("deleteUser", "01en8k12g3h5dw3g4yms99mnw7");
      this.$store.dispatch("deleteUser", "01en8k328xx6njpsrtpvtxkxh9");
      this.$store.dispatch("deleteUser", "01en8kgfw4301cn6n9httk9r8g");
    },
    getAllUsers() {
      this.$store.dispatch("getAllUsers");
    },
    getAllTracks() {
      this.$store.dispatch("getAllTracks");
    },
    deleteTracks() {
      this.$store.dispatch("deleteItem", "01en8kc4emk6m7jcvc80e8861k");
      this.$store.dispatch("deleteItem", "01en8kcbgmvq1rhp1bfkg5hgz5");
      this.$store.dispatch("deleteItem", "01en8kcgyja7zd6gs8hv89387c");
      this.$store.dispatch("deleteItem", "01en8kcqhjst5h5yhcsaxe510a");
      this.$store.dispatch("deleteItem", "01en8kcx5ck3xqcckk8vdp8sy8");
      this.$store.dispatch("deleteItem", "01en8kd2h8g4zj4hks6xpbh14r");
      this.$store.dispatch("deleteItem", "01en8kd88pjv9vk8a1cyr4nj2h");
      this.$store.dispatch("deleteItem", "01en8kdcyx4km5yrm1ken58w5c");
      this.$store.dispatch("deleteItem", "01en8kdjmbme8x3ybc3r7v9ey3");
      this.$store.dispatch("deleteItem", "01en8kdr1e1ptjh8a326q7dbvc");
      this.$store.dispatch("deleteItem", "01en8kdxahr3qanabe5mr4y2cm");
    },
    updateUser() {
      this.$store.dispatch("updateUser", {
        ...this.$store.state.user,
        _id: "01en7dz2amd21rv5xx5s9h5ksm",
        catalog: [],
        collection: [],
        // links: [ "https://twitter.com/jzstern", "https://audius.co/jzstern", "https://soundcloud.com/appappa"]
      });
    },
  },
  mounted() {
    this.$store.commit("sidebarComponent", "Artist List");
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
