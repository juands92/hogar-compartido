import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [InventoryComponent],
  providers: [],
})
export class InventoryModule {}
