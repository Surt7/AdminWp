import { Pipe, PipeTransform } from '@angular/core';
import { MachineStatus } from '../../features/machines/models/machine.model';

export type PrimeSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary';

@Pipe({
  name: 'statusSeverity',
  standalone: true,
})
export class StatusSeverityPipe implements PipeTransform {
  transform(status: MachineStatus): PrimeSeverity {
    switch (status) {
      case 'ONLINE':
        return 'success';
      case 'IN_GAME':
        return 'info';
      case 'MAINTENANCE':
        return 'warn';
      case 'OFFLINE':
        return 'danger';
      case 'PENDING':
      default:
        return 'secondary';
    }
  }
}
