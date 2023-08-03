import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBookJournalWhills, faCircleXmark, faMoneyBill, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BillModel } from 'src/app/models/bill.model';
import { ClientModel } from 'src/app/models/client.model';
import { RemissionModel } from 'src/app/models/remission.model';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css']
})
export class EditSaleComponent {
  faMoneyBill = faMoneyBill;
  faBookJournalWhills = faBookJournalWhills;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faUser = faUser;
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  selectedToggle: string = 'bill';

  sale: SaleModel;
  remissionNum: RemissionModel | undefined;
  remissionNumId: number | undefined;
  remissionNum_remission: number | undefined;
  saleDate: string | undefined;
  client: ClientModel | undefined;
  clientId: number | undefined;
  clientName: string | undefined;
  bill: BillModel | undefined;
  billId: number | undefined;
  bill_bill: number | undefined;
  remission: RemissionModel | undefined;
  remissionId: number | undefined;
  remission_remission: number | undefined;

  clients: ClientModel[] | undefined;
  remissions: RemissionModel[] | undefined;
  documents: any | undefined;

  remissionsSubscription: Subscription | undefined;
  clientsSubscription: Subscription | undefined;
  documentsSubscription: Subscription | undefined;

  constructor(
    private businessLogic: BusinessLogicService,
    private dialogRef: DialogRef<SaleModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateSale: SaleModel,
  ) {
    this.sale = updateSale;
    this.saleDate = updateSale.saleDate;
    this.remissionNum = updateSale.remissionNum;
    this.remissionNumId = updateSale.remissionNumId;
    this.remissionNum_remission = updateSale.remissionNum?.remission;
    this.client = updateSale.client;
    this.clientId = updateSale.client?.id;
    this.clientName = updateSale.client?.clientName;
    this.bill = updateSale.bill;
    this.billId = updateSale.bill?.id;
    this.bill_bill = updateSale.bill?.bill;
    this.remission = updateSale.remission;
    this.remissionId = updateSale.remission?.id;
    this.remission_remission = updateSale.remission?.remission;
    if (this.bill_bill && !this.remission_remission) {
      this.selectedToggle = 'bill';
      this.loadBills();
    } else if (!this.bill_bill && this.remission_remission){
      this.selectedToggle = 'remission';
      this.loadRemissionsDoc();
    } else {
      this.loadBills();
    }
  }

  ngOnInit() {
    this.loadClients();
    this.loadRemissions();
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

  selectToggle(value: string) {
    this.selectedToggle = value;
    if (value === 'bill') {
      this.loadBills();
      this.fGroup.patchValue({
        document: this.bill?.bill,
      });
    } else if (value === 'remission') {
      this.loadRemissionsDoc();
      this.fGroup.patchValue({
        document: this.remission?.remission,
      });
    }
  }

  loadClients() {
    this.clientsSubscription = this.businessLogic.getClientService().listClients().subscribe({
      next: (clientData: ClientModel[]) => {
        this.clients = clientData;
      },
      error: () => {
        alert('No se cargaron los clientes')
        console.log('====================================');
        console.log('Error al cargar los clientes');
        console.log('====================================');
      }
    });
  }

  loadBills() {
    this.documentsSubscription = this.businessLogic.getBillService().listBills().subscribe({
      next: (documentsData: BillModel[]) => {
        this.documents = documentsData;
      },
      error: () => {
        alert('No se cargaron las facturas')
        console.log('====================================');
        console.log('Error al cargar las facturas');
        console.log('====================================');
      }
    });
  }


  loadRemissionsDoc() {
      this.documentsSubscription = this.businessLogic.getRemissionService().listRemissions().subscribe({
        next: (documentsData: RemissionModel[]) => {
          this.documents = documentsData;
        },
        error: () => {
          alert('No se cargaron las remisiones')
          console.log('====================================');
          console.log('Error al cargar las remisiones');
          console.log('====================================');
        }
      });
  }

  loadRemissions() {
    this.remissionsSubscription = this.businessLogic.getRemissionService().listRemissions().subscribe({
        next: (remissionsData: RemissionModel[]) => {
          this.remissions = remissionsData;
        },
        error: () => {
          alert('No se cargaron las remisiones')
          console.log('====================================');
          console.log('Error al cargar las remisiones');
          console.log('====================================');
        }
      });
  }

  chooseClient(client: ClientModel): void {
    this.clientId = client.id;
    this.fGroup.patchValue({
      clientName: client.clientName,
    });
  }

  chooseDocument(document: RemissionModel | BillModel) {
    if (this.selectedToggle === 'bill') {
      this.chooseBill(document);
    } else if (this.selectedToggle === 'remission'){
      this.chooseRemDoc(document);
    }
  }

  chooseBill(bill: BillModel): void {
    this.billId = bill.id;
    this.fGroup.patchValue({
      document: bill.bill,
    });
  }

  chooseRemDoc(remission: RemissionModel): void {
    this.remissionId = remission.id;
    this.fGroup.patchValue({
      document: remission.remission,
    });
  }

  chooseRem(remission: RemissionModel): void {
    this.remissionNumId = remission.id;
    this.fGroup.patchValue({
      remissionNum: remission.remission,
    });
  }


  getFormattedDate(): string {
    const year = new Date(this.saleDate!).getFullYear();
    const month = String(new Date(this.saleDate!).getMonth() + 1).padStart(2, '0');
    const day = String(new Date(this.saleDate!).getDate()).padStart(2, '0');
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


  getSaleDate(): string {
    const dateString = this.GetFormGroup['saleDate'].value;
    const dateParts = dateString.split("-");
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[0], 10);
    const dateObject = new Date(year, month - 1, day);
    return dateObject.toISOString();
  }

  closeWithRes() {
    let remissionNum = this.remissionNum;
    if (remissionNum?.remission != this.GetFormGroup['remissionNum'].value) {
      remissionNum = {
        id: this.remissionNumId,
        remission: this.GetFormGroup['remissionNum'].value
      }
    }

    let client = this.client;
    if (client?.clientName != this.GetFormGroup['clientName'].value) {
      client = {
        id: this.clientId,
        clientName: this.GetFormGroup['clientName'].value
      }
    }

    let bill = this.bill;
    let remission = this.remission;
    if (this.selectedToggle == 'bill') {
        bill = {
          id: this.billId,
          bill: this.GetFormGroup['document'].value
        }
        this.sale = {
          id: this.sale.id,
          saleDate: this.getSaleDate(),
          remissionNumId: this.remissionNumId,
          remissionNum,
          clientId: client?.id,
          client,
          products: [],
          billId: this.billId,
          bill,
      }
    } else if (this.selectedToggle == 'remission') {
        remission = {
          id: this.remissionId,
          remission: this.GetFormGroup['document'].value
        }
        this.sale = {
        id: this.sale.id,
        saleDate: this.getSaleDate(),
        remissionNumId: this.remissionNumId,
        remissionNum,
        clientId: this.clientId,
        client,
        remissionId: this.remissionId,
        remission,
      }
    }

    this.dialogRef.close(this.sale);
  }

  ngOnDestroy():void {
    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
    if (this.remissionsSubscription) {
      this.remissionsSubscription.unsubscribe();
    }
    if (this.documentsSubscription) {
      this.documentsSubscription.unsubscribe();
    }
  }

}
