<template>
<div style="padding-top: 0;" class="trade-input">
  <h3 style="font-size: 18px; font-weight: 400; margin: 0; padding: 10px 0 10px 0; border-radius: 10px 10px 0 0; width: 100%; color: white;  background: rgb(30,30,30);">Add Trade</h3>
  <div class="main-container">
    <div class="mini-container">
      <div>
        <h3>Symbol</h3>
        <input v-on:keyup.enter="emitTrade" v-model="symbol" type="text" placeholder="Symbol">
      </div>
      
      <div>
        <h3>W/L</h3>
        <select class="side-class" v-model="winloss" name="winloss">
          <option value="win">Win</option>
          <option value="loss">Loss</option>
        </select>
      </div>
      
    </div>
    
    <div class="mini-container">
      <div>
        <h3>Entry</h3>
        <input v-on:keyup.enter="emitTrade" v-model="entry" type="text" placeholder="0">
      </div>
      <div>
        <h3>Position Size</h3>
        <input v-on:keyup.enter="emitTrade" v-model="size" type="text" placeholder="0">
      </div>
    </div>
    
    <div class="mini-container">
      <div>
        <h3>Stop Loss</h3>
        <input v-on:keyup.enter="emitTrade" v-model="sl" type="text" placeholder="0">
      </div>
      <div>
        <h3>Take Profit</h3>
        <input v-on:keyup.enter="emitTrade" v-model="tp" type="text" placeholder="0">
      </div>
    </div>
    
  </div>

  <div class="button-div">
    <button @click="addTrade"><span class="material-icons sl-14">done</span></button>
    <button @click='this.$emit("cancel")'><span class="material-icons sl-14">clear</span></button>
  </div>

</div>

</template>

<script>
export default {
  name: 'tradeinputtest',
  data(){
    return{
      winloss: 'win',
      symbol: '',
      entry: '',
      size: '',
      tp: '',
      sl: '',
    }
  },
  methods: {
    addTrade(){
      
      var trade={
        win: this.winloss,
        symbol: this.symbol,
        entry: this.entry,
        size: this.size,
        tp: this.tp,
        sl: this.sl,
      }

      console.log(trade);

      this.$emit('insertTrade', trade)
    }
  }
}
</script>

<style scoped>
.main-container h3{
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mini-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 60px;
  width: 220px;
  margin: 10px;
}

.mini-container div{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mini-container div:first-child{
  margin-right: 20px;
}

.win-select option{
  padding: 10px;
}

.trade-input{
  background-color: rgb(247,250,251);
  list-style-type: none;
  width: 280px;
  border: solid; border-color: rgb(230,230,230); border-width: 1px; border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 320px;
  padding: 20px 0 0px 0;
  margin-top: 40px;
  position: absolute;
  top: 670px;
  box-shadow: rgba(200,200,200,0.5) 0px 0px 20px;
}

.trade-input input{
  padding: 10px;
  width: 70px;
  border: solid; border-width: 1px; border-color: rgb(230,230,230); border-radius: 10px;
  outline: none;
}

.side-class{
  width: 100px;
  padding: 9px; padding-right: 20px;
  outline: none;
  border: solid; border-width: 1px; border-color: rgb(230,230,230);
  border-radius: 10px;
}


.trade-input button:first-child{
  background-color: rgb(223,246,239); 
  color: rgb(120,199,171);
  height: 36px;
  border: none;
  width: 160px;
  transition: 200ms;
  border-radius: 0 0 0 10px;
  cursor: pointer;
  font-weight: 800;
  transition: 200ms;
}

.trade-input button:nth-child(1):hover{
  background-color: rgb(203,226,219);
}

.trade-input button:nth-child(2){
  background-color: rgb(251,192,207); 
  color: rgb(220,67,105);
  height: 36px;
  border: none;
  width: 160px;
  transition: 200ms;
  border-radius: 0 0 10px 0;
  cursor: pointer;
  font-weight: 800;
  transition: 200ms;
}

.trade-input button:nth-child(2):hover{
  background-color: rgb(231,172,187);
}

.button-div{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>