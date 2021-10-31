<template>
  <div class="account-div">
      <div class="left-div">
          <p style="margin: 0 0 0 40px; width: 180px; text-align: left; overflow: hidden;">{{account.name}}</p>
          <p class="divider">|</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">HR: {{(account.wins / (account.wins + account.losses)) * 100}}%</p>
          <p class="divider">|</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">RR: {{account.average_rr / (account.wins + account.losses)}}</p>
          <p class="divider">|</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">NT: {{account.wins + account.losses}}</p>
      </div>
      
      <div class="button-div">
        <button @click="goToDashboard(account._id)"><span class="material-icons md-18">login</span></button>
        <button><span class="material-icons md-18">delete</span></button>
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
    setup(){

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

        return{ goToDashboard}
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
}

.account-div{
    width: 100%;
    height: 100px;
    background-color: white;
    border: solid 1px rgb(230,230,230);
    border-radius: 10px;
    margin-bottom: 20px;
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
    background: rgb(247,250,251);
}

.account-div button:last-child:hover{
    cursor: pointer;
    color: rgb(220,67,105);
    background: rgb(247,250,251);
}

</style>