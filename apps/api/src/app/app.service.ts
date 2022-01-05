import { Injectable } from '@nestjs/common';

import { Todo } from "@ymrlk-code-blog/data";

@Injectable()
export class AppService {

  todos: Todo[] = [
    {
      title: `Todo ${ ++AppService.todosCounter }`
    },
    {
      title: `Todo ${ ++AppService.todosCounter }`
    }
  ];

  private static todosCounter = 0;

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo() {
    this.todos.push({
      title: `Todo ${ ++AppService.todosCounter }`
    });
  }

}
