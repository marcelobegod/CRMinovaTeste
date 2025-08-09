// historico-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Registro } from '../../shared/models/registro.model';
// Defina a interface Registro aqui mesmo

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

  formatarData(data: Date): string {
    if (!data) return '';
    const d = new Date(data);
    const dia = ('0' + d.getDate()).slice(-2);
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  historicoOrdenado() {
  // Replace 'this.historico' with the actual array property name if different
  return this.historico ? [...this.historico].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()) : [];
}
}
