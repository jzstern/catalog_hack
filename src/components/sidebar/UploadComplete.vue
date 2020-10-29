<script>
/* eslint-disable */
export default {
  name: "UploadComplete",
  computed: {
    item() {
      return this.$store.state.sidebar.item;
    },
    username() {
      return this.$store.state.user.name
    },
    path() {
      return this.$route.path;
    },
  },
  methods: {
    back(component) {
      this.uploadComplete = false;
      this.track = null;
      this.$store.commit("sidebar", { component, item: null });
    },
    closeSidebar() {
      if (this.path === '/') this.$store.commit("sidebar", {
        component: "Artist List",
        item: null
      });
      else this.$store.commit("closeSidebar");
    },
  },
};
</script>

<template>
  <div class="upload-complete">
    <div class="selected-track">
      <img :src="item.artwork['480x480']" class="upload-complete-artwork" />
      <p class="upload-complete-title">{{ item.title }}</p>
      <p class="upload-complete-artist">
        song by
        <span class="artist-name"> {{ username }}</span>
        {{ item.description }}
      </p>
      <!-- <p>Duration: {{ item.duration }}s</p> -->
      <p>Price: ${{ item.price }}</p>
    </div>

    <button class="buttonPrimary" @click="back('Upload')">
      Upload Another
    </button>
    <button class="buttonSecondary" @click="closeSidebar">Close</button>
  </div>
</template>

<style lang="scss">
.upload-complete {
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  font-family: Inconsolata;
}

.upload-complete-artwork {
  margin-top: 32px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 2px;
}

.upload-complete-title {
  font-family: "TenorSans", serif;
  font-size: 24px;
  margin: 12px 0;
}

.upload-complete-artist {
  font-family: "TenorSans", serif;
  margin-top: 0;
}
</style>