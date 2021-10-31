<template>
  <div class="accounts-header">
    <h1>Accounts</h1>
    <button @click="toggleInput"><span class="material-icons md-18">add</span>Account</button>
  </div>

  <accountinput @createAccount="addAccount" v-if="inputVisible" />

  <Account v-for="account in accounts" :key="account.id" :account="account"/>

  <div class="pagination">
    <button @click="page_down"><span class="material-icons md-18">chevron_left</span></button>

    <button @click="loadAccounts(button.page)" v-for="button in navigation_buttons" :key="button.page" v-bind:class="{'active_page':(button.active === true)}">{{button.page + 1}}</button>

    <button @click="page_up"><span class="material-icons md-18">chevron_right</span></button>
  </div>
</template>

<script>
import Account from '../components/Account.vue';
import accountinput from '../components/accountinput.vue'
import { ref, onMounted } from 'vue';

export default {
    name: 'Accounts',
    components: {
      Account,
      accountinput
    },
    setup(){
      var accounts = ref([]);
      var inputVisible = ref(false);
      var navigation_buttons = ref([]);
      var currentPage = ref(0);
      var numberOfAccounts = ref(0);

      onMounted(async () => {
        
        loadAccounts(0);

      });

      function page_up(){
        if(currentPage.value != Math.ceil(numberOfAccounts.value / 5) - 1){
          loadAccounts(currentPage.value + 1);
        }
      }

      function page_down(){
        if(currentPage.value != 0){
          loadAccounts(currentPage.value - 1);
        }
      }

      async function loadAccounts(page){

        //Making fetch request
        const res = await fetch('http://localhost:8000/api/accounts', {
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            page: page
          })
        });

        //Convert and reverse response
        const cont = await res.json();
        accounts.value = cont.accounts.reverse();

        //Clear array
        navigation_buttons.value.length = 0;

        //Calculate amount of pages - create array
        for(var i = 0; i < Math.ceil(cont.length / 5); i++){
          navigation_buttons.value.push({
            page: i,
            active: false
          })
        }

        numberOfAccounts.value = cont.length;
        
        //Set active page
        navigation_buttons.value.forEach((value)=> {
          if(value.page == page){
            value.active = true;
          }else{
            value.active = false;
          }
        });

        //Set CurrentPage
        currentPage.value = page;
      }

      //Toggle Account Input Modal
      function toggleInput(){
        inputVisible.value = !inputVisible.value;
      }

      async function addAccount(name){
        const res = await fetch('http://localhost:8000/api/create-account', {
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name
          })
        });

        const cont = await res.json();
        alert(cont.message);
      }

      return {page_down, page_up, loadAccounts, navigation_buttons, toggleInput, inputVisible, accounts, addAccount }
    }
}
</script>

<style scoped>

.accounts-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.accounts-header button{
  height: 39px;
  width: 120px;
  background: rgb(30,30,30);
  color: white;
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  transition: 200ms;
  z-index: 100;
}

.accounts-header button:hover{
  cursor: pointer;
  background: rgb(60,60,60);
}

.accounts-header button span{
  margin-right: 10px;
}

h1{
  margin: 30px 0 20px 0;
  text-align: left;
}

.pagination{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0 30px 0;
}

.pagination button{
  margin: 0 5px 0 5px;
  width: 36px; height: 36px;
  border: none 1px rgb(240,240,240);
  border-radius: 5px;
  background-color: white;
  transition: 200ms;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button:hover{
  cursor: pointer;
  background: rgb(30,30,30);
  color: white;
}
.active_page{
  background-color: rgb(30,30,30) !important;
  color: white !important;
}

</style>