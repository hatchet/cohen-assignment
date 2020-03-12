import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ToDo } from '../models/to-do';
import { Task, Priority } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private toDoList: ToDo[] = [
    {
      id: 1,
      name: 'Groceries',
      taskList: [
        {
          id: 1,
          name: 'bananas',
          priority: Priority.low,
          dueDate: new Date(2020, 2, 24),
          complete: false
        }
      ]
    },
    {
      id: 2,
      name: 'Packing',
      taskList: [
        {
          id: 2,
          name: 'shirts',
          priority: Priority.medium,
          dueDate: new Date(2020, 2, 28),
          complete: false
        },
        {
          id: 3,
          name: 'pants',
          priority: Priority.high,
          dueDate: new Date(2020, 2, 28),
          complete: false
        },
        {
          id: 4,
          name: 'shoes',
          priority: Priority.low,
          dueDate: new Date(2020, 3, 28),
          complete: false
        }
      ]
    },
    {
      id: 3,
      name: 'Reading',
      taskList: [
        {
          id: 5,
          name: 'moby dick',
          priority: Priority.low,
          dueDate: new Date(2020, 4, 28),
          complete: false
        },
        {
          id: 6,
          name: 'grapes of wrath',
          priority: Priority.medium,
          dueDate: new Date(2020, 6, 12),
          complete: false
        },
        {
          id: 7,
          name: 'atlas shrugged',
          priority: Priority.high,
          dueDate: new Date(2020, 7, 19),
          complete: false
        }
      ]
    },
  ];

  private toDoListSubject: Subject<ToDo[]> = new Subject<ToDo[]>();
  public toDoList$: Observable<ToDo[]> = this.toDoListSubject.asObservable();

  constructor() { }

  private getNextToDoId(): number {
    return Math.max(...this.toDoList.map(td => td.id)) + 1;
  }

  private getNextTaskId(): number {
    const taskIds: number[] = [];
    this.toDoList.forEach(td => {
      if (td.taskList) {
        taskIds.push(...td.taskList.map(t => t.id));
      }
    });
    return Math.max(...taskIds) + 1;
  }

  getToDoList(): ToDo[] {
    return this.toDoList;
  }

  getToDoById(id: number): ToDo {
    return this.toDoList.find(td => td.id === id);
  }

  getTask(toDoId: number, taskId: number): Task {
    const toDo: ToDo = this.getToDoById(toDoId);
    if (toDo && toDo.taskList) {
      return toDo.taskList.find(t => t.id === taskId);
    }
    return null;
  }

  createToDo(toDoName: string) {
    this.toDoList.push({
      id: this.getNextToDoId(),
      name: toDoName,
      taskList: []
    });
    this.toDoListSubject.next(this.toDoList);
  }

  deleteToDo(toDo: ToDo) {
    if (this.toDoList.find(td => td.id === toDo.id)) {
      this.toDoList.splice(this.toDoList.findIndex(td => td.id === toDo.id), 1);
    }
  }

  upsertTask(toDoId: number, task: Task) {
    const toDo: ToDo = this.toDoList.find(td => td.id === toDoId);
    if (toDo) {
      if (!toDo.taskList) {
        toDo.taskList = [];
      }
      if (toDo.taskList.find(t => t.id === task.id)) {
        toDo.taskList[
          toDo.taskList.findIndex(t => t.id === task.id)
        ] = task;
      }
      else {
        task.id = this.getNextTaskId();
        toDo.taskList.push(task);
      }
    }
  }

  deleteTask(toDoId: number, taskId: number) {
    const toDo: ToDo = this.toDoList.find(td => td.id === toDoId);
    if (toDo && toDo.taskList) {
      if (toDo.taskList.find(t => t.id === taskId)) {
        toDo.taskList.splice(toDo.taskList.findIndex(t => t.id === taskId), 1);
      }
    }
  }
}
