export type SkillType = 'attaque' | 'special' | 'heal' | 'shield';


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
        this.currentCharges= this.maxCharge 
        this.currentCoolDown= this.coolDown
        
    }
    
    canUse():boolean{
        return this.currentCharges >0 || this.currentCoolDown === 0;
      
    }
    use():boolean{
        if(!this.canUse()) return false
        if(this.maxCharge!== Infinity) this.currentCharges --
        this.currentCoolDown --
        this.currentCoolDown = this.coolDown
        return true
    }

    tick():void{
        if(this.currentCoolDown >0) this.currentCoolDown --
    }
}