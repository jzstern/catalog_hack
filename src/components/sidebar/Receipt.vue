<script>
/* eslint-disable */
export default {
  name: "Receipt",
  computed: {
    item() {
      return this.$store.state.sidebar.item;
    }
  },
  data: () => ({
    stakingComplete: false
  }),
  methods: {
    close() {
      this.$store.commit("closeSidebar");
    },
    async stake() {
      // this.$store.dispatch("ethers/stake", this.item.artist.wallet_addr)
      await this.$store.dispatch("ethers/stake", "0x22A71a4b2bEaE4C5d54E407D81A55CDfCFb22B2a")
      this.stakingComplete = true
    }
  },
};
</script>

<template>
  <div class="receipt">
    <h3>Here's what you paid</h3>
    <p>${{ item.price }}</p>
    <p>90% goes to {{ item.artist.name }}</p>
    <p>10% goes to {{ item.artist.name }}'s supporters</p>
    <div class="divider" />
    <h3>Here's what you got</h3>
    <p>(we sent all this to your email as well)</p>
    <div>
      <p class="receive-item-0">
        <b>1,450</b> {{ item.artist.name }} tokens, entitling you to future
        {{ item.artist.name }} revenue on Catalog.
      </p>
      <p class="receive-item-1">{{ item.title }} added to your collection</p>
      <p class="receive-item-2">Unlimited streaming via Catalog</p>
      <p class="receive-item-3">{{ item.title }} wav download</p>
      <p class="receive-item-4">{{ item.title }} mp3 download</p>
    </div>
    <div class="divider" />
    <p>Thank you for your support :)</p>
    <button class="buttonPrimary" @click="stake" v-if="!stakingComplete">Stake</button>

    <div v-else>
      <p >Staking successful 💸</p>
      <button class="buttonPrimary" @click="$store.commit('sidebarComponent', 'User Dashboard')">Dashboard</button>  
    </div>

    <button class="buttonSecondary" @click="close">Close</button>
  </div>
</template>

<style lang="scss">
.receipt {
  padding: 32px;
}
</style>