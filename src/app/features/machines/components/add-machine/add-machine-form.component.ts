import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MachineStatus, PinballModel } from '../../models/machine.model';

@Component({
  selector: 'add-machine-form',
  templateUrl: './add-machine-form.component.html',
  styleUrl: './add-machine-form.component.css',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddMachineFormComponent {
  readonly model = input.required<PinballModel>();

  protected onAddUnit(): void {
    if (this.addUnitForm.invalid) {
      this.addUnitForm.markAllAsTouched();
      return;
    }
    const formValues = this.addUnitForm.getRawValue();
    this.unitAdded.emit(formValues);
    this.addUnitForm.reset({ status: 'ONLINE' });
  }

  readonly unitAdded = output<{
    serialNumber: string;
    ipAddress: string;
    location: string;
    status: MachineStatus;
  }>();

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
}
