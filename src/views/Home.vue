<template>
  <div class="home">
    <div class="browse">
      <div class="header">
        <img class="logo" src="../assets/other/catalog.svg" />
        <h1 class="title">CATALOG</h1>
      </div>
      <div class="artist-list">
        <ul>
          <li class="artist">appa</li>
          <li class="artist">crown comfort</li>
          <li class="artist">Cam O'bi</li>
          <li class="artist">drumloop</li>
          <li class="artist">feewet</li>
          <li class="artist">g l u e 7 0</li>
          <li class="artist">gohda</li>
          <li class="artist">KMB</li>
          <li class="artist">Melo-Zed</li>
          <li class="artist">MssingNo</li>
          <li class="artist">pandi</li>
          <li class="artist">Omari Jazz</li>
          <li class="artist">sharad</li>
          <li class="artist">WISHNOMORE</li>
          <li class="artist">quickly, quickly</li>
        </ul>
      </div>
    </div>
    <div class="about">
      <p class="login">log in</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "Home",
};
</script>

<style lang="scss">
ul {
  padding: 0px;
}

.home {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.about {
  position: relative;
  height: 100vh;
  background-repeat: no-repeat;
  flex: auto;
  background-image: url("../assets/other/about.png");
  border-left: 2px solid #666666;
  box-sizing: border-box;
}

.artist-list {
  padding: 0px 24px;
}

.artist {
  font-family: "Inconsolata", sans-serif;

  list-style-type: none;
  height: 60px;
  border-bottom: 1px solid #4e3e5b;
  line-height: 60px;
  padding: 0px 4px;
}

.browse {
  width: 24%;
  flex: initial;
  height: 100%;
  overflow: scroll;
}

.header {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: black;
  display: flex;
  align-items: center;
  height: 90px;
  box-sizing: border-box;
  border-bottom: 2px solid #666666;
}

.login {
  font-family: "Inconsolata-ExtraBold", sans-serif;

  position: absolute;
  top: 16px;
  right: 24px;
  color: #ffcf2e;
  border: 2px solid #ffcf2e;
  border-radius: 4px;
  padding: 8px 12px 9px 12px;

  &:hover {
    color: black;
    background-color: #ffcf2e;
    cursor: pointer;
  }
}

.logo {
  margin: 0px 16px 0px 24px;
}

.title {
  font-family: "Tenor Sans", sans-serif;
  font-size: 24px;
  vertical-align: middle;
  letter-spacing: 0.05em;
}
</style>
