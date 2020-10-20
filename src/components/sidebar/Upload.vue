<script>
/* eslint-disable */
export default {
  name: "Upload",
  watch: {
    catalog(newVal) {
      if (newVal) {
        console.log("NEW THING ADDED TO CATALOG");
        console.log(newVal);
        var track
        if (this.track) track = newVal.find(item => item.id_audius === this.track.id_audius)
        if (this.track && newVal.length && track) {
          this.$store.commit('sidebar', {
            component: "Upload Confirmed",
            item: {
              ...this.track,
              _id: track._id,
              price: track.price,
            }
          })
        }
      }
    }
  },
  computed: {
    catalog() {
      return this.$store.state.user.catalog
    },
    user() {
      return this.$store.state.user;
    },
  },
  data: () => ({
    creating: false,
    price: null,
    track: null, // full audius track
  }),
  methods: {
    create() {
      console.log("this.track");
      console.log(this.track);
      this.$store.dispatch("addItemToCatalog", this.track);

      // ? do we route to the user's catalog after they upload a song?
      // if (this.$route.path !== `/${this.user.handle}`) this.$router.push(`/${this.user.handle}`);
    }
  },
  mounted() {
    this.$store.dispatch('getAudiusUploads', this.user.id_audius)
  }
};
</script>

<template>
  <div class="upload">
    <div v-if="track" class="form-item">
      <div class="selected-track">
        <img :src="track.artwork['480x480']" class="upload-artwork"/>
        <p>{{ track.title }}</p>
        <p>{{ track.description }}</p>
        <p>{{ track.duration }}</p>
      </div>

      <label>Price (USD)</label>
      <input v-model="price" placeholder="$0+" type="number" />
      <button :disabled="creating" class="buttonPrimary" @click="create">Create</button>
      <button :disabled="creating" class="buttonSecondary" @click="track = null">Back</button>
    </div>

    <div v-else v-for="item in user.uploads" :key="item.id_audius" @click="track = item" class="unselected-track">
      <img :src="item.artwork['480x480']" class="upload-artwork"/>
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
      <p>Duration: {{ item.duration }}s</p>
    </div>
  </div>
</template>

<style lang="scss">
.upload {
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  font-family: Inconsolata;
}

.upload-artwork {
  width: 300px;
  height: 300px;
}

.unselected-track {
  border: 1px solid gray;
  &:hover {
    opacity: .5;
  }
}
</style>