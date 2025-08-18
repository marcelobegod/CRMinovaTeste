import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cad-coluna',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-cad-coluna.html',
  styleUrls: ['./form-cad-coluna.css'],
})
export class FormCadColunaComponent {
  @Input() visible = false;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() salvarColuna = new EventEmitter<string>();

  titulo: string = '';

  salvar() {
    if (this.titulo.trim()) {
      this.salvarColuna.emit(this.titulo.trim());
      this.titulo = '';
      this.fechar();
    }
  }

  fechar() {
    this.titulo = '';
    this.visible = false;
    this.fecharModal.emit();
  }
}
