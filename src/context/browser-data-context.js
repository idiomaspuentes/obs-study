import React, { useState, useEffect } from 'react'

const BrowserDataContext = React.createContext([{}, () => {}])
const BrowserDataProvider = ({children}) => {
  const [state, setState] = useState({ width: 400, height: 100,
                                       size: "xs", orientation: "landscape" })
  const setStateKeyVal = (key,val) => setState(state => ({ ...state, [key]: val }))
  useEffect(() => {
    const updateSize = () => {
      const clientWidth = (typeof window !== `undefined`) ? window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth : 400
      const clientHeight = (typeof window !== `undefined`) ? window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight : 400
      setStateKeyVal("width",clientWidth)
      setStateKeyVal("height",clientHeight)
      setStateKeyVal("orientation",(clientWidth > clientHeight) ? "landscape" : "portrait")
      let s = "xs"
      if (clientWidth>=1200) s = "xl"
      else if (clientWidth>=992) s = "lg"
      else if (clientWidth>=768) s = "md"
      else if (clientWidth>=576) s = "sm"
      setStateKeyVal("size",s)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  },[])

  useEffect(() => {
    setState(state => ({ ...state }))
  },[])


  return (
    <BrowserDataContext.Provider value={[state, setState]}>
      {children}
    </BrowserDataContext.Provider>
  )
}
export {BrowserDataContext, BrowserDataProvider}
