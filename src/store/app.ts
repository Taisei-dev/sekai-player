// Utilities
import { defineStore } from 'pinia'

export type Config = {
  judgeOffset: number
  visualOffset: number
  speed: number
  effectVolume: number
  showSimLine: boolean
  mirror: boolean
}
export type LoadConfig = {
  mapContentSrc: string
  musicSrc: string
  coverSrc: string
  songName: string
}

export const useAppStore = defineStore('app', {
  state: () => ({
    //GameConfig
    judgeOffset: 0,
    visualOffset: 0,
    speed: 10.5,
    effectVolume: 1,
    showSimLine: true,
    mirror: false,
    //GameLoadConfig
    mapContentSrc: '',
    musicSrc: '',
    coverSrc: '',
    songName: 'Tell Your World - Master',
  }),
  getters: {
    GameConfig: (state) => {
      return {
        judgeOffset: state.judgeOffset,
        visualOffset: state.visualOffset,
        speed: state.speed,
        resolution: 1,
        noteScale: 1,
        barOpacity: 1,
        backgroundDim: 0.5,
        effectVolume: state.effectVolume,
        showSimLine: state.showSimLine,
        laneEffect: false,
        mirror: state.mirror,
        beatNote: true,
        debug: false,
      }
    },
    GameLoadConfig: (state) => {
      return {
        mapContent: () => {
          return fetch(state.mapContentSrc)
            .then((res) => res.arrayBuffer())
            .then((buffer) => {
              // @ts-ignore
              return new Zlib.Gunzip(new Uint8Array(buffer))
            })
            .then((gunzip) => {
              return gunzip.decompress()
            })
            .then((uint8Arr) => {
              return JSON.parse(new TextDecoder().decode(uint8Arr))
            })
            .then((data) => {
              console.log(data)
              return data
            })
        },
        musicSrc: state.musicSrc,
        loadingBackgroundSrc: '/loadBG.png',
        backgroundSrc: '/liveBG.png',
        coverSrc: state.coverSrc,
        skin: '/sekai',
        songName: state.songName,
      }
    },
  },
  actions: {
    setConfig(config: Config) {
      this.judgeOffset = config.judgeOffset
      this.visualOffset = config.visualOffset
      this.speed = config.speed
      this.effectVolume = config.effectVolume
      this.showSimLine = config.showSimLine
      this.mirror = config.mirror
    },
    setLoadConfig(config: LoadConfig) {
      this.mapContentSrc = config.mapContentSrc
      this.musicSrc = config.musicSrc
      this.coverSrc = config.coverSrc
      this.songName = config.songName
    },
  },
})
