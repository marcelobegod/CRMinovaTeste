import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
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
  @Input() connectedTo: number = 0; // total de colunas
  @Output() cardMoved = new EventEmitter<{
    previousIndex: number;
    currentIndex: number;
    previousContainer: number;
    currentContainer: number;
  }>();
  
  getConnectedIds(): string[] {
  return Array.from({ length: this.connectedTo }, (_, i) => i.toString()).filter(id => id !== this.index.toString());
}


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
}
