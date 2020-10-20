<script>
/* eslint-disable */
export default {
  name: "UploadConfirmed",
  computed: {
    item() {
      return this.$store.state.sidebar.item
    }
  },
  methods: {
    back(component) {
      this.uploadConfirmed = false
      this.track = null
      this.$store.commit('sidebar', { component, item: null })
    },
  }
};
</script>

<template>
  <div class="upload-confirmed">
    <div class="selected-track">
      <img :src="item.artwork['480x480']" class="upload-artwork"/>
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
      <p>Duration: {{ item.duration }}s</p>
      <p>Price: {{ item.price }}</p>
    </div>

    <button class="buttonPrimary" @click="back('Upload')">Upload More</button>
    <button class="buttonSecondary" @click="back('Account')">Account</button>
  </div>
</template>

<style lang="scss">
.upload-confirmed {
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  font-family: Inconsolata;
}

.upload-artwork {
  width: 300px;
  height: 300px;
}
</style>