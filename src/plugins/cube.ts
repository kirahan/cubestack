import Vue from 'vue';
import CubeSample from './cubesample.vue'
import CubeStack from './cubestack.vue'
import World from './v4/cuber/world'
import Toucher from './v4/common/toucher';
import {CubeCongfig,Playerconfig,RenderConfig,PreferanceConfig,Themeconfig, packageDefaultConfig} from './v4/cuber/interfaces'
import {initlocalstorage, updatelocalstorage} from './v4/cuber/interfaces'

export {World,Toucher}
export {CubeCongfig,Playerconfig,RenderConfig,PreferanceConfig,Themeconfig, packageDefaultConfig}

let cube = {}
cube.install = function (Vue: Vue, options?: packageDefaultConfig) {
  initlocalstorage()
  try{
    if(Object.keys(options).length){
      let op: CubeCongfig = {
        model: 'packagedefault',
        renderconfig : options.renderconfig ? options.renderconfig : undefined,
        renderModelName : options.renderconfig ? 'default' : undefined,
        playerconfig : options.playerconfig ? options.playerconfig : undefined,
        themeconfig : options.themeconfig ? options.themeconfig : undefined,
        themeModelName : options.themeconfig ? 'default' : undefined,
        preferanceconfig : options.preferanceconfig ? options.preferanceconfig : undefined,
        preferanceModelName : options.preferanceconfig ? 'default' : undefined,
        bottomlayer : options.bottomlayer ? options.bottomlayer : undefined,
      }
  
      updatelocalstorage(op)
    }
  }catch{
    null
  }
 

  Vue.prototype.$cubemethod = {
    test(){
      console.log('run test')
    }
    
  }
  // Vue.initlocalstorage()

  Vue.component('cubesample', CubeSample)
  Vue.component('cubestack', CubeStack)
}
export default cube