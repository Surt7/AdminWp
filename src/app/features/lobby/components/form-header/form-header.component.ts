import { Component, inject, output, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LobbyService } from '../../data-access/lobby.service';

@Component({
  imports: [FormsModule, InputTextModule, ButtonModule],
  selector: 'app-form-header',
  standalone: true,
  styleUrl: './form-header.component.css',
  templateUrl: './form-header.component.html',
})
export class FormHeaderComponent {
  protected readonly lobbyService = inject(LobbyService);

  protected sessionId = signal<string>('');
  readonly join = output<string>();

  protected onJoin(): void {
    const id = this.sessionId().trim();
    if (id) {
      this.join.emit(id);
    }
  }
}
