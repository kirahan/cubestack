import Vue from 'vue'
import App from './App.vue'
import cube, { packageDefaultConfig } from './plugins/cube'
Vue.config.productionTip = false
let options: packageDefaultConfig = {
  renderconfig:{
    order: 2,
    coverImgNotModel: false
  },
  // themeconfig: {
  //   colors: {
  //     U: '#121212',
  //   }
  // }
  // playerconfig:{
  //   autorotate: false,
  //   lock: false
  // }
}

Vue.use(cube, options)
// Vue.use(cube)
new Vue({
  render: h => h(App),
}).$mount('#app')
