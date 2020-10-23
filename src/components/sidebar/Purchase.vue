<script>
/* eslint-disable */
export default {
  name: "Purchase",
  watch: {
    async payment(newVal) {
      // maybe use handler method if asnyc doesn't work
      this.numTokensReceived = await this.$store.dispatch('ethers/getNumTokensReceived', 
        { artistAddress: this.item.artist.wallet_addr_mm, daiAmount: newVal })
    }
  },
  computed: {
    balanceDai() {
      return this.$store.state.ethers.balanceDai
    },
    item() {
      return this.$store.state.sidebar.item;
    },
    generateTx() {
      return (
        (this.item.price && this.payment >= this.item.price) ||
        (!this.item.price && this.payment)
      ) && Number(this.balanceDai) >= Number(this.payment);
    },
    userIsLoggedIn() {
      return this.$store.state.user.login_status === "LOGGED_IN";
    },
  },
  data: () => ({
    artistTokenAddress: null,
    numTokensReceived: null,
    payment: null,
    message: null,
  }),
  methods: {
    back() {
      this.$store.commit("sidebar", {
        component: "Track Info",
        item: this.item,
      });
    },
    async purchaseItem() {
      if (!this.userIsLoggedIn) {
        alert("Login to purchase music");
        return;
      }

      await this.$store.dispatch('ethers/getBalances')

      if (this.generateTx) {
        // const tx = await this.$store.dispatch('ethers/sendDai', { to: this.item.artist.wallet_addr_mm, amount: this.payment})
        // console.log("tx");
        // console.log(tx);
        await this.$store.dispatch('ethers/sendDai', { to: this.item.artist.wallet_addr_mm, amount: this.payment})
        const purchase = { ...this.item, price: this.payment };
        this.$store.dispatch("addItemToCollection", purchase);
        this.$store.commit("sidebar", {
          component: "Receipt",
          item: { ...purchase, artist: {
            ...purchase.artist,
            tokenAddress: this.artistTokenAddress
          } },
        });
      } else {
        alert("payment amount is bunk")
      }
    }
  },
  async mounted() {
    this.artistTokenAddress = await this.$store.dispatch('ethers/getArtistTokenAddress', this.item.artist.wallet_addr_mm)
  }
};
</script>

<template>
  <div class="purchase">
    <div class="purchase-item">
      <img class="purchase-artwork" :src="item.artwork['480x480']" />
      <div class="purchase-song-info">
        <p class="purchase-song-title">{{ item.title }}</p>
        <p class="purchase-artist">{{ item.artist.name }}</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="form-item">
      <label
        >Name your price ({{ item.price ? `$${item.price}` : "$0.00+" }})</label
      >
      <br />
      <input class="price-input" v-model="payment" type="number" />
    </div>
    <div class="form-item">
      <label>Include message</label>
      <br />
      <input v-model="message" type="Text" />
    </div>
    <button class="buttonPrimary" @click="purchaseItem">Purchase</button>
    <button class="buttonSecondary" @click="back">Go back</button>

    <p class="disclaimer">
      Upon purchase, you’ll receive <b>{{ numTokensReceived ? numTokensReceived : 0 }}</b> {{ item.artist.name }} tokens,
      which entitle you to a portion of <b>10%</b> of future revenue from
      {{ item.artist.name }} on Catalog, as well as other token holder rewards.
      You’ll also get unlimited streaming via Catalog, and a download in mp3 and
      wav.
    </p>
  </div>
</template>

<style style="scss">
.purchase {
  padding: 32px;
}

.purchase-artwork {
  width: 60px;
  height: 60px;
}

.purchase-item {
  display: flex;
}

.purchase-song-title {
  font-size: 24px;
  margin: 0;
}

.purchase-artist {
  margin-top: 8px;
}

.purchase-song-info {
  margin: 0 16px;
}

.price-input {
  width: 30%;
}
</style>