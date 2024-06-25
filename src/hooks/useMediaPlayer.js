import { useContext } from 'react'
import { MediaPlayerContext } from "../context/media-player-context"

const useMediaPlayer = () => {
  const {state,actions} = useContext(MediaPlayerContext)
  return {
    ...state,
    ...actions
  }
}

export default useMediaPlayer
