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
  // Campos do formulário ligados ao modelo
  @Input() atividade = '';
  @Input() descricao = '';
  @Input() dataISO = '';

  // Quando a atividade já está concluída, bloqueia edição
  @Input() concluida = false;

  // Evento emitido ao salvar um registro
  @Output() salvarRegistro = new EventEmitter<{
    atividade: string;
    descricao: string;
    data: string;
  }>();

  // Método chamado ao enviar o formulário
  onSalvar() {
    if (!this.atividade || !this.dataISO) {
      // Validação simples para evitar envio incompleto
      return;
    }
    this.salvarRegistro.emit({
      atividade: this.atividade,
      descricao: this.descricao,
      data: this.dataISO,
    });
  }
}
