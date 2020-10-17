<template>
  <div class="purchase">
    <p class="song-title">{{ item.title }}</p>
    <p class="artist">{{ item.artist }}</p>
    <p>${{ item.price }}+</p>
    <input v-model="payment" type="number" />
    <p>Include message</p>
    <input v-model="message" type="Text" />
    <button class="buttonPrimary" @click="purchaseItem">Purchase</button>

    <p class="disclaimer">
      Upon purchase, you’ll get 1,450 Omari Jazz tokens, which entitle you to a
      portion of 10% of future revenue from Omari Jazz. You’ll also receive a
      download in mp3 and wav, and unlimited streaming via Catalog.
    </p>
    <button class="buttonSecondary" @click="back">Go back</button>
  </div>
</template>

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

<style style="scss">
.purchase {
  padding: 24px;
}
</style>