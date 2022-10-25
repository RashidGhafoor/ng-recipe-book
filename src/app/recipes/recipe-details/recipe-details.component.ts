import { Ingredient } from './../../model/ingredient.model';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VirtualTimeScheduler, Subject } from 'rxjs';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() recipe: Recipe;
  id: number;
  gerIngredientSubjest = new Subject<Ingredient[]>();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onDelete(id: number) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onToShoppngList() {
    if (this.recipe.ingredients) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
  }
  // download() {
  //   console.log(this.content.nativeElement);
  //   var element = this.content.nativeElement;
  //   var opt = {
  //     margin: 1,
  //     filename: 'myfile.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //   };
  //   // New Promise-based usage:
  //   html2pdf().from(element).set(opt).save();
  // }
}
