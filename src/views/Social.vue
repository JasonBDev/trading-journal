<template>
    <h1>Social</h1>
    <h2>Coming Soon!</h2>
    <div class="subtitle-box">
        <h3>Follow other public accounts to get an insight on their trading!</h3>
    </div>
    
    <div class="notify-container">
        <div class="notify-box">
            <input type="text" placeholder="Email address">
        <button>Notify me</button>
    </div>
    </div>
</template>

<script>
export default {
    name:'Social',
}
</script>

<style scoped>

h1{
    text-align: left;
    margin-top: 30px;
}

h2{
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: 88px;
    font-weight: 900;
    background: -webkit-linear-gradient(45deg, rgb(0,125,255), rgb(0,255,200));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h3{
    color: rgb(30,30,30);
    font-size: 22px;
    font-weight: 600;
    width: 400px;
}

.subtitle-box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}

.notify-box {
    background-color: rgb(30,30,30);
    padding: 5px 5px 5px 10px;
    width: 400px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
}

.notify-box button{
    height: 100%;
    background: white;
    border: none; border-radius: 5px;
    padding: 0 5px 0 5px;
    min-width: 100px;
    font-size: 18px;
    transition: 200ms;
}

.notify-box button:hover{
    cursor: pointer;
    background-color: rgb(230,230,230);
}

.notify-box input {
    background-color: rgb(30,30,30);
    border: none;
    color: white;
    outline: none;
    font-size: 18px;
    width: 280px;
    height: 100%;
    padding-left: 10px;
}

.notify-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 160px;;
}

</style>