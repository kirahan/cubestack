<template>
  <div
    ref="cube"
    class=""
    style="text-align:center"
    @mouseenter="hoverin"
    @mouseleave="hoverout"
    @touchstart="hoverin"
    @touchend="hoverout"
  ></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Inject, Prop, Ref, Watch } from "vue-property-decorator";
import { WebGLRenderer } from "three";
import { COLORS } from "./v4/cuber/define";
import Toucher from "./v4/common/toucher";
import World from "./v4/cuber/world";
import Preferance from "./v4/cuber/preferance";
import { Theme } from "./v4/cuber/theme";
import { CUBESTACKLOCAL, getrealcolorsconfig } from "./v4/cuber/localstorage";
import {
  CubeCongfig,
  Themeconfig,
  RenderConfig,
  Playerconfig,
  PreferanceConfig,
} from "./v4/cuber/interfaces";
import Cubelet from "./v4/cuber/cubelet";
const CubeStageMask = require("./v4/cuber/strip.json");

@Component({ name: "CubeStack", components: {} })
export default class CubeStack extends Vue {
  // @Inject('world')
  // 传入的cube
  @Prop()
  worldin: World;

  // 配置信息
  @Prop()
  cubeconfig: CubeCongfig;

  cubeconfigmodel: string

  // 魔方大小
  @Prop()
  cubesize: number[];

  // 画布所在的div
  @Ref("cube") canvasdiv!: HTMLDivElement;

  world: World;
  // 渲染配置
  renderconfig: RenderConfig = {};
  rendermodelname: string

  //属性配置
  preferanceconfig: PreferanceConfig = {};
  preferancemodelname: string

  // 动画播放配置
  playerconfig: Playerconfig = {};


  // 主题配置
  themeconfig: Themeconfig = {};
  thememodelname: string

  // 魔方主要参数
  preferance: Preferance;

  // 魔方主题
  theme: Theme;

  // 魔方名字
  cubename: string;

  // 画布
  canvas: HTMLCanvasElement;

  // 画布大小
  size: number[];

  //操控控制器
  toucher: Toucher;

  //封面是否是图片
  CoverImgOn: boolean;

  // 封面图片
  coverimg: HTMLImageElement;

  // 动画action
  action: string;

  // 渲染器
  renderer: WebGLRenderer;

  // loop记录
  loop_id: number;

  // 循环播放公式记录settimeout的key值
  looplay_id;

  // 保证同一时刻只有一个 loopplay函数执行
  looplayRunning: boolean = false;
  // 自动播放公式
  autoplay_id;

  @Watch("cubesize")
  onSizeChange() {
    this.size = this.cubesize;
    if (this.CoverImgOn) {
      this.coverimg.style.width = `${this.size[0]}px`;
    } else {
      this.resize(this.size[0], this.size[1]);
    }
  }

  @Watch("cubeconfig")
  onCubeConfigChange() {
    this.loadCubeConfig();
  }


  constructor(){
    super()
    this.world = this.worldin ? this.worldin : new World();
    this.preferance = new Preferance(this.world);
    this.theme = new Theme(this.world);
  }
  created(){
    this.loadCubeConfig()
  }

  loadCubeConfig() {
    if (this.cubeconfig) {
      
      // 读取模板信息
      this.cubeconfigmodel = this.cubeconfig.model || 'default'
      this.rendermodelname = this.cubeconfig.renderModelName || this.cubeconfig.model || 'default'
      this.preferancemodelname = this.cubeconfig.preferanceModelName || this.cubeconfig.model || 'default'
      this.thememodelname = this.cubeconfig.themeModelName || this.cubeconfig.model || 'default'


      // 读取总体模板
        if (this.cubeconfigmodel != "default") {
          let config: CubeCongfig = JSON.parse(
            window.localStorage.getItem(
              `${CUBESTACKLOCAL.CONFIG}${this.cubeconfigmodel}`
            )
          );
          this.renderconfig = config.renderconfig;
          this.playerconfig = config.playerconfig;
          this.preferanceconfig = config.preferanceconfig;
          this.themeconfig = config.themeconfig;
        } else {
          let config: CubeCongfig = JSON.parse(
            window.localStorage.getItem(CUBESTACKLOCAL.CONFIGDEFAULT)
          );
          this.renderconfig = config.renderconfig;
          this.playerconfig = config.playerconfig;
          this.preferanceconfig = config.preferanceconfig;
          this.themeconfig = config.themeconfig;

          let default_render = JSON.parse(
            window.localStorage.getItem(CUBESTACKLOCAL.RENDERDEFAULT)
          );
          let default_preferance = JSON.parse(
            window.localStorage.getItem(CUBESTACKLOCAL.PREFERANCEDEFAULT)
          );
          let default_theme = JSON.parse(
            window.localStorage.getItem(CUBESTACKLOCAL.THEMEDEFAULT)
          );
          let default_player = JSON.parse(
            window.localStorage.getItem(CUBESTACKLOCAL.PLAYERDEFAULT)
          );
          for (let param in default_render) {
            this.renderconfig[param] = default_render[param];
          }
          for (let param in default_preferance) {
            this.preferanceconfig[param] = default_preferance[param];
          }
          for (let param in default_theme) {
            if (param == "colors") {
              for (let color in default_theme.colors) {
                this.themeconfig.colors[color] = default_theme.colors[color];
              }
            } else {
              this.themeconfig[param] = default_theme[param];
            }
          }
          for (let param in default_player) {
            this.playerconfig[param] = default_player[param];
          }
        }

      // 读取render模板
        try {
          let config: RenderConfig = JSON.parse(
            window.localStorage.getItem(
              `${CUBESTACKLOCAL.RENDER}${this.rendermodelname}`
            )
          );
          for (let param in config) {
            this.renderconfig[param] = config[param];
          }
        } catch {
        }

      // 读取preferance模板
        try {
          let config: PreferanceConfig = JSON.parse(
            window.localStorage.getItem(
              `${CUBESTACKLOCAL.PREFERANCE}${this.preferancemodelname}`
            )
          );
          for (let param in config) {
            this.preferanceconfig[param] = config[param];
          }
        } catch {

        }

      // 读取theme模板

        try {
          let config: Themeconfig = JSON.parse(
            window.localStorage.getItem(
              `${CUBESTACKLOCAL.THEME}${this.thememodelname}`
            )
          );
           for (let param in config) {
            if (param == "colors") {
              for (let color in config.colors) {
                this.themeconfig.colors[color] = config.colors[color];
              }
            } else {
              this.themeconfig[param] = config[param];
            }
          }
        } catch {
      
        }

      // 读取单独配置的renderconfig和preferanceconfig和playerconfig和themeconfig
      for (let param in this.cubeconfig.renderconfig) {
        this.renderconfig[param] = this.cubeconfig.renderconfig[param];
      }

      for (let param in this.cubeconfig.preferanceconfig) {
        this.preferanceconfig[param] = this.cubeconfig.preferanceconfig[param];
      }

      for (let param in this.cubeconfig.playerconfig) {
        this.playerconfig[param] = this.cubeconfig.playerconfig[param];
      }

      for (let param in this.cubeconfig.themeconfig) {
        this.themeconfig[param] = this.cubeconfig.themeconfig[param];
      }

      // 保存主要配置
      this.size = this.cubesize
        ? this.cubesize
        : this.renderconfig.size || [200, 200];
      this.cubename = this.cubeconfig.cubename;
      this.CoverImgOn = this.renderconfig.coverImgNotModel;
      this.world.order = this.renderconfig.order || 3;

      // 不能再阶数选择之前
      this.preferance.load(JSON.stringify(this.preferanceconfig));
      this.preferance.refresh();

      // 设置底色
      let bottomlayer = this.cubeconfig.bottomlayer || window.localStorage.getItem(CUBESTACKLOCAL.BOTTOMLAYER) || 'D'
      this.setbottom(bottomlayer)

      // 设置遮罩层
      if (this.world.order == 3 && this.renderconfig.masktype) {
        try {
          const strip = CubeStageMask[this.renderconfig.masktype].strip;
          if (strip) {
            this.world.cube.strip(strip);
          }
        } catch {}
      }

      this.world.cube.dirty = true;

      // 设置初始action
      this.action =
        this.renderconfig.scene == "^"
          ? "(" + this.renderconfig.alg + ")'"
          : this.renderconfig.alg;

      if (this.action) {
        this.world.twister.finish();
        this.world.twister.twist("#");
        this.world.twister.twist(this.action, false, 1, true);
        this.world.cube.history.clear();
      }

      // 魔方是否锁定，用controler 不能用 cube
      this.world.controller.lock = this.playerconfig.lock;
    }
  }

  setbottom(layer: string){
    // 设置底色
      let themeconfig = JSON.parse(JSON.stringify(this.themeconfig))
      let colors = themeconfig.colors
      let newcolors = getrealcolorsconfig(layer, colors)
      themeconfig.colors = newcolors
      // for(let key in colors){
      //   console.log(key, this.themeconfig.colors[key], newcolors[key])
      // }
      this.theme.load(JSON.stringify(themeconfig));
      this.theme.refresh();
  }


  setThemeColors(config) {
    for (let con in config) {
      this.themeconfig.colors[con] = config[con];
    }
    let bottomlayer = window.localStorage.getItem(CUBESTACKLOCAL.BOTTOMLAYER) || 'D'
    this.setbottom(bottomlayer)
  }

  undoThemeColors() {
    this.loadCubeConfig()
  }

  resetThemeColors() {
    let localname = CUBESTACKLOCAL.CONFIG + this.cubeconfigmodel
    let themename = CUBESTACKLOCAL.THEME + this.thememodelname
    try {
      let themebackup = JSON.parse(window.localStorage.getItem(localname)).themeconfig;
      window.localStorage.setItem(themename, JSON.stringify(themebackup))
    } catch(err){
      console.log(err)
    }
    this.loadCubeConfig()
  }

  saveThemeColors() {
    let localname = CUBESTACKLOCAL.THEME+this.thememodelname
    const datajson = JSON.stringify(this.themeconfig);
    try {
        window.localStorage.setItem(localname, datajson);
      }
    catch(err){
      console.log(err)
    }
  }

  resize(width: number, height: number) {
    this.world.width = width;
    this.world.height = height;
    this.world.resize();
    this.renderer.setSize(width, height, true);
    // let view = this.canvasdiv;
    // if (view instanceof HTMLElement) {
    //     view.style.width = width + "px";
    //     view.style.height = height + "px";
    //     }
    this.world.dirty = true;
  }

  mounted() {
    // 初始化画布
    this.createrender();
    // 封面是否渲染为图片
    if (this.CoverImgOn) {
      // 根据渲染模型生成缩略图
      const content = this.renderer.domElement.toDataURL("image/png");
      this.coverimg = document.createElement("img");
      this.coverimg.style.objectFit = "contain";
      this.coverimg.style.width = this.size[0] + "px";
      this.coverimg.src = content;
      this.canvasdiv.appendChild(this.coverimg);
      this.removerender();
    }

    if (this.playerconfig.autoplay && this.CoverImgOn == false) {
      this.autoplay();
    }

    this.loop();
  }

  // 绘制一帧画面
  draw() {
    if (this.world.dirty || this.world.cube.dirty) {
      this.renderer.clear();
      this.renderer.render(this.world.scene, this.world.camera);
      this.world.dirty = false;
      this.world.cube.dirty = false;
      return true;
    }
    return false;
  }

  //  设置操控偏移
  setoffset(canvas: HTMLCanvasElement = this.canvas) {
    this.toucher.setoffset(canvas);
  }

  // 生成render、画第一帧、设置偏移
  createrender() {
    // 初始化画布
    this.canvas = document.createElement("canvas");
    this.canvas.style.outline = "none";
    // 初始化touch
    this.toucher = new Toucher();
    this.toucher.init(this.canvas, this.world.controller.touch);

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.autoClear = false;
    this.renderer.setClearColor(COLORS.WHITE, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // 画出canvas
    this.canvasdiv.appendChild(this.renderer.domElement);
    // 调整画布大小
    this.resize(this.size[0], this.size[1]);
    // 画一帧
    this.draw();
    // 设置偏移
    this.setoffset();
  }

  // 移除canvas 销毁render
  removerender() {
    // 销毁和清除renderer
    this.renderer.clear();
    this.renderer.dispose();
    this.renderer = null;

    // 删除canvas 添加图片标签
    this.canvasdiv.removeChild(this.canvas);
    this.canvas = null;
  }

  // 魔方回到初始状态
  initcube() {
    // 快速结束
    this.world.twister.finish();
    // 魔方复原
    this.world.twister.twist("#");
    // 回到初始态
    this.world.twister.twist(this.action, false, 1, true);
    // 清除记录
    this.world.cube.history.clear();
  }

  // 魔方循环播放
  loopplay() {
    if (this.looplayRunning == false) {
      this.looplayRunning = true;
      this.world.twister.twist(this.renderconfig.alg, false, 1, false, () => {
        this.initcube();
        this.looplay_id = setTimeout(() => {
          this.looplayRunning = false;
          this.loopplay();
        }, 2000);
      });
    }
  }

  // 魔方循环播放
  autoplay() {
    this.world.twister.twist(this.renderconfig.alg, false, 1, false, () => {
      this.initcube();
      this.autoplay_id = setTimeout(() => {
        this.autoplay();
      }, 2000);
    });
  }

  hoverin() {
    if (this.playerconfig.autoplay == false) {
      if (this.CoverImgOn) {
        // 生成render和重绘
        this.coverimg.style.display = "none";
        this.createrender();
        // 清除图片
      }
      if (this.playerconfig.hoverplay) {
        if (this.playerconfig.loop) {
          this.loopplay();
        } else {
          this.world.twister.twist(this.renderconfig.alg, false, 1, false);
        }
      }
      this.loop();
    }
  }

  hoverout() {
    if (this.playerconfig.autoplay == false) {
      // 重回起始状态
      if (this.playerconfig.hoverplay) {
        if (this.playerconfig.loop) {
          clearTimeout(this.looplay_id);
        }
        this.initcube();
        this.looplayRunning = false;
      }

      if (this.CoverImgOn) {
        // 绘制
        // 没有这个魔方会节能，从而导致截图出现黑屏
        this.world.dirty = true;
        this.draw();
        // 根据渲染模型生成缩略图
        const content = this.renderer.domElement.toDataURL("image/png");
        // 移除render
        this.removerender();
        // 修改图片属性
        this.coverimg.style.display = "";
        this.coverimg.style.objectFit = "contain";
        this.coverimg.src = content;
        cancelAnimationFrame(this.loop_id);
      } else {
      }
    }
  }

  loop() {
    // 刷新
    this.loop_id = requestAnimationFrame(this.loop.bind(this));
    // 是否呼吸
    if (this.playerconfig.breath) {
      let tick = new Date().getTime();
      tick = (tick / 2000) * Math.PI;
      tick = Math.sin(tick) / 32;
      this.world.cube.position.y = tick * Cubelet.SIZE;
      this.world.cube.rotation.y = (tick / 12) * Math.PI;
      this.world.cube.updateMatrix();
    }

    // 是否自旋
    if (this.playerconfig.autorotate) {
      let tick = new Date().getTime();
      tick = (tick / 2000) * Math.PI;
      this.world.cube.rotation.y = (tick / 12) * Math.PI;
      this.world.cube.updateMatrix();
    }
    try {
      this.world.cube.dirty = true;
      this.draw();
    } catch {
      cancelAnimationFrame(this.loop_id);
    }
  }
}
</script>

<style scoped></style>
