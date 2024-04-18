import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [ProfileComponent],
  providers: [],
})
export class ProfileModule {}
