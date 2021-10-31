<template>
  <div class="container">
    <div id="nav">
      <div class="left-nav">
        <div @click="goToHome"><h1>SR</h1></div>
        <router-link v-if="auth_status" to="/">Dashboard</router-link>
        <p v-if="auth_status">/</p>
        <router-link v-if="auth_status" to="/statistics">Statistics</router-link>
        <p v-if="auth_status">/</p>
        <router-link v-if="auth_status" to="/social">Social</router-link>
        <router-link v-if="!auth_status" to="/login">Login</router-link>
        <p v-if="!auth_status">/</p>
        <router-link v-if="!auth_status" to="/register">Register</router-link>
      </div>
      <div class="right-nav">
        <p>{{username}}</p>
        <button v-if="auth_status" @click="logout()"><span class="material-icons md-18">logout</span></button>
      </div>

      <Profile />
    </div>
    <router-view/>

    <Footer />
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore} from 'vuex'
import Footer from "./components/Footer.vue"
import Profile from './components/Profile.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Profile
  },
  setup(){
    const loggedIn = ref(false);
    const router = useRouter();
    const username = computed(() => store.state.name);
    const store = useStore();

    var auth_status = computed(() => store.state.auth_status);

    function goToHome(){
      if(computed(() => store.state.auth_status).value === true){
        router.push('/');
      }
    }

    async function logout(){

      const res = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const content = await res.json();
      alert(content.message);
      router.push('/login');
      store.commit('setAuth', false);
      store.commit('setName', '');
    }

    onBeforeMount(async () => {
      //Fix this code and make it one request
      const res = await fetch('http://localhost:8000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      const content = await res.json();

      if(content.message == 'auth'){
        store.commit('setAuth', true);
      }

      if(computed(() => store.state.auth_status).value === false){
        router.push('/login');
      }

      const res2 = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        credentials: 'include'
      });

      const name = await res2.json();

      await store.commit('setName', name.name);
    })

    return{ loggedIn, logout, username, goToHome, auth_status}
  }
}
</script>
<style>

*{
  font-family: 'Inter', sans-serif;
  padding: 0; margin: 0;
}

.container{
  height: 100%;
  width: 60%;
  min-width: 740px;
}

.right-nav{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-nav p{
  margin-right: 20px;
  cursor:pointer;
  padding-bottom: 8px; margin-bottom: -8px;
  transition: 200ms;
  border-bottom: solid; border-color: white; border-width: 1px;
}

.right-nav p:hover{
  border-bottom: solid; border-color: rgb(30,30,30); border-width: 1px;
}

.right-nav button{
  height: 48px;
  width: 48px;
}

.left-nav{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left-nav div{
  background-color: rgb(30,30,30);
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 20px;
  display: flex;
  justify-content: center; align-items: center;
  cursor: pointer;
}

.left-nav div h1{
  color: white;
  font-weight: 900;
  font-size: 30px;
  margin-top: -2px;
}

.svg-class{
  color: black;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}

#nav {
  padding: 30px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0 00px 0;
  border-bottom: solid; border-width: 1px; border-color: rgb(230,230,230);
}

#nav a {
  color: black;
  border-bottom: solid;
  border-width: 1px;
  border-color: white;
  padding: 8px 10px 8px 10px;
  margin: 20px;
  text-decoration: none;
  font-size: 15px;
  transition: 200ms;
}

#nav a.router-link-active{
  border-color: rgb(0,125,255)
}

#nav a:hover{
  border-color: black;
}

#nav button{
  color: white;
  border: solid;
  border-radius: 5px;
  border-width: 1px;
  padding: 10px;
  font-size: 15px;
  background-color: rgb(30,30,30); 
  text-decoration: none;
  cursor: pointer;
  transition: 200ms;
}

#nav button:hover{
  background-color: rgb(60,60,60); 
}


</style>
