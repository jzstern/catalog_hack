<script>
/* eslint-disable */
export default {
  name: "User",
  data: () => ({
    artist: null,
    editing: false,
    loading: false,
    name: "",
    url: ""
  }),
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    },
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.$store.commit('closeSidebar')
    this.name = "Omari Jazz"
    this.url = "omarijazz"
  }
};
</script>

<template>
  <div class="user">
    <h3 class="profile-title">{{ name }}</h3>
    <div class="nav">
      <router-link :to="`/${url}`" class="nav-item">Catalog</router-link>
      <router-link :to="`/${url}/collection`" class="nav-item">Collection</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import "../../styles/global.scss";

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

.profile-title {
  font-family: "Tenor Sans", sans-serif;
  font-size: 22px;
  vertical-align: middle;
  letter-spacing: 0.05em;
  opacity: 0.8;
  margin: 0px 16px 0px 16px;
}

.user {
  display: flex;
  height: 100%;
  overflow: hidden;
  background-image: url("../../assets/other/bgUser.png");
  background-repeat: no-repeat;
}
</style>