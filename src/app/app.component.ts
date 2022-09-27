import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  featcherClicked: string = 'recipe';

  title = 'ng-recipe-book';

  onFeatcherClick(featcher: string) {
    this.featcherClicked = featcher;
  }
}
