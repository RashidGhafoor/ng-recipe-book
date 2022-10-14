import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

export class ShoppingListService {
  currentShopList = new EventEmitter<Ingredient[]>();
  editingIngredient = new Subject<number>();

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

  getIngredient(index: number): Ingredient {
    return this.shoppingList[index];
  }

  deleteIngredient(index: number) {
    this.shoppingList.splice(index, 1);
    this.currentShopList.emit(this.shoppingList);
    console.log('deleted');
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    console.log(this.shoppingList[index], this.shoppingList, ingredient);
    this.shoppingList[index].name = ingredient.name;
    this.shoppingList[index].amount = ingredient.amount;
  }
}
