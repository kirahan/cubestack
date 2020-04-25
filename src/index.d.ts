import Vue from 'vue'
import CubeStack from './plugins/cubestack.vue';
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $sampleRender: CubeStack;
    }
  }