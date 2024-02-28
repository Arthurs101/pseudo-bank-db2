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

  constructor(private service: minibankService, private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group({


      name: ['', Validators.required],
      lastnames: ['', Validators.required],
      nationality: ['', Validators.required], // Añadido

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
         alert('Error al actualizar el usuario. Por favor, inténtelo de nuevo.')
        }
      });
    }
  }
}
