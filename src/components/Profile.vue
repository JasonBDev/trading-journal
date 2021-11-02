<template>
  <div class="container">
      <button @click="this.$emit('closeProfile')" class="close-button"><span class="material-icons">close</span></button>
  </div>
</template>

<script>
export default {
    name: 'Profile'
}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        bottom: 0;
        position: fixed;
        background-color: white;
        z-index: 2000;
    }

    .close-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background: white !important;
        color: rgb(30,30,30) !important;
        border: none !important;
        top: 10px;
        right: 10px;
        position: fixed
    }

    .close-button span{
        font-size: 36px;
    }
</style>