import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredient: Ingredient;
  @ViewChild('form') ngForm: NgForm;
  subscription: Subscription;
  index: number;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editingIngredient.subscribe(
      (index) => {
        this.editMode = true;
        this.index = index;
        this.ingredient = this.shoppingListService.getIngredient(index);
        this.ngForm.form.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const ingredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.index, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.ngForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.index);
    this.onClear();
  }

  onClear() {
    this.ngForm.reset();
    this.editMode = false;
  }
}
