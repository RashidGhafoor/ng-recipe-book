import { DataStorageService } from './../services/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Output() featcherClick = new EventEmitter<string>();

  constructor(private storageService: DataStorageService) {}

  ngOnInit(): void {}

  // onFeatcherClick(featcher: string) {
  //   this.featcherClick.emit(featcher);
  // }

  onSaveData() {
    this.storageService.storeRecipies();
  }
  onFetchData() {
    this.storageService.fetchRecipies();
  }
}
