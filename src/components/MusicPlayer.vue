<script>
/* eslint-disable */
// when you define this component, use this v-if
// <MusicPlayer v-if="currentSong._id" />
export default {
  watch: {
    playing(newVal) {
      console.log("playing changed");
      if (newVal) {
        console.log("playing is a go");
        if (this.$refs.audio.HAVE_ENOUGH_DATA) this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    trackId(newVal) {
      console.log("track ID changed");
      this.loaded = false
      this.$refs.audio.pause()
      this.src = `https://creatornode2.audius.co/tracks/stream/${newVal}`
      console.log("new src");
      if (this.$refs.audio.HAVE_ENOUGH_DATA) {
        console.log("we got data: play that ish");
        this.$refs.audio.play()
      }
    },
    currentSong() {
      console.log("current song changed");
    }
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
    playing() {
      return this.$store.state.currentSong.playing;
    },
    trackId() {
      return this.$store.state.currentSong.id_audius
    },
    onHome() {
      return this.$route.path === "/";
    },
  },
  data: () => ({
    loaded: false,
    src: null
  }),
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
  mounted() {
    this.$refs.audio.addEventListener("canplay", event => {
      console.log("we loaded fam");
      this.loaded = true
      if (this.playing) this.$refs.audio.play();
    });
  }
};
</script>

<template>
  <div :class="['music-player', { homePlayer: onHome }]">
    <audio ref="audio" :src="src" />
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