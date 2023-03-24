
import { ParseEquipmentList } from "./equipment/equipment.ts"

const apiKey = "fe8dbed5-4d7d-49ea-a5df-83869dc944c2";
const apiRoot = "https://api.pathfinder2.fr/v1/pf2"

const equipmentResource = "/equipment?system.traits.value=";

export const Groups = {
    bomb: {
        display: "Bomb",
        id: "bomb",
    },
    elixir: {
        display: "Elixir",
        id: "elixir",
    }
}

export function GetItemList(group, callback) {
    const storageName = group.id + 'Data'
    const groupData = localStorage.getItem(storageName)
    if (groupData === null) {
        fetch(apiRoot + equipmentResource + group.id, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : apiKey,
            }
        })
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem(storageName, JSON.stringify(json))
            const data = ParseEquipmentList(json)
            callback(data)
        })
    }
    else {
        const json = JSON.parse(groupData)
        var data = ParseEquipmentList(json)
        callback(data)
    }

}