import { Gizi } from "../enum/mode";

export interface IFood {
   [food: number]: Phaser.Physics.Arcade.Group;
}

export interface IFoodGroup {
    [food: number] : Array<string>
}

export const FoodSetting : IFoodGroup = {
    [Gizi.Karbonhidrat] : ['bread', 'potato'],
    [Gizi.Protein]: ['egg', 'fish', 'meat'],
    [Gizi.Lemak]: ['chocolate', 'cheese'],
    [Gizi.Vitamin]: ['apple', 'banana', 'wortel', 'lemon']
}

  