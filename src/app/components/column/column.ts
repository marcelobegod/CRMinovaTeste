import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from '../../shared/models/card.model';
import { CardComponent } from './../card/card';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, CardComponent],
  templateUrl: './column.html',
  styleUrls: ['./column.css'],
})
export class ColumnComponent {
  // Título da coluna
  @Input() title!: string;

  // Lista de cards nesta coluna
  @Input() cards: Card[] = [];

  // Índice da coluna (usado no id do drop list)
  @Input() index!: number;

  // IDs das outras listas para drag-drop conectado
  @Input() connectedTo: string[] = [];

  // Evento emitido quando um card foi movido
  @Output() cardMoved = new EventEmitter<{
    previousIndex: number;
    currentIndex: number;
    previousContainer: number;
    currentContainer: number;
  }>();

  // Evento para clique no card
  @Output() cardClicked = new EventEmitter<Card>();

  // Eventos para editar e excluir cards
  @Output() editarCard = new EventEmitter<Card>();
  @Output() excluirCard = new EventEmitter<Card>();

  /**
   * Handler do drop (drag and drop).
   * Se dentro da mesma lista, apenas rearranja.
   * Se entre listas, emite evento para tratamento externo.
   */
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    } else {
      this.cardMoved.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        previousContainer: +event.previousContainer.id,
        currentContainer: +event.container.id,
      });
    }
  }

  /**
   * Emite evento quando um card é clicado.
   */
  onCardClick(card: Card) {
    this.cardClicked.emit(card);
  }

  /**
   * Emite evento para edição de card.
   */
  onEditarCard(card: Card) {
    this.editarCard.emit(card);
  }

  /**
   * Emite evento para exclusão de card.
   */
  onExcluirCard(card: Card) {
    this.excluirCard.emit(card);
  }

  /**
   * TrackBy para *ngFor usando o id do card para performance.
   */
  trackById(index: number, card: Card): string {
    return card.id;
  }
}
