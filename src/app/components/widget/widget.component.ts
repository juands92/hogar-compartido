import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faHome,
  faListCheck,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

type IconKeys = 'faHome' | 'faCalendar' | 'faMoneyBill' | 'faListCheck';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent {
  icons = {
    faHome: faHome,
    faCalendar: faCalendar,
    faMoneyBill: faMoneyBill,
    faListCheck: faListCheck,
  };

  @Input() headerTitle: string = '';
  @Input() icon: IconKeys = 'faHome';

  getIcon(): IconDefinition {
    return this.icons[this.icon];
  }
}
