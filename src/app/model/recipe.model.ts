import { Ingredient } from './ingredient.model';

export class Recipe {
  constructor(
    public name: String,
    public description: String,
    public imageUrl: String,
    public ingredients: Ingredient[]
  ) {}
}
