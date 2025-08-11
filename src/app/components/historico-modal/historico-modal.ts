import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoricoFormComponent } from '../historico-form/historico-form';
import { DadosClienteComponent } from '../dados-cliente/dados-cliente';

// Interface para registros de atividades do cliente
interface Registro {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
  concluida?: boolean;
}

// Interface para o card/cliente
interface Card {
  id: string;
  negocio: string;
  nome: string;
  servicoDesejado: string;
  valorNegocio: string;
  criadoPor: string;
  historico?: Registro[];
}

@Component({
  selector: 'app-historico-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HistoricoFormComponent, DadosClienteComponent],
  templateUrl: './historico-modal.html',
  styleUrls: ['./historico-modal.css']
})
export class HistoricoModalComponent {
  // Recebe o card (cliente) a ser editado
  @Input() card: Card | null = null;

  // Controle de visibilidade do modal
  @Input() visible = false;

  // Emite evento para fechar o modal
  @Output() fechar = new EventEmitter<void>();

  // Emite evento quando o card é atualizado (dados ou histórico)
  @Output() atualizar = new EventEmitter<Card>();

  // Variáveis para o formulário de nova atividade
  novaAtividade = '';
  novaDescricao = '';
  dataInputISO = '';

  // Registro que está sendo editado (se houver)
  registroEditando: Registro | null = null;

  // Fecha o modal, limpa campos e emite evento para o componente pai
  fecharModal() {
    this.visible = false;
    this.limparCampos();
    this.fechar.emit();
  }

  // Prepara o modal para edição de um registro específico
  editarRegistro(registro: Registro) {
    if (registro.concluida) return; // Não permite editar registros concluídos

    this.registroEditando = registro;
    this.novaAtividade = registro.atividade;
    this.novaDescricao = registro.descricao;
    this.dataInputISO = this.formatarDataISO(registro.data);
  }

  // Salva um novo registro ou atualiza o registro editado
  salvar(event: { atividade: string; descricao: string; data: string }) {
    if (!this.card) return;

    if (this.registroEditando) {
      // Atualiza registro existente, se não concluído
      if (!this.registroEditando.concluida) {
        this.registroEditando.atividade = event.atividade;
        this.registroEditando.descricao = event.descricao;
        this.registroEditando.data = new Date(event.data);
      }
      this.registroEditando = null;
    } else {
      // Adiciona novo registro ao histórico do card
      this.card.historico = this.card.historico || [];
      this.card.historico.push({
        id: this.gerarId(),
        atividade: event.atividade,
        descricao: event.descricao,
        data: new Date(event.data),
        concluida: false
      });
    }

    // Emite evento para informar que o card foi atualizado
    this.atualizar.emit(this.card);

    // Limpa campos para nova entrada
    this.limparCampos();
  }

  // Marca a atividade atual como concluída e ajusta a data se necessário
  concluirAtividadeRegistro(registro: Registro) {
  if (registro.concluida) return;

  const hoje = new Date();
  let dataAtividade = new Date();

  // Ajusta a data para hoje se for futura
  if (dataAtividade > hoje) dataAtividade = hoje;

  registro.data = dataAtividade;
  registro.concluida = true;

  // Se estiver editando este registro, limpa o estado de edição
  if (this.registroEditando && this.registroEditando.id === registro.id) {
    this.registroEditando = null;
    this.limparCampos();
  }

  if (this.card) {
    this.atualizar.emit(this.card);
  }
}


  // Limpa os campos do formulário e reseta o registro em edição
  limparCampos() {
    this.novaAtividade = '';
    this.novaDescricao = '';
    this.dataInputISO = '';
    this.registroEditando = null;
  }

  // Gera um ID simples para novos registros (não recomendado para produção)
  gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  // Formata uma data para o padrão ISO yyyy-MM-dd para input type="date"
  formatarDataISO(data: Date): string {
    if (!data) return '';
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const dia = ('0' + d.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
  }

  // Formata data para exibição dd/MM/yyyy hour
  formatarData(data: Date): string {
  if (!data) return '';

  const formatador = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return formatador.format(new Date(data));
}

formatarDataSomenteData(data: Date): string {
  if (!data) return '';
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return formatador.format(new Date(data));
}

  // Ordena o histórico: não concluídas primeiro, depois concluídas por data decrescente
  historicoOrdenado(): Registro[] {
    if (!this.card?.historico) return [];

    const naoConcluidas = this.card.historico.filter(r => !r.concluida);
    const concluidas = this.card.historico
      .filter(r => r.concluida)
      .sort((a, b) => b.data.getTime() - a.data.getTime());

    return [...naoConcluidas, ...concluidas];
  }

}
