<template>
<div class="container">
    <div class="register-form">
        <h1>Create an account</h1>
        <input type="text" v-model="nameRef" placeholder="Username">
        <input type="text" v-model="emailRef" placeholder="Email">
        <input type="password" v-model="passwordRef" placeholder="Password">
        <button class="register-button" @click='register()'>Register</button>
        <button @click="goToLogin()" class="login-button">Already have an account? Log in</button>
    </div>
</div>
</template>

<script>
//import firebase from 'firebase'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

export default {
    setup(){
        let nameRef = ref();
        let emailRef = ref();
        let passwordRef = ref();

        const router = useRouter();

        async function register(){
            /*firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(() => alert('Account Created!'))
            .catch(err => alert(err));*/
            const res = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({name: nameRef.value, email: emailRef.value, password: passwordRef.value})
            });

            const content = await res.json();
            
            if(res.status == 400){
                return alert(content.message);
            }

            alert('Account Created with ' + content.email);
            router.push('/login');
        }
        
        function goToLogin(){
            router.push('/login');
        }

        return{nameRef, emailRef, passwordRef, register, goToLogin}
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

.register-form{
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-self: center;
}

.register-form h1{
    margin-bottom: 10px;
    text-align: left;
}

.register-form input{
    margin-top: 10px;
    font-size: 16px;
    padding: 20px;
}

.register-button{
    width: 120px;
    height: 60px;
    margin: 10px 0 20px 0;
    background-color: rgb(30,30,30);
    color: white;
    border: solid; border-width: 1px; border-color: rgb(30,30,30);
    font-size: 16px;
    transition: 200ms;
}

.register-button:hover{
    background-color: white; color: black;
    cursor: pointer;
}

.login-button{
    border: none;
    background: white;
    font-size: 14px;
    cursor: pointer;
    text-align: left;
}
</style>
