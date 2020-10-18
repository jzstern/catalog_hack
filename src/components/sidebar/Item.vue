<template>
  <div class="item-sidebar">
    <img class="item-artwork" :src="item.artwork['480x480']" />
    <p class="song-title">{{ item.title }}</p>
    <p class="artist">song by {{ item.artist }}</p>
    <p v-if="ownedByUser">You own this 💪🏼</p>
    <button class="buttonPrimary" v-else @click="purchaseItem">
      Purchase ({{ item.price }}+)
    </button>
    <div class="divider" />
    <p>{{ item.desription }}</p>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  computed: {
    item() {
      return this.$store.state.sidebar.item;
    },
    ownedByUser() {
      return this.$store.state.user.collection.find(
        (item) => item.id === this.item.id
      );
    },
  },
  methods: {
    purchaseItem() {
      this.$store.commit("sidebar", {
        component: "Purchase",
        item: this.item,
      });
    },
  },
};
</script>

<style lang="scss">
.item-sidebar {
  padding: 32px;
}

.song-title {
  font-family: Tenor Sans, serif;
  font-size: 24px;
  margin-bottom: 0;
}

.artist {
  font-family: Tenor Sans, serif;
}

.item-artwork {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>