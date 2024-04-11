import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [ProfileComponent],
  providers: [],
})
export class ProfileModule {}
