import { defineStore } from 'pinia'

const useStore = defineStore('game', {
  state: () => ({
    playerOneHands: {
      isRock: false,
      isPaper: false,
      isScissor: false
    },
    playerCpuHands: {
      isRock: false,
      isPaper: false,
      isScissor: false
    },
    playerOneWon: false,
    playerCpuWon: false,
    isTie: false,

    playerOneWins: 0,
    playerCpuWins: 0,

    playerOneCurrentPoints: 0,
    playerCpuCurrentPoints: 0,
  })
})

export default useStore;