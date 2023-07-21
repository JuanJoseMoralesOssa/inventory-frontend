import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent {
  faCircleXmark = faCircleXmark;

  clientId: number = 0;

  constructor(
    private dialogRef: DialogRef<ClientModel['id']>,
    @Inject(DIALOG_DATA) clientId: number,
  ) {
    this.clientId = clientId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.clientId);
  }
}
