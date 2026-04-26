import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Unity, Quantity } from '../../models/quantity.model';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  recipeForm: UntypedFormGroup
  editMode: boolean = false;
  id: number;

  constructor(private formBuilder: UntypedFormBuilder,
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.editMode = this.id != null;
    this.initForm();
  }

  initForm() {
    var title = '';
    var ingredients = this.formBuilder.array([]);
    var tasks = this.formBuilder.array([]);

    if(this.editMode) {
      let recipe = this.recipeService.getSingleRecipe(this.id);
      title = recipe.title;
      for(let ingredient of recipe.ingredients){
        let ingredientGroup = this.formBuilder.group({
          name: [ingredient[1].name, Validators.required],
          quantity: [ingredient[0].amount, Validators.required],
          unity: [ingredient[0].unity, Validators.required]
        });
        ingredients.push(ingredientGroup);
      }
      for(let task of recipe.tasks){
        let taskControl = this.formBuilder.control(task, Validators.required);
        tasks.push(taskControl);
      }
    } else {
      ingredients = this.formBuilder.array([this.formBuilder.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
        unity: ['', Validators.required]
      })]);
      tasks = this.formBuilder.array([this.formBuilder.control(null, Validators.required)]);
    }

    this.recipeForm = this.formBuilder.group({
      title: title,
      ingredients: ingredients,
      tasks: tasks
    });
  }

  onSubmitForm() {
    const formValue = this.recipeForm.value;
    const ingredients = new Map<Quantity,Ingredient>();
    formValue['ingredients'].forEach(element => {
      var quantity = new Quantity(element['quantity'], element['unity']);
      var ingredientName = new Ingredient(element['name']);
      ingredients.set(quantity,ingredientName)
    });
    const newRecipe = new Recipe(
      formValue['title'],
      ingredients,
      formValue['tasks']
    );
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['/recipes']);
  }

  getIngredients(): UntypedFormArray {
    return this.recipeForm.get('ingredients') as UntypedFormArray;
  }

  onAddIngredient() {
    const newIngredientGroup = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unity: ['', Validators.required]
    });
    this.getIngredients().push(newIngredientGroup);
  }

  onRemoveIngredient(index) {
    this.getIngredients().removeAt(index);
  }
  
  getTasks(): UntypedFormArray {
    return this.recipeForm.get('tasks') as UntypedFormArray;
  }

  onAddTask() {
    const newTaskControl = this.formBuilder.control(null, Validators.required);
    this.getTasks().push(newTaskControl);
  }

  onRemoveTask(index) {
    this.getTasks().removeAt(index);
  }

  getUnities() {
    return Unity;
  }
}
