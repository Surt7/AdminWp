import { Component, input } from '@angular/core';
import { Machine, MachineStatus } from '../../models/machine.model';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
import { StatusSeverityPipe } from '../../../../shared/pipe/prime-severity';

@Component({
  selector: 'category-machine',
  templateUrl: './category-machine.component.html',
  styleUrl: './category-machine.component.css',
  standalone: true,
  imports: [Tag, Table, StatusSeverityPipe],
})
export class CategoryMachineComponent {
  readonly machines = input.required<Machine[]>();
}
