import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';

@Injectable()
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  recipesChanged = new Subject<Recipe[]>();
  getIngredients = new Subject<Ingredient[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Big Fat Burger',
      'How to make a jumbo burger?',
      'http://www.fatburgercanada.com/wp-content/uploads/2015/07/fatburger_0002_DoubleKing-685x802.png',
      [new Ingredient('Bread', 2), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      'Tasty Pizza',
      'What else can you say!!!',
      'https://www.freeiconspng.com/uploads/pizza-png-22.png',
      [new Ingredient('Dough', 1), new Ingredient('Cheese', 10)]
    ),
  ];

  // private recipes: Recipe[] = [];

  constructor(private sLService: ShoppingListService) {}

  setRecipies(recipies: Recipe[]) {
    this.recipes = recipies;
    this.recipesChanged.next(this.recipes);
  }

  getRecipies() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.sLService.addNewIngredients(ingredients);
  }
}
