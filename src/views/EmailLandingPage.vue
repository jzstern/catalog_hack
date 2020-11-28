<template>
  <div class="email-landing-page">
    <!-- <h1>Catalog</h1> -->
    <img class="catalog-logo" src="../assets/other/catalog.svg" />
    <p>A better place to sell music</p>

    <div :class="[{ invalid: !validInput }, 'email-input']">
      <input v-model="email" type="email" required placeholder="Enter email" />
      <button @click="addEmail">→</button>
    </div>

    <p v-if="success">
      Successfully submitted. We'll keep you updated.
    </p>
    <div class="social-container">
      <a class="social" href="https://discord.gg/YBzUcah" target="_blank">
        Discord</a
      >
      <a class="social" href="https://twitter.com/catalogworks" target="_blank"
        >Twitter</a
      >
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data: () => ({
    email: null,
    submitted: false,
    success: false
  }),
  computed: {
    validInput() {
      if (!this.submitted) return true;
      if (this.validRegex(this.email)) return true;
      return false;
    }
  },
  methods: {
    async addEmail() {
      this.submitted = true;
      if (!this.validInput) return;

      const url =
        "https://api.sheety.co/b20c8459a3d5f2418b0dbcb48a8ca2ef/catalog/emails";
      const body = { email: { email: this.email } };

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(json => {
          console.log(json.email);
          this.success = true;
        })
        .catch(error => console.error(error));
    },
    validRegex(email) {
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return mailFormat.test(email);
    }
  }
};
</script>

<style lang="scss">
button {
  background: none;
  border: none;
  font-size: 20px;
  opacity: 0.5;
  padding-right: 12px;
  color: white;
  font-family: SpaceGrotesk;
  cursor: url("../assets/other/cursor.png"), pointer;

  &:hover {
    opacity: 1;
  }
}

p {
  margin: 25px;
  font-size: 17px;
}

.catalog-logo {
  width: 125px;
}

.arrow {
  margin-right: 50px;
}
.email-landing-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: SpaceGrotesk;
  font-weight: 500;
}

.email-input {
  display: flex;
  flex-direction: row;
  width: 300px;
  font-family: SpaceGrotesk;
  border: 1px solid grey;
  padding: 2px;
}

input {
  flex-grow: 2;
  border: none;
  margin: 0;
  font-family: SpaceGrotesk;
}

input:focus {
  outline: none;
}

.invalid {
  border: 1px solid #9f2d2e;
}

.submit-email {
  width: 200px;
}

.social-container {
  position: absolute;
  bottom: 25px;
  display: flex;
}

.social {
  opacity: 0.5;
  margin-left: 20px;
  &:hover {
    opacity: 1;
    color: #f2ba00;
  }
}
</style>