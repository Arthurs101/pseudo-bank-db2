import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.scss']
})
export class HistorialTransaccionesComponent {

}

//dejo comentando esto q es para importar las transacciones  y mostrarlas

// import { Component, OnInit } from '@angular/core';

// import { TransactionService } from '../transaction.service'; 
// import { Transaction } from '../transaction.model'; 

// @Component({
//   selector: 'app-historial-transacciones',
//   templateUrl: './historial-transacciones.component.html',
//   styleUrls: ['./historial-transacciones.component.scss']
// })
// export class HistorialTransaccionesComponent implements OnInit {
//   transacciones: Transaction[] = [];

//   constructor(private transactionService: TransactionService) {}

//   ngOnInit() {
//     this.transactionService.getTransactions().subscribe(
//       (transacciones) => {
//         this.transacciones = transacciones;
//       },
//       (error) => {
//         console.error('Error al obtener transacciones', error);
//       }
//     );
//   }
// }