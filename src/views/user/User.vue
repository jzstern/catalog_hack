<script>
/* eslint-disable */

export default {
  name: "User",
  data: () => ({
    artist: null,
    editing: false,
    loading: false,
    name: "",
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
      // router.push('login')
    },
    save() {
      this.$store.commit("user", {
        ...this.user,
        name: this.name,
      });
      this.editing = false;
    },
  },
};
</script>

<template>
  <div class="user">
    <div class="section-left">
      <div class="header no-select">
        <h1 class="profile-title">PROFILE</h1>
      </div>
      <div class="info">
        <div v-if="!editing">
          <div class="info-item mod-box">
            <div>
              <p class="label">Username</p>
              <p class="field">
                {{ user.name ? user.name : "press edit button" }}
              </p>
            </div>
            <div>
              <p class="mod edit" @click="editing = true">edit</p>
            </div>
          </div>
          <div class="info-item">
            <p class="label">ETH Address</p>
            <p class="field">
              {{ user.walletAddress.substr(user.walletAddress.length - 4) }}
              <!-- {{
                user.walletAddress.substr(user.walletAddress.length - 4)
                  ? user.walletAddress
                  : "loading address..."
              }} -->
            </p>
          </div>
        </div>

        <div v-else>
          <div class="info-item">
            <p class="label">Email Address</p>
            <p class="field">
              {{ user.email ? user.email : "loading email..." }}
            </p>
          </div>
          <div class="info-item mod-box">
            <div>
              <p class="label">Name</p>
              <!-- <p class="field">{{ user.name ? user.name : "" }}</p> -->
              <input class="field" v-model="name" />
            </div>
            <div>
              <p class="mod" @click="save">save</p>
            </div>
          </div>
          <div class="info-item">
            <p class="label">ETH Address</p>
            <p class="field">
              {{
                user.walletAddress ? user.walletAddress : "loading address..."
              }}
            </p>
          </div>
          <!-- TODO - let users update their URL -->
        </div>

        <div class="divider-2" />
        <div class="nav-item">
          <router-link :to="`/${this.user.walletAddress}/upload`">
            upload ⟶
          </router-link>
        </div>

        <div class="nav-item">
          <router-link :to="`/${this.user.walletAddress}/catalog`">
            your catalog ⟶
          </router-link>
        </div>

        <div class="nav-item">
          <router-link :to="`/${this.user.walletAddress}/collection`">
            your collection ⟶
          </router-link>
        </div>

        <!-- <router-link :to="`/${this.usser.walletAddress}`"> cancel </router-link> -->

        <router-view />
      </div>
    </div>
    <div class="section-right-2">
      <router-link class="login" :to="`/`"> go back </router-link>
    </div>
  </div>
</template>

<style lang="scss">
p {
  margin: 0;
}

a {
  color: white;
  text-decoration: none;
  cursor: url("../../assets/other/cursor.png"), auto;

  &:hover {
    color: #ffcf2e;
  }
}

.back {
  font-family: "Inconsolata-ExtraBold", sans-serif;

  position: absolute;
  top: 22px;
  right: 24px;
  color: #ffcf2e;
  border-radius: 4px;
  padding: 8px 12px 9px 12px;
  box-sizing: border-box;

  &:hover {
    box-sizing: border-box;
    border: 1px solid #ffcf2e;
  }
}

.divider-2 {
  border-bottom: 1px solid #9b5a3e;
  opacity: 0.6;
}

.edit {
  opacity: 0.6;
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

.info {
  font-family: "Inconsolata-SemiBold";
  margin: 0px 16px;
  white-space: normal;
}

.info-item {
  margin: 32px 0;
  letter-spacing: 0.05em;
  font-size: 14px;
}

.label {
  margin-bottom: 8px;
  opacity: 0.6;
}

.mod {
  font-family: "Inconsolata-ExtraExpanded-Black";
  color: #75a251;
  cursor: url("../../assets/other/cursor.png"), auto;
  padding-right: 16px;
}

.mod-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  font-family: "Inconsolata-SemiBold";
  font-size: 18px;
  color: white;
  margin: 24px 0;
  opacity: 0.8;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.profile-title {
  font-family: "Tenor Sans", sans-serif;
  font-size: 22px;
  vertical-align: middle;
  letter-spacing: 0.05em;
  opacity: 0.8;
  margin: 0px 16px 0px 16px;
}

.section-left {
  width: 24%;
  flex: initial;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}

.section-right-2 {
  position: relative;
  height: 100vh;
  background-repeat: no-repeat;
  flex: auto;
  background-image: url("../../assets/other/bgUser.png");
  // border-left: 2px solid #666666;
  box-sizing: border-box;
}

.user {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>