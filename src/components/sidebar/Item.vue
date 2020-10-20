<template>
  <div class="item-sidebar">
    <img
      class="item-artwork"
      :src="item.artwork['480x480']"
    >
    <p class="song-title">
      {{ item.title }}
    </p>
    <p class="detail-artist">
      song by
      <span
        class="artist-name"
      ><router-link :to="`/${item.artistHandle}`">
        {{ item.artist.name }}</router-link></span>
    </p>
    <p v-if="ownedByUser">
      You own this 💪🏼
    </p>
    <button
      v-else
      class="buttonPrimary"
      @click="purchaseItem"
    >
      Purchase ({{ item.price ? `$${item.price}` : "$0.00+" }})
    </button>
    <div class="divider divider-anomaly" />
    <label>Description</label>
    <p>{{ item.description }}</p>

    <div
      v-if="item.description"
      class="divider-large"
    />

    <p class="disclaimer">
      Upon purchase, you’ll receive <b>1,450</b> {{ item.artist.name }} tokens, which
      entitle you to a portion of <b>10%</b> of future revenue from
      {{ item.artist.name }} on Catalog, as well as other token holder rewards.
      You’ll also get unlimited streaming via Catalog, and a download in mp3 and
      wav.
    </p>
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
  margin: 12px 0;
}

.detail-artist {
  font-family: Tenor Sans, serif;
  margin-top: 0;
}

.artist-name {
  cursor: url("../../assets/other/cursor.png"), pointer;

  color: #f2ba00;
  &:hover {
    text-decoration: underline;
  }
}

.item-artwork {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 2px;
}

.divider-anomaly {
  margin-top: 32px;
}
</style>