<template>
    <div style="padding:0px">
        <CubeStack :worldin="world" :cubeconfig="cubeconfig" :cubesize="cubesize" ref='render' ></CubeStack>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch} from 'vue-property-decorator'
import CubeStack from './cubestack.vue';
import { CubeCongfig } from './v4/cuber/interfaces'
import World from './v4/cuber/world';

@Component({name:'CubeSample',components:{CubeStack}})
export default class CubeSample extends Vue{
    constructor(){
    super()
    }

    @Ref('render') render: CubeStack

    world: World = new World()

    cubeconfig: CubeCongfig =  {
            cubename : 'cubesample',
            model: 'default',
            renderconfig:{
                coverImgNotModel: false
            },
            playerconfig: {
                hoverplay: false,
                autoplay: false,
                breath: true,
                lock:true,
                loop:false,
                autorotate:true
            }
        }
    cubesize: number[] = [400,400]

}
</script>


<style scoped>

</style>