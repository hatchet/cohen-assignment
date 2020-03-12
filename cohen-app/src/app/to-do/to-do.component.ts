import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { ToDo } from '../models/to-do';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  creatingNewToDo = false;
  newToDoName = '';

  constructor(public toDoService: ToDoService, private router: Router) { }

  ngOnInit(): void {
  }

  navigateToTaskList(toDo: ToDo) {
    this.router.navigateByUrl(`/to-do/${toDo.id}`);
  }

  getCompletedTaskListCount(toDo: ToDo) {
    return toDo.taskList.filter(t => t.complete).length;
  }

  createToDo() {
    this.toDoService.createToDo(this.newToDoName);
    this.newToDoName = '';
  }

  deleteToDo(toDo: ToDo) {
    this.toDoService.deleteToDo(toDo);
  }

  allTasksComplete(toDo: ToDo) {
    if (!toDo.taskList.length) {
      return false;
    }
    return this.getCompletedTaskListCount(toDo) === toDo.taskList.length;
  }
}
