import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-linha-sticky',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linha-sticky.html',
  styleUrls: ['./linha-sticky.css']
})
export class LinhaStickyComponent {
  @Input() abrirModalCallback!: () => void;
  @Input() isMobile!: boolean;
  @Input() colunaVisivel!: number;
  @Input() colunasLength!: number;
  @Input() avancarColuna!: () => void;
  @Input() voltarColuna!: () => void;
}
