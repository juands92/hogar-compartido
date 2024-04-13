import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from './card/card.module';
import { ButtonModule } from './button/button.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { PanelNavbarModule } from './panel-navbar/panel-navbar.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    NavbarModule,
    PanelNavbarModule,
    FooterModule,
    DropdownModule,
    WidgetModule,
  ],
  exports: [
    CardModule,
    ButtonModule,
    NavbarModule,
    PanelNavbarModule,
    FooterModule,
    DropdownModule,
    WidgetModule,
  ],
  providers: [],
})
export class ComponentsModule {}
