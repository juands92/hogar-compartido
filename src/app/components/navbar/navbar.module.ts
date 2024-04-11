import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule, DropdownModule],
  exports: [NavbarComponent],
  providers: [],
})
export class NavbarModule {}
