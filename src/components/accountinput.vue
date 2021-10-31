<template>
<div class="container">
    <div class="input-form">
        <p>Account Name</p>
        <div class="input-div">
            <input v-on:keyup.enter="createAccount" v-model="name" type="text" placeholder="Name">
            <button @click="createAccount"><span class="material-icons md-18">add</span></button>
        </div>
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
        height: 110px;
        background: white;
        border: solid 1px rgb(230,230,230);
        border-radius: 10px;
        box-shadow: rgba(150,150,150,0.5) 0px 0px 20px;
        position: absolute;
        margin-right: -2px;
        top: 205px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .input-form p {
        width: 100%;
        text-align: left;
        margin-left: 70px;
        margin-bottom: 10px;;
        font-weight: 500;
    }

    .input-form button{
        width: 30px;
        height: 30px;
        margin-left: 10px;
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
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .input-form input{
        width: 280px;
        height: 30px;
        padding-left: 10px;
        border: solid 1px rgb(230,230,230);
        border-radius: 10px;
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
</style>