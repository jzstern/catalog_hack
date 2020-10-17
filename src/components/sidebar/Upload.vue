<script>
/* eslint-disable */
export default {
  name: "Upload",
  data: () => ({
    title: null,
    description: null,
    price: null,
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    create() {
      if (this.price === 0) this.price = null;

      const item = {
        title: this.title,
        artist: this.user.name,
        description: this.description,
        price: this.price,
      };

      this.$store.commit("addToCatalog", item);

      // TODO - upload confirmation in sidebar w/ link to Catalog/song?
      // this.$store.commit('sidebar', {
      //   component: "Upload Confirmed"
      // })

      // ? do we route to the user's catalog after they upload a song?
      // if (this.$route.path !== `/${this.user.handle}`) this.$router.push(`/${this.user.handle}`);
    },
  },
};
</script>

<template>
  <div class="upload">
    <div class="form-item">
      <label>Title</label>
      <input v-model="title" placeholder="song name" type="text" required />
    </div>
    <div class="form-item">
      <label>Description</label>
      <input v-model="description" placeholder="song description" type="text" />
    </div>

    <div class="form-item">
      <label>Price (USD)</label>
      <input v-model="price" placeholder="$0+" type="number" />
    </div>

    <!-- <div class="form-item">
      <label>Thumbnail</label>
      <p>TODO - drag & drop thumbail</p>
    </div>

    <div class="form-item">
      <label>File</label>
      <p>TODO - drag & drop music/sample pack/etc</p>
    </div> -->

    <label>Collaborators (not yet supported)</label>

    <button class="buttonSecondary" @click="create">Create</button>
  </div>
</template>

<style lang="scss">
.upload {
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  font-family: Inconsolata;
}
</style>