<template>
  <div id='playComponent'>
    <PlayerOne />
    <div id="vsContainer">
      <h1>VS</h1>
      <h2 v-if="store.playerOneWon">Player One Won</h2>
      <h2 v-if="store.playerCpuWon">Player Cpu Won</h2>
      <h1 v-if="store.isTie">Is Tie</h1>
      <button id="nextRoundButton" @click="nextRound(false)">Next round</button>
      <h3 v-if="waitingForCpu">Waiting for cpu to choose...</h3>
      <h3 v-if="waitingForPlayer1">Waiting for player 1 to choose...</h3>
      <button id="resetGameButton" @click="resetGame">Reset game values</button>
    </div>
    <CpuPlayer />
  </div>
</template>

<script setup lang="ts">
import CpuPlayer from '@/components/CpuPlayer/CpuPlayer.vue';
import PlayerOne from '@/components/PlayerOne/PlayerOne.vue';
import { watch, onUpdated, computed } from 'vue'
import useStore from '../stores/gameStore'
import io from 'socket.io-client'

const store = useStore()
const socket = io('http://localhost:3000' || 'https://rps-socket.vercel.app/')

onUpdated(() => {
  socket.emit('changeCounters', { playerOneWon: store.playerOneWon, playerCpuWon: store.playerCpuWon })
})

let waitingForCpu = computed(() => { 
  if((store.playerOneHands.isRock || store.playerOneHands.isScissor || store.playerOneHands.isPaper) &&
     (store.playerCpuHands.isRock || store.playerCpuHands.isScissor || store.playerCpuHands.isPaper)) {
    return false
  }
  else if((store.playerOneHands.isRock || store.playerOneHands.isScissor || store.playerOneHands.isPaper) &&
     (!store.playerCpuHands.isRock || !store.playerCpuHands.isScissor || !store.playerCpuHands.isPaper)) {
    return true
  } 
  return false
})

let waitingForPlayer1 = computed(() => { 
  if((store.playerOneHands.isRock || store.playerOneHands.isScissor || store.playerOneHands.isPaper) &&
     (store.playerCpuHands.isRock || store.playerCpuHands.isScissor || store.playerCpuHands.isPaper)) {
    return false
  }
  else if((store.playerCpuHands.isRock || store.playerCpuHands.isScissor || store.playerCpuHands.isPaper) &&
     (!store.playerOneHands.isRock || !store.playerOneHands.isScissor || !store.playerOneHands.isPaper)) {
    return true
  } 
  return false
})

function nextRound(data: boolean): void {
  socket.emit('nextRound', data)
}

function resetGame(): void {
  socket.emit('reset values')
}

watch([store.playerOneHands, store.playerCpuHands], ([playerNewHand, cpuNewHand]) => {
  if(playerNewHand.isRock && cpuNewHand.isRock) store.isTie = true
  if(playerNewHand.isPaper && cpuNewHand.isPaper) store.isTie = true
  if(playerNewHand.isScissor && cpuNewHand.isScissor) store.isTie = true

  if(playerNewHand.isRock && cpuNewHand.isScissor) store.playerOneWon = true
  if(playerNewHand.isScissor && cpuNewHand.isPaper) store.playerOneWon = true
  if(playerNewHand.isPaper && cpuNewHand.isRock) store.playerOneWon = true

  if(cpuNewHand.isRock && playerNewHand.isScissor) store.playerCpuWon = true
  if(cpuNewHand.isScissor && playerNewHand.isPaper) store.playerCpuWon = true
  if(cpuNewHand.isPaper && playerNewHand.isRock) store.playerCpuWon = true
})
</script>

<style scoped>
#playComponent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: lightcoral;
  font-family: Arial, Helvetica, sans-serif;
}
#vsContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: auto;
  height: 60%;
}
#nextRoundButton {
  width: 100%;
  height: 15%;
  border: 5px solid black;
  border-radius: 15px;
  color: #000;
  font-size: 30px;
  background-color: #fff;
  cursor: pointer;
}
#resetGameButton {
  border: 3px solid black;
  border-radius: 15px;
  color: #000;
  background-color: #fff;
  cursor: pointer;
}
</style>
