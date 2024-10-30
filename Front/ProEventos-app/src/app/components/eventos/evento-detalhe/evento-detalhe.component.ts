import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
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

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Lote } from '@app/model/Lote';
import { Router } from '@angular/router';
import { LoteService } from '@app/services/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxCurrencyDirective } from "ngx-currency";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgxCurrencyDirective
  ],
  providers: [
    BsModalService
  ],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss',
})
export class EventoDetalheComponent implements OnInit {

  dataHoje!: string;
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';
  eventoId: number = 0;

  itemImageUrl = '/assets/upload.png';
  file: File;

  modalRef!: BsModalRef;

  loteAtual = {id: 0, nome: '', indice: 0};

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

  get configBsLote(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
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
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService
  ) {
    
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
            
            if(this.evento.imagemURL !== '') {
              this.itemImageUrl = environment.apiUrl + 'resources/images/' + this.evento.imagemURL
            }

            this.evento.lotes.forEach(lote => {
              this.lotes.push(this.criarLote(lote));
            })
            //this.carregarLotes();
          },
          error: (error) => {
            this.toastr.error('Erro ao tentar carregar o Evento.', 'Erro');
            console.log(error);
          },
        })
        .add(() => this.spinner.hide());
    }
  }

  public carregarLotes(): void {
    this.loteService.getLotesByEventoId(this.eventoId).subscribe(
      {
        next: (lotesRetorno : Lote[]) => {
          lotesRetorno.forEach(lote => {
            this.lotes.push(this.criarLote(lote));
          })
        },
        error: (error) => {
          this.toastr.error('Erro ao tentar carregar o Lotes.', 'Erro');
          console.log(error);
        },
      }
    ).add(() => this.spinner.hide());
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
      imagemURL: [''],
      lotes: this.formBuilder.array([])
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
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required],
    });
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
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

        this.eventoService.post(this.evento)
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

        this.eventoService.put(this.evento)
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
          .add(() => {
            this.spinner.hide();
          });
      }
    }
  }

  public salvarLote(): void {
    if (this.form.controls['lotes'].valid) {
      this.spinner.show();
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

  public removerLote(template: TemplateRef<any>,index: number): void {

    this.loteAtual.id = this.lotes.get(index + '.id').value;
    this.loteAtual.nome = this.lotes.get(index + '.nome').value;
    this.loteAtual.indice = this.lotes.get(index + '.id').value;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});

    
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe({
      next: () => {
        this.toastr.success('Lote deletado com sucesso.', 'Deletado.');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      error: (error: any) => {
        console.error(error)
        this.toastr.error(`Erro ao tentar deletar o lote: ${this.loteAtual.id}`, 'Erro.')
      }
    }).add(() => this.spinner.hide());
  }

  public declineDeleteLote(): void {
    this.modalRef.hide();
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do Lote' : nome;
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.itemImageUrl = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImage();
  }

  uploadImage(): void {
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe({
      next: () => {
          this.carregarEvento();
          this.toastr.success('Imagem atualizada', 'Sucesso');
      },
      error: (err) => {
          this.toastr.error('Erro ao atualizar a imagem', 'Erro');
          console.log(err);
      },
    }).add(() => this.spinner.hide());
  }
}
