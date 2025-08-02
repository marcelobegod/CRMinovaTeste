import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from '../column/column';
import { Card } from '../../shared/models/card.model';
import { LinhaStickyComponent } from '../../shared/linha-sticky/linha-sticky';

interface Coluna {
  titulo: string;
  cards: Card[];
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ColumnComponent, LinhaStickyComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.css']
})
export class BoardComponent {
  colunas: Coluna[] = [
    { titulo: 'Contato Inicial', cards: [] },
    { titulo: 'Orçamento enviado', cards: [] },
    { titulo: 'Visita Agendada', cards: [] },
    { titulo: 'Demonstrou Interesse', cards: [] },
    { titulo: 'Negociação', cards: [] },
  ];

  colunaVisivel = 0;
  isMobile = window.innerWidth < 768;

  abrirModalCallback!: () => void;

  onNovoCard(card: Card) {
    this.colunas[0].cards.push(card);
  }

  avancarColuna() {
    if (this.colunaVisivel < this.colunas.length - 1) this.colunaVisivel++;
  }

  voltarColuna() {
    if (this.colunaVisivel > 0) this.colunaVisivel--;
  }

  onResize(width: number) {
    this.isMobile = width < 768;
  }
}
