import React, { useContext } from "react";
import { appState } from "../../contexts/AppContext";
import { GetItemTableHeaders, GetItemTableRow } from "./itemtable.ts";

function ItemTable(props) {
    const headers = GetItemTableHeaders()
    const state = useContext(appState)
    return (
        <div className="item-table">
            <table>
                <thead className="item-table-header">
                    <tr>
                        {headers.map((header, index) => (
                            <td key={index}>{header}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.list && props.list.map((item, index) => (
                        <ItemRow key={index} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    )

    function ItemRow(props) {

        const item = props.item
        const info = GetItemTableRow(item)

        return (
            <tr>
                {info.map((obj, index) => (
                    <td key={index} className={GetClassName(obj)} onClick={() => {
                        if (obj.action === 'add') {
                            var items = state.ownedItems || []
                            if (items.includes(item._id)) {
                                items = items.filter(i => i !== item._id)
                            } else {
                                items = items.concat(item._id)
                            }
                            state.setOwnedItems(items)
                        }
                        else if (obj.desc != null) {
                            const content = parseDescription(obj.desc)
                            state.setOverlayContent(<div>{content}</div>)
                        }
                        else {
                            state.setOverlayContent(
                                <pre className="json-prewrap">
                                    {JSON.stringify(props.item, null, 2)}
                                </pre>  
                            )
                        }
                    }}>
                        {GetDisplay(obj)}
                    </td>
                ))}
            </tr>
        )

        function GetClassName(obj) {
            var className = 'item-table-cell'

            const items = state.ownedItems || []
            if (items.includes(item._id)) {
                className += ' item-table-cell-owned'
            }

            if (obj.value === 'add') {
                className += ' item-table-button'
            }

            return className
        }

        function GetDisplay(obj) {
            if (obj.value === 'add') {
                const items = state.ownedItems || []
                if (items.includes(item._id)) {
                    return 'Remove'
                } else {
                    return 'Add'
                }
            } else {
                return obj.value
            }
        }
    }

    function parseDescription(desc) {
        if (desc == null) return ''
        
        var doc = document.createElement('div')
        doc.innerHTML = desc.replace(/@[^[]*\[[^\]]*\]/g, '')

        const spanParents = doc.querySelectorAll('p > span')
        for (let i = 0; i < spanParents.length; i++) {
            const spanParent = spanParents[i].parentNode
            spanParent.parentNode.insertBefore(spanParent.firstChild, spanParent)
            spanParent.parentNode.removeChild(spanParent)
        }

        return doc.textContent
    }
}

export default ItemTable