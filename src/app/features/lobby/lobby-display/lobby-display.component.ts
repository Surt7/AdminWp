import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { LobbyService } from '../data-access/lobby.service';
import { HeaderDisplayComponent } from '../components/header-display/header-display.component';
import BodyDisplayComponent from '../components/body-display/body-display.component';
import { FormHeaderComponent } from '../components/form-header/form-header.component';

@Component({
  selector: 'app-lobby-display',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    HeaderDisplayComponent,
    BodyDisplayComponent,
    FormHeaderComponent,
    BodyDisplayComponent,
  ],
  templateUrl: './lobby-display.component.html',
  styleUrl: './lobby-display.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyDisplayComponent implements OnInit {
  protected readonly lobbyService = inject(LobbyService);

  ngOnInit(): void {
    this.lobbyService.StartConnection();
  }

  protected onJoin(id: string): void {
    this.lobbyService.joinLobby(id);
  }

  protected onLeave(): void {
    const activeId = this.lobbyService.lobbyState()?.sessionId;
    if (activeId) {
      this.lobbyService.leaveLobby(activeId);
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
