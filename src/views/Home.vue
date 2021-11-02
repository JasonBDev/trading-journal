<template>

  <button @click="goToAccounts"  class="back_button"><span class="material-icons md-18">chevron_left</span>Back to Accounts</button>

  <div class="performance-header">
    <h1>{{account_name}} - Equity Curve </h1>
  </div>

  <div class="header">
    <div class="performance-panel">
      <area-chart :colors="['rgba(100,125,255,0.2)']" suffix="$" width="95%" height="240px" :data="chartData"></area-chart>
    </div>
    <div class="rotating-text-div"><span>Hit Rate: {{hit_rate}}%</span><span>Risk/Reward: {{average_rr}}</span><span>Number of Trades: {{numberOfTrades}}</span></div>
  </div>

  <div class="trade-history-title-div">
    <h2>Recent Activity</h2>
    <div>
      <button @click="coming_soon" class="export-button">Export</button>
      <button @click="toggleTrade" class="add-button"><span class="material-icons md-18">add</span>Add</button>
    </div>
  </div>

  <div class="tradeinput-div">
    <tradeinputtest @cancel="toggleTrade" @insertTrade="addTrade" v-if="tradeInputVis"/>
  </div>

  <div class="trade-list-header">
    <p>Outcome▾</p>
    <p style="margin-left: 26px;">Side▾</p>
    <p>Symbol▾</p>
    <p style="margin-left: -20px;">Entry▾</p>
    <p>Exit▾</p>
    <p style="margin-right: 8px;">Size▾</p>
    <p style="margin-right: 10px;">R:R</p>
    <p>Profit▾</p>
  </div>

  <ul class='trade-list'>
    <trade @refresh-list="refreshList" v-for="todo in todos" :key="todo.name" :info="todo"/>
  </ul>

  <div class="pagination">
    <button @click="page_down"><span class="material-icons md-18">chevron_left</span></button>

    <button v-bind:class="{'active_page':(page.active === true)}" v-for="page in pagination_buttons" :key="page.page" @click="loadTrades(page.page)">{{page.page + 1}}</button>

    <button @click="page_up"><span class="material-icons md-18">chevron_right</span></button>
  </div>

  <button @click="goToAccounts" class="back_button"><span class="material-icons md-18">chevron_left</span>Back to Accounts</button>
  
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import trade from '../components/trade.vue'
import tradeinputtest from '../components/tradeinputtest.vue'
import {useRouter} from 'vue-router';

export default {
  components:{
    trade,
    tradeinputtest,
  },
  setup(){

    var todos = ref([]);
    var tradeInputVis = ref(false);
    var openTradeVis = ref(false);
    var tradeid = ref('');
    var chartData = ref({});
    var pagination_buttons = ref([]);
    
    var hit_rate = ref(0);
    var average_rr = ref(0);
    var numberOfTrades = ref(0);
    var currentPage = ref(0);
    var account_name = ref(0);

    var router = useRouter();

    function goToAccounts(){
      router.push('/accounts');
    }

    function page_down(){
      if(currentPage.value != 0){
        loadTrades(currentPage.value - 1);
      }
    }

    function page_up(){
      if(currentPage.value != Math.ceil(numberOfTrades.value / 5) - 1){
        loadTrades(currentPage.value + 1);
      }
    }

    function refreshList(id){
      console.log(id);
      var filtered = [];
      for (var i = 0; i < todos.value.length; i++) {
        if (todos.value[i]._id != id) {
          filtered.push(todos.value[i]);
        }
      }
      todos.value = filtered;
    }

    async function loadTrades(page){

      const res = await fetch('http://localhost:8000/api/trades', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          page: page
        })
      });

      const content = await res.json();

      if(content.message != 'no-auth'){

        currentPage.value = page;
        pagination_buttons.value.forEach((value)=> {
          if(value.page == page){
            value.active = true;
          }else{
            value.active = false;
          }
        });

        todos.value.length = 0;
        
        content.forEach((value)=> {
          value.win= (value.win == true) ? 'win' : 'loss';
          value.side = (value.side == true) ? 'long' : 'short';

          if(value.win == 'win'){
            value.exitPrice = value.tp;
          }else{
            value.exitPrice = value.sl;
          }

          value.info = '';

          todos.value.push(value);
        })

        var i = 0;
        var total_profit = 0;
        todos.value.reverse().forEach((todo) => {
          i++
          //add to chart data
          total_profit += todo.profit;
          chartData.value[i] = total_profit;
        });

        todos.value.reverse();
      }
    }

    onBeforeMount(async() => {
      const account_data = await fetch('http://localhost:8000/api/account', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      var account_stats = await account_data.json();

      numberOfTrades.value = account_stats.data.wins + account_stats.data.losses;
      hit_rate.value = Math.round((account_stats.data.wins / numberOfTrades.value) * 10000) / 100;
      average_rr.value = Math.round((account_stats.data.average_rr / numberOfTrades.value) * 100) / 100;
      account_name.value = account_stats.data.name;

      for (var i = 0; i < Math.ceil(numberOfTrades.value / 5) ; i++){

        var page_button = {
          page: i,
          active: false
        }

        pagination_buttons.value.push(page_button);
      }

      loadTrades(0);

      console.log(pagination_buttons.value);
    })

    function toggleTrade() {
      tradeInputVis.value = !tradeInputVis.value;
    }

    async function addTrade(trade){
      
      //add trade to db here
      var winlosstf = trade.win == 'win' ? true : false;

      const res = await fetch('http://localhost:8000/api/addtrade', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          win: winlosstf,
          symbol: trade.symbol,
          entry: trade.entry,
          size: trade.size,
          sl: trade.sl,
          tp: trade.tp,
        })
      });

      const content = await res.json();

      if(content.message == 'Trade added!'){
        if(content.result.win == true){
          content.result.win = 'win'; 
          content.result.exitPrice = content.result.tp;
        }else{ 
          content.result.win = 'loss';
          content.result.exitPrice = content.result.sl;
        }

        if(content.result.side == true){ content.result.side = "long"; }else{ content.result.side = "short"; }

        todos.value.unshift(content.result);

        numberOfTrades.value += 1;
        toggleTrade();
      }
    }

    async function coming_soon(){
      const res =  await fetch('http://localhost:8000/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const cont = await res.json();
      window.location = cont;
    }

    return{account_name, goToAccounts, page_up, page_down, todos, toggleTrade, tradeInputVis, addTrade, openTradeVis, tradeid, chartData, refreshList, average_rr, hit_rate, numberOfTrades, coming_soon, loadTrades, pagination_buttons}
  },
}
</script>

<style scoped>

.back_button{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0 30px -6px;
  background: white;
  border: none;
  font-size: 13px;
  transition: 200ms;
}

.back_button:hover{
  cursor: pointer;
  color: rgb(0,125,255);
}

.pagination{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  background: rgb(230,230,230);
}
.active_page{
  background-color: rgb(30,30,30) !important;
  color: white !important;
}

.tradeinput-div{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.rotating-text-div{
  margin-top: 40px; margin-bottom: -20px;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.rotating-text-div span{
  margin-right: 40px;
  background: rgb(247, 250, 251);
  border: solid; border-width: 1px; border-radius: 10px; border-color: rgb(240,240,240);
  padding: 15px;
}

.performance-header{
  display: flex;
  flex-direction: row;
}

.performance-header select {
  margin-left: 20px;
  border: solid 1px rgb(240,240,240);
  border-radius: 5px;
  padding: 0 10px 0 10px;
  outline: none;
}

.trade-list-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  margin-top: 40px;
}

.trade-list-header p:first-child{
  margin-right: -20px;
}

.trade-list-header p:last-child{
  margin-right: 0px;
}

.trade-history-title-div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
}

.trade-history-title-div button:last-child{
  height: 41px;
  width: 90px;
  background: rgb(30,30,30);
  border-radius: 5px;
  border: none;
  transition: 200ms;
  color:white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}

.trade-history-title-div div{
  display: flex;
  flex-direction: row;
}

.trade-history-title-div button:hover{
  background: rgb(60,60,60);
}

.trade-history-title-div button:first-child{
  height: 41px;
  width: 100px;
  background: white;
  border-radius: 5px;
  border: solid; border-width: 1px; border-color: rgb(245,245,245);
  transition: 200ms;
  color: rgb(30,30,30);
  cursor: pointer;
  margin-right: 10px;
}

.trade-history-title-div button:first-child:hover{
  background-color: rgb(247, 250, 251);
}

h1{
  text-align: left;
}

h2{
  text-align: left;
}

.performance-panel{
  width: 100%;
  height: 300px;
  margin-top: 20px;
  background-color: rgb(247, 250, 251);
  border: solid; border-width: 1px; border-color: rgb(240,240,240); border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.performance-panel-slates{
  width: 100%;
  height: 200px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.performance-panel-slates div{
  width: 30%;
  height: 200px;
  margin-top: 20px;
  background-color: rgb(247, 250, 251);
  border: solid; border-width: 1px; border-color: rgb(240,240,240); border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.performance-panel-slates div div {
  margin: 0;
  border: none;
}

.trade input{
  margin-left: 0px;
}

.trade button{
  background-color: rgb(30,30,30); 
  color: white;
  margin: 0 5px 0 0 ; padding: 0;
  height: 20px;
  border: none;
  width: 20px;
  transition: 200ms;
  border-radius: 5px;
  cursor: pointer;
}

.trade button:hover{
  background-color: rgba(251,192,207,255);
}

.trade-list{
  margin-top: 20px;
  margin-bottom: 60px;
  border-bottom: solid 1px rgb(240,240,240);
}

.trade p{
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
}

.trade h3{
  background: rgb(223,246,239);
  color: rgb(120,199,171); /* red: rgba(251,192,207,255) rgba(220,67,105,255)*/
  font-size: 14px;
  padding: 4px 16px 4px 16px;
  margin-left: 5px;
  border-radius: 100px;;
  text-transform: uppercase;
}

.lossorshort{
  background: rgb(251,192,207);
  color: rgb(220,67,105);
}

li p:last-child{
  margin-right: 0px;
}

ul:last-child{
  border-bottom: solid; border-color: rgb(240,240,240); border-width: 1px;
}
</style>