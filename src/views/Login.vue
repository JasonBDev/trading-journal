<template>
<div class="container">
    <div class="login-form">
        <h1>Login</h1>
        <input type="text" v-model="emailRef" placeholder="Email">
        <input v-on:keyup.enter="login" type="password" v-model="passwordRef" placeholder="Password">
        <button class="login-button" @click='login'>Log in</button>
        <button class="register-button" @click="goToRegister">Need an account? Create an account</button>
    </div>
</div>

</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
    name: 'Login',
    setup(){
        const emailRef = ref('')
        const passwordRef = ref('')
        const router = useRouter();
        const store = useStore();

        async function login(){
            const res = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({email: emailRef.value, password: passwordRef.value})
            });

            const content = await res.json();

            if(res.status == 400){
                return alert(content.message);
            }else{
                await store.commit('setAuth', true);
                await store.commit('setName', content.name);
                router.push('/')
            }
        }

        function goToRegister(){
            router.push('/register')
        }

        return{login, goToRegister, emailRef, passwordRef}
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    display: flex;
    display: flex;
    justify-content: center;
}

.login-form{
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-self: center;
}

.login-form h1{
    margin-bottom: 10px;
    text-align: left;
}

.login-form input{
    margin-top: 10px;
    font-size: 16px;
    padding: 20px;
}

.login-button{
    width: 120px;
    height: 60px;
    margin: 10px 0 20px 0;
    color: white;
    border: solid; border-width: 1px; border-color: rgb(30,30,30);
    font-size: 16px;
    background: rgb(30,30,30);
    transition: 200ms ease-in-out;
}

.login-button:hover{
    cursor: pointer;
    background: white;
    color: black;
}

.register-button{
    border: none;
    background: white;
    font-size: 14px;
    cursor: pointer;
    text-align: left;
}
</style>
