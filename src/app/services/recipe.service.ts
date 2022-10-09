import { EventEmitter } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';

export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Big Fat Burger',
      'how to make a burger',
      'https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg',
      [new Ingredient('Bread', 2), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      'Tea Recipe',
      'how to make a tea',
      'https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg',
      [new Ingredient('Milk', 1), new Ingredient('Tea leaves', 10)]
    ),
  ];

  getRecipies() {
    return this.recipes.slice();
  }
}
