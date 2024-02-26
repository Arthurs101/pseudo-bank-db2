import { Component } from '@angular/core';
import { minibankService } from '../backend.service';
import { User } from '../usermodels.model';

@Component({
  selector: 'app-realizar-transaccion',
  templateUrl: './realizar-transaccion.component.html',
  styleUrls: ['./realizar-transaccion.component.scss']
})
export class RealizarTransaccionComponent {
  user: User | null = null
  constructor(private service:minibankService){
  }
  ngOnInit(){
    this.user = this.service.getUser();
    console.log(this.user)

  }
}
