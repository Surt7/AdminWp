import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PinballModel } from '../../models/machine.model';

@Component({
  selector: 'machine-header',
  templateUrl: './machine-header.component.html',
  styleUrl: './machine-header.component.css',
  imports: [RouterLink],
  standalone: true,
})
export class MachineHeaderComponent {
  selectedModel = input.required<PinballModel>();
}
