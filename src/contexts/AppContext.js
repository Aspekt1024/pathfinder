import { createContext, useState } from "react"

export const appState = createContext({
    bombList: null,
    setBombList: (bombList) => {},

    item: null,
    setItem: (item) => {},

    overlayContent: null,
    setOverlayContent: (content) => {},

    ownedItems: null,
    setOwnedItems: (items) => {},
  })

function AppContext(props) {
  const [bombList, setBombList] = useState(null)
  const [item, setItem] = useState(null)
  const [overlayContent, setOverlayContent] = useState(null)
  const [ownedItems, setOwnedItems] = useState(null)
  
  return (
    <appState.Provider value={{ 
      bombList, setBombList,
      item, setItem,
      overlayContent, setOverlayContent,
      ownedItems, setOwnedItems,
    }}>
      {props.children}
    </appState.Provider>
  )
}

export default AppContext