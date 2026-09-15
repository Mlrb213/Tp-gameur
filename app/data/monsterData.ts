import { Monster} from "~/utils/Monster";

export const monsters : Monster[] = [
    new Monster({
        idMonster : 0,
        nameMonster: 'Pokemon1',
        spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        currentHp: 100,
        maxHp: 100,
        attack: 20,
        defense: 10,
        type:"allier"    
    }),
    new Monster({
        idMonster : 1,
        nameMonster: 'Pokemon2',
        spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
        spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
        currentHp: 100,
        maxHp: 100,
        attack: 18,
        defense: 8,
        type:'enemie'
    }),
    new Monster({
        idMonster : 2,
        nameMonster: 'Pokemon3',
        spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        spriteBack:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
        currentHp: 100,
        maxHp: 100,
        attack: 20,
        defense: 10,
        type:"allier"    
    }),
    new Monster({
        idMonster : 3,
        nameMonster: 'Pokemon4',
        spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',
        currentHp: 100,
        maxHp: 100,
        attack: 20,
        defense: 10,
        type:"allier"    
    }),
    

]