import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { PackingModel } from 'src/app/models/packing.model';

@Component({
  selector: 'app-edit-packing',
  templateUrl: './edit-packing.component.html',
  styleUrls: ['./edit-packing.component.css']
})
export class EditPackingComponent {

  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  packing: PackingModel;
  packingName: string ='';

  constructor(
    private dialogRef: DialogRef<PackingModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updatePacking: PackingModel,
  ) {
    this.packing = updatePacking;
    this.packingName = updatePacking.packing!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      packingName: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      packingName: this.packingName,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.packing = {
      id: this.packing.id,
      packing: this.GetFormGroup['packingName'].value,
    }
    this.dialogRef.close(this.packing);
  }
}
