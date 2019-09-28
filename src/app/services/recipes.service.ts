import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Quantity, Unity } from '../models/quantity.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [
    new Recipe("Brownie", new Map([
        [new Quantity(200, Unity.GRAMME), new Ingredient("chocolat")],
        [new Quantity(200, Unity.GRAMME), new Ingredient("beurre")]
      ]),
      ["Faire fondre le beurre", "Faire fondre le chocolat"]
    )
  ];
  recipesSubject = new Subject<Recipe[]>();

  constructor() {
    this.emitRecipes();
  }

  emitRecipes() {
    this.recipesSubject.next(this.recipes);
  }

  getSingleRecipe(id: number) {
    const recipe = this.recipes[id];
    return recipe;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitRecipes();
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.emitRecipes();
  }

  removeRecipe(recipe: Recipe) {
    const recipeIndexToRemove = this.recipes.findIndex(
      (recipeEl) => {
        if (recipeEl === recipe) {
          return true;
        }
      }
    );
    this.recipes.splice(recipeIndexToRemove, 1);
    this.emitRecipes();
  }
}
