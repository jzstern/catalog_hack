<script>
/* eslint-disable */
export default {
  watch: {
    currentSong: {
      deep: true,
      // immediate: true,
      handler(newVal, oldVal) {
        if (!oldVal || newVal._id !== oldVal._id) {
          this.loaded = false;

          if (this.$refs.audio) this.$refs.audio.pause();

          this.src = `https://creatornode2.audius.co/tracks/stream/${newVal.id_audius}`;

          if (this.$refs.audio && this.$refs.audio.HAVE_ENOUGH_DATA)
            this.$refs.audio.play();
        }

        newVal.playing &&
        this.$refs.audio &&
        this.$refs.audio.HAVE_ENOUGH_DATA &&
        this.$refs.audio.paused
          ? this.$refs.audio.play()
          : this.$refs.audio.pause();
      },
    },
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
    onHome() {
      return this.$route.path === "/";
    },
  },
  data: () => ({
    loaded: false,
    src: null,
  }),
  methods: {
    navToSong() {
      this.$store.commit("sidebar", {
        component: "Item",
        item: this.currentSong,
      });
    },
  },
  mounted() {
    this.$refs.audio.addEventListener("canplay", (event) => {
      this.loaded = true;
      if (this.currentSong.playing) this.$refs.audio.play();
    });
  },
};
</script>

<template>
  <div :class="['music-player', { homePlayer: onHome }]">
    <audio ref="audio" :src="src" />
    <div class="player-info">
      <img
        v-if="currentSong.playing"
        class="play-pause"
        src="../assets/other/pause.svg"
        @click="$store.commit('togglePlaying')"
      />
      <img
        v-else
        class="play-pause"
        src="../assets/other/play.svg"
        @click="$store.commit('togglePlaying')"
      />

      <p class="player-title" @click="navToSong">
        {{ currentSong.title ? currentSong.title : "No song playing" }}
      </p>
      <router-link :to="`/${currentSong.artist.handle}`" class="player-artist">
        {{ currentSong.artist.name ? currentSong.artist.name : "" }}
      </router-link>
    </div>
    <div class="home-footer" v-show="onHome">
      <p>Want to talk?</p>
      <a href="https://discord.gg/YBzUcah" target="_blank">Message us</a>
    </div>
  </div>
</template>


<style lang="scss">
.music-player {
  position: fixed;
  bottom: 0;
  z-index: 100;
  font-family: "SpaceGrotesk";
  font-size: 14px;
  // position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 11px 12px;
  margin: 0;
  // bottom: 0px;
  // height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
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

.home-footer {
  display: flex;
  align-items: center;
  justify-self: flex-end;
  //   font-family: Inconsolata;
  //   font-size: 14px;
  //   // position: absolute;
  // width: 70%;
  padding: 0px 32px;
  box-sizing: border-box;

  p {
    opacity: 0.6;
  }

  a {
    color: #42b983;

    padding-left: 8px;
    opacity: 0.6;
    cursor: url("../assets/other/cursor.png"), pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>