import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoricoFormComponent } from '../historico-form/historico-form';
import { DadosClienteComponent } from '../dados-cliente/dados-cliente';
import { Card } from '../../shared/models/card.model';
import { Registro } from '../../shared/models/registro.model';
import { HistoricoService } from '../../shared/services/historico.service';

export type HistoricoModalEvent =
  | { type: 'fechar' }
  | { type: 'atualizar'; card: Card };

@Component({
  selector: 'app-historico-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HistoricoFormComponent, DadosClienteComponent],
  templateUrl: './historico-modal.html',
  styleUrls: ['./historico-modal.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricoModalComponent {
  @Input() card: Card | null = null;
  @Input() visible = false;
  @Output() evento = new EventEmitter<HistoricoModalEvent>();
  @Output() atualizar = new EventEmitter<any>();

  novaAtividade = '';
  novaDescricao = '';
  dataInputISO = '';

  registroEditando: Registro | null = null;

  constructor(private historicoService: HistoricoService) {}

  fecharModal() {
    this.visible = false;
    this.limparCampos();
    this.evento.emit({ type: 'fechar' });
  }

  editarRegistro(registro: Registro) {
    if (registro.concluida) return;
    this.registroEditando = registro;
    this.novaAtividade = registro.atividade;
    this.novaDescricao = registro.descricao;
    this.dataInputISO = this.formatarDataISO(registro.data);
  }

  salvar(event: { atividade: string; descricao: string; data: string }) {
    if (!this.card) return;

    if (this.registroEditando) {
      if (!this.registroEditando.concluida) {
        this.registroEditando.atividade = event.atividade;
        this.registroEditando.descricao = event.descricao;
        this.registroEditando.data = this.historicoService.parseDateLocal(event.data);
      }
      this.registroEditando = null;
    } else {
      this.card.historico = this.card.historico || [];
      this.card.historico.push({
        id: this.historicoService.gerarId(),
        atividade: event.atividade,
        descricao: event.descricao,
        data: this.historicoService.parseDateLocal(event.data),
        concluida: false
      });
    }

    this.evento.emit({ type: 'atualizar', card: this.card });
    this.limparCampos();
  }

  concluirAtividadeRegistro(registro: Registro) {
    if (registro.concluida) return;

    const hoje = new Date();
    registro.data = hoje;
    registro.concluida = true;

    if (this.registroEditando?.id === registro.id) {
      this.registroEditando = null;
      this.limparCampos();
    }

    if (this.card) {
      this.evento.emit({ type: 'atualizar', card: this.card });
    }
  }

  limparCampos() {
    this.novaAtividade = '';
    this.novaDescricao = '';
    this.dataInputISO = '';
    this.registroEditando = null;
  }

  formatarDataISO(data: Date): string {
    if (!data) return '';
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const dia = ('0' + d.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
  }

  formatarData(data: Date): string {
    if (!data) return '';
    const formatador = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formatador.format(new Date(data));
  }

  formatarDataSomenteData(data: Date): string {
    if (!data) return '';
    const formatador = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return formatador.format(new Date(data));
  }

  historicoOrdenado(): Registro[] {
    return this.card?.historico
      ? this.historicoService.ordenar(this.card.historico)
      : [];
  }
}
