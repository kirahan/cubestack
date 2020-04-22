# CubeStack
魔方栈主模块的组件抽象，方便开发者在自己的页面中绘制三维魔方


## [魔方栈原地址](https://gitee.com/huazhechen/cuber)
## 技术栈
- vuejs
- threejs
- typescript

# 特点
待描述

# 浏览器支持
待测试

# 安装
Using npm:  
`npm i cubestack`  

Using yarn:  
`yarn add cubestack`

# 自定义标签
1. `<cubesample></cubesample>` 样例
1. `<cubestack></cubestack>` 自定义

# 用法
## 最简单
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
### 效果： 一个不停旋转的3阶魔方
![](http://imagebed.solarsunrise.cn/blog/img/20200423054435.png)

# 其他例子
### 二阶
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

### 规定打乱
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


# 参数 options 
    renderconfig?: 渲染配置,
    preferanceconfig?: 属性配置,
    themeconfig?: 主题配置,
    playerconfig?: 操控配置,
    bottomlayer?: 默认底色

1. renderconfig
<table>
    <tbody>
    <td><ui>order<ui></td>
    <td><ui>阶数目<ui></td>
    </tbody>
    <tbody>
    <td><ui>alg<ui></td>
    <td><ui>打乱<ui></td>
    </tbody>
    <tbody>
    <td><ui>scene<ui></td>
    <td><ui>工作场景<ui></td>
    </tbody>
    <tbody>
    <td><ui>masktype<ui></td>
    <td><ui>遮罩类型<ui></td>
    </tbody>
    <tbody>
    <td><ui>size<ui></td>
    <td><ui>尺寸<ui></td>
    </tbody>
    <tbody>
    <td><ui>coverImgNotModel<ui></td>
    <td><ui>第一帧为图片<ui></td>
    </tbody>
</table> 

2. preferanceconfig
<table>
    <tbody>
    <td><ui>version<ui></td>
    <td><ui>版本<ui></td>
    </tbody>
    <tbody>
    <td><ui>scale<ui></td>
    <td><ui>比例<ui></td>
    </tbody>
    <tbody>
    <td><ui>perspective<ui></td>
    <td><ui>透视<ui></td>
    </tbody>
    <tbody>
    <td><ui>angle<ui></td>
    <td><ui>左右视角<ui></td>
    </tbody>
    <tbody>
    <td><ui>gradient<ui></td>
    <td><ui>上下视角<ui></td>
    </tbody>
    <tbody>
    <td><ui>frames<ui></td>
    <td><ui>帧率<ui></td>
    </tbody>
    <tbody>
    <td><ui>sensitivity<ui></td>
    <td><ui>触控灵敏度<ui></td>
    </tbody>
    <tbody>
    <td><ui>mirror<ui></td>
    <td><ui>镜像<ui></td>
    </tbody>
    <tbody>
    <td><ui>hollow<ui></td>
    <td><ui>空心<ui></td>
    </tbody>
    <tbody>
    <td><ui>shadow<ui></td>
    <td><ui>阴影<ui></td>
    </tbody>
</table>

3. themeconfig
<table>
    <tbody>
    <td><ui>version<ui></td>
    <td><ui>版本<ui></td>
    </tbody>
    <tbody>
    <td><ui>dark<ui></td>
    <td><ui>dark模式<ui></td>
    </tbody>
    <tbody>
    <td><ui>colors<ui></td>
    <td><ui>配色<ui></td>
    </tbody>
</table>

4. playerconfig
<table>
    <tbody>
    <td><ui>autoplay<ui></td>
    <td><ui>自动播放<ui></td>
    </tbody>
    <tbody>
    <td><ui>loop<ui></td>
    <td><ui>循环播放<ui></td>
    </tbody>
    <tbody>
    <td><ui>hoverplay<ui></td>
    <td><ui>移入播放<ui></td>
    </tbody>
    <tbody>
    <td><ui>lock<ui></td>
    <td><ui>操作锁定<ui></td>
    </tbody>
    <tbody>
    <td><ui>breath<ui></td>
    <td><ui>呼吸效果<ui></td>
    </tbody>
    <tbody>
    <td><ui>autorotate<ui></td>
    <td><ui>自动旋转<ui></td>
    </tbody>
</table>

5. bottomlayer 底层为什么颜色

# api
待更新

# Todo
- [ ] 设置面板 
- [ ] 播放进度面板
- [ ] 录像面板
- [ ] API
- [ ] 支持中html引用 