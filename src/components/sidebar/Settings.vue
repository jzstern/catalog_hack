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
          {{ user.wallet_addr.substr(user.wallet_addr.length - 4) }}
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
            user.wallet_addr ? user.wallet_addr : "loading address..."
          }}
        </p>
      </div>
    </div>

    <div class="divider-2" />
    <div class="nav-item">
      <router-link :to="`/${this.user.wallet_addr}/upload`">
        upload ⟶
      </router-link>
    </div>

    <div class="nav-item">
      <router-link :to="`/${this.user.wallet_addr}/catalog`">
        your catalog ⟶
      </router-link>
    </div>

    <div class="nav-item">
      <router-link :to="`/${this.user.wallet_addr}/collection`">
        your collection ⟶
      </router-link>
    </div> -->

    <!-- <router-link :to="`/${this.usser.wallet_addr}`"> cancel </router-link> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>