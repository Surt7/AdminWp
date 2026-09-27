export type MachineStatus = 'ONLINE' | 'IN_GAME' | 'MAINTENANCE' | 'OFFLINE' | 'PENDING';

export interface PinballModel {
  id: string;
  name: string;
  manufacturer: string;
  year: number;
}

export interface MachineUnit {
  id: string;
  serialNumber: string;
  modelId: string;
  ipAddress: string;
  status: MachineStatus;
  location: string;
  totalGamesPlayed: number;
  lastPing: string;
}
export interface ApiMachineDto {
  machineId: string;
  machineName: string;
  displayName: string;
  machineStatus: ApiMachineStatus;
  machineNotes: string | null;
  registredAtUtc: string;
  lastUpdated: string | null;
  serialNumber: string;
}
export enum ApiMachineStatus {
  Active = 1,
  Revoked = 2,
  Inactive = 3,
  Maintenance = 4,
  PendingEnrollment = 5,
}

export interface ModelSummary {
  model: PinballModel;
  totalUnits: number;
  onlineCount: number; // 🟢 En ligne
  inGameCount: number; // 🔵 En cours de partie
  maintenanceCount: number; // 🟡 Maintenance
  offlineCount: number; // 🔴 Hors ligne
}

export function mapStatusToUi(status: ApiMachineStatus): MachineStatus {
  switch (status) {
    case ApiMachineStatus.Active:
      return 'ONLINE';
    case ApiMachineStatus.Maintenance:
      return 'MAINTENANCE';
    case ApiMachineStatus.PendingEnrollment:
      return 'PENDING';
    case ApiMachineStatus.Inactive:
    case ApiMachineStatus.Revoked:
    default:
      return 'OFFLINE';
  }
}
