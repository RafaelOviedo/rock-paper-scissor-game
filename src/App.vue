<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useStore from './stores/gameStore'
import io from 'socket.io-client'

const store = useStore()
let socket = io('http://localhost:3000/' || 'https://rps-socket.vercel.app/')

onMounted(() => {
  socket.on('playersInitialData', (data) => {
    store.playerOneHands.isRock = data.playerOneHands.isRock
    store.playerOneHands.isPaper = data.playerOneHands.isPaper
    store.playerOneHands.isScissor = data.playerOneHands.isScissor

    store.playerCpuHands.isRock = data.playerCpuHands.isRock
    store.playerCpuHands.isPaper = data.playerCpuHands.isPaper
    store.playerCpuHands.isScissor = data.playerCpuHands.isScissor

    store.playerOneWon = data.playerOneWon
    store.playerCpuWon = data.playerCpuWon
    store.isTie = data.isTie

    store.playerOneWins = data.playerOneWins
    store.playerCpuWins = data.playerCpuWins
    store.playerOneCurrentPoints = data.playerOneCurrentPoints
    store.playerCpuCurrentPoints = data.playerCpuCurrentPoints
  })
})
</script>

<style scoped>
</style>
