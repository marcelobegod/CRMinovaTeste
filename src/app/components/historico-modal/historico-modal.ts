import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Registro {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
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

  registroEditando: Registro | null = null;

  fecharModal() {
    this.visible = false;
    this.limparCampos();
    this.fechar.emit();
  }

  editarRegistro(registro: Registro) {
    this.registroEditando = registro;
    this.novaAtividade = registro.atividade;
    this.novaDescricao = registro.descricao;
  }

  salvarRegistro() {
    if (!this.card) return;

    if (!this.novaAtividade.trim()) {
      alert('Atividade é obrigatória');
      return;
    }

    if (!this.card.historico) {
      this.card.historico = [];
    }

    if (this.registroEditando) {
      // Editando registro existente
      this.registroEditando.atividade = this.novaAtividade;
      this.registroEditando.descricao = this.novaDescricao;
      this.registroEditando.data = new Date();
      this.registroEditando = null;
    } else {
      // Criando novo registro
      const novoRegistro: Registro = {
        id: this.gerarId(),
        atividade: this.novaAtividade,
        descricao: this.novaDescricao,
        data: new Date()
      };
      this.card.historico.push(novoRegistro);
    }

    // Atualizar localStorage (comentado para futura migração)
    /*
    const historicoSalvo = JSON.parse(localStorage.getItem(`historico_${this.card.id}`) || '[]');
    historicoSalvo.push({
      id: this.gerarId(),
      atividade: this.novaAtividade,
      descricao: this.novaDescricao,
      data: new Date()
    });
    localStorage.setItem(`historico_${this.card.id}`, JSON.stringify(historicoSalvo));
    */

    this.atualizar.emit(this.card);
    this.limparCampos();
  }

  limparCampos() {
    this.novaAtividade = '';
    this.novaDescricao = '';
    this.registroEditando = null;
  }

  gerarId() {
    return Math.random().toString(36).substring(2, 9);
  }
}
