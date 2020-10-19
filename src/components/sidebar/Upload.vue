<script>
/* eslint-disable */
export default {
  name: "Upload",
  watch: {
    catalog(newValue) {
      var track
      if (this.track) track = newValue.find(item => item.id_audius === this.track.id_audius)
      if (this.track && newValue.length && track) {
        this.track = {
          ...this.track,
          _id: track._id,
          price: track.price,
        }
        this.uploadConfirmed = true
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
    track: null,
    uploadConfirmed: false
  }),
  methods: {
    create() {
      const item = {
        id_audius: this.track.id_audius,
        artist: {
          _id: this.user._id,
          id_audius: this.user.id_audius,
          handle: this.user.handle,
          name: this.user.name,
        },
        price: this.price,
        purchased_by: {
          user_ids_audius: [],
          user_ids_textile: [],
        }
      };

      this.$store.dispatch("addItemToCatalog", item);

      // ? do we route to the user's catalog after they upload a song?
      // if (this.$route.path !== `/${this.user.handle}`) this.$router.push(`/${this.user.handle}`);
    },
    back() {
      this.uploadConfirmed = false
      this.track = null
    }
  },
  mounted() {
    this.$store.dispatch('getAudiusUploads', this.user.id_audius)
  }
};
</script>

<template>
  <div class="upload">
    <div v-if="track && !uploadConfirmed" class="form-item">
      <div class="selected-track">
        <img :src="track.artwork['480x480']" class="upload-artwork"/>
        <p>{{ track.title }}</p>
        <p>{{ track.description }}</p>
        <p>{{ track.duration }}</p>
      </div>

      <label>Price (USD)</label>
      <input v-model="price" placeholder="$0+" type="number" />
      <button :disabled="creating" class="buttonPrimary" @click="create">Create</button>
      <button :disabled="creating" class="buttonSecondary" @click="back">Back</button>
    </div>

    <div v-else-if="track && uploadConfirmed" class="form-item">
      <div class="selected-track">
        <img :src="track.artwork['480x480']" class="upload-artwork"/>
        <p>{{ track.title }}</p>
        <p>{{ track.description }}</p>
        <p>Duration: {{ track.duration }}s</p>
        <p>Price: {{ track.price }}</p>
      </div>

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
  padding: 0 32px;
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