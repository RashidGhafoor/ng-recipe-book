import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  storeRecipies() {
    const recipies = this.recipeService.getRecipies();
    this.http
      .put(
        'https://ng-recipe-book-a7b34-default-rtdb.firebaseio.com/recipies.json',
        recipies
      )
      .subscribe((recipies) => {
        console.log(recipies);
      });
  }

  fetchRecipies() {
    this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-a7b34-default-rtdb.firebaseio.com/recipies.json'
      )
      .subscribe((recipies) => {
        this.recipeService.setRecipies(recipies);
      });
  }
}
