<script>
/* eslint-disable */
export default {
  watch: {
    percentElapsed(newVal, oldVal) {
      const newPercent = newVal.toFixed(4);
      const oldPercent = oldVal.toFixed(4);
      if (oldPercent !== newPercent)
        this.$refs.progress.style.transform = `translate3d(${newPercent}%, 0, 0)`;
    },
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
    percentElapsed: 0,
  }),
  methods: {
    navToSong() {
      this.$store.commit("sidebar", {
        component: "Track Info",
        item: this.currentSong,
      });
    },
  },
  mounted() {
    this.$refs.audio.addEventListener("canplay", (event) => {
      this.loaded = true;
      if (this.currentSong.playing) this.$refs.audio.play();
    });
    this.$refs.audio.addEventListener(
      "timeupdate",
      ({ target: { currentTime, duration } }) => {
        const percentElapsed = (currentTime / duration) * 100;
        this.percentElapsed = percentElapsed;
      }
    );
  },
};
</script>

<template>
  <div :class="['music-player', { homePlayer: onHome }]">
    <audio ref="audio" :src="src" />

    <div class="progress-bar" v-if="currentSong.title">
      <div ref="progress" class="fill" />
    </div>

    <div class="player-info">
      <img
        v-if="currentSong.playing"
        class="play-pause no-select"
        src="../assets/other/pause.svg"
        @click="$store.commit('togglePlaying')"
      />
      <img
        v-else
        :class="['play-pause no-select', { noPlay: !currentSong.title }]"
        src="../assets/other/play.svg"
        @click="$store.commit('togglePlaying')"
      />

      <p class="player-title" @click="navToSong" v-if="currentSong.title">
        {{ currentSong.title }}
      </p>
      <p v-else class="no-song no-select">No song playing</p>
      <router-link
        v-if="currentSong.title"
        :to="`/${currentSong.artist.handle}`"
        class="player-artist"
      >
        {{ currentSong.artist.name ? currentSong.artist.name : "" }}
      </router-link>
    </div>
    <div class="home-footer no-select" v-show="onHome">
      <p>Want to talk?</p>
      <a href="https://discord.gg/YBzUcah" target="_blank">Message us</a>
    </div>
  </div>
</template>


<style lang="scss">
.progress-bar {
  position: absolute;
  z-index: 5000;
  top: -1px;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: #65a3c1;
  overflow: hidden;
}

.fill {
  position: absolute;
  z-index: 5001;
  top: 0;
  left: 0;
  height: 0.25px;
  width: 100%;
  background-color: #666;
  transform: translate3d(100%, 0, 0);
  transition: transform 300ms;
  overflow: hidden;
}

.music-player {
  // overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 100;
  font-family: "SpaceGrotesk";
  font-size: 14px;
  // position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  margin: 0;
  // bottom: 0px;
  // height: 30px;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  width: 100%;
  border-top: 1px solid #666;
  // border: 1px solid #666;
  // width: 20%;
  // align-self: flex-end;
  // z-index: 1000;

  box-sizing: border-box;

  p {
    padding: 12px 0px 11px 0px;
    margin: 0;
  }

  a {
    padding: 12px 12px 11px 12px;
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

  &:hover {
    color: #f2ba00;
  }
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

.no-song {
  opacity: 0.5;
  cursor: default;
}

.noPlay {
  opacity: 0.5;
  cursor: default;

  &:hover {
    opacity: 0.5;
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
  padding: 0 4px 0 16px;
  transform: translateY(1px);
  box-sizing: border-box;
  border-left: 1px solid #666;

  p {
    opacity: 0.6;
    padding: 12px 12px 11px 12px;
  }

  a {
    color: #42b983;

    padding-left: 0px;
    opacity: 0.6;
    cursor: url("../assets/other/cursor.png"), pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
