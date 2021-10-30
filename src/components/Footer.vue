<template>
  <div class="footer">
      <div class="small-container">
          <h3>Company</h3>
          <p>About</p>
          <p>Blog</p>
          <p>Join Us</p>
      </div>
      <div class="small-container">
          <h3>Social</h3>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>Facebook</p>
      </div>
      <div class="small-container">
          <h3>Help</h3>
          <p>Contact Us</p>
          <p>FAQ</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped>

.footer{
    width: 100%;
    height:  280px;
    border-top: solid 1px rgb(230,230,230);
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.footer .small-container{
    min-width: 200px;
    margin: 20px 30px 0 30px;
    text-align: left;
}

.footer .small-container h3{
    font-weight: 500;
    font-size: 18px;
    margin-top: 60px;
    margin-bottom: 10px;
}

.footer .small-container p{
    font-weight: 300;
    margin-bottom: 6px;
    transition: 200ms;
}

.footer .small-container p:hover{
    cursor: pointer;
    color: rgb(140,140,140);
}

</style>