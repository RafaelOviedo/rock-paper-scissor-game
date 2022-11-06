<template>
  <div id='landingPageComponent'>
    <div id='optionsBox'>
      <h1>Rock, paper, scissors</h1>

      <router-link to='/play' id='linkContainer'>
          <button id='playButton'>Play online</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
#landingPageComponent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #3386FF;
  font-family: Arial, Helvetica, sans-serif;
}

#optionsBox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: 70%;
}

#linkContainer {
  width: 20%;
  height: 10%;
}
#playButton {
  width: 100%;
  height: 100%;
  border: 5px solid black;
  border-radius: 15px;
  color: #000;
  font-size: 30px;
  background-color: #fff;
  cursor: pointer;
}
</style>
