<template>
  <div class="account-div">
      <div class="left-div">
          <p style="margin: 0 0 0 40px; width: 180px; text-align: left; overflow: hidden;">{{account.name}}</p>
          <p class="divider">|</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">HR: {{account.hit_rate}}%</p>
          <p class="divider">|</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">RR: {{account.average_rr}}</p>
          <p class="divider">|</p>
          <p style="margin: 0 20px 0 20px; width: 80px;">NT: {{account.number_of_trades}}</p>
      </div>
      
      <div class="button-div">
        <button @click="goToDashboard(account.id)"><span class="material-icons md-18">login</span></button>
        <button><span class="material-icons md-18">delete</span></button>
      </div>
      
  </div>
</template>

<script>

export default {
    name: 'Account',
    props: {
        account: null
    },
    setup(){
        return{}
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