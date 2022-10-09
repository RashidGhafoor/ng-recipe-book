import { EventEmitter } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

export class ShoppingListService {
  currentShopList = new EventEmitter<Ingredient[]>();

  private shoppingList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getShoppingList() {
    return this.shoppingList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingList.push(ingredient);
    this.currentShopList.emit(this.shoppingList);
  }
}
