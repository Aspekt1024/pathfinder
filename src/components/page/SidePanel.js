import React, { useContext, useState } from "react";

import { GetItemList, Groups } from  '../../api/api.js'
import { appState } from "../../contexts/AppContext";

<script src="../../api/api.js" type="module" />

function SidePanel() {

    const state = useContext(appState)
    const [status, setStatus] = useState('')

    const ownedItems = state.ownedItems

    const groups = [
        Groups.bomb,
        Groups.elixir,
    ]

    return (
        <div className='side-panel'>
            <div className="sp-header">
                {groups.map((group, index) => {
                    return <div key={index} className='sp-button' onClick={() => onGroupClicked(group)}>{group.display}</div>
                })}
            </div>
            <div className="sp-body">
                {status === 'loading'
                    ? "loading"
                    : <span />
                }
            </div>
            <div>
                {ownedItems && ownedItems.map((item, index) => {
                    return <div key={index}>{item}</div>
                })}
            </div>
        </div>
    )

    function onGroupClicked(group) {
        setStatus('loading')
        GetItemList(group, (itemList) => {
            setStatus('loaded')
            state.setBombList(itemList)
        });
    }

}

export default SidePanel