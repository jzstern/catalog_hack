<script>
/* eslint-disable */
export default {
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
    item() {
      return this.$store.state.sidebar.item;
    },
    createdByUser() {
      return this.$store.state.user.catalog.find(
        (item) => item._id === this.item._id
      );
    },
    ownedByUser() {
      return this.$store.state.user.collection.find(
        (item) => item._id === this.item._id
      );
    },
    showPauseButton() {
      return this.currentSong._id === this.item._id && this.currentSong.playing;
    },
  },
  data: () => ({
    showIcon: false,
  }),
  methods: {
    purchaseItem() {
      this.$store.commit("sidebar", {
        component: "Purchase",
        item: this.item,
      });
    },
    toggleAudio() {
      this.currentSong.id_audius === this.item.id_audius
        ? this.$store.commit("togglePlaying")
        : this.$store.commit("currentSong", {
            ...this.item,
            playing: true,
          });
    },
  },
};
</script>

<template>
  <div class="item-sidebar">
    <div
      class="item-main"
      @mouseenter="showIcon = !showIcon"
      @mouseleave="showIcon = !showIcon"
      @click="toggleAudio"
    >
      <img class="item-artwork" :src="item.artwork['480x480']" />
      <div v-show="showIcon">
        <img
          v-if="showPauseButton"
          class="item-play-pause"
          src="../../assets/other/pause.svg"
        />
        <img v-else class="item-play-pause" src="../../assets/other/play.svg" />
      </div>
    </div>
    <p class="song-title">
      {{ item.title }}
    </p>
    <p class="detail-artist">
      song by
      <span class="artist-name"
        ><router-link :to="`/${item.artist.handle}`">
          {{ item.artist.name }}</router-link
        ></span
      >
    </p>
    <div v-if="ownedByUser">
      <p>You own this 💪🏼</p>
      <a
        :href="`https://creatornode2.audius.co/tracks/stream/${item.id_audius}`"
        class="receive-item-4"
        target="_blank"
        download
        >mp3 download</a
      >
    </div>
    <button
      v-else-if="!createdByUser"
      class="buttonPrimary"
      @click="purchaseItem"
    >
      Purchase ({{ item.price ? `$${item.price}` : "$0.00+" }})
    </button>
    <div class="divider divider-anomaly" />
    <div v-if="item.description">
      <label>Description</label>
      <p>{{ item.description }}</p>
      <div class="divider-large" />
    </div>

    <p class="disclaimer" v-if="!ownedByUser && !createdByUser">
      Upon purchase, you’ll receive {{ item.artist.name }} tokens,
      which entitle you to a portion of <b>10%</b> of future revenue from
      {{ item.artist.name }} on Catalog, as well as other token holder rewards.
      You’ll also get unlimited streaming via Catalog, and a download in mp3 and
      wav.
    </p>
  </div>
</template>


<style lang="scss">
.item-sidebar {
  padding: 32px;
}

.song-title {
  font-family: "TenorSans", serif;
  font-size: 24px;
  margin: 12px 0;
}

.detail-artist {
  font-family: "TenorSans", serif;
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

.item-main {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: url("../../assets/other/cursor.png"), pointer;
}

.item-play-pause {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.divider-anomaly {
  margin-top: 32px;
}
</style>