import Vue from 'vue'
import {CubeStackInstance} from './plugins/v4/cuber/interfaces';
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $sampleRender: CubeStackInstance;
    }
  }