// Importaciones necesarias
import { Component } from '@angular/core';
import { minibankService } from '../backend.service';
import { Transaction } from '../transaction.model';
import { User } from '../usermodels.model';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-realizar-transaccion',
  templateUrl: './realizar-transaccion.component.html',
  styleUrls: ['./realizar-transaccion.component.scss']
})
export class RealizarTransaccionComponent {

  transaction: Transaction = {
    ammount: 0,
    date: '',
    currency: '',
    account_from: '',
    account_to: '',
    user_id: ''
  };
  user: User|null =null


  // Inyectar minibankService
  constructor ( private Router:Router, private service: minibankService)  {}

  ngOnInit(): void {
    this.user = this.service.getUser();
    console.log(this.user)
    if (this.user == null) {
      this.Router.navigate(['/not-found']);
    }
    console.log(this.user?.accounts);
  }

  // Método para manejar el envío del formulario
  submitTransaction(formValues: any) {
    if(this.user) {
      const transaction: Transaction = {
        user_id:this.user._id,
        ammount: formValues.amount,
        date: formValues.date,
        currency: formValues.currency,
        account_from: formValues.account_from,
        account_to: formValues.account_to
      };


      console.log('Enviando transacción:', transaction);

      this.service.performTransaction(transaction).subscribe({
        next: (response) => {
          console.log('Transacción realizada con éxito', response);
          alert('Transacción realizada con éxito.');
        },
        error: (error) => {
          console.error('Error al realizar la transacción', Object.entries(error));
          alert(error.error.message);
        }
      });
    } else {
      console.error('Error: No se ha encontrado el user_id');
      alert('Error: Su sesión parece haber terminado. Por favor, inicie sesión de nuevo.');
    }
  }
}
