import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { BillModel } from 'src/app/models/bill.model';
import { ClientModel } from 'src/app/models/client.model';
import { RemissionModel } from 'src/app/models/remission.model';
import { SaleModel } from 'src/app/models/sale.model';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css']
})
export class EditSaleComponent {
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faUser = faUser;
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  selectedOption: string = 'option1';

  sale: SaleModel;
  remissionNum_remission: number | undefined;
  remissionNum: RemissionModel | undefined;
  saleDate: Date | undefined;
  clientName: string | undefined;
  bill_bill: number | undefined;
  remission_remission: number | undefined;
  client: ClientModel | undefined;
  bill: BillModel | undefined;
  remission: RemissionModel | undefined;

  clients = [
    { clientName: 'Cliente 1' },
    { clientName: 'Cliente 2' },
  ];


  constructor(
    private dialogRef: DialogRef<SaleModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateSale: SaleModel,
  ) {
    this.sale = updateSale;
    console.log('====================================');
    console.log(this.sale);
    console.log('====================================');
    this.saleDate = updateSale.saleDate;
    this.remissionNum = updateSale.remissionNumModel;
    this.remissionNum_remission = updateSale.remissionNumModel?.remission;
    this.client = updateSale.client;
    this.clientName = updateSale.client?.clientName;
    this.bill = updateSale.bill;
    this.bill_bill = updateSale.bill?.bill;
    this.remission = updateSale.remission;
    this.remission_remission = updateSale.remission?.remission;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      saleDate: ['', [Validators.required]],
      remissionNum: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      document: ['', [Validators.required]],
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  chooseClient(client: ClientModel): void {
    this.fGroup.patchValue({
      clientName: client.clientName,
    });
  }

  getFormattedDate(): string {
    const year = this.saleDate!.getFullYear();
    const month = String(this.saleDate!.getMonth() + 1).padStart(2, '0');
    const day = String(this.saleDate!.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  updateFormValues() {
    const document = this.bill_bill ? this.bill_bill : (this.remission_remission ? this.remission_remission : undefined);
    this.fGroup.patchValue({
      saleDate: this.getFormattedDate(),
      remissionNum: this.remissionNum_remission,
      clientName: this.clientName,
      document: document,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }


  getSaleDate(): Date {
    const dateString = this.GetFormGroup['saleDate'].value;
    const dateParts = dateString.split("-");
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[0], 10);
    const dateObject = new Date(year, month - 1, day);
    return dateObject
  }

  closeWithRes() {
    let client = this.client;
    if (client?.clientName != this.GetFormGroup['clientName'].value) {
      client = {clientName: this.GetFormGroup['clientName'].value}
    }

    let bill = this.bill;
    let remission = this.remission;
    if (bill && !remission) {
      if (bill?.bill != this.GetFormGroup['document'].value) {
      bill = {bill: this.GetFormGroup['document'].value}
      }
    } else if (!bill && remission) {
      if (remission?.remission != this.GetFormGroup['document'].value) {
      remission = {remission: this.GetFormGroup['document'].value}
      }
    } else if (bill && remission) {
      if (bill?.bill != this.GetFormGroup['document'].value) {
      bill = {bill: this.GetFormGroup['document'].value}
      }
    }

    let remissionNumModel = this.remissionNum;
    if (remissionNumModel?.remission != this.GetFormGroup['remissionNum'].value) {
      remissionNumModel = {remission: this.GetFormGroup['remissionNum'].value}
    }

    this.sale = {
      id: this.sale.id,
      saleDate: this.getSaleDate(),
      remissionNumId: undefined,
      remissionNumModel,
      clientId: undefined,
      client,
      products: [],
      billId: undefined,
      bill,
      remissionId: undefined,
      remission,
    }
    this.dialogRef.close(this.sale);
  }
}
