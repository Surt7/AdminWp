import { computed, Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { SessionLobbyResponse } from '../models/loby.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  #hubConnection: HubConnection | null = null;

  #isConnected = signal<boolean>(false);
  readonly isConnected = this.#isConnected.asReadonly();

  #lobbyState = signal<SessionLobbyResponse | null>(null);
  readonly lobbyState = this.#lobbyState.asReadonly();

  #adminLobbies = signal<Map<string, SessionLobbyResponse>>(new Map());
  readonly adminLobbies = this.#adminLobbies.asReadonly();

  readonly adminLobbyList = computed(() => Array.from(this.#adminLobbies().values()));

  #isSupervising = signal<boolean>(false);
  readonly isSupervising = this.#isSupervising.asReadonly();

  async StartConnection(): Promise<void> {
    if (this.#hubConnection) {
      return;
    }

    this.#hubConnection = new HubConnectionBuilder()
      .withUrl(API_ENDPOINTS.HUBS.LOBBY)
      .withAutomaticReconnect()
      .build();

    this.#hubConnection.on('LobbyStateUpdated', (state: SessionLobbyResponse) => {
      console.log('[SignalR] LobbyStateUpdated received:', state);
      this.#lobbyState.set(state);

      this.#adminLobbies.update((map) => {
        const next = new Map(map);
        next.set(state.sessionId, state);
        return next;
      });
    });

    try {
      await this.#hubConnection.start();
      this.#isConnected.set(true);
      console.log('[SignalR] Connected successfully to /hubs/lobby');
    } catch (err) {
      this.#isConnected.set(false);
      console.error('[SignalR] Failed to connect:', err);
    }
  }

  async joinLobby(sessionId: string): Promise<void> {
    if (!this.#hubConnection || !this.#isConnected()) {
      console.warn('[SignalR] Cannot join lobby: not connected');
      return;
    }

    try {
      await this.#hubConnection.invoke('JoinLobby', sessionId);
      console.log(`[SignalR] Joined lobby ${sessionId}`);
    } catch (err) {
      console.error(`[SignalR] Failed to join lobby ${sessionId}:`, err);
    }
  }

  async leaveLobby(sessionId: string): Promise<void> {
    if (!this.#hubConnection || !this.#isConnected()) {
      return;
    }

    try {
      await this.#hubConnection.invoke('LeaveLobby', sessionId);
      this.#lobbyState.set(null);
      console.log(`[SignalR] Left lobby ${sessionId}`);
    } catch (err) {
      console.error(`[SignalR] Failed to leave lobby ${sessionId}:`, err);
    }
  }

  async joinAdminSupervision(): Promise<void> {
    if (!this.#hubConnection || !this.#isConnected()) {
      console.warn('[SignalR] Cannot join admin supervision: not connected');
      return;
    }

    try {
      await this.#hubConnection.invoke('JoinAdminSupervision');
      this.#isSupervising.set(true);
      console.log('[SignalR] 👑 Joined Admin Supervision (God Mode)');
    } catch (err) {
      console.error('[SignalR] Failed to join admin supervision:', err);
    }
  }

  async leaveAdminSupervision(): Promise<void> {
    if (!this.#hubConnection || !this.#isConnected()) {
      return;
    }

    try {
      await this.#hubConnection.invoke('LeaveAdminSupervision');
      this.#isSupervising.set(false);
      this.#adminLobbies.set(new Map());
      console.log('[SignalR] Left Admin Supervision');
    } catch (err) {
      console.error('[SignalR] Failed to leave admin supervision:', err);
    }
  }

  async stopConnection(): Promise<void> {
    if (!this.#hubConnection) return;
    await this.#hubConnection.stop();
    this.#hubConnection = null;
    this.#isConnected.set(false);
    this.#lobbyState.set(null);
    this.#isSupervising.set(false);
    this.#adminLobbies.set(new Map());
  }
}
