<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>login</h1>
    <h3>{{error}}</h3>
    <form>
      email:
      <input type="email" v-model="email" />
      password:
      <input type="password" v-model="password" />
      <button type="button" @click="conect">send</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    conect() {
      const user = {
        email: this.email,
        password: this.password,
      }
      this.$http.post("http://localhost:3000/login", user)
      .then (res => {
        if(res.status === 200){
            (this.email = ""), (this.password = "");
           localStorage.setItem("token", res.data.token);
           this.$router.push("/landing");
        }
      }, err => {
          console.log(err) 
      })
    },
  },
};
</script>