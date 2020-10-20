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
    currentSong() {
      return this.$store.state.currentSong
    },
    ownedByUser() {
      return this.$store.state.user.collection.find(
        (item) => item.id_audius === this.item.id_audius
      );
    },
    pathContainsCollection() {
      return this.$route.path.includes("collection");
    },
  },
  data: () => ({
    playing: false,
  }),
  methods: {
    selectItem() {
      // TODO - don't open sidebar if artist name was clicked
      this.$store.commit("sidebar", {
        component: "Item",
        item: this.item,
      });
    },
    toggleAudio() {
      this.currentSong.id_audius === this.item.id_audius ?
        this.$store.commit('togglePlaying') :
        this.$store.state.commit('currentSong', { ...this.item, playing: true })
    },
  },
};
</script>

<template>
  <div class="item-card">
    <div class="card-artwork">
      <img
        class="artwork-img"
        :src="item.artwork['480x480']"
        @click="selectItem"
      />
      <!-- <div class="card-actions"> -->
      <!-- <img class="play-pause" src="../../assets/other/play.svg" /> -->
      <!-- <img class="play-pause" src="../../assets/other/pause.svg" /> -->
      <!-- <button class="buttonSecondary"></button> -->
      <!-- </div> -->
    </div>
    <div class="card-info">
      <img
        v-show="!currentSong.playing"
        class="play-pause"
        @click="toggleAudio"
        src="../../assets/other/play.svg"
      />
      <img
        v-show="currentSong.playing"
        class="play-pause"
        @click="toggleAudio"
        src="../../assets/other/pause.svg"
      />
      <div>
        <p class="card-title">{{ item.title }}</p>
        <router-link :to="`/${item.artist.handle}`" class="card-artist">
          {{ item.artist.name }}</router-link
        >
        <p>{{ item.desription }}</p>
      </div>

      <!-- <p v-if="!ownedByUser" class="artist">{{ item.artist }}</p> -->
      <!-- <p>{{ item.description }}</p> -->
      <!-- <p class="card-price" v-if="!pathContainsCollection || !ownedByUser">
        {{ item.price ? `$${item.price}` : "$0.00+" }}
      </p> -->
      <!-- <p v-else>you own this work</p> -->
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
  justify-content: flex-start;
  margin-top: 4px;
  line-height: 8px;
}

.card-price {
  font-family: "SpaceGrotesk", sans-serif;
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
  opacity: 0.6;

  &:hover {
    color: #f2ba00;
  }
}

.card-actions {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
  background-color: rgba(133, 133, 3, 0.2);
  height: 55px;
  border-top: 1px solid #666;
  width: 100%;
}

.card-artwork {
  display: block;
  position: relative;
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

.artwork-img {
  display: block;
  position: relative;
  width: 100%;
  border-radius: 1px;
}

.play-pause {
  width: 18px;
  margin: 0 24px 0 8px;
  opacity: 0.8;
  cursor: url("../../assets/other/cursor.png"), pointer;

  &:hover {
    opacity: 1;
  }
}
</style>