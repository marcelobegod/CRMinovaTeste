import { LinhaStickyComponent } from './../../shared/linha-sticky/linha-sticky';
import { HistoricoModalComponent } from './../historico-modal/historico-modal';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column';
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
  styleUrls: ['./board.css']
})
export class BoardComponent implements OnInit {
  colunas: Coluna[] = [
    { titulo: 'Contato Inicial', cards: [] },
    { titulo: 'Orçamento enviado', cards: [] },
    { titulo: 'Visita Agendada', cards: [] },
    { titulo: 'Demonstrou Interesse', cards: [] },
    { titulo: 'Negociação', cards: [] },
  ];

  colunaVisivel = 0;
  isMobile = window.innerWidth < 768;
  historicoModalAberto = false;
  cardSelecionado: Card | null = null;

  connectedColumnIds: string[] = [];

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {
    this.connectedColumnIds = this.colunas.map((_, idx) => idx.toString());
  }

  abrirModalCallback!: () => void;

  onNovoCard(card: Card): void {
    this.colunas[0].cards.push(card);
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

  onCardMovido(event: {
    previousIndex: number;
    currentIndex: number;
    previousContainer: number;
    currentContainer: number;
  }): void {
    const prevCol = this.colunas[event.previousContainer]?.cards;
    const currCol = this.colunas[event.currentContainer]?.cards;

    if (!prevCol || !currCol) {
      console.warn('Coluna anterior ou atual inválida:', event);
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

    // localStorage.setItem(`historico_${this.cardSelecionado.id}`, JSON.stringify(this.cardSelecionado.historico));
    this.fecharHistorico();
  }
}
