import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [OverviewComponent],
  providers: [],
})
export class OverviewModule {}
