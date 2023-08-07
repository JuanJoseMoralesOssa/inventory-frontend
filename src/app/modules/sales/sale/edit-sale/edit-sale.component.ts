import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBookJournalWhills, faCircleXmark, faMoneyBill, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription, debounceTime, pipe } from 'rxjs';
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
  saleDate: string | undefined;
  client: ClientModel | undefined;
  clientId: number | undefined;
  bill: BillModel | undefined;
  billId: number | undefined;
  remission: RemissionModel | undefined;
  remissionId: number | undefined;

  clients: ClientModel[] | undefined;
  remissions: RemissionModel[] | undefined;
  documents: (RemissionModel | BillModel)[] | undefined;

  filteredRemissions: RemissionModel[] | undefined;
  filteredClients: ClientModel[] | undefined;
  filteredDocuments: any | undefined;

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
    this.client = updateSale.client;
    this.clientId = updateSale.client?.id;
    this.bill = updateSale.bill;
    this.billId = updateSale.bill?.id;
    this.remission = updateSale.remission;
    this.remissionId = updateSale.remission?.id;
    if (this.bill?.bill && !this.remission?.remission) {
      this.selectedToggle = 'bill';
      this.loadBills();
    } else if (!this.bill?.bill && this.remission?.remission){
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
    this.filterRemission();
    this.filterClient();
    this.filterDocument();
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

  filterRemission() {
    this.GetFormGroup['remissionNum'].valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        if (value === null) {
          this.filteredRemissions = this.remissions;
        }
        else {
          if (this.remissions?.length) {
            this.filteredRemissions = this.remissions.filter(item => {
            const filter = `${item.remission}`;
              if (item.remission == value) {
                this.remissionNumId = item.id;
                this.remissionNum = {
                  id: item.id,
                  remission: item.remission,
                }
              }
            return filter.includes(value);
          });
        }
      }
    });
  }

  filterClient() {
    this.GetFormGroup['clientName'].valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        if (value === null) {
          this.filteredClients = this.clients;
        }
        else {
          if (this.clients?.length) {
            this.filteredClients = this.clients.filter(item => {
            const filter = `${item.clientName}`;
              if (item.clientName?.toLowerCase() === value.toLowerCase()) {
                this.clientId = item.id;
                this.client = {
                  id: item.id,
                  clientName: item.clientName,
                }
              }
            return filter.toLowerCase().includes(value.toLowerCase());
          });
        }
      }
    });
  }

  filterDocument() {
    this.GetFormGroup['document'].valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        if (value === null || value === undefined) {
          this.filteredDocuments = this.documents;
        }
        else {
          if (this.documents?.length) {
            if (this.selectedToggle == 'bill') {
              this.filteredDocuments = this.documents.filter(item => {
                const filter = `${item.bill}`;
                if (item.bill === value) {
                  this.billId = item.id;
                  this.bill = {
                    id: item.id,
                    bill: item.bill,
                  }
                }
                return filter.includes(value);
              });
            }
            else {
              this.filteredDocuments = this.documents.filter(item => {
                const filter = `${item.remission}`;
                if (item.remission === value) {
                  this.remissionId = item.id;
                  this.remission = {
                    id: item.id,
                    remission: item.remission,
                  }
                }
                return filter.includes(value);
              });
            }
          }
        }
      }
    );
  }

  loadClients() {
    this.clientsSubscription = this.businessLogic.getClientService().listClients().subscribe({
      next: (clientData: ClientModel[]) => {
        this.clients = clientData;
        this.filteredClients = this.clients;
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
        this.filteredDocuments = this.documents;
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
          this.filteredDocuments =  this.documents;
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
        this.filteredRemissions = this.remissions;
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
      remissionNum: remission.remission
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
    const document = this.bill?.bill ? this.bill?.bill : (this.remission?.remission ? this.remission.remission : undefined);
    this.fGroup.patchValue({
      saleDate: this.getFormattedDate(),
      remissionNum: this.remissionNum?.remission,
      clientName: this.client?.clientName,
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

    if (this.selectedToggle == 'bill') {

        this.sale = {
          id: this.sale.id,
          saleDate: this.getSaleDate(),
          remissionNumId: this.remissionNumId,
          remissionNum: this.remissionNum,
          clientId: this.sale.clientId,
          client: this.client,
          products: [],
          billId: this.billId,
          bill: this.bill,
        }

      if (this.GetFormGroup['document'].value != this.bill?.bill || this.bill?.bill === undefined) {
        this.sale.billId = undefined;
        this.sale = {
          ...this.sale,
          bill: {
            bill: this.GetFormGroup['document'].value ? this.GetFormGroup['document'].value : undefined,
          }
        }
      }
    } else if (this.selectedToggle == 'remission') {
      this.sale = {
        id: this.sale.id,
        saleDate: this.getSaleDate(),
        remissionNumId: this.remissionNumId,
        remissionNum: this.remissionNum,
        clientId: this.clientId,
        client: this.client,
        remissionId: this.remissionId,
        remission: this.remission,
      }
      if (this.GetFormGroup['document'].value != this.remission?.remission || this.remission?.remission === undefined) {
        this.sale.remissionId = undefined;
        this.sale = {
          ...this.sale,
          remission: {
            remission: this.GetFormGroup['document'].value ? this.GetFormGroup['document'].value : undefined,
          }
        }
      }
    }

    if (this.GetFormGroup['remissionNum'].value != this.remissionNum?.remission || this.remissionNum?.remission === undefined) {
      this.sale.remissionNumId = undefined;
      this.sale = {
          ...this.sale,
          remissionNum: {
            remission: this.GetFormGroup['remissionNum'].value ? this.GetFormGroup['remissionNum'].value : undefined,
          }
        }
      }

    if (this.GetFormGroup['clientName'].value != this.client?.clientName || this.client?.clientName === undefined) {
      this.sale.clientId = undefined;
      this.sale = {
          ...this.sale,
          client: {
            clientName: this.GetFormGroup['clientName'].value ? this.GetFormGroup['clientName'].value : undefined,
          }
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
