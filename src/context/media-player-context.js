import React, { useState  } from 'react'
import { apiSetStorage, apiObjGetStorage, apiObjSetStorage } from '../utils/api'
import { unique } from 'shorthash'

const MediaPlayerContext = React.createContext([{}, () => {}])
const MediaPlayerProvider = (props) => {
  const [state, setState] = useState({
    isPlaying: false,
  })
  const setStateKeyVal = (key,val) => setState(state => ({ ...state, [key]: val }))

  const [isPaused, setIsPaused] = useState(false)

  const togglePlay = () => {
//    state.isPlaying ? player.pause() : player.play()
    setStateKeyVal( "isPlaying", !state.isPlaying )
  }

  const skipToNextTrack = () => {
//    playTrack(newIndex)
  }

  const onFinishedPlaying = () => {
console.log("onFinishedPlaying")
    if (state.curPlay) {
      const {curSerie, curEp} = state.curPlay
  console.log(curSerie)
      if (curSerie){
        if ((curSerie.fileList!=null) && (curSerie.fileList.length>0)
            && (curEp!=null)){
          // This serie has episodes
          let epInx = curEp.id
          epInx+=1
          let newPlayObj = {curSerie}
          apiObjSetStorage(newPlayObj,"curEp",epInx)
          if (curSerie.fileList[epInx]!=null){
            newPlayObj.curEp=curSerie.fileList[epInx]
          }
          setStateKeyVal( "curPlay", newPlayObj)
        }
      }
    }
  }

  const onStopPlaying = () => {
    setStateKeyVal( "curPlay", undefined )
    setStateKeyVal( "curSerie", undefined )
    setStateKeyVal( "curEp", undefined )
  }

  const onPlaying = (curPos) => {
    setStateKeyVal( "curPos", curPos )
  }

  const updateStorage = async (idStr,val) => {
    await apiSetStorage(idStr,val)
  }

  const startPlay = async (inx,curSerie,curEp) => {
    if (!curSerie){ // stop playing
      let newPlayObj
      setStateKeyVal( "curPlay", newPlayObj)
    } else {
      let tmpEp = curEp
      if ((!tmpEp) && (curSerie.fileList!=null)
          && (curSerie.fileList[inx]!=null)){
        tmpEp=curSerie.fileList[inx]
      }
      // This serie has episodes
      let newPlayObj = {curSerie,curEp}
      if (curEp!=null){
//          props.onStartPlay && props.onStartPlay(curSerie,curEp)
        await apiObjSetStorage({curSerie},"curEp",curEp.id)
        setStateKeyVal( "curPlay", newPlayObj)
      } else {
        apiObjGetStorage(newPlayObj,"curEp").then((value) => {
          if ((value==null)||(curSerie && curSerie.fileList && curSerie.fileList[value]==null)){
            value=0
            apiObjSetStorage(newPlayObj,"curEp",0)
          }
          if (curSerie && curSerie.fileList && curSerie.fileList[value]!=null){
            newPlayObj.curEp=curSerie.fileList[value]
          }
//            props.onStartPlay && props.onStartPlay(curSerie,curSerie.fileList[value])
          setStateKeyVal( "curPlay", newPlayObj)
        }).catch((err) => {
          console.error(err)
        })
      }
      const curSerId = unique(curSerie.title)
// navHist is not yet fully implemented
//      const navHist = {...state.navHist, [curSerId]: epIdStr}
//      await updateStorage("navHist",navHist)
      await updateStorage("curSerId",curSerId)
//      setState(state => ({...state, navHist,  curSerId, curSerie, curEp: tmpEp}))
      setState(state => ({...state, curSerId, curSerie, curEp: tmpEp}))
    }
  }

  const value = {
    state: {
      ...state,
      isPaused,
    },
    actions: {
      setState,
      startPlay,
      togglePlay,
      onStopPlaying,
      onPlaying,
      onFinishedPlaying,
      setIsPaused,
      skipToNextTrack,
    }
  }

  return (
    <MediaPlayerContext.Provider value={value}>
      {props.children}
    </MediaPlayerContext.Provider>
  )
}

//viewLibrary,

export {MediaPlayerContext, MediaPlayerProvider}
