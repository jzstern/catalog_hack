<script>
/* eslint-disable */
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ownedByUser() {
      return this.$store.state.user.collection.find(
        (item) => item.id === this.item.id
      );
    },
    pathContainsCollection() {
      return this.$route.path.includes("collection");
    },
  },
  methods: {
    selectItem() {
      // TODO - don't open sidebar if artist name was clicked
      this.$store.commit("sidebar", {
        component: "Item",
        item: this.item,
      });
    },
  },
};
</script>

<template>
  <div class="item-card" @click="selectItem">
    <img class="card-artwork" :src="item.artwork['480x480']" />
    <p class="title">{{ item.title }}</p>
    <router-link
      :to="`/${item.artistHandle}`"
      v-if="!ownedByUser"
      class="artist"
      >{{ item.artist }}</router-link
    >
    <!-- <p v-if="!ownedByUser" class="artist">{{ item.artist }}</p> -->
    <!-- <p>{{ item.description }}</p> -->
    <p class="price" v-if="!pathContainsCollection || !ownedByUser">
      {{ item.price ? `$${item.price}` : "Name your price" }}
    </p>
    <p v-else>u own this 💪🏼</p>
  </div>
</template>

<style lang="scss" scoped>
.item-card {
  position: relative;
  z-index: 100;
  &:hover {
    cursor: url("../../assets/other/cursor.png"), pointer;
    transform: scale(0.995);
    opacity: 0.8;
  }
}

.item-card::before {
  content: "";
  display: block;
  // padding-top: 100%;
}

.artist {
  // color: red;
  &:hover {
    color: pink;
  }
}

.card-artwork {
  width: 100%;
  border-radius: 1px;
}
</style>