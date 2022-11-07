<template>
    <div id='playerOneComponent'>
        <div id="buttonsContainer">
            <h1>Player One</h1>
            <span>Wins: {{ store.playerOneWins }}</span>
            <span>Points: {{ store.playerOneCurrentPoints }}/3</span>
            <button :disabled="blockButton" :class="blockButton ? 'blocked' : ''" class='playerOneButtons' @click="chooseHand({ user: 'player1', hand: 'rock' })">Rock</button>
            <button :disabled="blockButton" :class="blockButton ? 'blocked' : ''" class='playerOneButtons' @click="chooseHand({ user: 'player1', hand: 'paper' })">Paper</button>
            <button :disabled="blockButton" :class="blockButton ? 'blocked' : ''" class='playerOneButtons' @click="chooseHand({ user: 'player1', hand: 'scissor' })">Scissor</button>
        </div>
        <div id="handContainer">
            <component v-if="waitingHand" :is="isComponent"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import RockHand from '../Rock/RockHand.vue'
import PaperHand from '../Paper/PaperHand.vue'
import ScissorHand from '../Scissor/ScissorHand.vue'
import { computed, ref, watch } from 'vue'
import useStore from '../../stores/gameStore'
import io from 'socket.io-client'

const store = useStore()
const socket = io('http://localhost:3000' || 'https://rps-socket.vercel.app/')

const isComponent = computed(() => {
    return store.playerOneHands.isRock ? RockHand : store.playerOneHands.isPaper ? PaperHand : store.playerOneHands.isScissor ? ScissorHand : null
})

const blockButton = computed(() => { return store.playerOneHands.isRock || store.playerOneHands.isScissor || store.playerOneHands.isPaper })

let waitingHand = ref(false)

watch(store.playerCpuHands, (cpuNewHand) => {
    if(cpuNewHand.isRock || cpuNewHand.isPaper || cpuNewHand.isScissor) {
        waitingHand.value = true
    } else {
        waitingHand.value = false
    }
})

function chooseHand(userInfo: object): void {
    socket.emit('userInfo', userInfo)
}
</script>

<style scoped>
#playerOneComponent {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 40vw;
    height: 80vh;
}
#buttonsContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
}
.playerOneButtons {
  width: 70%;
  height: 10%;
  border: 5px solid black;
  border-radius: 15px;
  color: #000;
  font-size: 30px;
  background-color: #fff;
  cursor: pointer;
}

#handContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
}
.blocked {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>