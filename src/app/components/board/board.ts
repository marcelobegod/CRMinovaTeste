import { Coluna } from './../../shared/models/coluna.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column';
import { LinhaStickyComponent } from '../linha-sticky/linha-sticky';
import { HistoricoModalComponent } from '../historico-modal/historico-modal';
import { Card } from '../../shared/models/card.model';
import { transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ColumnComponent, LinhaStickyComponent, HistoricoModalComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
})
export class BoardComponent implements OnInit {
  colunas: Coluna[] = [
    { titulo: 'Contato inicial', cards: [] },
    { titulo: 'Orçamento enviado', cards: [] },
    { titulo: 'Visita agendada', cards: [] },
    { titulo: 'Demonstrou interesse', cards: [] },
    { titulo: 'Negociação', cards: [] },
  ];

  colunaVisivel = 0;
  isMobile = window.innerWidth < 768;

  historicoModalAberto = false;
  cardSelecionado: Card | null = null;

  connectedColumnIds: string[] = [];
  abrirModalCallback!: () => void;

  modalVisivel = false;

  touchStartX = 0;
  touchEndX = 0;

  ngOnInit(): void {
    this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
  }

  /** Detecta redimensionamento e ajusta mobile */
  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  /** Swipe start */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  /** Swipe end */
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  /** Lógica do swipe */
  private handleSwipe() {
    const delta = this.touchEndX - this.touchStartX;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) this.voltarColuna();
    else this.avancarColuna();
  }

  /** Avança coluna mobile */
  avancarColuna(): void {
    if (this.colunaVisivel < this.colunas.length - 1) this.colunaVisivel++;
  }

  /** Volta coluna mobile */
  voltarColuna(): void {
    if (this.colunaVisivel > 0) this.colunaVisivel--;
  }

  /** Novo card na primeira coluna */
  onNovoCard(card: Card): void {
    this.colunas[0].cards.push(card);
  }

  /** Drag & drop de cards */
  onCardMovido(event: {
    previousIndex: number;
    currentIndex: number;
    previousContainer: number;
    currentContainer: number;
  }): void {
    const prevCol = this.colunas[event.previousContainer]?.cards;
    const currCol = this.colunas[event.currentContainer]?.cards;

    if (!prevCol || !currCol) {
      console.warn('Coluna inválida', event);
      return;
    }

    transferArrayItem(prevCol, currCol, event.previousIndex, event.currentIndex);
  }

  /** Abre modal de histórico */
  abrirHistorico(card: Card): void {
  // força reset antes de reatribuir
  this.cardSelecionado = null;
  this.historicoModalAberto = false;

  setTimeout(() => {
    this.cardSelecionado = { ...card }; // cria nova ref (garante mudança)
    this.historicoModalAberto = true;
  });
}

  /** Fecha modal de histórico */
  fecharHistorico(): void {
  this.historicoModalAberto = false;
  this.cardSelecionado = null;
}

  /** Salva alterações do histórico */
  salvarHistorico(cardAtualizado: Card): void {
    if (!cardAtualizado) return;
    this.colunas.forEach(coluna => {
      const idx = coluna.cards.findIndex(c => c.id === cardAtualizado.id);
      if (idx !== -1) coluna.cards[idx] = cardAtualizado;
    });
  }

  /** Editar card (abre modal de edição ou dados) */
  abrirEdicao(card: Card): void {
    console.log('Abrir edição para', card);
  }

  /** Excluir card com confirmação */
  confirmarExclusao(card: Card): void {
    if (!confirm(`Deseja realmente excluir o negócio "${card.negocio}"?`)) return;
    this.colunas.forEach(coluna => {
      coluna.cards = coluna.cards.filter(c => c.id !== card.id);
    });
  }

  criarColuna(titulo: string) {
  this.colunas.push({ titulo, cards: [] });
  this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
}

removerColuna(index: number): void {
  this.colunas.splice(index, 1);
  this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
}

atualizarTituloColuna(event: { index: number; titulo: string }): void {
  this.colunas[event.index].titulo = event.titulo;
}
}
