import { Component, inject, signal, computed, input } from '@angular/core';
import { MachineService } from '../data-access/machines.service';
import { TooltipModule } from 'primeng/tooltip';
import { PinballModel ,MachineStatus} from '../models/machine.model';
import {ReactiveFormsModule,FormControl,FormGroup,Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-machines-page',
  standalone: true,
  templateUrl: './machine-page.component.html',
  styleUrl: './machine-page.component.css',
  imports: [TooltipModule, ReactiveFormsModule, RouterLink],
})
export class MachinesPageComponent {

  private readonly machineService = inject(MachineService);

  readonly modelId = input<string>();

  protected readonly selectedModel = computed(() => {
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


  // 1. Déclaration du formulaire typé avec ses règles de validation
  protected readonly addUnitForm = new FormGroup({
    serialNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    ipAddress: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(\d{1,3}\.){3}\d{1,3}$/)],
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl<MachineStatus>('ONLINE', {
      nonNullable: true,
    }),
  });

  protected onAddUnit(): void {
    if (this.addUnitForm.invalid) {
      this.addUnitForm.markAllAsTouched(); // Force l'affichage des erreurs
      return;
    }
    // getRawValue() extrait l'objet typé TypeScript { serialNumber, ipAddress, location, status }
    const values = this.addUnitForm.getRawValue();
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
    this.addUnitForm.reset();
  }
}
