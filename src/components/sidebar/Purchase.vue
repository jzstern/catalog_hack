<script>
/* eslint-disable */
export default {
  name: "Purchase",
  data: () => ({
    payment: null,
    message: null,
  }),
  computed: {
    item() {
      return this.$store.state.sidebar.item;
    },
  },
  methods: {
    back() {
      this.$store.commit("sidebar", {
        component: "Item",
        item: this.item,
      });
    },
    purchaseItem() {
      const purchase = {
        ...this.item,
        price: this.payment,
      };
      this.$store.commit("addToCollection", purchase);
      this.$store.commit("sidebar", {
        component: "Receipt",
        item: purchase,
      });
    },
  },
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
      Upon purchase, you’ll receive <b>1,450</b> {{ item.artist.name }} tokens, which
      entitle you to a portion of <b>10%</b> of future revenue from
      {{ item.artist }} on Catalog, as well as other token holder rewards.
      You’ll also get unlimited streaming via Catalog, and a download in mp3 and
      wav.
    </p>
  </div>
</template>


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
  /* font-family: "supply", sans-serif; */
  margin-top: 8px;
}

.purchase-song-info {
  margin: 0 16px;
}

.price-input {
  width: 30%;
}
</style>