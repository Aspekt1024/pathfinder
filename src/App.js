import React from "react"
import Overlay from "./components/elements/Overlay"
import Page from "./components/page/Page"
import SidePanel from "./components/page/SidePanel"
import Toolbar from "./components/page/Toolbar"
import AppContext from "./contexts/AppContext"

function App() {

  return (
    <AppContext>
      <div className="app">
        <Toolbar />
        <div className="main">
          <SidePanel />
          <Page />
        </div>
      </div>
      <Overlay />
    </AppContext>
  )
}

export default App;
