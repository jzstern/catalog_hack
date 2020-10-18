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

      this.$store.dispatch('getTrackSrc', this.item.id)
    },
  },
};
</script>

<template>
  <div class="item-card" @click="selectItem">
    <img class="artwork" :src="item.artwork['480x480']" />
    <p>{{ item.title }}</p>
    <router-link
      :to="`/${item.artistHandle}`"
      v-if="!ownedByUser"
      class="artist"
      >{{ item.artist }}</router-link
    >
    <!-- <p v-if="!ownedByUser" class="artist">{{ item.artist }}</p> -->
    <p>{{ item.description }}</p>
    <p v-if="!pathContainsCollection || !ownedByUser">
      {{ item.price ? `$${item.price}` : "Name your price" }}
    </p>
    <p v-else>u own this 💪🏼</p>
  </div>
</template>

<style lang="scss" scoped>
.item-card {
  max-width: 200px;
  margin-bottom: 20px;
  border: 1px solid gray;
  &:hover {
    cursor: url("../../assets/other/cursor.png"), pointer;
    opacity: 50%;
  }
}

.artist {
  // color: red;
  &:hover {
    color: pink;
  }
}

.artwork {
  width: 400px;
  height: 400px;
}
</style>