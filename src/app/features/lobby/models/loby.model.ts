export interface PlayerSlotInfo {
  slotNumber: number;
  isOccupied: boolean;
  userId?: string;
  guestInitials?: string;
}

export interface SessionLobbyResponse {
  sessionId: string;
  sessionState: string;
  slots: PlayerSlotInfo[];
}
