import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  saldoUsuario: number = 100; 
  numeroCuenta: number=100000;
  constructor() { }

  ngOnInit(): void {
  }

}
