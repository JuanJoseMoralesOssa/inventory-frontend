import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BillModel } from 'src/app/models/bill.model';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent {
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  bill: BillModel;
  billNum: number =0;

  constructor(
    private dialogRef: DialogRef<BillModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateBill: BillModel,
  ) {
    this.bill = updateBill;
    this.billNum = updateBill.bill!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      billNum: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      billNum: this.billNum,
    });
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
