import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelNavbarComponent } from './panel-navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PanelNavbarComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [PanelNavbarComponent],
  providers: [],
})
export class PanelNavbarModule {}
