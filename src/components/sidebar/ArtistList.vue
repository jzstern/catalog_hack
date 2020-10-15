<template>
  <ul class="artist-list no-select">
    <router-link
      v-for="artist in artists"
      :key="artist.name"
      :to="'/' + artist.url"
      class="artist"
    >
      <li class="artist">
        {{ artist.name }}
        <div class="divider" />
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  /* eslint-disable */

  data: () => ({
    artists: [],
  }),
  mounted() {
    // TODO - fetch artist list
    this.artists = [
      { name: "appa", url: "appa" },
      { name: "chromonicci", url: "chromonicci" },
      { name: "crown comfort", url: "crowncomfort" },
      { name: "drumloop", url: "drumloop" },
      { name: "feewet", url: "feewet" },
      { name: "g l u e 7 0", url: "glue70" },
      { name: "gohda", url: "gohda" },
      { name: "KMB", url: "kmb" },
      { name: "Melo-Zed", url: "melozed" },
      { name: "MssingNo", url: "mssingno" },
      { name: "pandi", url: "pandi" },
      { name: "Omari Jazz", url: "omarijazz" },
      { name: "sharad", url: "sharad" },
      { name: "WISHNOMORE", url: "wishnomore" },
      { name: "quickly, quickly", url: "quicklyquickly" },
    ];
  },
};
</script>

<style lang="scss">
.artist-list {
  margin-top: 0;
  padding: 0 24px;
  list-style-type: none;
}

.artist {
  font-family: "Inconsolata", sans-serif;
  list-style-type: none;
  color: white;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  opacity: 0.8;
  cursor: url("../../assets/other/cursor.png"), pointer;

  &:hover {
    color: #ffcf2e;
  }

  &:active {
    transform-origin: left center;
    transform: scale(0.98);
  }
}

.divider {
  border-bottom: 1px solid #4e3e5b;
}
</style>