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
      this.$store.dispatch("deleteUser", "01en9mny736y60s2j8524qtdwv");
      this.$store.dispatch("deleteUser", "01en9mwzdda8wbpp52gn6xvwt8");
      this.$store.dispatch("deleteUser", "01en9qc3xjx6e632x5zb6wp4bm");
    },
    getAllUsers() {
      this.$store.dispatch("getAllUsers");
    },
    getAllTracks() {
      this.$store.dispatch("getAllTracks");
    },
    deleteTracks() {
      this.$store.dispatch("deleteItem", "01en9n64z5g4788mmzhdw8jsh7");
      this.$store.dispatch("deleteItem", "01en9n7dwc578j0qbw8a4e5am2");
      this.$store.dispatch("deleteItem", "01en9ndcqznykpe09qsc50504w");
      this.$store.dispatch("deleteItem", "01en9neb91ctsseh583rcsq2pb");
      this.$store.dispatch("deleteItem", "01en9nf135zygga703gzk80ypm");
      this.$store.dispatch("deleteItem", "01en9nf68sxvrjjwksfepy4d68");
      this.$store.dispatch("deleteItem", "01en9nfc8k7r2pv06czd92rbha");
      this.$store.dispatch("deleteItem", "01ensbp58nnk64q7gp75y7g9cn");
      this.$store.dispatch("deleteItem", "01ensc04dxzhvsgtaendygctt0");
      this.$store.dispatch("deleteItem", "01ensca3vwdj25a47krwak1yfv");
      this.$store.dispatch("deleteItem", "01enscdkwv1bxr8cwthd6qkrd8");
      this.$store.dispatch("deleteItem", "01enscpy568a51g2e0sy805ctk");
    },
    updateUser() {
      this.$store.dispatch("updateUser", {
        ...this.$store.state.user,
        _id: "01en9mny736y60s2j8524qtdwv",
        catalog: [],
        collection: [],
        wallet_addr_mm: "0x22A71a4b2bEaE4C5d54E407D81A55CDfCFb22B2a"
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
