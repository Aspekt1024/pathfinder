import { GetStats } from './item.ts'

function Item(props) {
    const item = props.item
    if (item == null) {
        return null
    }

    return (
        <div className="item-card">
            <div>{item.system.level.value} {item.name}</div>
            { GetStats(item).map((s, index) => 
                <div key={index}>{s}</div>
            )}
        </div>
    )
}

export default Item