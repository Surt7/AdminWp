import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import {
  ApiMachineDto,
  MachineStatus,
  MachineUnit,
  ModelSummary,
  PinballModel,
} from '../models/machine.model';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const INITIAL_MODELS: PinballModel[] = [
  { id: 'godzilla', name: 'Godzilla Premium', manufacturer: 'Stern Pinball', year: 2021 },
  { id: 'medieval', name: 'Medieval Madness', manufacturer: 'Williams', year: 1997 },
  { id: 'mars', name: 'Attack from Mars', manufacturer: 'Bally', year: 1995 },
  { id: 'deadpool', name: 'Deadpool Pro', manufacturer: 'Stern Pinball', year: 2018 },
];
const INITIAL_UNITS: MachineUnit[] = [
  {
    id: 'u1',
    serialNumber: 'ST-GZ-01',
    modelId: 'godzilla',
    ipAddress: '192.168.1.101',
    status: 'ONLINE',
    location: 'Arcade Paris 11',
    totalGamesPlayed: 1420,
    lastPing: '2 min',
  },
  {
    id: 'u2',
    serialNumber: 'ST-GZ-02',
    modelId: 'godzilla',
    ipAddress: '192.168.1.102',
    status: 'IN_GAME',
    location: 'Bar Le Flipper',
    totalGamesPlayed: 890,
    lastPing: 'Direct',
  },
  {
    id: 'u3',
    serialNumber: 'ST-GZ-03',
    modelId: 'godzilla',
    ipAddress: '192.168.1.103',
    status: 'MAINTENANCE',
    location: 'Atelier',
    totalGamesPlayed: 3200,
    lastPing: '1 h',
  },
  {
    id: 'u4',
    serialNumber: 'WI-MM-01',
    modelId: 'medieval',
    ipAddress: '192.168.1.104',
    status: 'ONLINE',
    location: 'Arcade Paris 11',
    totalGamesPlayed: 5400,
    lastPing: '5 min',
  },
  {
    id: 'u5',
    serialNumber: 'WI-MM-02',
    modelId: 'medieval',
    ipAddress: '192.168.1.105',
    status: 'OFFLINE',
    location: 'Salle Lyon',
    totalGamesPlayed: 2100,
    lastPing: 'Hier',
  },
  {
    id: 'u6',
    serialNumber: 'BA-AFM-01',
    modelId: 'mars',
    ipAddress: '192.168.1.106',
    status: 'IN_GAME',
    location: 'Bowling Nantes',
    totalGamesPlayed: 4100,
    lastPing: 'Direct',
  },
  {
    id: 'u7',
    serialNumber: 'ST-DP-01',
    modelId: 'deadpool',
    ipAddress: '192.168.1.107',
    status: 'ONLINE',
    location: 'Bar Le Flipper',
    totalGamesPlayed: 750,
    lastPing: '1 min',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  #models = signal<PinballModel[]>(INITIAL_MODELS);
  #units = signal<MachineUnit[]>(INITIAL_UNITS);

  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  loadUnitsFormApi(): void {
    this.#isLoading.set(true);
    this.#error.set(null);

    this.http
      .get<ApiMachineDto[]>('/api/v1/admin/machines', { withCredentials: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: ApiMachineDto[]) => {
          console.log('Mes machines DTO reçues :', data);
          this.#isLoading.set(false);
        },
        error: (err) => {
          console.error('erreur API: ', err);
          this.#error.set('Impossible de contacter le serveur backend');
          this.#isLoading.set(false);
        },
      });
  }

  #isLoading = signal<boolean>(false);
  #error = signal<string | null>(null);

  readonly isLoading = this.#isLoading.asReadonly();
  readonly error = this.#error.asReadonly();

  readonly units = this.#units.asReadonly();
  readonly models = this.#models.asReadonly();

  readonly modelSummaries = computed<ModelSummary[]>(() => {
    const models = this.#models();
    const units = this.#units();
    return models.map((model) => {
      const modelUnits = units.filter((u) => u.modelId === model.id);
      return {
        model: model,
        totalUnits: modelUnits.length,
        onlineCount: modelUnits.filter((u) => u.status === 'ONLINE').length,
        inGameCount: modelUnits.filter((u) => u.status === 'IN_GAME').length,
        maintenanceCount: modelUnits.filter((u) => u.status === 'MAINTENANCE').length,
        offlineCount: modelUnits.filter((u) => u.status === 'OFFLINE').length,
      };
    });
  });

  addUnit(newUnit: MachineUnit): void {
    this.#units.update((currentList) => [...currentList, newUnit]);
  }

  updateUnitStatus(unitId: string, newStatus: MachineStatus): void {
    this.#units.update((currentList) =>
      currentList.map((unit) => (unit.id === unitId ? { ...unit, status: newStatus } : unit)),
    );
  }
}
