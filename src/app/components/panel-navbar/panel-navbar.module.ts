import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelNavbarComponent } from './panel-navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [PanelNavbarComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule, DropdownModule],
  exports: [PanelNavbarComponent],
  providers: [],
})
export class PanelNavbarModule {}
