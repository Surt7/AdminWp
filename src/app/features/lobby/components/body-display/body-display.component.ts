import { Component, inject } from '@angular/core';
import { LobbyService } from '../../data-access/lobby.service';

@Component({
  imports: [],
  selector: 'app-body-display',
  standalone: true,
  styleUrl: './body-display.component.css',
  templateUrl: './body-display.component.html',
})
export class BodyDisplayComponent {
  protected lobbyService = inject(LobbyService);
}

export default BodyDisplayComponent;
