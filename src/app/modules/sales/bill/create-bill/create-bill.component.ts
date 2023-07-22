import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BillModel } from 'src/app/models/bill.model';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent {
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  bill: BillModel = {};
  billNum: number = 0;

  constructor(
    private dialogRef: DialogRef<BillModel>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.BuildForm();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      billName: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.bill = {
      id: this.bill.id,
      bill: this.GetFormGroup['billNum'].value,
      sale: this.bill.sale,
    }
    this.dialogRef.close(this.bill);
  }
}
