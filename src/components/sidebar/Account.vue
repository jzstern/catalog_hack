<script>
/* eslint-disable */
export default {
  name: "Account",
  computed: {
    connectedMM() {
      return !!this.$store.state.ethers.address
    },
    formattedWalletAddr() {
      var address;

      if (this.user.wallet_addr_mm) address = this.user.wallet_addr_mm;
      else address = this.user.wallet_addr;

      return (
        address.substring(0, 6) + "..." + address.substring(address.length - 4)
      );
    },
    user() {
      return this.$store.state.user;
    },
  },
  data: () => ({
    registering: false,
    artistTokenAddress: null,
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    async registerArtistToken() {
      if (!this.connectedMM) this.$store.dispatch('ethers/login')
      else {
        try {
          this.registering = true;
          this.artistTokenAddress = await this.$store.dispatch(
            "ethers/registerArtistToken"
          );
        } catch (e) {
          this.registering = false;
          console.error("Artist token registration error: ", e)
          alert("There was a problem registering your artist token (Ropsten has been acting up recently 😔)")
        }
      }
    },
  },
  async mounted() {
    this.$store.dispatch("getAudiusUploads", this.user.id_audius);
    this.artistTokenAddress = await this.$store.dispatch(
      "ethers/getArtistTokenAddress",
      this.user.wallet_addr_mm
    );
  },
};
</script>

<template>
  <div class="account">
    <div class="account-item">
      <label>Name</label>
      <p class="field">{{ user.name }}</p>
    </div>
    <div class="account-item">
      <label>Email</label>
      <p class="field">{{ user.email }}</p>
    </div>
    <div class="account-item">
      <label
        >Wallet Address {{ !user.wallet_addr_mm ? "(Hedgehog)" : null }}</label
      >
      <p class="field">
        {{ formattedWalletAddr }}
      </p>
    </div>
    <div class="account-item">
      <label>Handle</label>
      <p class="field">{{ user.handle }}</p>
    </div>

    <br />
    <div class="account-item">
      <label>Artist Token Address</label>
      <button
        v-if="!artistTokenAddress"
        class="buttonPrimary"
        @click="debugRegisterArtistToken"
      >
        Register Artist Token
      </button>
      <p v-else class="field">{{ artistTokenAddress }}</p>
    </div>

    <br />
    <button class="buttonSecondary" @click="logout">Log out</button>

    <!-- <h4>Songs owned:</h4>
    <h4>{{ user.collection.length }}</h4>

    <h4>Songs uploaded:</h4>
    <h4>{{ user.catalog.length }}</h4> -->
  </div>
</template>

<style lang="scss">
.field {
  margin-top: 8px;
}

.account-item {
  padding: 16px 0 12px 0;
}

.account {
  font-family: Inconsolata;
  padding: 16px 32px;
  // width: 100%;
}

.mint {
  cursor: url("../../assets/other/cursor.png"), pointer;

  &:hover {
    color: #f2ba00;
  }
}
</style>