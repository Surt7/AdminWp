import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';

export interface StatCardData {
  title: string;
  online: number;
  offline: number;
  total: number;
}

@Component({
  selector: 'app-fieldset-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FieldsetModule, DividerModule],
  templateUrl: './fieldset-card.component.html',
  styleUrl: './fieldset-card.component.css',
  host: {
    class: 'block h-full min-w-0',
  },
})
export class FieldsetCardComponent {
  title = input.required<string>();
}
