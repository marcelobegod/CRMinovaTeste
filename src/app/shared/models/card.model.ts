export interface HistoricoItem {
  id: string;
  atividade: string;
  descricao: string;
  data: Date;
}

export interface Card {
  id: string;
  negocio: string;
  nome: string;
  servicoDesejado: string;
  valorNegocio: string;
  criadoPor: string;
  historico?: HistoricoItem[];
}
