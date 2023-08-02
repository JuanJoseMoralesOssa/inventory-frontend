import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientModel } from 'src/app/models/client.model';
import { SaleModel } from 'src/app/models/sale.model';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent {
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faUser = faUser;
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  selectedToggle: string = 'bill';

  sale: SaleModel = {};
  clients = [
    { clientName: 'Cliente 1' },
    { clientName: 'Cliente 2' },
  ];

  constructor(
    private dialogRef: DialogRef<SaleModel>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.BuildForm();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      saleDate: ['', [Validators.required]],
      remissionNum: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      document: ['', [Validators.required]],
    });
  }

  chooseClient(client: ClientModel): void {
    this.fGroup.patchValue({
      clientName: client.clientName,
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selectToggle(value: string) {
    this.selectedToggle = value;
  }

  getSaleDate(): string {
    const dateString = this.GetFormGroup['saleDate'].value;
    const dateParts = dateString.split("-");
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[0], 10);
    const dateObject = new Date(year, month - 1, day);
    return dateObject.toString();
  }

  closeWithRes() {

    this.sale = {
      id: this.sale.id,
      saleDate: this.getSaleDate(),
      remissionNumModel: { remission: this.GetFormGroup['remissionNum'].value },
      client: { clientName: this.GetFormGroup['clientName'].value },
      remissionNumId: undefined,
      billId: undefined,
      remissionId: undefined,
      bill: {},
      remission: {},
      clientId: undefined,
      products: [],
    }
    this.dialogRef.close(this.sale);
  }
}
