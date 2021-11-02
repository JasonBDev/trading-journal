<template>
  <div class="account-div">
      <div class="left-div">
      <span class="material-icons">account_box</span>
          <p style="margin: 0 0 0 20px; width: 140px; text-align: left; overflow: hidden;">{{account.name}}</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">HR: {{Math.round((account.wins / (account.wins + account.losses)) * 100)}}%</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">RR: {{Math.round(account.average_rr / (account.wins + account.losses))}}</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">#: {{account.wins + account.losses}}</p>
      </div>
      
      <div class="button-div">
        <button @click="goToDashboard(account._id)"><span class="material-icons md-18">check</span></button>
        <button @click="deleteAccount(account._id)"><span class="material-icons md-18">delete</span></button>
      </div>
      
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'Account',
    props: {
        account: null
    },
    setup(props, context){

        var router = useRouter();

        async function goToDashboard(id){
            const res = await fetch('http://localhost:8000/api/select-account', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    id: id
                }),
            });

            const cont = await res.json();
            console.log(cont);
            router.push('/');
        }

        async function deleteAccount(_id){
            const res = await fetch('http://localhost:8000/api/delete-account', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    _id: _id
                }),
            });

            const cont = await res.json();
            console.log(cont);

            context.emit('refreshAccounts');
        }

        return{ goToDashboard, deleteAccount}
    }
}
</script>

<style scoped>

.button-div{
    min-width: 150px;
}

.divider{
    color: rgb(200,200,200);
}

.left-div{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.left-div span{
    font-size: 36px;
    margin-left: 30px;
}

.account-div{
    width: 100%;
    height: 100px;
    background-color: white;
    border: solid 1px rgb(230,230,230);
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.account-div button:first-child{
    height: 50px;
    width: 50px;
    background-color: white;
    border: none;
    border-radius: 100px;
    transition: 200ms;
    margin-right: 10px;
}

.account-div button:last-child{
    height: 50px;
    width: 50px;
    background-color: white;
    border: none;
    border-radius: 100px;
    margin-right: 40px;
    transition: 200ms;
}

.account-div button:first-child:hover{
    cursor: pointer;
    color: rgb(120,199,171);
    background: rgb(230,230,230);
}

.account-div button:last-child:hover{
    cursor: pointer;
    color: rgb(220,67,105);
    background: rgb(230,230,230);
}

</style>