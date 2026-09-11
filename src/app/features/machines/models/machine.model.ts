// 1. Les statuts possibles d'une borne physique
export type MachineStatus = 'ONLINE' | 'IN_GAME' | 'MAINTENANCE' | 'OFFLINE';

// 2. Le Modèle de flipper (la "Catégorie" / Licence)
export interface PinballModel {
  id: string;
  name: string;
  manufacturer: string; // Ex: Stern, Williams, Bally, Jersey Jack
  year: number;
}

// 3. La Borne physique réelle déployée dans une salle
export interface MachineUnit {
  id: string;
  serialNumber: string;
  modelId: string; // Fait le lien avec PinballModel
  ipAddress: string;
  status: MachineStatus;
  location: string;
  totalGamesPlayed: number;
  lastPing: string;
}

// 4. La structure calculée pour nos cartes (Master View)
export interface ModelSummary {
  model: PinballModel;
  totalUnits: number;
  onlineCount: number;      // 🟢 En ligne
  inGameCount: number;      // 🔵 En cours de partie
  maintenanceCount: number; // 🟡 Maintenance
  offlineCount: number;     // 🔴 Hors ligne
}
