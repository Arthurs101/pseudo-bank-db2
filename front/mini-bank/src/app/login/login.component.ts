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
        console.log(User)
        this.service.setUser(User)
        this.router.navigate(['/dashboard']);
       
      },
      (error) => {
        Swal.fire('error',error.error.message,'error')
      }
    );
  }
}
