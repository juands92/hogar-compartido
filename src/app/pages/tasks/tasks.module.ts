import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [TasksComponent],
  providers: [],
})
export class TasksModule {}
