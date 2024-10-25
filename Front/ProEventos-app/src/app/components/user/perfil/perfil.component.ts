import { Component } from '@angular/core';
import { TitulosComponent } from '@app/shared/titulos/titulos.component';
import { CommonModule } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/validation/password/ValidatorField';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    TitulosComponent,

    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  formOptions: AbstractControlOptions = {
    validators: ValidatorField.MustMatch('password', 'confirmPassword')
  }

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private formBuilder : FormBuilder) {
    this.validation();
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
      function: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    }, this.formOptions)
  }

    public resetForm(): void {
      this.form.reset();
    }
  }
