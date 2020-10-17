<template>
  <div class="receipt">
    <h3>Here's what you paid</h3>
    <p>${{ item.price }}</p>
    <p>90% goes to {{ item.artist }}</p>
    <p>10% goes to {{ item.artist }}'s supporters</p>
    <div class="divider" />
    <h3>Here's what you got</h3>
    <p>(we sent all this to your email as well)</p>
    <div>
      <p class="receipt-item-0">
        1,450 Omari Jazz tokens, entitling you to revenue share from Omari Jazz.
      </p>
      <p class="receipt-item-1">{{ item.title }} added to your collection</p>
      <p class="receipt-item-2">Unlimited streaming via Catalog</p>
      <p class="receipt-item-3">{{ item.title }} wav download</p>
      <p class="receipt-item-4">{{ item.title }} mp3 download</p>
    </div>
    <div class="divider" />
    <p>Thank you for your support :)</p>
    <button class="buttonSecondary" @click="close">Close</button>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "Receipt",
  computed: {
    item() {
      return this.$store.state.sidebar.item;
    },
  },
  methods: {
    close() {
      this.$store.commit("closeSidebar");
    },
  },
};
</script>

<style lang="scss">
.receipt {
  padding: 24px;
}

.receipt-item-0 {
  color: #f2ba00;
}
.receipt-item-1 {
  color: #9269b3;
}
.receipt-item-2 {
  color: #42b983;
}
.receipt-item-3 {
  color: #9b5a3e;
}
.receipt-item-4 {
  color: #77abc9;
}
</style>