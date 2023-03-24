import React from 'react'

function List(props) {
    if (props.items == null || props.items.length === 0) {
        return <div />
    }

    return (
        <div className='list'>
            {
                props.items.map(item => (
                    <ListItem key={item.id} label={item.name} onClicked={() => item.onClicked(item.id)} />
                ))
            }
        </div>
    )
}

function ListItem(props) {
    return (
        <div onClick={props.onClicked} className='list-item'>
            {props.label}
        </div>
    )
}

export default List