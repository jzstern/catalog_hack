<script>
/* eslint-disable */
// when you define this component, use this v-if
// <MusicPlayer v-if="currentSong._id" />
export default {
  watch: {
    playing(newVal) {
      newVal ? this.$refs.song.play() : this.$refs.song.pause()
    }
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSong
    },
    playing() {
      return this.currentSong.playing
    },
    source() {
      return `https://creatornode2.audius.co/tracks/stream/${this.currentSong.id_audius}`
    }
  },
  methods: {
    navToSong() {
      this.$store.commit('sidebar', {
        component: "Item",
        item: this.currentSong
      })
    },
    togglePlaying() {
      // TODO - hide player if nothing has been played yet
      this.$store.commit('togglePlaying')
    }
  }
}
</script>

<template>
  <div class="music-player">
    <div class="card-info">
      <img
        v-if="currentSong.playing"
        class="play-pause"
        src="../../assets/other/pause.svg"
        @click="togglePlaying"
      >
      <img
        v-else
        class="play-pause"
        src="../../assets/other/play.svg"
        @click="togglePlaying"
      >
      <div>
        <p class="card-title" @click="navToSong">
          {{ currentSong.title }}
        </p>
        <audio ref="song" :src="source" />
        <router-link
          :to="`/${currentSong.artist.handle}`"
          class="card-artist"
        >
          {{ currentSong.artist.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<style lang="scss">

</style>