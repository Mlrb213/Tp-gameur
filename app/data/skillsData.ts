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
        nameSkills: 'specialAttaque',
        type: 'specialAttack',
        amount: 20,
        coolDown: 3
    },
    heal:{
        idSkills: 20,
        nameSkills: 'heal',
        type: 'heal',
        amount: 50,
        coolDown: 2,
        maxCharge: 2 
    },
    shield:{
        idSkills:20,
        nameSkills: 'shield',
        type: 'shield',
        amount: 20,
        coolDown: 2
    }
  

} satisfies Record<string, Rawskills>;
