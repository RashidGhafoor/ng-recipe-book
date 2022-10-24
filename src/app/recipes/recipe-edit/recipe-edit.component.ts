import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSave() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIng(index: number) {
    (this.recipeEditForm.get('ingredients') as FormArray).removeAt(index);
  }
  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      this.formBuilder.group({
        name: this.formBuilder.control(null, Validators.required),
        amount: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  initForm() {
    let name: String = '';
    let imagePath: String = '';
    let description: String = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.formBuilder.group({
              name: this.formBuilder.control(
                ingredient.name,
                Validators.required
              ),
              amount: this.formBuilder.control(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeEditForm = this.formBuilder.group({
      name: [name, Validators.required],
      description: [
        description,
        [Validators.required, Validators.minLength(4)],
      ],
      imagePath: [imagePath, Validators.required],
      ingredients: recipeIngredients,
    });
  }

  get recipeIngredients() {
    return (this.recipeEditForm.get('ingredients') as FormArray).controls;
  }

  // FormBuilder Example -------------------------------------------

  // contactForm;

  // countryList: country[] = [
  //   new country('1', 'India'),
  //   new country('2', 'USA'),
  //   new country('3', 'England'),
  // ];

  // onSubmit() {
  //   console.log(this.contactForm.value);
  // }

  // initContactForm() {
  //   this.contactForm = this.formBuilder.group({
  //     firstname: ['', [Validators.required, Validators.minLength(10)]],
  //     lastname: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.maxLength(15),
  //         Validators.pattern('^[a-zA-Z]+$'),
  //       ],
  //     ],
  //     email: ['', [Validators.required, Validators.email]],
  //     gender: ['', [Validators.required]],
  //     isMarried: ['', [Validators.required]],
  //     country: ['', [Validators.required]],
  //     address: this.formBuilder.group({
  //       city: ['', [Validators.required]],
  //       street: ['', [Validators.required]],
  //       pincode: ['', [Validators.required]],
  //     }),
  //   });
  // }
  // get firstname() {
  //   return this.contactForm.get('firstname');
  // }

  // get lastname() {
  //   return this.contactForm.get('lastname');
  // }

  // get email() {
  //   return this.contactForm.get('email');
  // }

  // get gender() {
  //   return this.contactForm.get('gender');
  // }

  // get isMarried() {
  //   return this.contactForm.get('isMarried');
  // }

  // get country() {
  //   return this.contactForm.get('country');
  // }

  // get city() {
  //   return this.contactForm.get('address').get('city');
  // }

  // get street() {
  //   return this.contactForm.get('address').get('street');
  // }

  // get pincode() {
  //   return this.contactForm.get('address').get('pincode');
  // }
}

export class country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
