import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({ providedIn: 'root' })
export class HistoricoService {
  gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  parseDateLocal(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  ordenar(historico: Registro[]): Registro[] {
    const naoConcluidas = historico.filter(r => !r.concluida);
    const concluidas = historico
      .filter(r => r.concluida)
      .sort((a, b) => b.data.getTime() - a.data.getTime());
    return [...naoConcluidas, ...concluidas];
  }
}
