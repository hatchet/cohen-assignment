import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoService } from '../services/to-do.service';
import { ToDo } from '../models/to-do';
import { Priority, Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  id: number;
  toDo: ToDo;
  Priority = Priority;

  constructor(private route: ActivatedRoute, public toDoService: ToDoService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')) || 0;
    });
    this.toDo = this.toDoService.getToDoById(this.id);
    console.log(this.toDo);
  }

  editTask(task: Task) {
    this.router.navigateByUrl(`/to-do/${this.id}/task/${task.id}`);
  }

  addTask() {
    this.router.navigateByUrl(`/to-do/${this.id}/task/new`);
  }

  deleteTask(task: Task) {
    this.toDoService.deleteTask(this.id, task.id);
  }
}
