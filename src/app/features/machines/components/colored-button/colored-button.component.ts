import { Component, input, InputSignal, output } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { MachineStatus, MachineUnit } from '../../models/machine.model';

@Component({
  selector: 'colored-button',
  styleUrl: './colored-button.component.css',
  templateUrl: './colored-button.component.html',
  standalone: true,
  imports: [Tooltip],
})
export class ColoredButtonComponent {
  currentUnit: InputSignal<MachineUnit> = input.required<MachineUnit>();
  statusUnitChanged = output<MachineUnit>();

  protected changeStatus(nextStatus: MachineStatus): void {
    const machineModifiee: MachineUnit = {
      ...this.currentUnit(),
      status: nextStatus,
    };

    this.statusUnitChanged.emit(machineModifiee);
  }
}
