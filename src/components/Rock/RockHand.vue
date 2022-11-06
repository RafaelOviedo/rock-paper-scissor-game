<template>
    <div id='rockComponent'>
        <img :src="rockImage" alt="rock" id='rockImage' />
    </div>
</template>

<script setup lang="ts">
import rockImage from '../../assets/rock.png'
</script>

<style scoped>
#rockComponent {
    width: 45%;
    height: 25%;
}

#rockImage {
    width: 100%;
    height: 100%;
}
</style>