export interface Card {
  id: string;
  negocio: string;
  nome: string;
  servicoDesejado: string;
  valorNegocio: string;
  criadoPor: string;
  historico?: any[];
  // outros campos...
  email?: string;
  endereco?: string;
  cpfCnpj?: string;
  telefone?: string;
}

export interface HistoricoItem {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
}


