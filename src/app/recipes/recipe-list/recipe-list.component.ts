import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasClicked = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Recipe',
      'how to make a tea',
      'https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg'
    ),
    new Recipe(
      'Another Recipe',
      'how to make a tea',
      'https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeItemClick(recipe: Recipe) {
    this.recipeWasClicked.emit(recipe);
  }
}
