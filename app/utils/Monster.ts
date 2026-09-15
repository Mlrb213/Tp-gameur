export interface RawMonster {
    idMonster: number;
    nameMonster: string;
    sprite: string;
    currentHp: number;
    maxHp: number;
    attack: number;
    defense: number;

}
export class Monster {
    idMonster: number;
    nameMonster: string;
    sprite: string;
    currentHp: number;
    maxHp: number;
    attack: number;
    defense: number;

    constructor (data: RawMonster){
        this.idMonster= data.idMonster,
        this.nameMonster= data.nameMonster,
        this.sprite = data.sprite,
        this.currentHp= data.currentHp,
        this.maxHp= data.maxHp,
        this.attack= data.attack,
        this.defense= data.defense
    }
}

 