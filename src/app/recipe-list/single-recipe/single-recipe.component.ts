import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipe = this.recipesService.getSingleRecipe(+this.id)
  }

  onBack() {
    this.router.navigate(['/recipes']);
  }

  onEditRecipe() {
    this.router.navigate(['/recipes', 'new', this.id]);
  }
}
