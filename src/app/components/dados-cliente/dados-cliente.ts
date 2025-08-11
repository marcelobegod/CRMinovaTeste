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
  @Input() card!: Card;
  @Output() atualizar = new EventEmitter<Card>();

  editando = false;

  habilitarEdicao() {
    this.editando = true;
  }

  salvarAlteracoes() {
    this.editando = false;
    this.atualizar.emit(this.card);
  }
}
