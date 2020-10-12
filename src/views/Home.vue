<script>
/* eslint-disable */
import router from "../router/index"
  
export default {
  name: "Home",
  mounted() {
    this.$store.commit('sidebar', 'Browse Artists')
  }
};
</script>

<template>
  <div class="home">
    we are catalog this is what we do
  </div>
</template>

<style lang="scss">
.home {
  display: flex;
  height: 100%;
  // overflow: hidden;
  background-image: url("../assets/other/bgHome.png");
  background-repeat: no-repeat;
}

.header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: black;
  display: flex;
  align-items: center;
  height: 85px;
  box-sizing: border-box;
  border-bottom: 2px solid #666666;
  z-index: 200;
}

.login {
  font-family: "Inconsolata-ExtraBold", sans-serif;

  position: absolute;
  top: 22px;
  right: 24px;
  color: #ffcf2e;
  border-radius: 4px;
  padding: 8px 12px 9px 12px;
  box-sizing: border-box;

  &:hover {
    // color: black;
    box-sizing: border-box;

    border: 1px solid #ffcf2e;
    cursor: url("../assets/other/cursor.png"), auto;
  }
}
</style>
