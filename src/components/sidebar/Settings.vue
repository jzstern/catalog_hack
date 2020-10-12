<template>
  <div class="info">
    settings
    <!-- <div v-if="!editing">
      <div class="info-item mod-box">
        <div>
          <p class="label">
            Username
          </p>
          <p class="field">
            {{ user.name ? user.name : "press edit button" }}
          </p>
        </div>
        <div>
          <p
            class="mod edit"
            @click="editing = true"
          >
            edit
          </p>
        </div>
      </div>
      <div class="info-item">
        <p class="label">
          ETH Address
        </p>
        <p class="field">
          {{ user.walletAddress.substr(user.walletAddress.length - 4) }}
        </p>
      </div>
    </div>

    <div v-else>
      <div class="info-item">
        <p class="label">
          Email Address
        </p>
        <p class="field">
          {{ user.email ? user.email : "loading email..." }}
        </p>
      </div>
      <div class="info-item mod-box">
        <div>
          <p class="label">
            Name
          </p>
          <input
            v-model="name"
            class="field"
          >
        </div>
        <div>
          <p
            class="mod"
            @click="save"
          >
            save
          </p>
        </div>
      </div>
      <div class="info-item">
        <p class="label">
          ETH Address
        </p>
        <p class="field">
          {{
            user.walletAddress ? user.walletAddress : "loading address..."
          }}
        </p>
      </div>
    </div>

    <div class="divider-2" />
    <div class="nav-item">
      <router-link :to="`/${this.user.walletAddress}/upload`">
        upload ⟶
      </router-link>
    </div>

    <div class="nav-item">
      <router-link :to="`/${this.user.walletAddress}/catalog`">
        your catalog ⟶
      </router-link>
    </div>

    <div class="nav-item">
      <router-link :to="`/${this.user.walletAddress}/collection`">
        your collection ⟶
      </router-link>
    </div> -->

    <!-- <router-link :to="`/${this.usser.walletAddress}`"> cancel </router-link> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>