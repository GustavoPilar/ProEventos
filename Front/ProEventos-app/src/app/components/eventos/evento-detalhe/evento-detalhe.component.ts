import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/model/Evento';
import { DateTimeFmtPipe } from '@app/helpers/pipes/DateFormat/DateTimeFmt.pipe';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    DateTimeFmtPipe,
  ],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss',
})
export class EventoDetalheComponent implements OnInit {
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get configBs(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm A',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      todayPosition: 'center',
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();
      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        error: (error) => {
          this.toastr.error('Erro ao tentar carregar o Evento.');
          console.log(error);
        }
      }).add(() => this.spinner.hide());
    }
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', [Validators.required]],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.evento = { ...this.form.value };

        this.eventoService['post'](this.evento).subscribe({
          next: () => {
            this.toastr.success('Evento salvo com sucesso', 'Salvo.');
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Erro ao salvar o Evento', 'Evento');
          }
        }).add(() => this.spinner.hide());
      }
      else
      {
        this.evento = { id: this.evento.id, ...this.form.value };

        this.eventoService['put'](this.evento).subscribe({
          next: () => {
            this.toastr.success('Evento salvo com sucesso', 'Salvo.');
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Erro ao salvar o Evento', 'Evento');
          }
        }).add(() => this.spinner.hide());
      }
    }
  }
}
