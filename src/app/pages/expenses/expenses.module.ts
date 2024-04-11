import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [ExpensesComponent],
  providers: [],
})
export class ExpensesModule {}
