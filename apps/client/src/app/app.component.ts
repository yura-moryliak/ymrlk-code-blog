import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '@ymrlk-code-blog/data';

@Component({
  selector: 'ymrlk-code-blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetch();
  }

  addTodo(): void {
    this.http.post('/api/addTodo', {}).subscribe(_ => this.fetch());
  }

  private fetch(): void {
    this.http.get<Todo[]>('/api/todos').subscribe((todos) => this.todos = todos);
  }
}
