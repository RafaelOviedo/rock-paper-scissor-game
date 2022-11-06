<template>
    <div id='paperComponent'>
        <img :src="paperImage" alt="rock" id='paperImage' />
    </div>
</template>

<script setup lang="ts">
import paperImage from '../../assets/paper.png'
</script>

<style scoped>
#paperComponent {
    width: 45%;
    height: 25%;
}

#paperImage {
    width: 100%;
    height: 100%;
}
</style>