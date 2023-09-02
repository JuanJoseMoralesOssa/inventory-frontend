import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  startDate: string = '';
  endDate: string = '';
  resultArr: any[] = [];
  result: string = '';

  constructor(private http: HttpClient) {}

  consultFilteredSales() {
    // Realiza una llamada al backend con las fechas seleccionadas
    const filter = {
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.http.post<any>('http://localhost:3000/sale-filtered', filter).subscribe({
      next: data => {
        // Procesa la respuesta del backend y asigna el resultado
        this.result = JSON.stringify(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  copyToClipboard() {
    // Lógica para copiar this.result al portapapeles
    const el = document.createElement('textarea');
    el.value = this.result;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
