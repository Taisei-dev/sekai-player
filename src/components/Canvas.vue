<template>
    <canvas width="1272" height="1080"></canvas>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
const store=useAppStore()
export default {
    mounted(){
        try{
            console.log(store.GameLoadConfig)
            // @ts-ignore
            let game=new BangGame.Game(this.$el,store.GameConfig,store.GameLoadConfig)
            game.start()
            game.ondestroyed=()=>{
                this.$router.push('/')
            }
        }catch(e){
            console.log(e)
        }
    }
}
</script>

<style scoped>
canvas{
    width:100%;
    height:100%
}
</style>