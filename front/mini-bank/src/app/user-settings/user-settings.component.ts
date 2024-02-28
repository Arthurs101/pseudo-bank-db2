import { Component, OnInit } from '@angular/core';
import { minibankService } from '../backend.service';
import { User } from '../usermodels.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  user: User | null = null;
  userForm: FormGroup;
userPhoneForm: FormGroup<any>;
userAddressForm: FormGroup;
  

  constructor(private service: minibankService, private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group({
   
   
      name: ['', Validators.required],
      lastnames: ['', Validators.required], 
      nationality: ['', Validators.required], // Añadido

    });

    this.userAddressForm = this.formBuilder.group({
      street_name: ['', Validators.required],
      zip_code: ['', Validators.required], // Asegúrate de que esta línea existe
      city: ['', Validators.required],
    });
    
  




    this.userPhoneForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Solo números
      postal_code: ['', Validators.required],
      brand: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.service.getUser();
    if (this.user) {
    
      this.userForm.patchValue({
   
        name: this.user.names,
        lastnames: this.user.lastnames, 
        nationality: this.user.nationality,
       
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
  
      this.service.updateUser(this.userForm.value).subscribe({
        next: updatedUser => {
    
          this.service.setUser(updatedUser);
          alert('Usuario actualizado con éxito.');
        },
        error: error => {
         console.log(error)
         alert('Error al actualizar el usuario. Por favor, inténtelo de nuevo.')
        }
      });
    }
  }


  addPhone(): void {
    if (this.userPhoneForm.valid && this.user) {
      const phoneDetails = {
        user_code: this.user.user_code.toString(), 
        password: this.user.hashed_password, 
        new_phone: this.userPhoneForm.value
      };
      
      this.service.addPhoneNumber(phoneDetails).subscribe({
        next: (response) => {
          alert('Número de teléfono añadido con éxito.');
        },
        error: (error) => {
         
          console.error('Error al añadir el número de teléfono: ', error);
          alert('Error al añadir el número de teléfono. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }

  addAddress(): void {
    if (this.userAddressForm.valid && this.user) {
      const addressDetails = {
        user_code: this.user.user_code.toString(), // Asegúrate de que esto es un string
        password: this.user.hashed_password,
        new_address: this.userAddressForm.value
      };
      
      this.service.addAddress(addressDetails).subscribe({
        next: (response) => {
          alert('Dirección añadida con éxito.');
        },
        error: (error) => {
          console.error('Error al añadir la dirección: ', error);
          alert('Error al añadir la dirección. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }

  



  
}
