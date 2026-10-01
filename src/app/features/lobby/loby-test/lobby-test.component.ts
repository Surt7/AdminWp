import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { LobbyService } from '../data-access/lobby.service';

@Component({
  selector: 'app-lobby-test',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TooltipModule],
  templateUrl: './lobby-test.component.html',
  styleUrl: './lobby-test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyTestComponent implements OnInit {
  protected readonly lobbyService = inject(LobbyService);

  protected sessionId = signal<string>('');

  ngOnInit(): void {
    this.lobbyService.StartConnection();
  }

  protected onJoin(): void {
    const id = this.sessionId().trim();
    if (id) {
      this.lobbyService.joinLobby(id);
    }
  }

  protected onLeave(): void {
    const id = this.sessionId().trim();
    if (id) {
      this.lobbyService.leaveLobby(id);
    }
  }

  protected toggleSupervision(): void {
    if (this.lobbyService.isSupervising()) {
      this.lobbyService.leaveAdminSupervision();
    } else {
      this.lobbyService.joinAdminSupervision();
    }
  }
}
