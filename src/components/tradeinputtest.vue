<template>
<div class="trade-input">
  <div class="button-div">
    <button @click="addTrade"><span class="material-icons sl-14">done</span></button>
    <button @click='this.$emit("cancel")'><span class="material-icons sl-14">clear</span></button>
  </div>
  <div>
      <select class="win-select" v-model="win" name="win">
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
  </div>
  <div>
      <select class="side-class" v-model="side" name="side">
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
  </div>
  <input v-on:keyup.enter="emitTrade" v-model="symbol" type="text" placeholder="Symbol">
  <input v-on:keyup.enter="emitTrade" v-model="size" type="text" placeholder="Pos. Size">
  <input v-on:keyup.enter="emitTrade" v-model="entry" type="text" placeholder="Entry">
  <input v-on:keyup.enter="emitTrade" v-model="exit" type="text" placeholder="Exit">
</div>

</template>

<script>
export default {
  name: 'tradeinputtest',
  data(){
    return{
      win: 'win',
      side: 'long',
      symbol: '',
      entry: '0',
      exit: '0'
    }
  },
  methods: {
    addTrade(){
      
      var trade={
        win: this.win,
        side: this.side,
        symbol: this.symbol,
        entry: this.entry,
        exit: this.exit,
        size: this.size,
      }

      this.$emit('insertTrade', trade)
    }
  }
}
</script>

<style scoped>

.win-select option{
  padding: 10px;
}

.trade-input{
  background-color: white;
  list-style-type: none;
  width: 100%;
  border-top: solid; border-bottom: none; border-color: rgb(245,245,245); border-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.trade-input input{
  margin-left: -20px;
  padding: 10px;
  width: 70px;
  border: solid; border-width: 1px; border-color: rgb(230,230,230); border-radius: 10px;
  outline: none;
}

.trade-input div select{
  width: 100px;
  padding: 9px; padding-right: 20px;
  outline: none;
  border: solid; border-width: 1px; border-color: rgb(230,230,230);
  border-radius: 10px;
}


.trade-input button:first-child{
  background-color: rgb(223,246,239); 
  color: rgb(120,199,171);
  margin: 0 5px 0 0 ; padding: 0;
  height: 36px;
  border: none;
  width: 36px;
  transition: 200ms;
  border-radius: 10px;
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
  margin: 0 -30px 0 0 ; padding: 0;
  height: 36px;
  border: none;
  width: 36px;
  transition: 200ms;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 800;
  transition: 200ms;
}

.trade-input button:nth-child(2):hover{
  background-color: rgb(231,172,187);
}
</style>