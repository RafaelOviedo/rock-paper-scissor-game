<template>
    <div id='scissorComponent'>
        <img :src="scissorImage" alt="rock" id='scissorImage' />
    </div>
</template>

<script setup lang="ts">
import scissorImage from '../../assets/scissor.png'
</script>

<style scoped>
#scissorComponent {
    width: 45%;
    height: 25%;
}

#scissorImage {
    width: 100%;
    height: 100%;
}
</style>