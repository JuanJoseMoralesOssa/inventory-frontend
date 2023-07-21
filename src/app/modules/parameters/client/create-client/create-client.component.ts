import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  faCircleXmark = faCircleXmark;
  // faCircleWMarkRegular = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  client: ClientModel = {};
  clientName: string ='';

  constructor(
    private dialogRef: DialogRef<ClientModel>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.BuildForm();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      clientName: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.client = {
      id: this.client.id,
      clientName: this.GetFormGroup['clientName'].value,
      sales: this.client.sales,
    }
    this.dialogRef.close(this.client);
  }
}
