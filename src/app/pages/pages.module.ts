import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { LandingModule } from './landing/landing.module';
import { OverviewModule } from './overview/overview.module';
import { CalendarModule } from './calendar/calendar.module';
import { ExpensesModule } from './expenses/expenses.module';
import { HomeModule } from './home/home.module';
import { InventoryModule } from './inventory/inventory.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [],
  imports: [
    LoginModule,
    LandingModule,
    OverviewModule,
    CalendarModule,
    ExpensesModule,
    HomeModule,
    InventoryModule,
    TasksModule,
  ],
  exports: [
    LoginModule,
    LandingModule,
    OverviewModule,
    CalendarModule,
    ExpensesModule,
    HomeModule,
    InventoryModule,
    TasksModule,
  ],
  providers: [],
})
export class PagesModule {}
