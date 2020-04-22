import Toucher from '../common/toucher';
import World from "./world";


export class PreferanceConfig{
    version?: string 
    scale?: number
    perspective?: number
    angle?: number
    gradient?: number
    frames?: number
    sensitivity?: number
    mirror?: boolean
    hollow?: boolean
    shadow?: boolean

    constructor(){
        this.version = '0.1'
        this.scale= 50
        this.perspective= 50
        this.angle= 63
        this.gradient= 67
        this.frames= 30
        this.sensitivity= 3
        this.mirror= false
        this.hollow= false
        this.shadow= true
    }
}

export class Playerconfig{
        autoplay?: boolean
        loop?: boolean
        hoverplay?: boolean
        lock?: boolean
        breath?: boolean
        autorotate?: boolean
        constructor(){
        this.autoplay = false,
        this.loop = false,
        this.hoverplay = true,
        this.lock = false
        this.breath = false
        this.autorotate = false
        }
}


export interface RenderConfig{
    order?: number,
    alg?: string
    scene?: string
    masktype?: string,
    size?: number[],
    coverImgNotModel?: boolean,
}


export interface Colors{
    R?: string
    L?: string,
    U?: string,
    D?: string,
    F?: string,
    B?: string,
    Core?: string,
    High?: string,
    Gray?: string
}

export interface Themeconfig{
    version?: string 
    dark?: boolean
    colors?: Colors
}


export interface packageDefaultConfig{
    renderconfig?: RenderConfig,
    preferanceconfig?: PreferanceConfig,
    themeconfig?: Themeconfig,
    playerconfig?: Playerconfig,
    bottomlayer?: string
}


export interface CubeCongfig {
    version?: string,
    cubename?: string,
    model?: string,
    renderModelName?: string,
    renderconfig?: RenderConfig,
    preferanceModelName?: string,
    preferanceconfig?: PreferanceConfig,
    playerconfig?: Playerconfig,
    themeModelName?: string,
    themeconfig?: Themeconfig,
    bottomlayer?: string
}

export function initlocalstorage(){
    let temp: CubeCongfig = {
           version: '0.4',
           model: 'default',
           renderModelName: 'default',
           renderconfig:{
               order: 3,
               size: [300,300],
               coverImgNotModel: true,
               scene:'',
               alg: "",
               masktype: ''
           },
           preferanceModelName: 'default',
           preferanceconfig: {
                   version: "0.4",
                   scale: 50,
                   perspective: 50,
                   angle: 60,
                   gradient: 65,
                   frames: 20,
                   sensitivity: 3,
                   mirror: false,
                   hollow: false,
                   shadow: true,
               },
           playerconfig: {
               autoplay: false,
               loop: false,
               hoverplay: true,
               lock: true,
               breath: false,
               autorotate:false
           },
           themeModelName : 'default',
           themeconfig:{
             version: "0.4",
             dark: false,
             colors: {
                   L: "#B71C1C",
                   R: "#FF6D00",
                   D: "#FFFFFF",
                   U: "#FFD600",
                   F: "#00A020",
                   B: "#0D47A1",
                   Core: "#202020",
                   High: "#FF4081",
                   Gray: "#606060"
             }
           },
           bottomlayer: '白'
           
       }

     let render = JSON.stringify(temp.renderconfig)
     let preferance = JSON.stringify(temp.preferanceconfig)
     let theme = JSON.stringify(temp.themeconfig)
     let player = JSON.stringify(temp.playerconfig)
     let newconfig = JSON.stringify(temp)

    //  如果版本不一致就更新
     if(temp.version!= window.localStorage.getItem('cubestack-cubeconfig:default-version')){
         window.localStorage.setItem('cubestack-cubeconfig:default', newconfig)
         window.localStorage.setItem('cubestack-cubeconfig:default-version', temp.version)
         window.localStorage.setItem('cubestack-theme:default', theme)
         window.localStorage.setItem('cubestack-render:default', render)
         window.localStorage.setItem('cubestack-player', player)
         window.localStorage.setItem('cubestack-preferance:default', preferance)
         window.localStorage.setItem('cubestack-bottomlayer', temp.bottomlayer)
         window.localStorage.setItem('cubestack:version', temp.version)
     }

    //  如果是空就写入
     if(!window.localStorage.getItem('cubestack-cubeconfig:default')){
       window.localStorage.setItem('cubestack-cubeconfig:default', newconfig)
       window.localStorage.setItem('cubestack-cubeconfig:default-version', temp.version)
     }
     if(!window.localStorage.getItem('cubestack-theme:default')){
       window.localStorage.setItem('cubestack-theme:default', theme)
     }
     if(!window.localStorage.getItem('cubestack-render:default')){
       window.localStorage.setItem('cubestack-render:default', render)
     }
     if(!window.localStorage.getItem('cubestack-preferance:default')){
       window.localStorage.setItem('cubestack-preferance:default', preferance)
     }
     if(!window.localStorage.getItem('cubestack-player')){
        window.localStorage.setItem('cubestack-player', player)
      }
  }

export function updatelocalstorage(config: CubeCongfig){
     let version = config.version

     if(config.model == 'packagedefault'){
        window.localStorage.setItem(`cubestack-cubeconfig:default-version`,'packagedefault')
     }else if(config.model && !window.localStorage.getItem(`cubestack-cubeconfig:${config.model}`)){
        window.localStorage.setItem(`cubestack-cubeconfig:${config.model}`,JSON.stringify(config))
        window.localStorage.setItem(`cubestack-cubeconfig:${config.model}-version`,JSON.stringify(version))
     }else if(config.model &&  version !== window.localStorage.getItem(`cubestack-cubeconfig:${config.model}-version`)){
        window.localStorage.setItem(`cubestack-cubeconfig:${config.model}`,JSON.stringify(config))
        window.localStorage.setItem(`cubestack-cubeconfig:${config.model}-version`,JSON.stringify(version))
     }

     if(config.renderModelName){
        window.localStorage.setItem(`cubestack-render:${config.renderModelName}`,JSON.stringify(config.renderconfig))
     }

     if(config.themeModelName){
        window.localStorage.setItem(`cubestack-theme:${config.themeModelName}`,JSON.stringify(config.themeconfig))
     }

     if(config.preferanceModelName){
        window.localStorage.setItem(`cubestack-preferance:${config.preferanceModelName}`,JSON.stringify(config.preferanceModelName))
     }

     if(config.playerconfig){
        window.localStorage.setItem(`cubestack-player`,JSON.stringify(config.playerconfig))
     }

}





