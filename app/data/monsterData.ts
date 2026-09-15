import { Monster} from "~/utils/Monster";

export const monsters : Monster[] = [
    new Monster({
        idMonster : 0,
        nameMonster: 'Pokemon1',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
        currentHp: 100,
        maxHp: 100,
        attack: 20,
        defense: 10}),
    new Monster({
        idMonster : 1,
        nameMonster: 'Pokemon2',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        currentHp: 100,
        maxHp: 100,
        attack: 18,
        defense: 8}),

]