import { Component, inject, output } from '@angular/core';
import { LobbyService } from '../../data-access/lobby.service';
import { HubStatusConnection } from '../hub-connection/hub-connection.component';
import { ButtonDirective } from 'primeng/button';

@Component({
  imports: [HubStatusConnection, ButtonDirective],
  standalone: true,
  selector: 'app-header-display',
  styleUrl: './header-display.component.css',
  templateUrl: './header-display.component.html',
})
export class HeaderDisplayComponent {
  protected readonly lobbyService = inject(LobbyService);

  readonly toggleSupervision = output<void>();
}
