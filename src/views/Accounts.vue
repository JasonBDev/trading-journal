<template>
  <div class="accounts-header">
    <h1>Accounts</h1>
    <button @click="addAccount"><span class="material-icons md-18">add</span>Account</button>
  </div>

  <Account v-for="account in accounts" :key="account.id" :account="account"/>

  <div class="pagination">
    <button @click="page_down"><span class="material-icons md-18">chevron_left</span></button>

    <button class="active_page">1</button>

    <button>2</button>

    <button>3</button>

    <button @click="page_up"><span class="material-icons md-18">chevron_right</span></button>
  </div>
</template>

<script>
import Account from '../components/Account.vue';
import { ref, onMounted } from 'vue';

export default {
    name: 'Accounts',
    components: {
      Account,
    },
    setup(){
      var accounts = ref([]);

      onMounted(async () => {
        const res = await fetch('http://localhost:8000/api/accounts', {
          method: 'POST',
          credentials: 'include',
        });

        const cont = await res.json();
        accounts.value = cont;

      });

      async function addAccount(){
        console.log('add');
        const res = await fetch('http://localhost:8000/api/create-account', {
          method: 'POST',
          credentials: 'include',
        });

        const cont = await res.json();
        console.log(cont);
      }

      return { accounts, addAccount }
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