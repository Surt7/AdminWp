import { Component, inject } from '@angular/core';
import { LobbyService } from '../../data-access/lobby.service';

@Component({
  imports: [],
  selector: 'app-hub-connection',
  standalone: true,
  styleUrl: './hub-connection.component.css',
  templateUrl: './hub-connection.component.html',
})
export class HubStatusConnection {
  protected readonly lobbyService = inject(LobbyService);
}
