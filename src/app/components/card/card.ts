import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input() card!: Card;

  @Output() cardClicked = new EventEmitter<Card>();
  @Output() excluirCard = new EventEmitter<Card>();

  // Determina cor do card baseado no histórico
  get statusCor(): 'verde' | 'vermelho' | 'cinza' | 'amarelo' {
    if (!this.card?.historico?.length) return 'amarelo';

    const pendentes = this.card.historico.filter(r => !r.concluida);
    if (!pendentes.length) return 'amarelo';

    const ultima = pendentes[pendentes.length - 1];
    const dataAtividade = new Date(ultima.data);
    if (isNaN(dataAtividade.getTime())) return 'cinza';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataAtividade.setHours(0, 0, 0, 0);

    if (dataAtividade.getTime() === hoje.getTime()) return 'verde';
    if (dataAtividade.getTime() < hoje.getTime()) return 'vermelho';
    return 'cinza';
  }

  // Clique no card
onClick(): void {
  this.cardClicked.emit({ ...this.card }); // cria cópia nova
}

  // Clique no botão excluir
  onExcluir(event: MouseEvent): void {
    event.stopPropagation();
    this.excluirCard.emit(this.card);
  }
}
