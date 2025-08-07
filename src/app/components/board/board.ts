import { LinhaStickyComponent } from '../linha-sticky/linha-sticky';
import { HistoricoModalComponent } from './../historico-modal/historico-modal';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column';
import { Card } from '../../shared/models/card.model';
import { transferArrayItem } from '@angular/cdk/drag-drop';

interface Coluna {
[x: string]: any;
  titulo: string;
  cards: Card[];
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    ColumnComponent,
    LinhaStickyComponent,
    HistoricoModalComponent
  ],
  templateUrl: './board.html',
  styleUrls: ['./board.css']
})
export class BoardComponent implements OnInit {
  colunas: Coluna[] = [
    { titulo: 'Contato inicial', cards: [] },
    { titulo: 'Orçamento enviado', cards: [] },
    { titulo: 'Visita agendada', cards: [] },
    { titulo: 'Demonstrou interesse', cards: [] },
    { titulo: 'Negociação', cards: [] }
  ];

  colunaVisivel = 0;
  isMobile = window.innerWidth < 768;

  historicoModalAberto = false;
  cardSelecionado: Card | null = null;

  connectedColumnIds: string[] = [];
  abrirModalCallback!: () => void;

  touchStartX = 0;
  touchEndX = 0;

  ngOnInit() {
    this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const delta = this.touchEndX - this.touchStartX;

    if (Math.abs(delta) < 50) return;

    if (delta > 0) {
      this.voltarColuna();
    } else {
      this.avancarColuna();
    }
  }

  avancarColuna(): void {
    if (this.colunaVisivel < this.colunas.length - 1) {
      this.colunaVisivel++;
    }
  }

  voltarColuna(): void {
    if (this.colunaVisivel > 0) {
      this.colunaVisivel--;
    }
  }

  onNovoCard(card: Card): void {
    this.colunas[0].cards.push(card);
  }

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

  abrirHistorico(card: Card): void {
    this.cardSelecionado = card;
    this.historicoModalAberto = true;
  }

  fecharHistorico(): void {
    this.historicoModalAberto = false;
    this.cardSelecionado = null;
  }

  salvarHistorico(novoHistorico: any): void {
    if (!this.cardSelecionado) return;

    if (!this.cardSelecionado.historico) {
      this.cardSelecionado.historico = [];
    }

    this.cardSelecionado.historico.push(novoHistorico);

    this.fecharHistorico();
  }
  abrirEdicao(card: Card) {
  // Aqui você abre seu modal de edição já com os dados preenchidos
  console.log('Editar', card);
}

confirmarExclusao(card: Card) {
  if (confirm(`Deseja realmente excluir o negócio "${card.negocio}"?`)) {
    this.colunas.forEach(coluna => {
      coluna.cards = coluna.cards.filter(c => c.id !== card.id);
    });
  }
}
}
