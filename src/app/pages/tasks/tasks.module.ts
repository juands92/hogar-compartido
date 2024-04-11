import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [TasksComponent],
  providers: [],
})
export class TasksModule {}
