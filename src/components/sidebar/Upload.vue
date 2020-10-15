<script>
import router from "../../router/index"
export default {
  name: 'Upload',
  data: () => ({
    title: null,
    description: null,
    price: null
  }),
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    create() {
      if (this.price === 0) this.price = null
      const item = {
        title: this.title,
        artist: this.user.name,
        description: this.description,
        price: this.price
      }
      this.$store.commit('addToCatalog', item)
      if (router.currentRoute.fullPath !== `/${this.user.handle}`) router.push(`/${this.user.handle}`)
      // open song in sidebar
    }
  }
}
</script>

<template>
  <div class="upload">
    <label>Title</label>
    <input
      v-model="title"
      placeholder="cool song name"
      type="text"
      required
    >

    <label>Description</label>
    <input
      v-model="description"
      placeholder="description for your cool song"
      type="text"
    >

    <label>Price (USD)</label>
    <input
      v-model.number="price"
      placeholder="$1"
      type="number"
    >

    <label>Thumbnail</label>
    <p>TODO - drag & drop thumbail</p>

    <label>File</label>
    <p>TODO - drag & drop music/sample pack/etc</p>

    <label>Collaborators (not yet supported)</label>

    <button @click="create">
      Create
    </button>
  </div>
</template>

<style lang="scss">
.upload {
  display: flex;
  flex-direction: column;
}

input {
  max-width: 400px;
  margin-bottom: 20px;
}

button {
  max-width: 80px;
}
</style>