import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from '../../shared/models/card.model';
import { CardComponent } from '../card/card';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, CardComponent],
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
  @Output() excluirColunaEvent = new EventEmitter<number>();
  @Output() tituloEditado = new EventEmitter<{ index: number; titulo: string }>();
  @Output() cardPerdido = new EventEmitter<{ card: Card; motivo: string; detalhes: string }>();
  @Output() cardGanho = new EventEmitter<Card>();



  // Controle edição de título
  editandoTitulo = false;
  novoTitulo = '';

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

  // 🔹 Funções do menu engrenagem
  editarTitulo() {
    this.novoTitulo = this.title;
    this.editandoTitulo = true;
  }

confirmarEdicaoTitulo() {
  if (this.novoTitulo.trim()) {
    this.title = this.novoTitulo.trim();
    this.tituloEditado.emit({ index: this.index, titulo: this.title });
  }
  this.editandoTitulo = false;
}

  cancelarEdicaoTitulo() {
    this.editandoTitulo = false;
  }

  excluirColuna() {
    if (confirm(`Deseja realmente excluir a coluna "${this.title}"?`)) {
      this.excluirColunaEvent.emit(this.index); // 🔹 envia pro Board
    }
  }

  onCardPerdido(event: { card: Card; motivo: string; detalhes: string }) {
  this.cardPerdido.emit(event);
}

onCardGanho(card: Card) {
  this.cardGanho.emit(card);
}

get colunaProtegida(): boolean {
  const titulo = this.title.toLowerCase();
  return titulo === 'ganho' || titulo === 'perdido';
}

}
