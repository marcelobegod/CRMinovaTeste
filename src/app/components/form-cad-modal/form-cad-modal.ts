import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'form-cad-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './form-cad-modal.html'
})
export class FormCadModalComponent {
  @Output() criarCard = new EventEmitter<any>();
  cadastroForm: FormGroup;
  mostrarModal = false;
  mostrarMaisInfos = false;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      negocio: ['', [Validators.required, Validators.minLength(2)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: [''],
      cpfCnpj: [''],
      servicoDesejado: [''],
      valorNegocio: [''],
      contatoInicial: ['']
    });

  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.mostrarMaisInfos = false;
    this.cadastroForm.reset();
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const novoCard = {
        negocio: this.cadastroForm.value.negocio,
        nome: this.cadastroForm.value.nome,
        servicoDesejado: this.cadastroForm.value.servicoDesejado,
        valorNegocio: this.cadastroForm.value.valorNegocio || 'R$ 0,00',
        criadoPor: 'Usuário Logado' // <- Aqui depois você pode trocar pelo usuário real logado
      };

      this.criarCard.emit(novoCard);
      this.fecharModal();
    }
  }
}
