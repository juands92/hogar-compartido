import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '../components.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [FooterComponent],
  providers: [],
})
export class FooterModule {}
