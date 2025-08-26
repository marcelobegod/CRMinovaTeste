import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoricoFormComponent } from '../historico-form/historico-form';
import { DadosClienteComponent } from '../dados-cliente/dados-cliente';
import { Registro } from '../../shared/models/registro.model';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-historico-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HistoricoFormComponent, DadosClienteComponent],
  templateUrl: './historico-modal.html',
  styleUrls: ['./historico-modal.css']
})
export class HistoricoModalComponent {
  @Input() card: Card | null = null;       // Card atual
  @Input() visible = false;                 // Visibilidade do modal
  @Output() fechar = new EventEmitter<void>();  // Evento fechar modal
  @Output() atualizar = new EventEmitter<Card>(); // Evento atualizar card

  novaAtividade = '';
  novaDescricao = '';
  dataInputISO = '';
  registroEditando: Registro | null = null;

  // --- Função para interpretar data ISO como local (sem aplicar fuso horário UTC) ---
  private parseDateLocal(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  fecharModal() {
    this.visible = false;
    this.limparCampos();
    this.fechar.emit();
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
      // Atualiza registro existente, se não concluído
      if (!this.registroEditando.concluida) {
        this.registroEditando.atividade = event.atividade;
        this.registroEditando.descricao = event.descricao;
        // <-- CORREÇÃO: usa parseDateLocal para evitar problema de fuso horário
        this.registroEditando.data = this.parseDateLocal(event.data);
      }
      this.registroEditando = null;
    } else {
      // Adiciona novo registro ao histórico do card
      this.card.historico = this.card.historico || [];
      this.card.historico.push({
        id: this.gerarId(),
        atividade: event.atividade,
        descricao: event.descricao,
        // <-- CORREÇÃO: usa parseDateLocal para evitar problema de fuso horário
        data: this.parseDateLocal(event.data),
        concluida: false
      });
    }

    this.atualizar.emit(this.card);
    this.limparCampos();
  }

  concluirAtividadeRegistro(registro: Registro) {
    if (registro.concluida) return;

    const hoje = new Date();
    let dataAtividade = new Date();

    // Ajusta a data para hoje se for futura
    if (dataAtividade > hoje) dataAtividade = hoje;

    registro.data = dataAtividade;
    registro.concluida = true;

    if (this.registroEditando && this.registroEditando.id === registro.id) {
      this.registroEditando = null;
      this.limparCampos();
    }

    if (this.card) {
      this.atualizar.emit(this.card);
    }
  }

  limparCampos() {
    this.novaAtividade = '';
    this.novaDescricao = '';
    this.dataInputISO = '';
    this.registroEditando = null;
  }

  gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
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
    if (!this.card?.historico) return [];

    const naoConcluidas = this.card.historico.filter(r => !r.concluida);
    const concluidas = this.card.historico
      .filter(r => r.concluida)
      .sort((a, b) => b.data.getTime() - a.data.getTime());

    return [...naoConcluidas, ...concluidas];
  }
}
