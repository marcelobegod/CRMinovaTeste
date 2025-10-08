import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column';
import { LinhaStickyComponent } from '../linha-sticky/linha-sticky';
import { HistoricoModalComponent } from '../historico-modal/historico-modal';
import { Card } from '../../shared/models/card.model';
import { transferArrayItem } from '@angular/cdk/drag-drop';

interface Coluna {
  titulo: string;
  cards: Card[];
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ColumnComponent, LinhaStickyComponent, HistoricoModalComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
})
export class BoardComponent implements OnInit {
  colunas: Coluna[] = [];

  colunaVisivel = 0;
  isMobile = window.innerWidth < 768;

  historicoModalAberto = false;
  cardSelecionado: Card | null = null;

  connectedColumnIds: string[] = [];
  abrirModalCallback!: () => void;

  touchStartX = 0;
  touchEndX = 0;

  /** Carrega dados do localStorage ou usa padrão */
  ngOnInit(): void {
    const salvas = localStorage.getItem('colunas');
    if (salvas) {
      this.colunas = JSON.parse(salvas);
    } else {
      this.colunas = [
        { titulo: 'Contato inicial', cards: [] },
        { titulo: 'Orçamento enviado', cards: [] },
        { titulo: 'Visita agendada', cards: [] },
        { titulo: 'Ganho', cards: [] },
        { titulo: 'Perdido', cards: [] },
      ];
    }

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

  avancarColuna(): void {
    if (this.colunaVisivel < this.colunas.length - 1) this.colunaVisivel++;
  }

  voltarColuna(): void {
    if (this.colunaVisivel > 0) this.colunaVisivel--;
  }

  onNovoCard(card: Card): void {
    this.colunas[0].cards.push(card);
    this.salvarNoLocalStorage();
  }

  /** Drag & drop */
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
    this.salvarNoLocalStorage();
  }

  abrirHistorico(card: Card): void {
    this.cardSelecionado = card;
    this.historicoModalAberto = true;
  }

  fecharHistorico(): void {
    this.historicoModalAberto = false;
    this.cardSelecionado = null;
  }

  salvarHistorico(cardAtualizado: Card): void {
    if (!cardAtualizado) return;

    this.colunas.forEach(coluna => {
      const idx = coluna.cards.findIndex(c => c.id === cardAtualizado.id);
      if (idx !== -1) coluna.cards[idx] = cardAtualizado;
    });

    this.salvarNoLocalStorage();
  }

  abrirEdicao(card: Card): void {
    console.log('Abrir edição para', card);
  }

  confirmarExclusao(card: Card): void {
    if (!confirm(`Deseja realmente excluir o negócio "${card.negocio}"?`)) return;

    this.colunas.forEach(coluna => {
      coluna.cards = coluna.cards.filter(c => c.id !== card.id);
    });

    this.salvarNoLocalStorage();
  }

  criarColuna(titulo: string): void {
  const novaColuna = { titulo, cards: [] };

  // Encontrar índice da coluna "Ganho"
  const indexGanho = this.colunas.findIndex(c => c.titulo.toLowerCase() === 'ganho');

  // Inserir antes de "Ganho", ou ao final se "Ganho" não for encontrada
  const indexInsercao = indexGanho !== -1 ? indexGanho : this.colunas.length;

  this.colunas.splice(indexInsercao, 0, novaColuna);

  this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
  this.salvarNoLocalStorage();
}


  removerColuna(index: number): void {
    this.colunas.splice(index, 1);
    this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
    this.salvarNoLocalStorage();
  }

  atualizarTituloColuna(event: { index: number; titulo: string }): void {
    this.colunas[event.index].titulo = event.titulo;
    this.salvarNoLocalStorage();
  }

  moverParaPerdido(event: { card: Card; motivo: string; detalhes: string }): void {
    const { card } = event;

    this.colunas.forEach(coluna => {
      coluna.cards = coluna.cards.filter(c => c.id !== card.id);
    });

    const colunaPerdido = this.colunas.find(c => c.titulo.toLowerCase() === 'perdido');
    if (colunaPerdido) {
      colunaPerdido.cards.push(card);
      this.salvarNoLocalStorage();
    } else {
      console.warn('Coluna "Perdido" não encontrada!');
    }
  }

  moverParaGanho(card: Card): void {
    this.colunas.forEach(coluna => {
      coluna.cards = coluna.cards.filter(c => c.id !== card.id);
    });

    const colunaGanho = this.colunas.find(c => c.titulo.toLowerCase() === 'ganho');
    if (colunaGanho) {
      colunaGanho.cards.push(card);
      this.salvarNoLocalStorage();
    } else {
      console.warn('Coluna "Ganho" não encontrada!');
    }
  }

  /** Persistência */
  private salvarNoLocalStorage(): void {
    localStorage.setItem('colunas', JSON.stringify(this.colunas));
  }
}
