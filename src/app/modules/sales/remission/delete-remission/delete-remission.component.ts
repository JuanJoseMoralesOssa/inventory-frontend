import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { RemissionModel } from 'src/app/models/remission.model';

@Component({
  selector: 'app-delete-remission',
  templateUrl: './delete-remission.component.html',
  styleUrls: ['./delete-remission.component.css']
})
export class DeleteRemissionComponent {
  faCircleXmark = faCircleXmark;

  remissionId: number = 0;

  constructor(
    private dialogRef: DialogRef<RemissionModel['id']>,
    @Inject(DIALOG_DATA) remissionId: number,
  ) {
    this.remissionId = remissionId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.remissionId);
  }
}
