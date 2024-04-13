import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [WidgetComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [WidgetComponent],
})
export class WidgetModule {}
