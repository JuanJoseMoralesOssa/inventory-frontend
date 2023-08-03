import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
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
  faUser = faUser;
  faCircleXmark = faCircleXmark;
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
  documents: any | undefined;

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
