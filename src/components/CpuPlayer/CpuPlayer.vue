<template>
    <div id='cpuComponent'>
        <div id="handContainer">
            <component v-if="waitingHand" :is="isComponent"></component>
        </div>
        <div id="buttonsContainer">
            <h1>Player Cpu</h1>
            <span>Wins: {{ store.playerCpuWins }}</span>
            <span>Points: {{ store.playerCpuCurrentPoints }}/3</span>
            <button :disabled="blockButton" :class="blockButton ? 'blocked' : ''" class='cpuButton' @click="chooseHand({ user: 'playerCpu', hand: 'rock' })">Rock</button>
            <button :disabled="blockButton" :class="blockButton ? 'blocked' : ''" class='cpuButton' @click="chooseHand({ user: 'playerCpu', hand: 'paper' })">Paper</button>
            <button :disabled="blockButton" :class="blockButton ? 'blocked' : ''" class='cpuButton' @click="chooseHand({ user: 'playerCpu', hand: 'scissor' })">Scissor</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import RockHand from '../Rock/RockHand.vue'
import PaperHand from '../Paper/PaperHand.vue'
import ScissorHand from '../Scissor/ScissorHand.vue'
import { computed, watch, ref } from 'vue'
import useStore from '@/stores/gameStore'
import io from 'socket.io-client'

const store = useStore()
const socket = io('https://rps-socket.vercel.app/')

const isComponent = computed(() => {
    return store.playerCpuHands.isRock ? RockHand : store.playerCpuHands.isPaper ? PaperHand : store.playerCpuHands.isScissor ? ScissorHand : null
})

const blockButton = computed(() => { return store.playerCpuHands.isRock || store.playerCpuHands.isScissor || store.playerCpuHands.isPaper })

let waitingHand = ref(false)

watch(store.playerOneHands, (playerOneNewHand) => {
    if(playerOneNewHand.isRock || playerOneNewHand.isPaper || playerOneNewHand.isScissor) {
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
#cpuComponent {
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
.cpuButton {
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
    pointer-events: none;
}
</style>