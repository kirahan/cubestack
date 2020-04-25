<template>
  <div id="app">
    <cubesample></cubesample>
    <!-- <cubestack :cubeconfig="cubeconfig"></cubestack> -->
  </div>
</template>

<script lang="ts">
import {  Vue, Component } from 'vue-property-decorator';
import { CubeCongfig } from './plugins/cube';


@Component({name:'App',components:{}})
export default class App extends Vue {
  constructor(){
    super()
  }
  cubeconfig: CubeCongfig = {
    model : 'default'
  }
  
  mounted(){
    console.log(this.$sampleRender)
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
