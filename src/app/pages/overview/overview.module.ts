import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { TasksModule } from '../tasks/tasks.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, ComponentsModule, RouterModule, TasksModule],
  exports: [OverviewComponent],
  providers: [],
})
export class OverviewModule {}
