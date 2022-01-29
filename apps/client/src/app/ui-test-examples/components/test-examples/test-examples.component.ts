import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ymrlk-test-examples',
  templateUrl: './test-examples.component.html',
  styleUrls: ['./test-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestExamplesComponent {

  tagsList: string[] = [
    'All',
    'Angular',
    'TyeScript',
    'NestJs',
    'MongoDB'
  ];
  selectedTagsList: string[] = [];

  getSelectedTag(selectedTag: string): void {
    console.log(selectedTag);
  }
}
