import { Component, inject, computed, input, Signal } from '@angular/core';
import { MachineService } from '../data-access/machines.service';
import { TooltipModule } from 'primeng/tooltip';
import { MachineStatus, PinballModel } from '../models/machine.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddMachineFormComponent } from '../components/add-machine/add-machine-form.component';
import { MachineHeaderComponent } from '../components/machine-header/machine-header.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';

@Component({
  selector: 'app-machines-page',
  standalone: true,
  templateUrl: './machine-page.component.html',
  styleUrl: './machine-page.component.css',
  imports: [
    TooltipModule,
    ReactiveFormsModule,
    RouterLink,
    AddMachineFormComponent,
    MachineHeaderComponent,
    FilterComponent,
  ],
})
export class MachinesPageComponent {
  private readonly machineService = inject(MachineService);

  readonly modelId = input<string>();
  ngOnInit(): void {
    // Équivalent de : useEffect(() => { loadUnitsFormApi() }, [])
    this.machineService.loadUnitsFormApi();
  }
  protected readonly selectedModel: Signal<PinballModel | null> = computed(() => {
    const id = this.modelId();
    if (!id) return null;
    return this.machineService.models().find((m) => m.id === id) ?? null;
  });

  protected readonly modelSummaries = this.machineService.modelSummaries;

  protected readonly selectedModelUnits = computed(() => {
    const currentModel = this.selectedModel();
    if (!currentModel) return [];
    return this.machineService.units().filter((u) => u.modelId === currentModel.id);
  });

  protected changeStatus(unitId: string, nextStatus: MachineStatus): void {
    this.machineService.updateUnitStatus(unitId, nextStatus);
  }

  protected onAddUnit(values: {
    serialNumber: string;
    ipAddress: string;
    location: string;
    status: MachineStatus;
  }): void {
    const currentModel = this.selectedModel();
    if (!currentModel) return;

    this.machineService.addUnit({
      id: `u-${Date.now()}`,
      serialNumber: values.serialNumber,
      modelId: currentModel.id,
      ipAddress: values.ipAddress,
      location: values.location,
      status: values.status,
      totalGamesPlayed: 0,
      lastPing: "À l'instant",
    });
  }
}
