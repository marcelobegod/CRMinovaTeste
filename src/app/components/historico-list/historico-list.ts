import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Registro } from '../../shared/models/registro.model';
import { HistoricoService } from '../../shared/services/historico.service';

@Component({
  selector: 'app-historico-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-list.html',
  styleUrls: ['./historico-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricoListComponent {
  @Input() historico: Registro[] = [];

  @Output() editar = new EventEmitter<Registro>();
  @Output() concluir = new EventEmitter<Registro>();

  constructor(private historicoService: HistoricoService) {}

  // Retorna histórico já ordenado via service
  historicoOrdenado(): Registro[] {
    return this.historicoService.ordenar(this.historico || []);
  }

  formatarData(data: Date): string {
    if (!data) return '';
    const d = new Date(data);
    const dia = ('0' + d.getDate()).slice(-2);
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
