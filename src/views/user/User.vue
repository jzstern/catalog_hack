<script>
/* eslint-disable */
export default {
  name: "User",
  data: () => ({
    artist: null,
    editing: false,
    loading: false,
    name: "",
    url: "",
  }),
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    save() {
      this.$store.commit("user", {
        ...this.user,
        name: this.name,
      });
      this.editing = false;
    },
    toggleSettings() {
      if (this.sidebar === "settings") this.$store.commit("closeSidebar");
      else this.$store.commit("sidebar", "settings");
    },
    toggleUpload() {
      if (this.sidebar === "upload") this.$store.commit("closeSidebar");
      else this.$store.commit("sidebar", "upload");
    },
  },
  mounted() {
    this.name = "Omari Jazz";
    this.url = "omarijazz";
  },
};
</script>

<template>
  <div class="user">
    <h3 class="profile-title">{{ name }}</h3>
    <div class="nav">
      <router-link :to="`/${url}`" class="nav-item">Catalog</router-link>
      <router-link :to="`/${url}/collection`" class="nav-item"
        >Collection</router-link
      >
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <button @click="toggleSettings" style="height: 22px">settings</button>
    <button @click="toggleUpload" style="height: 22px">upload</button>
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
//   color: #75a251;
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