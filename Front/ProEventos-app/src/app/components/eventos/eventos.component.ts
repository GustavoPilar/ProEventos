import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ToastrService } from 'ngx-toastr';

import { NgxSpinnerService, NgxSpinnerModule  } from "ngx-spinner";

import { EventoService } from '../../services/evento.service';

import { Evento } from '../../model/Evento';

import { DateTimeFormatPipe } from '../../helpers/DateTimeFormat.pipe';
import { TitulosComponent } from '../../shared/titulos/titulos.component';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    TitulosComponent,

    CommonModule,
    FormsModule,
    TooltipModule,
    BsDropdownModule,
    NgxSpinnerModule,

    CollapseDirective,
    
    DateTimeFormatPipe,
  ],
  providers: [
    BsModalService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  modalRef?: BsModalRef;
  
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public imageWidth: number = 100;
  public showImg: boolean = false;
  private _filterList: string = '';

  constructor(
    private eventoService : EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
}

  public get getfilterList() : string {
    return this._filterList;
  }

  public set setFilterList(value : string) {
    this._filterList = value;
    this.eventosFiltrados = this._filterList ? this.filterEvents(this._filterList) : this.eventos;
  }

  public filterEvents(value : string): Evento[] {
    value = value.toLowerCase();
    return this.eventos.filter(
      (e: {tema: string; local: string}) => e.tema.toLocaleLowerCase().indexOf(value) !== -1 ||
      e.local.toLocaleLowerCase().indexOf(value) !== -1
    )
  }


  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O Evento foi deletado com sucesso.', 'Deletado!');
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  public alterImg(): void {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
      this.eventoService.getEventos().subscribe(
        {
          next: (response: Evento[]) => {
            this.eventos = response
            this.eventosFiltrados = this.eventos; 
          },
          error: (error) => {
            this.spinner.hide();
            this.toastr.error('Erro ao carregar os eventos', 'Erro!');
          },
          complete: () => this.spinner.hide()
        }
      )
  }

}
