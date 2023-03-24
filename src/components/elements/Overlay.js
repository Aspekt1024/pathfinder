import React from "react";
import { appState } from "../../contexts/AppContext";

function Overlay() {

    const state = React.useContext(appState)

    if (state.overlayContent === null) return null

    return (
        <div className="overlay-background" onClick={closeOverlay}>
            <div className="overlay" onClick={(e) => e.stopPropagation()}>
                <div className="overlay-content">
                    {state.overlayContent}
                </div>
                <div className="overlay-close" onClick={closeOverlay}>X</div>
            </div>
        </div>
    )

    function closeOverlay() {
        state.setOverlayContent(null)
    }
}

export default Overlay