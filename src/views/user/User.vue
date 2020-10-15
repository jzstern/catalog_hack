<script>
/* eslint-disable */
export default {
  name: "User",
  watch: {
    $route() {
      this.refreshUserInfo()
    }
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  data: () => ({
    editing: false,
    loading: false
  }),
  computed: {
    artist() {
      return this.$store.state.artist
    },
    sidebar() {
      return this.$store.state.sidebar;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    refreshUserInfo() {
      var handle = this.$route.path.substring(1)
      if (handle.includes("/")) handle = handle.substring(0, handle.indexOf('/'))
      this.$store.dispatch('getArtistData', handle)
    }
  },
  mounted() {
    this.$store.commit("closeSidebar")
    this.refreshUserInfo()
  }
};
</script>

<template>
  <div class="user">
    <div class="profile-info">
      <h3 class="profile-title">{{ artist ? artist.name : null }}</h3>
    </div>
    <div class="nav">
      <router-link :to="`/${artist.handle}`" class="nav-item">Catalog</router-link>
      <router-link :to="`/${artist.handle}/collection`" class="nav-item">
        Collection
      </router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/global.scss";

.nav {
  padding: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
  justify-self: center;
}

// .info {
//   font-family: "Inconsolata-SemiBold";
//   margin: 0px 16px;
//   white-space: normal;
// }i have

// .info-item {
//   margin: 32px 0;
//   letter-spacing: 0.05em;
//   font-size: 14px;
// }

// .label {
//   margin-bottom: 8px;
//   opacity: 0.6;
// }

// .mod {
//   font-family: "Inconsolata-ExtraExpanded-Black";
// color: #75a251;
//   cursor: url("../../assets/other/cursor.png"), auto;
//   padding-right: 16px;
// }

// .mod-box {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// }

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
  position: absolute;
  top: 16px;
  left: 16px;
}

.profile-title {
  font-family: "Tenor Sans", sans-serif;
  font-size: 18px;
  vertical-align: middle;
  letter-spacing: 0.05em;
  opacity: 0.8;
  margin: 4px 0 0 4px;
  justify-self: flex-start;
}

.user {
  // display: flex;
  height: 100%;
  justify-content: center;
  // overflow: hidden;
  background-image: url("../../assets/other/bgUser.png");
  background-repeat: no-repeat;
}
</style>