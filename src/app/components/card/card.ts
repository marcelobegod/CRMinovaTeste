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

  // Calcula o status para definir a cor do fundo do card
  get statusCor(): 'verde' | 'vermelho' | 'cinza' {
    if (!this.card?.historico || this.card.historico.length === 0) {
      return 'cinza';
    }

    // Pega a última atividade do histórico
    const ultimaAtividade = this.card.historico[this.card.historico.length - 1];

    // Converte a data para Date (garantindo que funcione caso venha string)
    const dataAtividade = new Date(ultimaAtividade.data);

    // Se data for inválida, retorna cinza para evitar erros
    if (isNaN(dataAtividade.getTime())) {
      console.warn('Data inválida na última atividade do card:', ultimaAtividade.data);
      return 'cinza';
    }

    const hoje = new Date();

    // Zerando horas para comparar só a data
    hoje.setHours(0, 0, 0, 0);
    dataAtividade.setHours(0, 0, 0, 0);

    if (dataAtividade.getTime() === hoje.getTime()) {
      return 'verde';  // Atividade para hoje
    } else if (dataAtividade.getTime() < hoje.getTime()) {
      return 'vermelho'; // Atividade passada
    } else {
      return 'cinza';  // Atividade futura
    }
  }

  onClick() {
    this.cardClicked.emit(this.card);
  }

  onExcluir(event: MouseEvent) {
    event.stopPropagation();
    this.excluirCard.emit(this.card);
  }
}
