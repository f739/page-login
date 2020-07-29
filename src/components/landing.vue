<template>
  <div>
    <h1>hallo {{name}}</h1>
    <h2>your email: {{email}}</h2>
    <button @click="clearItem">logout</button>
  </div>
</template>
<script>
export default {
  name: "landing",
  data() {
    return {
        name: "",
        email:""
    };
  },
  created(){
      if (localStorage.getItem("token") === null){
          this.$router.push("/login")
      }
  },
  mounted() {
      this.$http.get("http://localhost:3000/user", {headers: {token: localStorage.getItem("token")}})
      .then( res => {
          this.name = res.data.user.name,
          this.email = res.data.user.email
      })
  },
  methods: {
      clearItem(){
          localStorage.clear();
          alert("disconect")
           this.$router.push("/login")
      }
  },
};
</script>