
import { CommonModule } from '@angular/common';
import { EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Adicione esta interface se não existir em outro arquivo, ou importe-a se já existir
interface Registro {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
  concluida?: boolean;
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-historico-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './historico-modal.html',
  styleUrls: ['./historico-modal.css']
})
export class HistoricoModalComponent {
  @Input() visible: boolean = false;
  @Input() card: any;
  @Output() fechar = new EventEmitter<void>();
  @Output() atualizar = new EventEmitter<any>(); // Adicionado para emitir atualizações

  novaAtividade = '';
  novaDescricao = '';
  dataFormatada = ''; // string dd/mm/aaaa para input data

  registroEditando: Registro | null = null;

  fecharModal() {
    this.visible = false;
    this.limparCampos();
    this.fechar.emit();
  }

  dataInputISO: string = '';

editarRegistro(registro: Registro) {
  if (registro.concluida) return;

  this.registroEditando = registro;
  this.novaAtividade = registro.atividade;
  this.novaDescricao = registro.descricao;
  this.dataInputISO = this.formatarDataISO(registro.data);
}

salvarRegistro() {
  if (!this.card) return;

  if (!this.novaAtividade.trim()) {
    alert('Atividade é obrigatória');
    return;
  }

  if (!this.dataInputISO) {
    alert('Data é obrigatória');
    return;
  }

  const dataConvertida = new Date(this.dataInputISO);
  if (isNaN(dataConvertida.getTime())) {
    alert('Data inválida');
    return;
  }

  if (!this.card.historico) {
    this.card.historico = [];
  }

  if (this.registroEditando) {
    this.registroEditando.atividade = this.novaAtividade;
    this.registroEditando.descricao = this.novaDescricao;
    this.registroEditando.data = dataConvertida;
    this.registroEditando = null;
  } else {
    const novoRegistro: Registro = {
      id: this.gerarId(),
      atividade: this.novaAtividade,
      descricao: this.novaDescricao,
      data: dataConvertida,
    };
    this.card.historico.push(novoRegistro);
  }

  // Atualizar localStorage e emitir evento atualizado aqui...

  this.atualizar.emit(this.card);
  this.limparCampos();
}

limparCampos() {
  this.novaAtividade = '';
  this.novaDescricao = '';
  this.dataInputISO = '';
  this.registroEditando = null;
}

formatarDataISO(data: Date): string {
  if (!data) return '';
  const d = new Date(data);
  const ano = d.getFullYear();
  const mes = ('0' + (d.getMonth() + 1)).slice(-2);
  const dia = ('0' + d.getDate()).slice(-2);
  return `${ano}-${mes}-${dia}`;  // formato yyyy-MM-dd
}

formatarData(data: Date): string {
  if (!data) return '';
  const d = new Date(data);
  const dia = ('0' + d.getDate()).slice(-2);
  const mes = ('0' + (d.getMonth() + 1)).slice(-2);
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;  // formato dd/mm/aaaa para exibição
}


  converterDataParaDate(dataStr: string): Date | null {
    if (!dataStr) return null;
    const partes = dataStr.split('/');
    if (partes.length !== 3) return null;
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // zero-based month
    const ano = parseInt(partes[2], 10);
    const dateObj = new Date(ano, mes, dia);
    // Validar data
    if (
      dateObj.getFullYear() === ano &&
      dateObj.getMonth() === mes &&
      dateObj.getDate() === dia
    ) {
      return dateObj;
    }
    return null;
  }

  validarData() {
    // Se data inválida, limpa campo
    if (!this.converterDataParaDate(this.dataFormatada)) {
      this.dataFormatada = '';
      alert('Data inválida. Use dd/mm/aaaa');
    }
  }

  gerarId(): string {
    // Gera um ID simples baseado em timestamp e um número aleatório
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  concluirAtividade(registro: any): void {
  // Implement your logic here, for example:
  registro.concluida = true;
}
}
