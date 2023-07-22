import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { RemissionModel } from 'src/app/models/remission.model';

@Component({
  selector: 'app-create-remission',
  templateUrl: './create-remission.component.html',
  styleUrls: ['./create-remission.component.css']
})
export class CreateRemissionComponent {
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  remission: RemissionModel = {};
  remissionNum: number =0;

  constructor(
    private dialogRef: DialogRef<RemissionModel>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.BuildForm();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      remissionNum: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
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
