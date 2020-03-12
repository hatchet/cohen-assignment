import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoService } from '../services/to-do.service';
import { Task, Priority } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  toDoId: number;
  taskId: number;
  task: Task;
  Priority = Priority;

  constructor(private route: ActivatedRoute, public toDoService: ToDoService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.toDoId = Number(params.get('id')) || 0;
      this.taskId = Number(params.get('task-id')) || 0;
    });
    if (this.toDoId && this.taskId) {
      this.task = {
        ...this.toDoService.getTask(this.toDoId, this.taskId)
      };
    }
    else {
      this.task = {
        complete: false,
        dueDate: null,
        id: null,
        name: '',
        priority: Priority.low
      };
    }
  }

  cancelClick() {
    this.router.navigateByUrl(`/to-do/${this.toDoId}`);
  }

  upsertTask() {
    this.toDoService.upsertTask(this.toDoId, this.task);
    this.router.navigateByUrl(`/to-do/${this.toDoId}`);
  }
}
