import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [LandingComponent],
  providers: [],
})
export class LandingModule {}
