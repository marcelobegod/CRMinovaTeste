import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Registro {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
  concluida?: boolean;
}

interface Card {
  id: string;
  negocio: string;
  nome: string;
  servicoDesejado: string;
  valorNegocio: string;
  criadoPor: string;
  historico?: Registro[];
}

@Component({
  selector: 'app-historico-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico-modal.html',
  styleUrls: ['./historico-modal.css']
})
export class HistoricoModalComponent {
  @Input() card: Card | null = null;
  @Input() visible = false;

  @Output() fechar = new EventEmitter<void>();
  @Output() atualizar = new EventEmitter<Card>();

  novaAtividade = '';
  novaDescricao = '';
  dataInputISO = '';

  registroEditando: Registro | null = null;

  fecharModal() {
    this.visible = false;
    this.limparCampos();
    this.fechar.emit();
  }

  editarRegistro(registro: Registro) {
    if (registro.concluida) return; // bloqueia edição de concluída

    this.registroEditando = registro;
    this.novaAtividade = registro.atividade;
    this.novaDescricao = registro.descricao;
    this.dataInputISO = this.formatarDataISO(registro.data);
  }

  salvarRegistro() {
    if (!this.card) return;

    if (!this.novaAtividade.trim()) {
      alert('Atividade é obrigatória');
      return;
    }

    if (!this.dataInputISO) {
      alert('Data é obrigatória');
      return;
    }

    const dataConvertida = new Date(this.dataInputISO);
    if (isNaN(dataConvertida.getTime())) {
      alert('Data inválida');
      return;
    }

    if (!this.card.historico) {
      this.card.historico = [];
    }

    if (this.registroEditando) {
      // Atualiza registro existente só se não concluído
      if (!this.registroEditando.concluida) {
        this.registroEditando.atividade = this.novaAtividade;
        this.registroEditando.descricao = this.novaDescricao;
        this.registroEditando.data = dataConvertida;
      }
      this.registroEditando = null;
    } else {
      // Novo registro
      const novoRegistro: Registro = {
        id: this.gerarId(),
        atividade: this.novaAtividade,
        descricao: this.novaDescricao,
        data: dataConvertida,
        concluida: false
      };
      this.card.historico.push(novoRegistro);
    }

    this.atualizar.emit(this.card);
    this.limparCampos();
  }

  concluirAtividade() {
    if (!this.registroEditando) return;
    if (this.registroEditando.concluida) return;

    const hoje = new Date();
    let dataAtividade = new Date(this.dataInputISO);

    // Se a data da atividade for futura, usa a data atual
    if (dataAtividade > hoje) {
      dataAtividade = hoje;
    }

    this.registroEditando.data = dataAtividade;
    this.registroEditando.concluida = true;

    this.dataInputISO = this.formatarDataISO(dataAtividade);

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

  gerarId() {
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
    const d = new Date(data);
    const dia = ('0' + d.getDate()).slice(-2);
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
