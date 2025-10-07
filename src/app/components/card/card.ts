import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input() card!: Card;

  @Output() cardClicked = new EventEmitter<Card>();
  @Output() excluirCard = new EventEmitter<{ card: Card; motivo: string; detalhes: string }>();

  motivoPerda: string = '';
  detalhesPerda: string = '';
  mostrarModal = false;

  // Cor do status baseada na atividade mais recente
  get statusCor(): 'vermelho' | 'amarelo' | 'azul' | 'cinza' {
    if (!this.card?.historico?.length) return 'cinza';

    const pendentes = this.card.historico.filter(r => !r.concluida);
    if (!pendentes.length) return 'cinza';

    const ultima = pendentes[pendentes.length - 1];
    const dataAtividade = new Date(ultima.data);
    if (isNaN(dataAtividade.getTime())) return 'cinza';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataAtividade.setHours(0, 0, 0, 0);

    if (dataAtividade.getTime() < hoje.getTime()) return 'vermelho';
    if (dataAtividade.getTime() === hoje.getTime()) return 'amarelo';
    return 'azul';
  }

  onClick(): void {
    this.cardClicked.emit(this.card);
  }

  // Ao clicar no botão da lixeira, abrir modal
  abrirModalPerdido(event: MouseEvent): void {
    event.stopPropagation();
    this.motivoPerda = '';
    this.detalhesPerda = '';
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  salvarPerda(): void {
    if (!this.motivoPerda) {
      alert('Por favor, selecione um motivo da perda.');
      return;
    }
    this.excluirCard.emit({ card: this.card, motivo: this.motivoPerda, detalhes: this.detalhesPerda });
    this.fecharModal();
  }
}
