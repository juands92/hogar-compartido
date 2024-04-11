import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, ComponentsModule],
  exports: [LoginComponent],
  providers: [],
})
export class LoginModule {}
