import { randomInt } from "../utils/utils";
export interface RawMonster {
    idMonster: number;
    nameMonster: string;
    spriteFront: string;
    spriteBack: string;
    currentHp: number;
    maxHp: number;
    attack: number;
    defense: number;
    type:string;

}
export class Monster {
    idMonster: number;
    nameMonster: string;
    spriteFront: string;
    spriteBack: string;
    currentHp: number;
    maxHp: number;
    attack: number;
    defense: number;
    type:string;

    constructor (data: RawMonster){
        this.idMonster= data.idMonster,
        this.nameMonster= data.nameMonster,
        this.spriteFront = data.spriteFront,
        this.spriteBack = data.spriteBack,
        this.currentHp= data.currentHp,
        this.maxHp= data.maxHp,
        this.attack= data.attack,
        this.defense= data.defense
        this.type= data.type
    }

    computeNormalDamage  (target: Monster):number {

        const damage = this.attack - target.defense
        return damage
    }
    computeUltimateDamage  (target: Monster):number {

        const damage = this.attack *2 - target.defense
        return damage
    }
    
}

 