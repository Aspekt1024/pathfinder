interface System {
    MAP: {
      value: string;
    };
    baseItem: string;
    bonus: {
      value: number;
    };
    bonusDamage: {
      value: number;
    };
    category: string;
    containerId: any;
    damage: {
      damageType: string;
      dice: number;
      die: string;
      persistent: {
        faces: number;
        number: number;
        type: string;
      };
    };
    description: {
      value: string;
    };
    equippedBulk: {
      value: string;
    };
    group: string;
    hardness: number;
    hp: {
      brokenThreshold: number;
      max: number;
      value: number;
    };
    level: {
      value: number;
    };
    negateBulk: {
      value: string;
    };
    potencyRune: {
      value: any;
    };
    preciousMaterial: {
      value: any;
    };
    preciousMaterialGrade: {
      value: any;
    };
    price: {
      value: {
        gp: number;
      };
    };
    propertyRune1: {
      value: any;
    };
    propertyRune2: {
      value: any;
    };
    propertyRune3: {
      value: any;
    };
    propertyRune4: {
      value: any;
    };
    quantity: number;
    range: number;
    reload: {
      value: string;
    };
    rules: any[];
    size: string;
    source: {
      value: string;
    };
    splashDamage: {
      value: number;
    };
    stackGroup: any;
    strikingRune: {
      value: any;
    };
    traits: {
      rarity: string;
      value: string[];
    };
    usage: {
      value: string;
    };
    weight: {
      value: string;
    };
  }
  
  export interface Result {
    _id: string;
    name: string;
    system: System;
    type: string;
  }
  
  interface EquipmentList {
    count: number;
    message: any;
    results: Result[];
  }

  export function GetLevel(data: Result) {
    return data.system.level.value
  }

  export function ParseEquipmentList(json: string) {
    var st = JSON.stringify(json)
    const data = JSON.parse(st)
    try {
        var list = data as EquipmentList
        list.results = list.results.sort((a, b) => {
            const aLevel = a.system.level?.value ?? 0; // default to 0 if level is undefined
            const bLevel = b.system.level?.value ?? 0; // default to 0 if level is undefined
            return aLevel - bLevel
        })
        return list
    }
    catch (e) {
        return {
            count: 0,
            message: "something went wrong. Json = " + json,
            results: [],
        }
    }
  }