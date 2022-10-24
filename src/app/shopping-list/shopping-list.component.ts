import { RecipeService } from 'src/app/services/recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscription: Subscription;
  newSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscription = this.shoppingListService.currentShopList.subscribe(
      (ingredentList: Ingredient[]) => {
        this.ingredients = ingredentList.slice();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingListService.editingIngredient.next(index);
  }
}
