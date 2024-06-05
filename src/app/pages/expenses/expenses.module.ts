import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [ExpensesComponent],
  providers: [],
})
export class ExpensesModule {}
