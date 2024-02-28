import { Component, OnInit } from '@angular/core';
import { minibankService } from '../backend.service';
import { Transaction } from '../transaction.model';
import { User } from '../usermodels.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-transaccion',
  templateUrl: './realizar-transaccion.component.html',
  styleUrls: ['./realizar-transaccion.component.scss']
})
export class RealizarTransaccionComponent implements OnInit {
  transaction: Transaction = {
    ammount: 0, 
    date: '',
    currency: '',
    account_from: '',
    account_to: '',
    user_id: '' 
  };
  transactionsMade: Transaction[] = []; // Transacciones realizadas
  transactionsReceived: Transaction[] = []; // Transacciones recibidas
  user: User | null = null;

  constructor(private router: Router, private service: minibankService) {}

  ngOnInit(): void {
    this.user = this.service.getUser();
  
    if (this.user) {
    
      this.loadTransactionsMade(this.user._id);
      this.loadTransactionsReceived(this.user._id);
    } else {
   
      this.router.navigate(['/not-found']);
    }
  }
  
  loadTransactionsMade(userId: string): void {
    // Suponiendo que este método existe en tu servicio
    this.service.getTransactionsMadeByUser(userId).subscribe(
      (transactions) => {
        this.transactionsMade = transactions;
        console.log('Transacciones hechas:', transactions); 
      },
      (error) => {
        console.error('Error al cargar transacciones realizadas', error);
      }
    );
  }
  
  loadTransactionsReceived(userId: string): void {

    
    this.service.getTransactionsReceivedByUser(userId).subscribe(
      (transactions) => {
        this.transactionsReceived = transactions;

        
      console.log('Transacciones recibidas:', transactions); 
      },
      (error) => {
        console.error('Error al cargar transacciones recibidas', error);
      }
    );
  }

  submitTransaction(formValues: any): void {
    if (this.user) {
      const transactionToSubmit: Transaction = {
        ...this.transaction,
        ammount: formValues.ammount, 
        date: formValues.date,
        currency: formValues.currency,
        account_from: formValues.account_from,
        account_to: formValues.account_to,
        user_id: this.user._id 
      };
  
    this.service.performTransaction(transactionToSubmit).subscribe({
      next: (response) => {
        alert('Transacción realizada con éxito.');
      },
      error: (error) => {
        console.error('Error al realizar la transacción', error);
        alert('Error al realizar la transacción: ' + (error.error.message || 'Error desconocido'));
      }
    });
  }
}
}


