export type SkillType = 'basicAttack' | 'specialAttack' | 'heal' | 'shield' | 'luck';


export interface Rawskills {
    idSkills: number;
    nameSkills: string;
    type: SkillType;
    amount: number;
    maxCharge?: number;
    coolDown?: number;
    
}

export class Skill {
    idSkills: number;
    nameSkills: string;
    type: SkillType;
    amount: number;
    maxCharge: number;
    coolDown: number;
    currentCharges: number;
    currentCoolDown: number;

    constructor(data: Rawskills){
        this.idSkills= data.idSkills;
        this.nameSkills= data.nameSkills;
        this.type= data.type;
        this.amount=data.amount;
        this.maxCharge= data.maxCharge??Infinity ; 
        this.coolDown=data.coolDown?? 0;
        this.currentCharges= this.maxCharge ;
        this.currentCoolDown= this.coolDown ; // Initialisé au cooldown (ex: 2 pour l'ultime)
        
    }
    
    canUse():boolean{
        return this.currentCharges > 0 && this.currentCoolDown === 0;
    }

    use():boolean{
        if(!this.canUse()) return false;
        if(this.maxCharge !== Infinity) this.currentCharges--;
        this.currentCoolDown = this.coolDown; // Réinitialisé au cooldown lors de l'utilisation
        return true;
    }

    tick():void{
        if(this.currentCoolDown > 0) {
            this.currentCoolDown--;
        }
        // Dès que currentCoolDown atteint 0, il reste à 0 tant qu'il n'est pas utilisé !
    }
}