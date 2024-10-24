import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidatorField } from '@app/helpers/validation/password/ValidatorField';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    RouterLink,

    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{

  formOptions: AbstractControlOptions = {
    validators: ValidatorField.MustMatch('password', 'confirmPassword')
  };

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private formBuilder : FormBuilder) {
    
  }
  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      termUse: ['', [Validators.required]]
    }, this.formOptions);
  }

  public resetForm(): void {
    this.form.reset();
  }
}
