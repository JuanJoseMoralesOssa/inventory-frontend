import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-delivery',
  templateUrl: './daily-delivery.component.html',
  styleUrls: ['./daily-delivery.component.css']
})
export class DailyDeliveryComponent {
  startDate: string = '';
  endDate: string = '';
  resultData: string = '';

  constructor(private http: HttpClient) {}

  search() {
    // Realiza la llamada a la API con las fechas de inicio y fin
    // Supongamos que la URL de la API es 'https://api.example.com/data'
    this.http.get('https://api.example.com/data', {
      params: {
        startDate: this.startDate,
        endDate: this.endDate
      }
    }).subscribe((data: any) => {
      // Procesa los datos recibidos de la API
      this.resultData = JSON.stringify(data, null, 2);
    });
  }

  copyToClipboard() {
    const textarea = document.querySelector('textarea');
    textarea?.select();
    document.execCommand('copy');
  }
}
