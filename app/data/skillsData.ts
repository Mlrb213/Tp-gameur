import { Skill } from "~/utils/competence";

export const skills: Skill[] = [
  new Skill({
    idSkills: 1,
    nameSkills: 'Attaque',
    type: 'attaque',
    amount: 15,
  }),
  new Skill({
    idSkills: 2,
    nameSkills: 'Attaque Spéciale',
    type: 'special',
    amount: 35,
    coolDown: 3,
  }),
  new Skill({
    idSkills: 3,
    nameSkills: 'Soin',
    type: 'heal',
    amount: 25,
  }),
  new Skill({
    idSkills: 4,
    nameSkills: 'Bouclier / Défense',
    type: 'shield',
    amount: 20,
  }),
];
