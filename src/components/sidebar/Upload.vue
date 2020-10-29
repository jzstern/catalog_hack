<script>
/* eslint-disable */
export default {
  name: "Upload",
  watch: {
    catalog(newVal) {
      if (newVal) {
        var track;
        if (this.track)
          track = newVal.find(
            (item) => item.id_audius === this.track.id_audius
          );
        if (this.track && newVal.length && track) {
          this.$store.commit("sidebar", {
            component: "Upload Complete",
            item: {
              ...this.track,
              _id: track._id,
              price: track.price,
            },
          });
        }
      }
    },
  },
  computed: {
    catalog() {
      return this.$store.state.user.catalog;
    },
    user() {
      return this.$store.state.user;
    },
  },
  data: () => ({
    creating: false,
    registering: false,
    artistTokenAddress: null,
    price: null,
    track: null, // full audius track
  }),
  methods: {
    create() {
      // this.track is all of the audius track data, we haven't created a textile item for it yet
      this.$store.dispatch("addItemToCatalog", {
        ...this.track,
        price: this.price,
      });
    },
    async registerArtistToken() {
      this.registering = true;
      this.artistTokenAddress = await this.$store.dispatch(
        "ethers/registerArtistToken"
      );
    },
  },
  async mounted() {
    this.$store.dispatch("getAudiusUploads", this.user.id_audius);

    const info = await this.$store.dispatch("ethers/getArtistInfo", this.user.wallet_addr_mm);
    if (info.registered) this.artistTokenAddress = info.token
    // this.artistTokenAddress = await this.$store.dispatch(
    //   "ethers/getArtistTokenAddress",
    //   this.user.wallet_addr_mm
    // );
  },
};
</script>

<template>
  <div class="upload">
    <div v-if="track">
      <div class="upload-confirm">
        <img :src="track.artwork['480x480']" class="upload-confirm-artwork" />
        <div class="track-info">
          <p class="upload-confirm-title">{{ track.title }}</p>
          <p class="upload-confirm-artist">
            song by
            <span class="artist-name"> {{ this.user.name }}</span>
          </p>
          <p>{{ track.description }}</p>
        </div>
      </div>

      <label>Price (USD)</label>
      <input v-model="price" placeholder="$0.00+" type="number" />
      <button
        :disabled="creating"
        :class="[{ disabled: creating }, 'buttonPrimary']"
        @click="create"
      >
        Create
      </button>
      <button
        :disabled="creating"
        class="buttonSecondary"
        @click="track = null"
      >
        Back
      </button>
    </div>

    <div v-else-if="!artistTokenAddress">
      <label>Create Artist Token</label>
      <p>
        Catalog empowers artists with greater control in monetizing their work
        and community through the use of artist tokens, which can be used to
        unlock rewards, exclusive content, and revenue share for your
        supporters.
      </p>
      <button
        :disabled="registering"
        :class="[{ disabled: registering }, 'buttonPrimary']"
        @click="registerArtistToken"
      >
        Register Token
      </button>
    </div>

    <div
      v-else
      v-for="item in user.uploads"
      :key="item.id_audius"
      @click="track = item"
    >
      <div class="upload-select">
        <img :src="item.artwork['480x480']" class="upload-artwork" />
        <div class="upload-track-info">
          <p>{{ item.title }}</p>
          <!-- <p>Duration: {{ item.duration }}s</p> -->
        </div>
      </div>
      <div class="divider"></div>
    </div>

    <label v-if="!user.uploads.length">No uploads to display</label>
  </div>
</template>

<style lang="scss">
.upload {
  display: flex;
  flex-direction: column;
  padding: 32px;
  box-sizing: border-box;
  font-family: SpaceGrotesk;
  font-size: 18px;
}

.upload-artwork {
  width: 100px;
  height: 100px;
}

.upload-select {
  display: flex;
  margin: 8px;
  cursor: url("../../assets/other/cursor.png"), pointer;
  &:hover {
    color: #f2ba00;
  }
}

.upload-track-info {
  padding-left: 16px;

  p {
    margin: 4px;
  }
}

.upload-confirm-artwork {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 2px;
}

.upload-confirm-title {
  font-family: "TenorSans", serif;
  font-size: 24px;
  margin: 12px 0;
}

.upload-confirm-artist {
  font-family: "TenorSans", serif;
  margin-top: 0;
}
</style>