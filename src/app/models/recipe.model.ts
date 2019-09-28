import { Ingredient } from './ingredient.model';
import { Quantity } from './quantity.model';

export class Recipe {
    photo: string;
    constructor(public title: string, public ingredients: Map<Quantity,Ingredient>, public tasks: string[]) {
    }
}