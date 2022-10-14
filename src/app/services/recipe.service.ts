import { EventEmitter } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';

export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

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
      [new Ingredient('Milk', 1), new Ingredient('Tea leaves', 10)]
    ),
  ];

  getRecipies() {
    return this.recipes.slice();
  }
  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }
}
