import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientModel } from 'src/app/models/client.model';
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
  remissionNum: number | undefined;
  saleDate: Date | undefined;
  clientName: string | undefined;
  bill: number | undefined;
  remission: number | undefined;
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
    this.saleDate = updateSale.saleDate;
    this.remissionNum = updateSale.remissionNumModel?.remission;
    this.clientName = updateSale.client?.clientName;
    this.bill = updateSale.bill?.bill;
    this.remission = updateSale.remission?.remission;
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
    const document = this.bill ? this.bill : (this.remission ? this.remission : undefined);
    this.fGroup.patchValue({
      saleDate: this.getFormattedDate(),
      remissionNum: this.remissionNum,
      clientName: this.clientName,
      document: document,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.sale = {
      id: this.sale.id,
      saleDate: this.saleDate,
      remissionNumModel: {remission: this.remissionNum},
      remissionNumId: undefined,
      clientId: undefined,
      client: { clientName: this.clientName },
      products: [],
      billId: undefined,
      bill: { bill: this.bill },
      remissionId: undefined,
      remission: {remission: this.remission}
    }
    this.dialogRef.close(this.sale);
  }
}
