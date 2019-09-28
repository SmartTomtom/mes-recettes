import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subscription } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit() {
    this.recipesSubscription = this.recipesService.recipesSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipesService.emitRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }

  onEditRecipe(id: number) {
    this.router.navigate(['/recipes', 'new', id]);
  }

  onDeleteRecipe(recipe: Recipe) {
    this.recipesService.removeRecipe(recipe);
  }

  onViewRecipe(id: number) {
    this.router.navigate(['/recipes', 'view', id]);
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }
}
