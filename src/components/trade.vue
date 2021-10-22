<template>
  <div class="trade" v-bind:class="{active: isActive}">
    <div @click="toggleTrade()" class="trade-header">
      <div class="button-div">
      <button><span style="color: rgb(50,50,50)" class="material-icons md-18">edit</span></button>
      </div>
      <h3 v-bind:class="{'winorlong':(info.win === 'win'), 'lossorshort':(info.win === 'loss')}">{{info.win}}</h3>
      <h3 v-bind:class="{'winorlong':(info.side === 'long'), 'lossorshort':(info.side === 'short')}">{{info.side}}</h3>
      <p>{{info.symbol}}</p>
      <p>{{info.size}}</p>
      <p>${{info.entry}}</p>
      <p>${{info.exit}}</p>
      <p v-bind:class="{'win': (info.profit > 0), 'loss': (info.profit < 0)}">${{info.profit}}</p>
    </div>
    <div class="notes">
      <textarea v-model="notes" placeholder="Notes..." style="margin-right: 0; margin-left: 20px" class="notes-input" type="text"></textarea>
      <div class="notes-side">
        <div class="notes-side-container">
          <input placeholder="Risk" style="margin-right: 0px" type="text">
          <p style="width: 144px; height: 15px; text-transform: none;" class="profit">Profit: ${{info.profit}}</p>
          <button @click="saveNotes" class="save-button"><span class="material-icons md-18">save</span></button>
        </div>
        <div class="notes-side-container">
          <input placeholder="Reward" style="margin-right: 0px" type="text">
          <select>
            <option value="long">Strategy</option>
          </select>
          <button @click="deleteButton" class="delete-button"><span class="material-icons md-18">delete</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'trade',
  props:{
      info: null
  },
  data() {
    return{
      isActive: false,
      notes: '',
      loadedNotes: false
    }
  },
  methods: {
    async toggleTrade(){
      if(this.isActive == false && this.loadedNotes == false){
        //Load the notes
        this.loadedNotes = true;
        const res = await fetch('http://localhost:8000/api/load-notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.info._id
        }),
      });

      const cont = await res.json();

      console.log(cont.message);

      this.notes = cont.message;

      }
      this.isActive = !this.isActive;
    },
    async deleteButton(){

      const res = await fetch('http://localhost:8000/api/delete-trade', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.info._id
        }),
      });

      const cont = await res.json();

      alert(cont.message);

      this.$emit('refresh-list', this.info._id);
    },
    async saveNotes(){
      const res = await fetch('http://localhost:8000/api/save-notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.info._id,
          notes: this.notes
        }),
      });

      const cont = await res.json();

      alert(cont.message);
    }
  }
}
</script>

<style scoped>

.win{
  color: rgb(120,199,171);
}

.loss{
  color: rgb(220,67,105);
}

.profit{
  margin-bottom: 10px;
  padding-top: 13px; padding-bottom: 13px;
  font-weight: 900;
}

.trade{
  background-color: white;
  list-style-type: none;
  width: 100%;
  border: solid; border-bottom: none; border-top-color: rgb(245,245,245); border-color: rgb(245,245,245); border-width: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 50px;
  transition: 200ms; transition-timing-function: ease-in-out;
  overflow-y: hidden;
}

.trade:hover{
  background-color: rgb(250,250,250);
  cursor: pointer;
}

.trade-header{
  padding: 9px 0 9px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.active{
  height: 300px;
  background-color: rgb(250,250,250);
}

.notes{
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.notes-side{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 320px; min-width: 320px;
  height: 200px;
  padding: 0 20px 0 20px;
}

.notes-side-container{
  height: 100%;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notes-side-container input{
  width: 120px;
  height: 17px;
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
}

.notes textarea {
  width: 100%;
  height: 160px;
  border: solid;
  border-width: 1px;
  border-color: rgb(230,230,230);
  border-radius: 10px;
  padding: 20px;
  resize: none;
  outline: none;
  transition: 200ms;
}

.notes textarea:focus{
  border-color: rgba(100,125,255, 0.5);
}

.notes-side select{
  color: black;
  border-radius: 5px;
  height: 41px;
  padding: 0 3px 0 3px;
  width: 140px;
  outline: none;
  margin-bottom: 10px;
}

.save-button{
  color: white;
  background-color: rgb(120,199,171);
  border: none; border-radius: 5px;
  height: 41px;
  transition: 200ms;
  width: 144px;
}

.save-button:hover{
  cursor: pointer;
  background-color: rgb(250,250,250);
  color: black;
}

.delete-button{
  color: white;
  background-color: rgb(220,67,105);
  border: none; border-radius: 5px;
  height: 41px;
  transition: 200ms;
  width: 140px;
}

.delete-button:hover{
  cursor: pointer;
  background-color: rgb(250,250,250);
  color: black;
}

.button-div button:first-child{
  background-color: rgba(0,0,0,0); 
  color: black;
  margin: 0 10px 0 0 ; padding: 0;
  height: 32px;
  border: none;
  width: 32px;
  transition: 200ms;
  border-radius: 5px;
  cursor: pointer;
}

.button-div button:nth-child(2){
  background-color: rgb(245,245,245); 
  color: black;
  margin: 0 -20px 0 0 ; padding: 0;
  height: 32px;
  border: none;
  width: 32px;
  transition: 200ms;
  border-radius: 5px;
  cursor: pointer;
}

.trade input{
  margin-left: 0px;
  margin-right: 30px;
}

.trade p{
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  width: 70px;
}

.trade h3{
  font-size: 14px;
  padding: 4px 16px 4px 16px;
  margin-left: 5px;
  border-radius: 100px;;
  text-transform: uppercase;
  width: 50px;
}

.winorlong{
    background: rgb(223,246,239);
    color: rgb(120,199,171); /* red: rgba(251,192,207,255) rgba(220,67,105,255)*/
}

.lossorshort{
  background: rgb(251,192,207);
  color: rgb(220,67,105);
}
</style>