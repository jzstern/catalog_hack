<script>
/* eslint-disable */
export default {
  name: "Home",
  components: {
    Dropdown: () => import("../components/dropdown/Dropdown"),
  },
  methods: {
    deleteUsers() {
      this.$store.dispatch('deleteUser', "01en1xj3yhcg4ezsjf92t4ps5h")
    },
    getAllUsers() {
      this.$store.dispatch('getAllUsers')
    },
    getAllTracks() {
      this.$store.dispatch('getAllTracks')
    },
    deleteTracks() {
      this.$store.dispatch('deleteItem', "01en20y7kayw8njgk1dm4dhfbb")
      this.$store.dispatch('deleteItem', "01en23vm29j74hxakmf2wy6js8")
      this.$store.dispatch('deleteItem', "01en23zsme378abnart9zwfjvk")
      this.$store.dispatch('deleteItem', "01en244bxxxkrxwv3es8y7s3vy")
      this.$store.dispatch('deleteItem', "01en25zq9knvenbfjwqg7at9rm")
    },
    updateUser() {
      this.$store.dispatch('updateUser', {
        ...this.$store.state.user,
        _id: "01en20tt3068ybgya3hztcxc5c",
        catalog: [],
        collection: []
        // links: [ "https://twitter.com/jzstern", "https://audius.co/jzstern", "https://soundcloud.com/appappa"]
      })
    }
  },
  mounted() {
    this.$store.commit("sidebarComponent", "Browse Artists")
  },
};
</script>

<template>
  <div class="home">
    <div class="home-content">
      <div class="home-title">
        <img src="../assets/other/catalog.svg" />
        <p class="home-heading">CATALOG</p>
      </div>
      <p class="home-text">
        Catalog empowers artists to sell their music directly to fans, who share
        in the upside through revenue share and exclusive rewards.
      </p>
      <p class="home-text">
        Artists receive 90% of direct sales <br />Supporters receive 10% of
        direct sales
      </p>
    </div>
    <div class="home-footer">
      <p>Want to talk?</p>
      <a>Message us</a>
    </div>
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
  overflow: hidden;
  background-image: url("../assets/other/bgHome.png");
  background-repeat: no-repeat;
  box-sizing: border-box;
}

.home-content {
  height: 100%;
  width: 70%;
  padding: 48px;
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
  font-family: "Tenor Sans", sans-serif;
  font-size: 36px;
  margin-bottom: 0px;
  vertical-align: middle;
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
}

.home-text {
  font-family: Inconsolata;
  font-size: 18px;
  max-width: 90%;
  line-height: 150%;
  opacity: 0.8;
}
</style>
