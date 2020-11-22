<template>
  <div class="email-landing-page">
    <h1>Catalog</h1>
    <p>We're building the evolution of the digital record store</p>
    <br>
    <input
      v-model="email"
      type="email"
      required
      placeholder="stwo@gmail.com"
      :class="[{ invalid: !validInput }, 'email-input']"
    >
    <button
      class="buttonPrimary submit-email"
      @click="addEmail"
    >
      Submit
    </button>
    <br>

    <p v-if="success">
      Successfully submitted. Keep your eyes peeled
    </p>
    <br>
    <br>
    <br>
    <a
      href="https://discord.gg/YBzUcah"
      target="_blank"
    >Discord</a>
    <br>
    <a
      href="https://twitter.com/catalogworks"
      target="_blank"
    >Twitter</a>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    submitted: false,
    success: false
  }),
  computed: {
    validInput() {
      if (!this.submitted) return true
      if (this.validRegex(this.email)) return true
      return false
    }
  },
  methods: {
    async addEmail() {
      this.submitted = true
      if (!this.validInput) return

      const url = 'https://api.sheety.co/b20c8459a3d5f2418b0dbcb48a8ca2ef/catalog/emails'
      const body = { email: { email: this.email } }
      
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then((response) => response.json())
      .then(json => {
        console.log(json.email)
        this.success = true
      })
      .catch(error => console.error(error))
    },
    validRegex(email) {
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return mailFormat.test(email)
    }
  }
}
</script>

<style lang="scss">
.email-landing-page {
  width: 100vw;
  height: 100vh;
}

.email-input {
  width: 400px;
  margin-right: 20px;
}

.invalid { 
  border: 1px solid red;
}

.submit-email {
  width: 200px;
}
</style>