import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { minibankService } from '../backend.service';
import {User} from '../usermodels.model'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = {username:"" , password:""}

  constructor(private router: Router,private service:minibankService) {}

  onLoginClick(): void {
    this.service.login(this.user.username,this.user.password).subscribe(
      (User: User) => {
        // Se ejecuta cuando la llamada al servicio es exitosa
        this.router.navigate(['/dashboard',{user:JSON.stringify(User)}]);
        // Aquí puedes hacer lo que necesites con el usuario devuelto
      },
      (error) => {
        Swal.fire('error',error.error.message,'error')
      }
    );
  }
}
