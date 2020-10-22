<template>
  <div>
    <ul v-if="artists.length" class="artist-list no-select">
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
    <p v-else class="no-tracks">loading artists...</p>
  </div>
</template>

<script>
/* eslint-disable */
import { ARTISTS } from "../../store/constants";
export default {
  computed: {
    artists() {
      return this.$store.state.artistList;
    },
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
  font-family: "Supply", sans-serif;
  font-weight: 500;
  list-style-type: none;
  color: rgba(255, 255, 255, 0.6);
  height: 60px;
  line-height: 60px;
  font-size: 14px;

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