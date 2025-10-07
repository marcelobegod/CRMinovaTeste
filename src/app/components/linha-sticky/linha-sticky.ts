import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCadColunaComponent } from '../form-cad-coluna/form-cad-coluna';


@Component({
  selector: 'app-linha-sticky',
  standalone: true,
  imports: [CommonModule, FormCadColunaComponent],
  templateUrl: './linha-sticky.html',
  styleUrls: ['./linha-sticky.css'],
})
export class LinhaStickyComponent {
  @Input() abrirModalCallback!: () => void;
  @Input() isMobile!: boolean;
  @Input() colunaVisivel!: number;
  @Input() colunasLength!: number;
  @Input() avancarColuna!: () => void;
  @Input() voltarColuna!: () => void;

  @Input() criarColunaCallback!: (titulo: string) => void;

  // Controla a visibilidade do modal de nova coluna
  modalNovaColunaVisible = false;

  abrirModalNovaColuna() {
    this.modalNovaColunaVisible = true;
  }

  salvarNovaColuna(titulo: string) {
    if (this.criarColunaCallback) {
      this.criarColunaCallback(titulo);
    }
    this.modalNovaColunaVisible = false;
  }

  fecharModalNovaColuna() {
    this.modalNovaColunaVisible = false;
  }
}
