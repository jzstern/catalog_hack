<template>
  <div class="upload">
    <label>Title</label>
    <input v-model="title" placeholder="cool song name" type="text">

    <label>Description</label>
    <input v-model="description" placeholder="description for your cool song" type="text">

    <label>Price (USD)</label>
    <input v-model="price" placeholder="$1" type="number">

    <label>Thumbnail</label>
    <p>TODO - drag & drop thumbail</p>

    <label>File</label>
    <p>TODO - drag & drop music/sample pack/etc</p>

    <label>Collaborators (not yet supported)</label>

    <button @click="create">Create</button>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data: () => ({
    title: null,
    description: null,
    price: null
  }),
  methods: {
    create() {
      console.log('uploading shit')
    }
  }
}
</script>

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
