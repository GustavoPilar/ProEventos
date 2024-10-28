import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/model/Evento';
import { DateTimeFmtPipe } from '@app/helpers/pipes/DateFormat/DateTimeFmt.pipe';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Lote } from '@app/model/Lote';
import { Router } from '@angular/router';
import { LoteService } from '@app/services/lote.service';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    DateTimeFmtPipe,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss',
})
export class EventoDetalheComponent implements OnInit {
  dataHoje!: string;
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';
  eventoId!: number;

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

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

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.dataHoje = this.obterDataHoje();
    this.validation();
    this.carregarEvento();
  }

  obterDataHoje(): string {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1; // Meses começam em 0
    const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`; // Formato DD/MM/YYYY
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id')!;

    if (this.eventoId !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';

      this.eventoService
        .getEventoById(this.eventoId)
        .subscribe({
          next: (evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
          },
          error: (error) => {
            this.toastr.error('Erro ao tentar carregar o Evento.');
            console.log(error);
          },
        })
        .add(() => this.spinner.hide());
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
      lotes: this.formBuilder.array([]),
    });
  }

  public adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  public criarLote(lote: Lote): FormGroup {
    return this.formBuilder.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      preco: [lote.preco, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl | null): any {
    if (!campoForm) return {}; // Retorna um objeto vazio se o campo for null
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.evento = { ...this.form.value };

        this.eventoService['post'](this.evento)
          .subscribe({
            next: (eventoRetorno: Evento) => {
              this.toastr.success('Evento salvo com sucesso', 'Salvo.');
              this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
            },
            error: (error: any) => {
              console.error(error);
              this.toastr.error('Erro ao salvar o Evento', 'Evento');
            },
          })
          .add(() => this.spinner.hide());
      } else {
        this.evento = { id: this.evento.id, ...this.form.value };

        this.eventoService['put'](this.evento)
          .subscribe({
            next: () => {
              this.toastr.success('Evento salvo com sucesso', 'Salvo.');
            },
            error: (error: any) => {
              console.error(error);
              this.toastr.error('Erro ao salvar o Evento', 'Evento');
            },
          })
          .add(() => {
            this.spinner.hide();
          });
      }
    }
  }

  public salvarLote(): void {
    this.spinner.show();

    if (this.form.controls['lotes'].valid) {
      this.spinner.hide();
      this.loteService
        .SaveLote(this.eventoId, this.form.value.lotes)
        .subscribe({
          next: () => {
            this.toastr.success('Lotes salvos com sucesso.', 'Sucesso');
          },
          error: (error : any) => {
            console.error(error);
            this.toastr.error('Erro ao tentar salvar Lotes..', 'Erro');
          },
        })
        .add(() => this.spinner.hide());
    } else {
    }
  }
}
