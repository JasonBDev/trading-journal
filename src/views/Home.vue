<template>
  <div class="performance-header">
    <h1>Performance</h1>
    <select>
      <option value="monthly">Monthly</option>
      <option value="weekly">Weekly</option>
      <option value="daily">Daily</option>
    </select>
  </div>

  <div class="header">
    <div class="performance-panel">
      <area-chart :colors="['rgba(100,125,255,0.2)']" suffix="%" width="95%" height="240px" :data="chartData"></area-chart>
    </div>
  </div>

  <div class="trade-history-title-div">
    <h2>Recent Activity</h2>
    <div>
      <button @click="test" class="export-button">Export</button>
      <button @click="toggleTrade">Add</button>
    </div>
  </div>

  <div class="trade-list-header">
    <p style="margin-right: -10px">Select</p>
    <p>Win/Loss▾</p>
    <p>Side▾</p>
    <p>Symbol▾</p>
    <p>Pos. Size</p>
    <p style="margin-left: -20px; margin-right: -20px">Entry▾ ($)</p>
    <p>Exit▾ ($)</p>
  </div>

  <ul class='trade-list'>
    <tradeinputtest @cancel="toggleTrade" @insertTrade="addTrade" v-if="tradeInputVis"/>

    <trade @refresh-list="refreshList" v-for="todo in todos" :key="todo.name" :info="todo"/>
  </ul>
  
</template>

<script>
import { ref, onMounted } from 'vue'
import trade from '../components/trade.vue'
import tradeinputtest from '../components/tradeinputtest.vue'

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
    var chartData = ref({
      '1': '1',
      '2': '5',
      '3': '3',
      '4': '10',
      '5': '7',
      '6': '6',
      '7': '12',
      '8': '6',
      '9': '5',
      '10': '9',
    });

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

    onMounted(async() => {
      const res = await fetch('http://localhost:8000/api/trades', {
        method: 'POST',
        credentials: 'include',
      });

      const content = await res.json();

      if(content.message != 'no-auth'){
        content.forEach((value)=> {
          value.win = (value.win == true) ? 'win' : 'loss';
          value.side = (value.side == true) ? 'long' : 'short';
          todos.value.push(value);
        })
      }
    })

    function toggleTrade() {
      tradeInputVis.value = !tradeInputVis.value;
    }

    async function addTrade(trade){
      
      //add trade to db here
      var wintf = trade.win == 'win' ? true : false;
      var sidetf = trade.side == 'long' ? true : false;

      console.log(sidetf);

      const res = await fetch('http://localhost:8000/api/addtrade', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          win: wintf,
          side: sidetf,
          symbol: trade.symbol,
          entry: trade.entry,
          exit: trade.exit,
          size: trade.size,
        })
      });

      const content = await res.json();

      alert(content.message);

      if(content.message == 'Trade added!'){
        todos.value.unshift(trade);
        toggleTrade();
      }
    }

    return{ todos, toggleTrade, tradeInputVis, addTrade, openTradeVis, tradeid, chartData, refreshList}
  },
}
</script>

<style scoped>

.performance-header{
  display: flex;
  flex-direction: row;
}

.performance-header select {
  margin-left: 20px;
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

.trade-history-title-div button{
  height: 41px;
  width: 100px;
  background: rgb(30,30,30);
  border-radius: 5px;
  border: none; border-width: 1px; border-color: rgb(30,30,30);
  transition: 200ms;
  color:white;
  cursor: pointer;
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
  margin-bottom: 80px;
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