import { ColumnComponent } from './../../components/column/column';
import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../shared/models/card.model'; // Modelo de Card
import { FormCadModalComponent } from '../../components/form-cad-modal/form-cad-modal';


// Interface para colunas
interface Coluna {
  titulo: string;
  cards: Card[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormCadModalComponent, CommonModule, ColumnComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  @ViewChild('modal') modal!: FormCadModalComponent;

  colunas: Coluna[] = [
    { titulo: 'Contato Inicial', cards: [] },
    { titulo: 'Orçamento enviado', cards: [] },
    { titulo: 'Visita Agendada', cards: [] },
    { titulo: 'Demonstrou Interesse', cards: [] },
    { titulo: 'Negociação', cards: [] },
  ];

  colunaVisivel = 0;
  isMobile = window.innerWidth < 768;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  abrirModal() {
    this.modal.abrirModal();
  }

  onNovoCard(card: Card) {
    this.colunas[0].cards.push(card); // Adiciona à coluna "Contato Inicial"
  }

  avancarColuna() {
    if (this.colunaVisivel < this.colunas.length - 1) {
      this.colunaVisivel++;
    }
  }

  voltarColuna() {
    if (this.colunaVisivel > 0) {
      this.colunaVisivel--;
    }
  }
}
