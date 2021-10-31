<template>
  <div class="container">
      <div class="dropdown">
      </div>
  </div>
</template>

<script>
export default {
    name: 'Profile',
}
</script>

<style scoped>
    .container{
        position: absolute;
        top: 96px;
        display: flex;
        justify-content: flex-end;
    }

    .dropdown{
        height: 500px;
        width: 200px;
        background: white;
        margin-right: 66px;
        border-radius: 5px;
        border: solid 1px rgba(230,230,230);
    }
</style>