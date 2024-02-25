import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  saldoUsuario: number = 1000; 
  numeroCuenta: string = '123456789'; 
  chart: Chart | undefined; 

  constructor() {
  
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    const config: ChartConfiguration = {
      type: 'doughnut', 
      data: {
        labels: ['Depósitos', 'Débitos', 'Retiros', 'Compras'],
        datasets: [{
          label: 'Transacciones del último mes',
          data: [300, 500, 100, 200], 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
      
      }
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, config);
    }
  }
}
