<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>signup</h1>
    <h3>{{error}}</h3>
    <form @submit.prevent="newUser">
      name:
      <input type="text" v-model="name" />
      email:
      <input type="email" v-model="email" />
      password:
      <input type="password" v-model="password" />
      <button type="button" @click="newUser">send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    newUser() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$http.post("http://localhost:3000/newUser", user).then(
        () => {
          (this.error = ""), this.$router.push("/login");
        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
      (this.name = ""), (this.email = ""), (this.password = "");
    },
  },
};
</script>

<style scoped>
</style>
