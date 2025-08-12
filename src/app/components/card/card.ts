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
  // Recebe o objeto card com os dados
  @Input() card!: Card;

  // Eventos para interações externas
  @Output() cardClicked = new EventEmitter<Card>();
  @Output() excluirCard = new EventEmitter<Card>();

  /**
   * Calcula a cor do fundo baseado na data da última atividade do histórico.
   * - verde: atividade para hoje
   * - vermelho: atividade passada
   * - cinza: sem histórico ou futura
   */
  get statusCor(): 'verde' | 'vermelho' | 'cinza' | 'amarelo' {
  if (!this.card?.historico || this.card.historico.length === 0) {
    // Sem nenhuma atividade cadastrada → amarelo (alerta)
    return 'amarelo';
  }

  // Filtra atividades que NÃO estão concluídas (pendentes)
  const atividadesPendentes = this.card.historico.filter(registro => !registro.concluida);

  if (atividadesPendentes.length === 0) {
    // Todas concluídas → amarelo (alerta para criar nova)
    return 'amarelo';
  }

  // Tem atividades pendentes, usa lógica da data da última atividade pendente
  const ultimaAtividade = atividadesPendentes[atividadesPendentes.length - 1];
  const dataAtividade = new Date(ultimaAtividade.data);

  if (isNaN(dataAtividade.getTime())) {
    console.warn('Data inválida na última atividade do card:', ultimaAtividade.data);
    return 'cinza';
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  dataAtividade.setHours(0, 0, 0, 0);

  if (dataAtividade.getTime() === hoje.getTime()) {
    return 'verde';
  } else if (dataAtividade.getTime() < hoje.getTime()) {
    return 'vermelho';
  } else {
    return 'cinza';
  }
}

  /**
   * Emite evento de clique no card.
   */
  onClick(): void {
    this.cardClicked.emit(this.card);
  }

  /**
   * Emite evento de exclusão do card.
   * @param event MouseEvent para evitar propagação do clique.
   */
  onExcluir(event: MouseEvent): void {
    event.stopPropagation();
    this.excluirCard.emit(this.card);
  }
}
