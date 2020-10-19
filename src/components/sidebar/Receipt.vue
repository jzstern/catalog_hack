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
      <p class="receive-item-0">
        <b>1,450</b> {{ item.artist }} tokens, entitling you to future
        {{ item.artist }} revenue on Catalog.
      </p>
      <p class="receive-item-1">{{ item.title }} added to your collection</p>
      <p class="receive-item-2">Unlimited streaming via Catalog</p>
      <p class="receive-item-3">{{ item.title }} wav download</p>
      <p class="receive-item-4">{{ item.title }} mp3 download</p>
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
  padding: 32px;
}
</style>