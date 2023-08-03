import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  faCircleXmark = faCircleXmark;
  // faCircleWMarkRegular = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  client: ClientModel;
  clientName: string ='';

  constructor(
    private dialogRef: DialogRef<ClientModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateClient: ClientModel,
  ) {
    this.client = updateClient;
    this.clientName = updateClient.clientName!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      clientName: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      clientName: this.clientName,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.client = {
      id: this.client.id,
      clientName: this.GetFormGroup['clientName'].value,
    }
    this.dialogRef.close(this.client);
  }
}
