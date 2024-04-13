import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, FormsModule, ComponentsModule],
  exports: [RegisterComponent],
  providers: [],
})
export class RegisterModule {}
