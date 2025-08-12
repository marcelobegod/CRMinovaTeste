import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-dados-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dados-cliente.html',
  styleUrls: ['./dados-cliente.css'],
})
export class DadosClienteComponent {
  // Dados do cliente para edição
  @Input() card!: Card;

  // Evento para avisar alterações no cliente
  @Output() atualizar = new EventEmitter<Card>();

  // Controle do modo edição
  editando = false;

  /**
   * Habilita o modo edição dos campos
   */
  habilitarEdicao(): void {
    this.editando = true;
  }

  /**
   * Salva as alterações e desabilita edição
   */
  salvarAlteracoes(): void {
    this.editando = false;
    this.atualizar.emit(this.card);
  }
}
