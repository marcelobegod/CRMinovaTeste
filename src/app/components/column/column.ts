import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from '../../shared/models/card.model';
import { CardComponent } from '../card/card';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, CardComponent],
  templateUrl: './column.html',
  styleUrls: ['./column.css'],
})
export class ColumnComponent {
  @Input() title!: string;
  @Input() cards: Card[] = [];
  @Input() index!: number;
  @Input() connectedTo: string[] = [];

  @Output() cardMoved = new EventEmitter<{ previousIndex: number; currentIndex: number; previousContainer: number; currentContainer: number; }>();
  @Output() cardClicked = new EventEmitter<Card>();
  @Output() editarCard = new EventEmitter<Card>();
  @Output() excluirCard = new EventEmitter<Card>();

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

  onCardClick(card: Card) { this.cardClicked.emit(card); }
  onEditarCard(card: Card) { this.editarCard.emit(card); }
  onExcluirCard(card: Card) { this.excluirCard.emit(card); }

  trackById(index: number, card: Card): string { return card.id; }
}
