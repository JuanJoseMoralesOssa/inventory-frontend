import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBookJournalWhills, faCircleXmark, faMoneyBill, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription, debounceTime } from 'rxjs';
import { BillModel } from 'src/app/models/bill.model';
import { ClientModel } from 'src/app/models/client.model';
import { RemissionModel } from 'src/app/models/remission.model';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent {
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faMoneyBill = faMoneyBill;
  faUser = faUser;
  faCircleXmark = faCircleXmark;
  faBookJournalWhills = faBookJournalWhills;

  fGroup: FormGroup = new FormGroup({});

  selectedToggle: string = 'bill';

  sale: SaleModel = {};
  remissionNumId: number | undefined;
  remissionNum: RemissionModel | undefined;
  clientId: number | undefined;
  client: ClientModel | undefined;
  billId: number | undefined;
  bill: BillModel | undefined;
  remissionId: number | undefined;
  remission: RemissionModel | undefined;

  clients: ClientModel[] | undefined;
  remissions: RemissionModel[] | undefined;
  documents: (RemissionModel | BillModel)[] | undefined;

  filteredRemissions: RemissionModel[] | undefined;
  filteredClients: ClientModel[] | undefined;
  filteredDocuments: any | undefined;

  clientsSubscription: Subscription | undefined;
  remissionsSubscription: Subscription | undefined;
  documentsSubscription: Subscription | undefined;

  constructor(
    private dialogRef: DialogRef<SaleModel>,
    private businessLogic: BusinessLogicService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loadClients();
    this.loadRemissions();
    this.selectToggle(this.selectedToggle);
    this.BuildForm();
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

  selectToggle(value: string) {
    this.selectedToggle = value;
    if (value === 'bill') {
      this.loadBills();
    } else if (value === 'remission') {
      this.loadRemissionsDoc();
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
              if (item.remission === value) {
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
        this.filteredDocuments =  this.documents;
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
    this.client = {
      id: client.id,
      clientName: client.clientName
    }
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
    this.bill = {
      id: bill.id,
      bill: bill.bill
    }
    this.billId = bill.id;
    this.fGroup.patchValue({
      document: bill.bill,
    });
  }

  chooseRemDoc(remission: RemissionModel): void {
    this.remission = {
      id: remission.id,
      remission: remission.remission
    }
    this.remissionId = remission.id;
    this.fGroup.patchValue({
      document: remission.remission,
    });
  }

  chooseRem(remission: RemissionModel): void {
    this.remissionNum = {
      id: remission.id,
      remission: remission.remission
    }
    this.remissionNumId = remission.id;
    this.fGroup.patchValue({
      remissionNum: remission.remission,
    });
  }


  get GetFormGroup() {
    return this.fGroup.controls;
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
        clientId: this.clientId,
        client: this.client,
        billId: this.billId,
        bill: this.bill,
      }
      if (this.GetFormGroup['document'].value != this.bill?.bill || this.bill?.bill === undefined) {
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
