<script>
/* eslint-disable */
import { mapState } from 'vuex'

export default {
  name: "User",
  watch: {
    clientReady() {
      this.refreshUserInfo();
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
    ...mapState({
      artist: "artist",
      clientReady: "clientReady",
      sidebar: "sidebar",
      user: "user",
    })
  },
  data: () => ({
    editing: false,
    loading: false,
  }),
  methods: {
    refreshUserInfo() {
      var handle = this.$route.path.substring(1);
      if (handle.includes("/")) handle = handle.substring(0, handle.indexOf("/")); // Remove /collection from route to get the handle
      // if (this.user.handle === handle) this.$store.commit('artist', this.user)
      // else if (this.artist.handle !== handle) this.$store.dispatch("getArtistData", handle);
      this.$store.dispatch("getArtistData", handle);
    },
  },
  mounted() {
    this.$store.commit("closeSidebar");
    if (this.clientReady) this.refreshUserInfo()
  },
};
</script>

<template>
  <div class="user">
    <div class="profile-info">
      <h3 class="profile-title">{{ artist.name ? artist.name : "loading..."  }}</h3>
    </div>
    <div class="nav">
      <router-link :to="`/${artist.handle}`" class="nav-item"
        >catalog</router-link
      >
      <router-link :to="`/${artist.handle}/collection`" class="nav-item">
        collection
      </router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <div class="music-player"></div>
    <div class="user-background"></div>

    <router-link :to="'/'">
      <img class="home-nav" src="../../assets/other/catalog.svg" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
// @import "../../styles/global.scss";
.user {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.home-nav {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 24px;
  opacity: 0.5;
  cursor: url("../../assets/other/cursor.png"), pointer;

  &:hover {
    opacity: 1;
  }
}

.nav {
  font-family: SpaceGrotesk, sans-serif;
  position: fixed;
  margin: 24px 0 0 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 200;
}

.nav-item {
  color: gray;
  margin-right: 15px;

  &:hover {
    color: white;
  }

  &.router-link-exact-active {
    color: #42b983;
  }
}

.profile-info {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 200;
}

.profile-title {
  font-family: SpaceGrotesk, sans-serif;

  font-size: 16px;
  opacity: 0.7;
  letter-spacing: 0.05em;
  margin: 0;
}

.user-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../../assets/other/bgUser.png");
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 0;
}
</style>