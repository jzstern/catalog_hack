<script>
/* eslint-disable */
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ownedByUser() {
      return this.$store.state.user.collection.find(
        (item) => item.id_audius === this.item.id_audius
      );
    },
    pathContainsCollection() {
      return this.$route.path.includes("collection");
    },
    itemSrc() {
      return `https://creatornode2.audius.co/tracks/stream/${this.item.id}`;
    },
  },
  methods: {
    selectItem() {
      // TODO - don't open sidebar if artist name was clicked
      this.$store.commit("sidebar", {
        component: "Item",
        item: this.item,
      });
    },
    playItem() {
      if (this.$refs.song.paused) {
        this.$refs.song.play();
      } else this.$refs.song.pause();
    },
  },
};
</script>

<template>
  <div class="item-card">
    <img
      class="card-artwork"
      :src="item.artwork['480x480']"
      @click="selectItem"
    />
    <div class="card-info">
      <div>
        <p class="card-title" @click="playItem()">{{ item.title }}</p>
        <audio ref="song" :src="itemSrc"></audio>
        <router-link :to="`/${item.artistHandle}`" class="card-artist">
          {{ item.artist.name }}</router-link
        >
        <p>{{ item.desription }}</p>
      </div>

      <!-- <p v-if="!ownedByUser" class="artist">{{ item.artist }}</p> -->
      <!-- <p>{{ item.description }}</p> -->
      <p class="card-price" v-if="!pathContainsCollection || !ownedByUser">
        {{ item.price ? `$${item.price}` : "$0.00+" }}
      </p>
      <p v-else>you own this work</p>
    </div>
  </div>
</template>

<style scoped lang="scss" >
.card-title {
  // font-family: Inconsolata-ExtraBold, sans-serif;
  font-family: SpaceGrotesk, sans-serif;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  line-height: 100%;
  cursor: url("../../assets/other/cursor.png"), pointer;
}

.card-info {
  display: flex;
  justify-content: space-between;
}

.card-price {
  font-family: "Supply", sans-serif;
  opacity: 0.5;
}
.item-card {
  position: relative;
  z-index: 100;
  font-size: 16px;
}

.item-card::before {
  content: "";
  display: block;
  // padding-top: 100%;
}

.card-artist {
  // color: red;
  // margin-top: 8px;
  opacity: 0.6;
  font-family: SpaceGrotesk, sans-serif;

  &:hover {
    color: #f2ba00;
  }
}

.card-artwork {
  width: 100%;
  border-radius: 1px;
  &:hover {
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: url("../../assets/other/cursor.png"), pointer;
    // transform: scale(0.999);

    &:active {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>