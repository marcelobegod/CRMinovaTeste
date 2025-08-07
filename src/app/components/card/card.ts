import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class CardComponent {
  @Input() card!: Card;
  @Output() cardClicked = new EventEmitter<Card>();
  @Output() editarCard = new EventEmitter<Card>();
  @Output() excluirCard = new EventEmitter<Card>();

  onEditar(event: MouseEvent) {
  event.stopPropagation(); // Impede de abrir modal de atividades
  this.editarCard.emit(this.card);
  }

  onExcluir(event: MouseEvent) {
  event.stopPropagation();
  this.excluirCard.emit(this.card);
  }

  onClick() {
  this.cardClicked.emit(this.card);
  }

}
