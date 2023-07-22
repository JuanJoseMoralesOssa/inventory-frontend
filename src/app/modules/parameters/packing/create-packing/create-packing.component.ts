import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { PackingModel } from 'src/app/models/packing.model';

@Component({
  selector: 'app-create-packing',
  templateUrl: './create-packing.component.html',
  styleUrls: ['./create-packing.component.css']
})
export class CreatePackingComponent {
  faCircleXmark = faCircleXmark;
  // faCircleWMarkRegular = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  packing: PackingModel = {};
  packingName: string ='';

  constructor(
    private dialogRef: DialogRef<PackingModel>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.BuildForm();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      packingName: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.packing = {
      id: this.packing.id,
      packing: this.GetFormGroup['packingName'].value,
      products: this.packing.products,
    }
    this.dialogRef.close(this.packing);
  }
}
