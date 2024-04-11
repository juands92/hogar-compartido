import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() classes: string = '';
  @Input() disabled: boolean = false;

  // Evento personalizado 'onClick' que se emitirá cuando el botón sea presionado.
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    // Emite el evento personalizado 'onClick'
    this.onClick.emit();
  }
}
