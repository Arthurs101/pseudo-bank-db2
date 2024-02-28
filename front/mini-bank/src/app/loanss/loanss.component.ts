import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { minibankService } from '../backend.service';
import { User } from '../usermodels.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loanss',
  templateUrl: './loanss.component.html',
  styleUrls: ['./loanss.component.scss']
})
export class LoanssComponent implements OnInit {
  loanForm: FormGroup;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private service: minibankService
  ) {
    this.loanForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      due_date: ['', Validators.required],
      currency: ['GTQ', Validators.required],
      interest: ['', [Validators.required, Validators.min(0)]],
      interest_rate: ['monthly', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.service.getUser();
    
  }

  onSubmit(): void {
    if (this.loanForm.valid && this.user) {
      const formData = { ...this.loanForm.value, userId: this.user }; 
      this.service.createLoan(formData).subscribe({
        next: (response) => {
          alert('Préstamo creado con éxito.');
        },
        error: (error) => {
          console.error('Error al crear el préstamo: ', error);
          alert('Error al crear el préstamo. Por favor, inténtelo de nuevo.');
        }
      });
    } else {
      console.error('El formulario no es válido o el usuario no está definido.');
      console.log(this.user?._id)
    }
  }
}

@NgModule({
  declarations: [LoanssComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [LoanssComponent],
})
export class LoanssModule { }
