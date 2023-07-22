import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { RemissionModel } from 'src/app/models/remission.model';

@Component({
  selector: 'app-edit-remission',
  templateUrl: './edit-remission.component.html',
  styleUrls: ['./edit-remission.component.css']
})
export class EditRemissionComponent {
   faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  remission: RemissionModel;
  remissionNum: number =0;

  constructor(
    private dialogRef: DialogRef<RemissionModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateRemission: RemissionModel,
  ) {
    this.remission = updateRemission;
    this.remissionNum = updateRemission.remission!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      remissionNum: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      remissionNum: this.remissionNum,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.remission = {
      id: this.remission.id,
      remission: this.GetFormGroup['remissionNum'].value,
      sale: this.remission.sale,
    }
    this.dialogRef.close(this.remission);
  }
}
