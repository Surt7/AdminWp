import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import {
  ApiMachineDto,
  Machine,
  MachineStatus,
  mapStatusToUi,
  LicenseSummary,
  ModelSummary,
  PinballModel,
} from '../models/machine.model';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  // Reactive state signals
  #machines = signal<Machine[]>([]);
  #isLoading = signal<boolean>(false);
  #error = signal<string | null>(null);

  // Active view toggle: 'LIST' (flat table of all machines) or 'IP' (grouped by Intellectual Property / License)
  readonly viewMode = signal<'LIST' | 'IP'>('LIST');

  // Readonly public signals
  readonly isLoading = this.#isLoading.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly machines = this.#machines.asReadonly();

  // Backward compatibility alias for components using .units
  readonly units = this.#machines.asReadonly();

  /**
   * Computed signal grouping machines by their Intellectual Property (IP / Franchise License)
   */
  readonly licenseSummaries = computed<LicenseSummary[]>(() => {
    const allMachines = this.#machines();
    if (allMachines.length === 0) {
      return [];
    }

    // Group machines by licenseName / ipSlug
    const groups = new Map<string, Machine[]>();
    for (const machine of allMachines) {
      const key = machine.licenseName || 'Sans Licence';
      const existing = groups.get(key) ?? [];
      existing.push(machine);
      groups.set(key, existing);
    }

    const summaries: LicenseSummary[] = [];
    for (const [licenseName, units] of groups.entries()) {
      const slug = units[0]?.ipSlug || licenseName.toLowerCase().replace(/\s+/g, '-');
      summaries.push({
        id: slug,
        name: licenseName,
        manufacturer: 'WorldPinball',
        year: 2026,
        totalUnits: units.length,
        onlineCount: units.filter((u) => u.status === 'ONLINE').length,
        inGameCount: units.filter((u) => u.status === 'IN_GAME').length,
        maintenanceCount: units.filter((u) => u.status === 'MAINTENANCE').length,
        offlineCount: units.filter((u) => u.status === 'OFFLINE').length,
        pendingCount: units.filter((u) => u.status === 'PENDING').length,
      });
    }

    return summaries;
  });

  // Backward-compatible computed signal for existing components
  readonly modelSummaries = computed<ModelSummary[]>(() => {
    return this.licenseSummaries().map((lic) => ({
      model: lic,
      totalUnits: lic.totalUnits,
      onlineCount: lic.onlineCount,
      inGameCount: lic.inGameCount,
      maintenanceCount: lic.maintenanceCount,
      offlineCount: lic.offlineCount,
    }));
  });

  // Backward-compatible signal for model list
  readonly models = computed<PinballModel[]>(() => this.licenseSummaries());

  /**
   * Loads machines from backend API and maps DTOs to UI domain entities
   */
  loadUnitsFormApi(): void {
    this.#isLoading.set(true);
    this.#error.set(null);

    this.http
      .get<ApiMachineDto[]>(API_ENDPOINTS.MACHINES.ROOT, { withCredentials: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (dtos: ApiMachineDto[]) => {
          const mappedMachines: Machine[] = dtos.map((dto) => {
            const licenseName = dto.machineName || 'Resident Evil Death Island';
            const ipSlug = licenseName
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');

            return {
              id: dto.machineId,
              serialNumber: dto.serialNumber,
              licenseName: licenseName,
              ipSlug: ipSlug,
              displayName: dto.displayName || dto.serialNumber,
              status: mapStatusToUi(dto.machineStatus),
              notes: dto.machineNotes,
              registeredAtUtc: dto.registredAtUtc,
              lastUpdated: dto.lastUpdated,
              totalGamesPlayed: 0,
              lastPing: 'Direct',
            };
          });

          this.#machines.set(mappedMachines);
          this.#isLoading.set(false);
        },
        error: (err) => {
          console.error('API Error when loading machines:', err);
          this.#error.set('Impossible de contacter le serveur backend');
          this.#isLoading.set(false);
        },
      });
  }

  addUnit(newMachine: Machine): void {
    this.#machines.update((currentList) => [...currentList, newMachine]);
  }

  updateUnitStatus(unitId: string, newStatus: MachineStatus): void {
    this.#machines.update((currentList) =>
      currentList.map((m) => (m.id === unitId ? { ...m, status: newStatus } : m)),
    );
  }
}
