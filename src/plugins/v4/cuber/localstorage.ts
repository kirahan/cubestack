import { CubeCongfig } from './interfaces'
export const CUBESTACKLOCAL = {
    CONFIG: 'cubestack-cubeconfig:',
    CONFIGDEFAULT: 'cubestack-cubeconfig:default',
    CONFIGDEFAULTVERSION: 'cubestack-cubeconfig:default-version',

    THEME: 'cubestack-theme:',
    THEMEDEFAULT:'cubestack-theme:default',
    
    RENDER: 'cubestack-render:',
    RENDERDEFAULT:'cubestack-render:default',
    
    PLAYER: 'cubestack-player:',
    PLAYERDEFAULT:'cubestack-player',
    
    PREFERANCE: 'cubestack-preferance:',
    PREFERANCEDEFAULT: 'cubestack-preferance:default',

    BOTTOMLAYER: 'cubestack-bottomlayer',

    VERSION: 'cubestack:version'

}



export function initlocalstorage(){
    let temp: CubeCongfig = {
        version: '0.4',
        model: 'default',
        renderModelName: 'default',
        renderconfig:{
            order: 3,
            size: [300,300],
            coverImgNotModel: false,
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
        bottomlayer: 'D'
    }

  let render = JSON.stringify(temp.renderconfig)
  let preferance = JSON.stringify(temp.preferanceconfig)
  let theme = JSON.stringify(temp.themeconfig)
  let player = JSON.stringify(temp.playerconfig)
  let newconfig = JSON.stringify(temp)

 //  如果版本不一致就更新
  if(temp.version!= window.localStorage.getItem(CUBESTACKLOCAL.CONFIGDEFAULTVERSION)){
      window.localStorage.setItem(CUBESTACKLOCAL.CONFIGDEFAULT, newconfig)
      window.localStorage.setItem(CUBESTACKLOCAL.CONFIGDEFAULTVERSION, temp.version)
      window.localStorage.setItem(CUBESTACKLOCAL.THEMEDEFAULT, theme)
      window.localStorage.setItem(CUBESTACKLOCAL.RENDERDEFAULT, render)
      window.localStorage.setItem(CUBESTACKLOCAL.PLAYERDEFAULT, player)
      window.localStorage.setItem(CUBESTACKLOCAL.PREFERANCEDEFAULT, preferance)
      window.localStorage.setItem(CUBESTACKLOCAL.BOTTOMLAYER, temp.bottomlayer)
      window.localStorage.setItem(CUBESTACKLOCAL.VERSION, temp.version)
  }

 //  如果是空就写入
  if(!window.localStorage.getItem(CUBESTACKLOCAL.CONFIGDEFAULT)){
    window.localStorage.setItem(CUBESTACKLOCAL.CONFIGDEFAULT, newconfig)
    window.localStorage.setItem(CUBESTACKLOCAL.CONFIGDEFAULTVERSION, temp.version)
  }
  if(!window.localStorage.getItem(CUBESTACKLOCAL.THEMEDEFAULT)){
    window.localStorage.setItem(CUBESTACKLOCAL.THEMEDEFAULT, theme)
  }
  if(!window.localStorage.getItem(CUBESTACKLOCAL.RENDERDEFAULT)){
    window.localStorage.setItem(CUBESTACKLOCAL.RENDERDEFAULT, render)
  }
  if(!window.localStorage.getItem(CUBESTACKLOCAL.PREFERANCEDEFAULT)){
    window.localStorage.setItem(CUBESTACKLOCAL.PREFERANCEDEFAULT, preferance)
  }
  if(!window.localStorage.getItem(CUBESTACKLOCAL.PLAYERDEFAULT)){
     window.localStorage.setItem(CUBESTACKLOCAL.PLAYERDEFAULT, player)
   }
}


export function updatelocalstorage(config: CubeCongfig){
    let version = config.version

    if(config.model == 'packagedefault'){
       window.localStorage.setItem(CUBESTACKLOCAL.CONFIGDEFAULTVERSION,'packagedefault')
    }else if(config.model && !window.localStorage.getItem(`${CUBESTACKLOCAL.CONFIG}${config.model}`)){
       window.localStorage.setItem(`${CUBESTACKLOCAL.CONFIG}${config.model}`,JSON.stringify(config))
       window.localStorage.setItem(`${CUBESTACKLOCAL.CONFIG}${config.model}-version`,JSON.stringify(version))
    }else if(config.model &&  version !== window.localStorage.getItem(`${CUBESTACKLOCAL.CONFIG}${config.model}-version`)){
       window.localStorage.setItem(`${CUBESTACKLOCAL.CONFIG}${config.model}`,JSON.stringify(config))
       window.localStorage.setItem(`${CUBESTACKLOCAL.CONFIG}${config.model}-version`,JSON.stringify(version))
    }

    if(config.renderModelName){
       window.localStorage.setItem(`${CUBESTACKLOCAL.RENDER}${config.renderModelName}`,JSON.stringify(config.renderconfig))
    }

    if(config.themeModelName){
       window.localStorage.setItem(`${CUBESTACKLOCAL.THEME}${config.themeModelName}`,JSON.stringify(config.themeconfig))
    }

    if(config.preferanceModelName){
       window.localStorage.setItem(`${CUBESTACKLOCAL.PREFERANCE}${config.preferanceModelName}`,JSON.stringify(config.preferanceModelName))
    }

    if(config.playerconfig){
       window.localStorage.setItem(`${CUBESTACKLOCAL.PLAYERDEFAULT}`,JSON.stringify(config.playerconfig))
    }

}


const FACE ={
    R: 'R',
    L: 'L',
    F: 'F',
    B: 'B',
    U: 'U',
    D: 'D',
}

export function getrealcolorsconfig(bottomlayer: string, colors: any): object{
    switch(bottomlayer){
        case FACE.D:
            return colors
        case FACE.U:
            [colors['U'],colors['D']] = [colors['D'],colors['U']]
            [colors['R'],colors['L']] = [colors['L'],colors['R']]
            return colors
        case FACE.R:
            [colors['D'],colors['R'],colors['U'],colors['L']] = [colors['R'],colors['U'],colors['L'],colors['D']]
            return colors
        case FACE.L:
            [colors['D'],colors['R'],colors['U'],colors['L']] = [colors['L'],colors['D'],colors['R'],colors['U']]
            return colors
        case FACE.F:
            [colors['D'],colors['F'],colors['U'],colors['B']] = [colors['F'],colors['U'],colors['B'],colors['D']]
            return colors
        case FACE.B:
            [colors['D'],colors['F'],colors['U'],colors['B']] = [colors['B'],colors['D'],colors['F'],colors['U']]
            return colors
        default:
            return colors
    }
}


export function setbottomlayer(bottomlayer: string){
    // let colors = getrealcolorsconfig(bottomlayer,themename)
    window.localStorage.setItem(CUBESTACKLOCAL.BOTTOMLAYER,bottomlayer)
    // return colors
}
