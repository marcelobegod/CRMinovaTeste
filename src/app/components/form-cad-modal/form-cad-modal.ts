import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Card } from '../../shared/models/card.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'form-cad-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './form-cad-modal.html',
})
export class FormCadModalComponent {
  // Evento para criar novo card
  @Output() criarCard = new EventEmitter<Card>();

  cadastroForm: FormGroup;
  mostrarModal = false;
  mostrarMaisInfos = false;

  constructor(private fb: FormBuilder) {
    // Define os campos do formulário com validações
    this.cadastroForm = this.fb.group({
      negocio: ['', [Validators.required, Validators.minLength(2)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: [''],
      cpfCnpj: [''],
      servicoDesejado: [''],
      valorNegocio: [''],
      contatoInicial: [''],
    });
  }

  /**
   * Formata o valor monetário para exibição padrão BRL.
   */
  formatarValor(valor: any): string {
    if (!valor) return 'R$ 0,00';

    let numero = Number(
      valor
        .toString()
        .replace(/[^\d,]/g, '') // Remove letras, R$, etc
        .replace(',', '.')
    );

    if (isNaN(numero)) return 'R$ 0,00';

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  /**
   * Abre o modal
   */
  abrirModal(): void {
    this.mostrarModal = true;
  }

  /**
   * Fecha o modal e reseta o formulário e campos extras
   */
  fecharModal(): void {
    this.mostrarModal = false;
    this.mostrarMaisInfos = false;
    this.cadastroForm.reset();
  }

  /**
   * Envia os dados do formulário criando um novo card,
   * só se o formulário for válido.
   */
  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      this.cadastroForm.markAsDirty();
      return;
    }

    const novoCard: Card = {
      id: uuidv4(),
      negocio: this.cadastroForm.value.negocio,
      nome: this.cadastroForm.value.nome,
      servicoDesejado: this.cadastroForm.value.servicoDesejado,
      valorNegocio: this.formatarValor(this.cadastroForm.value.valorNegocio),
      criadoPor: 'Usuário Logado',
    };

    this.criarCard.emit(novoCard);
    this.fecharModal();
  }
}
