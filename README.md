# CubeStack
todo


## [CubeStack Original Version](https://gitee.com/huazhechen/cuber)
## Technology stack
- vuejs
- threejs
- typescript

# Teather
TODO

# Browser Support
TODO

# Installing
Using npm:  
`npm i cubestack`  

Using yarn:  
`yarn add cubestack`

# Vue custom tags
1. `<cubesample></cubesample>` cube sample
1. `<cubestack></cubestack>` custom cube

# Useage
## simple example
***main.js/main.ts***

```
import cubefrom 'cubestack'
Vue.config.productionTip = false
Vue.use(cube)
```

***yourcomponment.vue***
```
<template>
  <div id="app" style="background-color:#9C27B0">
    <cubesample></cubesample>
</template>
```
### a rotating 3x3x3 cube
![](http://imagebed.solarsunrise.cn/blog/img/20200423054435.png)

# Other Example
### 2x2x2 cube
***main.js/main.ts***

```
import cube, {packageDefaultConfig} from 'cubestack'
const options: packageDefaultConfig = {
  renderconfig: {
    order: 2,
  },
}

Vue.use(cube, options)
```

***yourcomponment.vue***
```
<template>
  <div id="app" style="background-color:#9C27B0">
    <cubesample></cubesample>
</template>
```
![](http://imagebed.solarsunrise.cn/blog/img/20200423054721.png)

### set scramble
***main.js/main.ts***

```
import cube, {packageDefaultConfig} from 'cubestack'
const options: packageDefaultConfig = {
  renderconfig: {
    alg: 'RURUFB'
  },
}

Vue.use(cube, options)
```

***yourcomponment.vue***
```
<template>
  <div id="app" style="background-color:#9C27B0">
    <cubesample></cubesample>
</template>
```
![](http://imagebed.solarsunrise.cn/blog/img/20200423054828.png)


# options 
    renderconfig,
    preferanceconfig,
    themeconfig,
    playerconfig,
    bottomlayer

1. renderconfig
<table>
    <tbody>
    <td><ui>order<ui></td>
    <td><ui>cube order<ui></td>
    </tbody>
    <tbody>
    <td><ui>alg<ui></td>
    <td><ui>scramble<ui></td>
    </tbody>
    <tbody>
    <td><ui>scene<ui></td>
    <td><ui>working scene<ui></td>
    </tbody>
    <tbody>
    <td><ui>masktype<ui></td>
    <td><ui>the masktype of cube<ui></td>
    </tbody>
    <tbody>
    <td><ui>size<ui></td>
    <td><ui>size of cube<ui></td>
    </tbody>
    <tbody>
    <td><ui>coverImgNotModel<ui></td>
    <td><ui>the first frame is img or model<ui></td>
    </tbody>
</table> 

2. preferanceconfig
<table>
    <tbody>
    <td><ui>version<ui></td>
    <td><ui>version<ui></td>
    </tbody>
    <tbody>
    <td><ui>scale<ui></td>
    <td><ui>scale<ui></td>
    </tbody>
    <tbody>
    <td><ui>perspective<ui></td>
    <td><ui>perspective<ui></td>
    </tbody>
    <tbody>
    <td><ui>angle<ui></td>
    <td><ui>Horizontal perspective<ui></td>
    </tbody>
    <tbody>
    <td><ui>gradient<ui></td>
    <td><ui>Vertical perspective<ui></td>
    </tbody>
    <tbody>
    <td><ui>frames<ui></td>
    <td><ui>frames rate<ui></td>
    </tbody>
    <tbody>
    <td><ui>sensitivity<ui></td>
    <td><ui>sensitivity of touch control<ui></td>
    </tbody>
    <tbody>
    <td><ui>mirror<ui></td>
    <td><ui>mirror show or hide<ui></td>
    </tbody>
    <tbody>
    <td><ui>hollow<ui></td>
    <td><ui>hollow or solid<ui></td>
    </tbody>
    <tbody>
    <td><ui>shadow<ui></td>
    <td><ui>shadow<ui></td>
    </tbody>
</table>

3. themeconfig
<table>
    <tbody>
    <td><ui>version<ui></td>
    <td><ui><ui></td>
    </tbody>
    <tbody>
    <td><ui>dark<ui></td>
    <td><ui>dark or light<ui></td>
    </tbody>
    <tbody>
    <td><ui>colors<ui></td>
    <td><ui>cube colors<ui></td>
    </tbody>
</table>

4. playerconfig
<table>
    <tbody>
    <td><ui>autoplay<ui></td>
    <td><ui><ui></td>
    </tbody>
    <tbody>
    <td><ui>loop<ui></td>
    <td><ui><ui></td>
    </tbody>
    <tbody>
    <td><ui>hoverplay<ui></td>
    <td><ui><ui></td>
    </tbody>
    <tbody>
    <td><ui>lock<ui></td>
    <td><ui><ui></td>
    </tbody>
    <tbody>
    <td><ui>breath<ui></td>
    <td><ui><ui></td>
    </tbody>
    <tbody>
    <td><ui>autorotate<ui></td>
    <td><ui><ui></td>
    </tbody>
</table>

5. bottomlayer set the color of bottomlayer 
default bottom layer is white color
- U yellow
- D white
- R red
- L orange
- F green
- B blue

# api
todo

# Todo
- [ ] setting pannel 
- [ ] player pannel
- [ ] record pannel
- [ ] API
- [ ] support html file