import { Result } from "../../api/equipment/equipment"

export function GetStats(item : Result) {
    if (item == null) return []

    var range = getRange(item)
    var damage = getDamage(item)
    var bonus = getItemBonus(item)

    var stats : string[] = []
    if (range !== null) stats.push(range)
    if (damage !== null) stats.push(damage)
    if (bonus !== null) stats.push(bonus)

    return stats
}

function getRange(item : Result) {
    const range = item.system.range
    if (range == null || range < 1) return null;

    return "range " + range
}

function getDamage(item : Result) {
    const damage = item.system.damage
    const splashDamage = item.system.splashDamage

    if (damage == null) return null
    if (damage.dice == null || damage.dice === 0) return null
    if (damage.damageType == null) return null

    var damageString = damage.dice + damage.die
    
    if (damage.persistent != null) {
        damageString += ' + ' + damage.persistent.number
        if (damage.persistent.faces != null) {
            damageString += 'd' + damage.persistent.faces
        }
        damageString += ' persistent'
    }
    if (splashDamage != null && splashDamage.value != null && splashDamage.value > 0) {
        damageString += ' + ' + splashDamage.value + ' splash'
    }

    return damageString + " damage"
}

function getItemBonus(item : Result) {
    const bonus = item.system.bonus
    if (bonus == null || bonus.value == null || bonus.value === 0) return null
    return "+" + bonus.value + " item bonus"
}