<script>
import router from '@/router/index'

export default {
  name: 'User',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data: () => ({
    artist: null,
    editing: false,
    loading: false,
    name: '',
    uploading: false
  }),
  methods: {
    async logout() {
      this.$store.dispatch('logout')
      router.push('login')
    },
    save() {
      this.$store.commit('user', {
        ...this.user,
        name: this.name
      })
      this.editing = false
    },
    upload() {
      router.push(`/${this.user.walletAddress}/upload`)
      this.uploading = true
    },
    cancelUpload() {
      router.push(`/${this.user.walletAddress}`)
      this.uploading = false
    },
    catalog() {
      router.push(`/${this.user.walletAddress}/catalog`)
      // this.catalog = true;
    }
  }
}
</script>

<template>
<div class="user">
  <button @click="logout">Logout</button>

  <div v-if="!editing">
    <h1>Current user: {{ user.email ? user.email : 'loading email...'}}</h1>
    <h2>Name: {{ user.name ? user.name : '[click edit to add a username]' }}</h2>
    <h2>ETH Address: {{ user.walletAddress ? user.walletAddress : 'loading address...'}}</h2>
    <button @click="editing = true">Edit</button>
  </div>

  <div v-else>
    <h1>Current user: {{ user.email ? user.email : 'loading email...'}}</h1>
    <h2>Name: {{ user.name ? user.name : '' }}</h2>
    <input v-model="name">
    <h2>ETH Address: {{ user.walletAddress ? user.walletAddress : 'loading address...'}}</h2>
    <button @click="save">Save</button>
    <!-- TODO - let users update their URL -->
  </div>

  <br/>
  <br/>

  <router-link :to="`/${this.user.walletAddress}/upload`" >Upload</router-link>
  <br/>
  <br/>

  <router-link :to="`/${this.user.walletAddress}/catalog`" >Catalog</router-link>
  <br/>
  <br/>

  <router-link :to="`/${this.user.walletAddress}/collection`" >Collection</router-link>
  <br/>
  <br/>

  <router-link :to="`/${this.user.walletAddress}`" >cancel</router-link>
  <br/>
  <br/>

  <router-view></router-view>
</div>
</template>

<style lang="scss">
</style>
