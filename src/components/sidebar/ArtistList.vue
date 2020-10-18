<template>
  <ul class="artist-list no-select">
    <router-link
      v-for="artist in artists"
      :key="artist.name"
      :to="'/' + artist.handle"
      class="artist"
    >
      <li class="artist">
        {{ artist.name }}
        <div class="list-divider" />
      </li>
    </router-link>
  </ul>
</template>

<script>
/* eslint-disable */
import { ARTISTS } from "../../store/constants";
export default {
  data: () => ({
    artists: [],
  }),
  mounted() {
    this.artists = ARTISTS;
  },
};
</script>

<style lang="scss">
.artist-list {
  margin-top: 0;
  padding: 16px 32px;
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
    color: #f2ba00;
  }

  &:active {
    transform-origin: left center;
    transform: scale(0.98);
  }
}

.list-divider {
  border-bottom: 1px solid #4e3e5b;
}
</style>