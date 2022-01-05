import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Todo } from "@ymrlk-code-blog/data";

@Component({
  selector: 'ymrlk-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodosComponent implements OnInit {

  @Input() todos: Todo[] = [];

  ngOnInit(): void {
  }

}
