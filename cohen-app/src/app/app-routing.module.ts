import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  { path: '', redirectTo: '/to-do', pathMatch: 'full' },
  { path: 'to-do', component: ToDoComponent },
  { path: 'to-do/:id', component: TaskListComponent },
  { path: 'to-do/:id/task/:task-id', component: TaskComponent },
  { path: 'to-do/:id/task/new', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
