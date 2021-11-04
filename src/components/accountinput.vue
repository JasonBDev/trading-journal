<template>
<div class="container">
    <div class="input-form">
        <p>Account Name</p>
        <div class="input-div">
            <input v-on:keyup.enter="createAccount" v-model="name" type="text" placeholder="Name">
            <button @click="createAccount"><span class="material-icons md-18">add</span></button>
        </div>
        <button class="close-button" @click="this.$emit('closeInput')"><span class="material-icons">close</span></button>
    </div>
</div>
    
</template>
<script>
export default {
    export: 'accountinput',
    data(){
        return{
            name: '',
        }
    },
    methods: {
        createAccount(){
            this.$emit('createAccount', this.name);
        }
    }
}
</script>
<style scoped>
    .container{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .input-form{
        width: 400px;
        height: 170px;
        background: white;
        border: solid 1px rgb(230,230,230);
        border-radius: 10px;
        box-shadow: rgba(150,150,150,0.5) 0px 0px 20px;
        position: absolute;
        margin-right: 10px;
        top: 218px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .input-form p {
        width: 100%;
        text-align: left;
        margin-left: 70px;
        margin-bottom: 10px;
        margin-top: -10px;
        font-weight: 500;
    }

    .input-div button{
        width: 330px;
        height: 30px;
        padding-left: 10px;
        background-color: rgb(30,30,30);
        color: white;
        border-radius: 5px;
        border: none;
        transition: 200ms;
    }

    .input-form button:hover{
        cursor: pointer;
        background: rgb(120,199,171);
    }

    .input-div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .input-form input{
        width: 320px;
        height: 30px;
        padding-left: 10px;
        border: solid 1px rgb(230,230,230);
        border-radius: 5px;
        margin-bottom: 10px;
        outline: none;
    }

    .input-form h1{
        font-size: 20px;
        width: 100%;
        background-color: rgb(30,30,30);
        color: white;
        text-align: center;
        padding: 10px 0 10px 0;
        border-radius: 10px 10px 0 0;
    }

    .close-button{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 10px;
        right: 10px;
        background: white !important;
        border-radius: 100px;
        border: none;
        transition: 200ms;
    }

    .close-button:hover{
        background: rgb(230,230,230) !important;
        cursor: pointer;
    }

    .close-button span{
        color: rgb(100,100, 100);
    }
</style>