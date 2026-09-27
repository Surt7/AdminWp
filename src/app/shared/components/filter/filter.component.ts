import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FieldsetCardComponent } from '../fieldset-card/fieldset-card.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DividerModule, FieldsetCardComponent, ButtonModule],
})
export class FilterComponent {
  viewMode = signal<'LIST' | 'IP'>('LIST');

  stats = [
    { title: 'Filtres', online: 8, offline: 12, total: 20 },
    { title: 'Recherches', online: 45, offline: 5, total: 50 },
    { title: 'Total Machines', online: 10, offline: 2, total: 12 },
  ];

  toggleView(mode: 'LIST' | 'IP'): void {
    this.viewMode.set(mode);
  }
}
