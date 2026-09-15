import type { Rawskills } from "../utils/competence"

export const skills = {
    basicAttack:{
        idSkills: 1, 
        nameSkills: 'basicAttack',
        type: 'basicAttack',
        amount: 20
    },
    SpecialAttack:{
        idSkills: 2,
        nameSkills: 'specialAttack',
        type: 'specialAttack',
        amount: 35,
        coolDown: 3
    },
    heal:{
        idSkills: 3,
        nameSkills: 'heal',
        type: 'heal',
        amount: 50,
        coolDown: 2,
        maxCharge: 2 
    },
    shield:{
        idSkills: 4,
        nameSkills: 'shield',
        type: 'shield',
        amount: 20,
        coolDown: 2
    },
    luck:{
        idSkills: 5,
        nameSkills: 'luck',
        type: 'luck',
        amount: 10,
        coolDown: 0
    },
    kamehameha:{
        idSkills: 6,
        nameSkills: 'kamehameha',
        type: 'cheat',
        amount:10000,
        maxCharge : 1
    }
} satisfies Record<string, Rawskills>;
