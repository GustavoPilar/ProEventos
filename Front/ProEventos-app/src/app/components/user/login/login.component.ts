import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private formBuilder : FormBuilder) {
    this.validation();
  }

  public validation():void {
    this.form = this.formBuilder.group({

    });
  }

}
