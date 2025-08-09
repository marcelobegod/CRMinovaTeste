import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historico-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico-form.html',
  styleUrls: ['./historico-form.css'],
})
export class HistoricoFormComponent {
  @Input() atividade = '';
  @Input() descricao = '';
  @Input() dataISO = '';

  @Input() concluida = false;

  @Output() salvarRegistro = new EventEmitter<{
    atividade: string;
    descricao: string;
    data: string;
  }>();

  onSalvar() {
    if (!this.atividade || !this.dataISO) {
      return;
    }
    this.salvarRegistro.emit({
      atividade: this.atividade,
      descricao: this.descricao,
      data: this.dataISO,
    });
  }
}
