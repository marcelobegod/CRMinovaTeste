import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface Registro — defina também externamente se preferir.
export interface Registro {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
  concluida?: boolean;
}

@Component({
  selector: 'app-historico-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-list.html',
  styleUrls: ['./historico-list.css'],
})
export class HistoricoListComponent {
  @Input() historico: Registro[] = [];

  @Output() editar = new EventEmitter<Registro>();
  @Output() concluir = new EventEmitter<Registro>();

  // Formata data para dd/MM/yyyy
  formatarData(data: Date): string {
    if (!data) return '';
    const d = new Date(data);
    const dia = ('0' + d.getDate()).slice(-2);
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  // Ordena o histórico do mais recente para o mais antigo
  historicoOrdenado(): Registro[] {
    return this.historico
      ? [...this.historico].sort(
          (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
        )
      : [];
  }
}
