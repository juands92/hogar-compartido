import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [CalendarComponent],
  providers: [],
})
export class CalendarModule {}
