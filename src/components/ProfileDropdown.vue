<template>
  <div class="container">
      <div class="dropdown">
        <button @click="this.$emit('viewProfile')"><span class="material-icons md-18">person</span>View Profile</button>
        <button><span class="material-icons md-18">dark_mode</span>Dark Mode</button>
        <button @click="this.$emit('logout')"><span class="material-icons md-18">power_settings_new</span>Log Out</button>
      </div>
  </div>
</template>

<script>

export default {
    name: 'ProfileDropdown',
}
</script>

<style scoped>
    .container{
        height: 1px;
        position: absolute;
        top: 96px;
        display: flex;
        justify-content: flex-end;
        z-index: 1000;
    }

    .dropdown{
        padding: 10px 5px 10px 5px;
        height: 130px;
        width: 200px;
        background: white;
        margin-right: 10px;
        border-radius: 5px;
        border: solid 1px rgba(230,230,230);
        box-shadow: rgba(200,200,200, 0.7) 0px 0px 20px;
    }

    .dropdown button{
        width: 100%;
        height: 40px;
        background-color: white !important;
        color: rgb(80,80,80) !important;
        border: none !important;
        font-weight: 500;
        margin-bottom: 5px;
        text-align: left;
        transition: 200ms;
        padding-left: 20px !important;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .dropdown button span{
        margin-right: 20px;
    }

    .dropdown button:hover{
        cursor: pointer;
        background-color: rgb(230, 230,230) !important;
    }
</style>