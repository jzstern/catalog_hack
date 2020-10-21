<script>
/* eslint-disable */
// when you define this component, use this v-if
// <MusicPlayer v-if="currentSong._id" />
export default {
  watch: {
    playing(newVal) {
      newVal ? this.$refs.audio.play() : this.$refs.audio.pause();
      console.log("from watcher" + this.currentSong.playing);
    },
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
    playing() {
      return this.currentSong.playing;
    },
    source() {
      return `https://creatornode2.audius.co/tracks/stream/${this.currentSong.id_audius}`;
    },
    onHome() {
      return this.$route.path === "/";
    },
  },
  methods: {
    navToSong() {
      this.$store.commit("sidebar", {
        component: "Item",
        item: this.currentSong,
      });
    },
    togglePlaying() {
      // TODO - hide player if nothing has been played yet
      this.$store.commit("togglePlaying");
    },
  },
};
</script>

<template>
  <div :class="['music-player', { homePlayer: onHome }]">
    <audio ref="audio" :src="source" />
    <img
      v-if="currentSong.playing"
      class="play-pause"
      src="../assets/other/pause.svg"
      @click="togglePlaying"
    />
    <img
      v-else
      class="play-pause"
      src="../assets/other/play.svg"
      @click="togglePlaying"
    />
    <div class="player-info">
      <p class="player-title" @click="navToSong">
        {{ currentSong.title }}
      </p>
      <router-link :to="`/${currentSong.artist.handle}`" class="player-artist">
        {{ currentSong.artist.name }}
      </router-link>
    </div>
  </div>
</template>


<style lang="scss">
.music-player {
  z-index: 100;
  font-family: "SpaceGrotesk";
  font-size: 14px;
  // position: absolute;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 0;
  // bottom: 0px;
  // height: 30px;
  background-color: rgb(12, 12, 12);
  width: 100%;
  border-top: 1px solid #666;
  // border: 1px solid #666;
  // width: 20%;
  // align-self: flex-end;
  // z-index: 1000;

  box-sizing: border-box;

  p {
    margin: 0;
  }
}

.homePlayer {
  width: 70%;
}

.player-info {
  display: flex;
}

.player-artist {
  padding-left: 16px;
  opacity: 0.5;
}

.play-pause {
  width: 10px;
  margin: 0 24px 0 8px;
  opacity: 0.8;
  cursor: url("../assets/other/cursor.png"), pointer;

  &:hover {
    opacity: 1;
  }
}
</style>