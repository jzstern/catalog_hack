<script>
/* eslint-disable */
import { mapState } from "vuex";

export default {
  name: "UserDashboard",
  computed: {
    formattedWalletAddr() {
      return (
        this.user.wallet_addr.substring(0, 4) +
        "..." +
        this.user.wallet_addr.substring(this.user.wallet_addr.length - 4)
      );
    },
    ...mapState({
      balanceDai: (state) => state.ethers.balanceDai,
      balanceEth: (state) => state.ethers.balance,
      user: "user",
    }),
  },
  data: () => ({
    artistTokenBalances: [],
  }),
  methods: {
    async mintDai() {
      await this.$store.dispatch("ethers/mintDai");
      alert("minted 100 totally not fake DAI");
    },
    async stake(artistWalletAddr) {
      this.$store.dispatch('ethers/stake', artistWalletAddr)
    },
    async constructTokenBalances() {
      console.log("constructing token balances...");

      // Get all artists from your collection
      const artists = this.$store.state.user.collection.map(
        (item) => item.artist
      );

      // Remove duplicate artists 
      const uniqueArtists = artists.reduce((acc, current) => {
        const x = acc.find((item) => item.id_audius === current.id_audius);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      console.log({uniqueArtists})

      // GET THE TOKEN ADDRESSES FOR EACH METAMASK ADDR
      let artist_token_addresses0 = await Promise.all(
        uniqueArtists.map(async (artist) => {
          const artistTokenAddress = await this.$store.dispatch(
            "ethers/getArtistTokenAddress",
            artist.wallet_addr_mm
          );
          return {
            ...artist,
            artistTokenAddress
          };
        })
      );

      console.log({artist_token_addresses0})

      // Filter out null vals for artistTokenaddress - null vals are mm_addresses that have not deployed an artist token
      artist_token_addresses0 = artist_token_addresses0.filter(
        ({artistTokenAddress}) => artistTokenAddress !== null
      );

      console.log({artist_token_addresses0})

      // USE THE ARTIST TOKEN ADDRESSES TO QUERY THE BALANCE
      const artist_token_balances0 = await Promise.all(
        artist_token_addresses0.map(async (artist) => {
          const balanceOfToken = await this.$store.dispatch(
            "ethers/getArtistTokenBalanceOfUser",
            artist.artistTokenAddress
          );
          return { ...artist, balanceOfToken };
        })
      );

      this.artistTokenBalances = artist_token_balances0
    },
  },
  beforeMount() {
    this.constructTokenBalances()
  }
};
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
    <br />
    <br />
    
    <div class="artist-tokens" v-for="token in artistTokenBalances" :key="token.artistTokenAddress">
      <label>{{ token.name }}</label>
      <p class="field">{{ token.balanceOfToken }}</p>
      <p class="field">{{ token.artistTokenAddress }}</p>

      <button :class="[{ disabled: !Number(token.balanceOfToken) }, 'buttonPrimary']" @click="stake(token.wallet_addr_mm)" :disabled="!Number(token.balanceOfToken)">Stake</button>
        <br />
        <br />
        <br />
    </div>
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
  overflow-wrap: anywhere;
}
</style>