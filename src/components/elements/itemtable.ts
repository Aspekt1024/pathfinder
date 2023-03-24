import { Result } from "../../api/equipment/equipment"

export function GetItemTableHeaders() {
    return [
        "Lv.",
        "Name",
        "Range",
        "Dmg",
        "Pst",
        "Spl",
        "Add",
    ]
}

export function GetItemTableRow(item : Result) {
    if (item == null) return null
    return [
        { value: item.system.level.value },
        { value: item.name, desc: item.system.description.value },
        { value: item.system.range },
        { value: getDamage(item.system.damage?.dice) + item.system.damage?.die + ' ' + item.system.damage?.damageType },
        { value: getPersistentDamage(item) },
        { value: getDamage(item.system.splashDamage?.value) },
        { value: 'add', action: 'add' }
    ]
}

function getDamage(dmg : number) {
    if (dmg == null || dmg < 1) return ''
    return dmg
}

function getPersistentDamage(item : Result) {
    const dmg = item.system.damage
    if (dmg == null || dmg.persistent == null) return ''

    var dmgString = dmg.persistent.number + (dmg.persistent.faces != null ? 'd' + dmg.persistent.faces : '')
    
    if (dmg.persistent == null) return dmgString
    if (dmg.damageType !== dmg.persistent.type) {
        dmgString += ' ' + dmg.persistent.type
    }
    return dmgString
}