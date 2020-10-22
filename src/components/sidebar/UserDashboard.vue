<script>
/* eslint-disable */
import { mapState } from "vuex"

export default {
  name: "UserDashboard",
  computed: {
    formattedWalletAddr() {
      return (this.user.wallet_addr.substring(0, 4) + "..." + this.user.wallet_addr.substring(this.user.wallet_addr.length - 4))
    },
    ...mapState({
      balanceDai: state => state.ethers.balanceDai,
      balanceEth: state => state.ethers.balance,
      user: "user"
    })
  },
  methods: {
    async mintDai() {
      await this.$store.dispatch('ethers/mintDai')
      alert('minted 100 totally not fake DAI')
    },
    async constructTokenBalances() {
      console.log('constructing token balances...')

      // GET THE UNIQUE METAMASK ADDRs OF ARTISTS IN YOUR COLLECTION
      let mm_address_set = new Set()
      this.$store.state.user.collection.forEach(item => mm_address_set.add(item.artist.wallet_addr_mm))
      const artist_mm_addresses = Array.from(mm_address_set)

      console.log({artist_mm_addresses})

      // GET THE TOKEN ADDRESSES FOR EACH METAMASK ADDR
      let artist_token_addresses = await Promise.all(artist_mm_addresses.map(async mm_addr => {
        const artistTokenAddress =  await this.$store.dispatch('ethers/getArtistTokenAddress', mm_addr)
        return artistTokenAddress
      }))

      // Filter out null vals - null vals are mm_addresses that have not deployed an artist token
      artist_token_addresses = artist_token_addresses.filter(el => el !== null)

      console.log({artist_token_addresses})

      // USE THE ARTIST TOKEN ADDRESSES TO QUERY THE BALANCE
      artist_token_addresses.map(async tokenAddr => {
        await this.$store.dispatch('ethers/getArtistTokenBalanceOfUser', tokenAddr)
      })

    }
  },
  async mounted() {
    console.log('MOUNTED!')
    await this.constructTokenBalances()
  }
}
</script>

<template>
  <div class="user-dashboard">
    <div class="account-item mint">
      <label @click="mintDai">Dai Balance (click to mint)</label>
      <p class="field">{{ balanceDai }}</p>
    </div>

    <div class="account-item">
      <label>ETH Balance</label>
      <p class="field">{{ balanceEth }}</p>
    </div>

    <label>Artist Tokens</label>
  </div>
</template>

<style lang="scss">
.user-dashboard {
  font-family: Inconsolata;
  padding: 16px 32px;
}

.account-item {
  padding: 16px 0 12px 0;
}

.field {
  margin-top: 8px;
}
</style>